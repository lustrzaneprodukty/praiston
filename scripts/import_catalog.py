#!/usr/bin/env python3
"""Offline import of public Praiston content. Respects robots, caches outside repository.
Requires lxml and Pillow. Run from repository: python scripts/import_catalog.py
"""
import concurrent.futures as cf, json, re, hashlib, time, os, urllib.request, urllib.parse, urllib.robotparser
from pathlib import Path
from lxml import html
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]; CACHE=ROOT.parent/'.cache'/'praiston'; CACHE.mkdir(parents=True,exist_ok=True)
BASE='https://www.praiston.pl'; UA='PraistonFrontendResearch/1.0'; failures=[]; blocked=set(); seen=set(); products={}; categories={}; pages={}; images={}; associations={}; catimages={}; pimages={}
robot=urllib.robotparser.RobotFileParser();robot.parse(['User-agent: *','Disallow: /ask/','Disallow: /article/','Disallow: /find/','Disallow: /uploads/','Disallow: /cart/','Disallow: /add/','Disallow: /printpage/','Disallow: /pl/catalog/pdf/','Disallow: /pl/catalog/printpage/'])
def norm(u):
 u=urllib.parse.urljoin(BASE,u).replace('http://www.praiston.pl','https://www.praiston.pl');return u.split('#')[0]
def get(u):
 u=norm(u)
 if not robot.can_fetch(UA,u): blocked.add(u);return None
 p=CACHE/hashlib.sha256(u.encode()).hexdigest()
 if p.exists():return p.read_bytes()
 for attempt in range(2):
  try:
   req=urllib.request.Request(u,headers={'User-Agent':UA})
   with urllib.request.urlopen(req,timeout=20) as r:b=r.read()
   p.write_bytes(b);return b
  except Exception as e:
   if attempt:failures.append({'url':u,'error':str(e)})
 return None
def text(n):return ' '.join(n.text_content().split())
def catmatch(u):return re.search(r'/pl/catalog/category/(\d+)/([^?/#]+)',u)
def prodmatch(u):return re.search(r'/pl/catalog/view/(\d+)/(?:\d+/)?([^?/#]+)',u)
def addcat(u,name='',parent=None):
 m=catmatch(u)
 if not m:return
 i,slug=m.groups();obj=categories.setdefault(i,dict(id=i,slug=slug,name=name or slug,sourceUrl=BASE+m.group(0),parentId=parent))
 if name and 'Kliknij' not in name and 'Pozostały sprzęt' not in name:obj['name']=name
 if i in ['1','2','3','4']:obj['parentId']=None
 elif parent and i!=parent and not obj.get('parentId'):obj['parentId']=parent
 return obj['sourceUrl']
def parse(u,b):
 if not b:return []
 try:s=html.fromstring(b)
 except:return []
 found=[];cm=catmatch(u);pm=prodmatch(u)
 main=s.xpath('//*[@id="main-content"]');main=main[0] if main else s
 if cm:
  obj=categories[cm[1]];heads=main.xpath('.//h1');obj['name']=text(heads[0]) if heads else obj['name']
  for a in main.xpath('.//a[@href]'):
   href=norm(a.get('href'));m=catmatch(href);p=prodmatch(href)
   if m:
    
    if m[1]==cm[1]:
     if re.search(r'/\d+$',href):found.append(href)
     continue
    boxes=a.xpath('ancestor::*[contains(concat(" ",normalize-space(@class)," ")," product-box ")][1]'); names=boxes[0].xpath('.//h3') if boxes else []; name=text(names[0]) if names else text(a)
    v=addcat(href,name,cm[1] if boxes else None);found.append(v)
    ims=a.xpath('.//img/@src');
    if ims:catimages[m[1]]=norm(ims[0])
   elif p:
    pid,slug=p.groups();canonical=BASE+'/pl/catalog/view/'+pid+'/'+slug
    associations.setdefault(pid,set()).add(cm[1]);found.append(canonical)
    ims=a.xpath('.//img/@src')
    if ims:pimages.setdefault(pid,[]).append(norm(ims[0]))
   elif '/pl/catalog/category/' in href:found.append(href)
 elif pm:
  pid,slug=pm.groups();heads=main.xpath('.//h1');desc=s.xpath('//*[@id="product-description"]');lines=[]
  if desc:
   for node in desc[0].xpath('.//li|.//p'):
    if node.xpath('.//li|.//p'):continue
    v=text(node)
    if v and v not in lines:lines.append(v)
  specs=[]
  for line in lines:
   if ':' in line:
    k,v=line.split(':',1)
    if len(k)<65 and v.strip():specs.append({'label':k.strip(),'value':v.strip().rstrip(',')})
  cond=s.xpath('//*[contains(@class,"availability")]');cond=text(cond[0]) if cond else 'Nie podano'
  ims=s.xpath('//*[@id="product-photos"]//img/@src');all_sources=list(dict.fromkeys([norm(x) for x in ims]+pimages.get(pid,[]))); best={}
  for source in all_sources:
   key=re.sub(r'_(?:crop|resize)_\d+x\d+(?=\.)','',source); rank=re.search(r'_(?:crop|resize)_(\d+)x',source);rank=int(rank[1]) if rank else 0
   if key not in best or rank>best[key][0]:best[key]=(rank,source)
  pimages[pid]=[v[1] for v in best.values()]
  docs=[]
  for a in main.xpath('.//a[@href]'):
   href=norm(a.get('href'))
   if re.search(r'\.(pdf|docx?|xlsx?)(\?|$)',href,re.I):docs.append({'name':text(a) or 'Dokument','url':href,'sourceUrl':href,'availableLocally':False})
  products[pid]=dict(id=pid,slug=slug,name=text(heads[0]) if heads else slug,sourceUrl=u,categoryIds=[],description=lines,specifications=specs,images=[],documents=docs,condition=cond,originalImageUrls=[norm(x) for x in s.xpath('//*[@id="product-photos"]//a/@href') if '/uploads/' in x])
  for source in products[pid]['originalImageUrls']:
   if not robot.can_fetch(UA,source):blocked.add(source)
  if b'</html>' not in b.lower():products[pid]['sourceIncomplete']=True
 else:
  path=urllib.parse.urlparse(u).path
  if path not in ['', '/', '/pl']:
   slug=path.rstrip('/').split('/')[-1];heads=main.xpath('.//h1|.//h2');nodes=main.xpath('.//p|.//li');pars=[]
   for n in nodes:
    if n.xpath('.//p|.//li'):continue
    v=text(n)
    if v and v not in pars:pars.append(v)
   pages[slug]=dict(slug=slug,title=text(heads[0]) if heads else slug,sourceUrl=u,paragraphs=pars,imageSources=list(dict.fromkeys(norm(x) for x in main.xpath('.//img/@src'))))
  for a in s.xpath('//a[@href]'):
   href=norm(a.get('href'))
   if catmatch(href):found.append(addcat(href,text(a)))
   elif prodmatch(href):
    m=prodmatch(href);found.append(BASE+'/pl/catalog/view/'+m[1]+'/'+m[2])
   elif href.startswith(BASE+'/pl/') and '/catalog/' not in href and not re.search(r'\.(jpg|png|pdf)',href):found.append(href)
 return [x for x in found if x]
def save():
 for p in products.values():
  p['categoryIds']=sorted(associations.get(p['id'],[]))
  p['imageSources']=list(dict.fromkeys(pimages.get(p['id'],[])))
  local=[]
  for u in p['imageSources']:
   name=hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp';path=ROOT/'public'/'media'/name
   if path.exists():
    try:
     if u in images:obj=dict(images[u],alt=p['name'])
     else:
      im=Image.open(path);obj={'src':'/media/'+name,'sourceUrl':u,'alt':p['name'],'width':im.width,'height':im.height}
     local.append(obj);images[u]=obj
    except Exception:pass
  p['images']=local
 for c in categories.values():
  u=catimages.get(c['id'])
  if u:
   c['imageSource']=u;name=hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp'
   if (ROOT/'public'/'media'/name).exists():c['image']={'src':'/media/'+name,'sourceUrl':u}

 for page in pages.values():
  page['images']=[{'src':'/media/'+hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp','sourceUrl':u,'alt':page['title']} for u in page.get('imageSources',[]) if (ROOT/'public'/'media'/(hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp')).exists()]
 for name,vals in [('products',products),('categories',categories),('pages',pages)]:
  target=ROOT/'data'/f'{name}.json';temp=target.with_suffix('.json.tmp');temp.write_text(json.dumps(list(vals.values()),ensure_ascii=False,indent=2));temp.replace(target)
 (ROOT/'data'/'coverage.json').write_text(json.dumps(dict(crawledPages=len(seen),categories=len(categories),products=len(products),companyPages=len(pages),images=len(images),failures=failures,blockedUrls=sorted(blocked),visitedUrls=sorted(seen),sitemapStatus='Checked /sitemap.xml, branded error page, no sitemap declared in robots.txt',incompleteProductPages=sum(bool(p.get('sourceIncomplete')) for p in products.values()),notes=['URLs discovered through category hierarchy, pagination and corporate links. /uploads/ not fetched, respecting robots.txt; original image URLs preserved when present.']),ensure_ascii=False,indent=2))
def media(item):
 u=item;b=get(u)
 if not b:return None
 try:
  import io
  im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1400,1400));name=hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp';target=ROOT/'public'/'media'/name; temp=target.with_suffix('.'+str(os.getpid())+'.tmp');im.save(temp,'WEBP',quality=84);temp.replace(target)
  return u,{'src':'/media/'+name,'sourceUrl':u,'width':im.width,'height':im.height}
 except:return None
if __name__=='__main__':
 existing=ROOT/'data'/'products.json'
 if existing.exists():
  for p in json.loads(existing.read_text()):
   products[p['id']]=p;associations[p['id']]=set(p.get('categoryIds',[]));pimages[p['id']]=p.get('imageSources',[])
   for image in p.get('images',[]):images[image['sourceUrl']]=image
 robots=get(BASE+'/robots.txt')
 if robots:robot.parse(robots.decode('utf-8','replace').splitlines())
 queue=[BASE+'/'];pool=cf.ThreadPoolExecutor(max_workers=24);active={};scheduled=set();processed=0
 while queue or active:
  queue=list(dict.fromkeys(u for u in queue if u not in scheduled))
  queue.sort(key=lambda u: (bool(prodmatch(u)),len(u)))
  while queue and len(active)<24:
   u=queue.pop(0);scheduled.add(u);active[pool.submit(get,u)]=u
  if not active:break
  done,_=cf.wait(active,return_when=cf.FIRST_COMPLETED)
  for f in done:
   u=active.pop(f);seen.add(u);queue.extend(parse(u,f.result()));processed+=1
   if processed%50==0:
    save();(ROOT/'data'/'discovered-urls.json').write_text(json.dumps(sorted(scheduled|set(queue)),ensure_ascii=False,indent=2));print('pages',len(seen),'categories',len(categories),'products',len(products),'queue',len(set(queue)-scheduled),flush=True)
 save()
 allimages=set(catimages.values())|{x for v in pimages.values() for x in v}|{x for p in pages.values() for x in p.get('imageSources',[])}
 allimages.update(BASE+'/img/'+x for x in ['logo.png','cat-1.jpg?v=7','cat-2.jpg?v=7','cat-3.jpg?v=7','cat-4.jpg?v=7'])
 for idx,result in enumerate(pool.map(media,sorted(allimages))):
  if result:images[result[0]]=result[1]
  if idx%100==0:save();print('media',idx,'/',len(allimages),flush=True)
 for p in products.values():p['images']=[dict(images[u],alt=p['name']) for u in dict.fromkeys(pimages.get(p['id'],[])) if u in images]
 for c in categories.values():
  if catimages.get(c['id']) in images:c['image']=images[catimages[c['id']]]
 (ROOT/'data'/'media.json').write_text(json.dumps(list(images.values()),ensure_ascii=False,indent=2));save();print('DONE',len(products),len(categories),len(images),flush=True)
