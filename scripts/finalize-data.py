#!/usr/bin/env python3
"""Normalize an already collected snapshot. Reparse cached source, never fetch."""
from pathlib import Path
import json,re,hashlib,urllib.parse,collections
from lxml import html
from PIL import Image
root=Path(__file__).resolve().parents[1];data=root/'data';cache=root.parent/'.cache'/'praiston';base='https://www.praiston.pl'
load=lambda n:json.loads((data/(n+'.json')).read_text())
products=load('products');categories=load('categories');coverage=load('coverage');oldpages=load('pages');urls=set(coverage.get('visitedUrls',[]))
def text(n):return ' '.join(n.text_content().split())
def document(u):
 p=cache/hashlib.sha256(u.encode()).hexdigest()
 if not p.exists():return None
 try:return html.fromstring(p.read_bytes())
 except:return None
def cm(u):return re.search(r'/pl/catalog/category/(\d+)/([^?/#]+)',u)
def pm(u):return re.search(r'/pl/catalog/view/(\d+)/(?:\d+/)?([^?/#]+)',u)
def unique_slug(slug,id):return slug if slug.endswith('-'+id) else slug+'-'+id
catmap={c['id']:c for c in categories};edges=collections.defaultdict(list);associations=collections.defaultdict(set)
for u in sorted(urls):
 match=cm(u)
 if not match:continue
 s=document(u)
 if s is None:continue
 main=s.xpath('//*[@id="main-content"]')
 if not main:continue
 for box in main[0].xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," product-box ")]'):
  for a in box.xpath('.//a[@href]'):
   href=urllib.parse.urljoin(base,a.get('href'));c=cm(href);p=pm(href)
   if c and c[1] not in ['1','2','3','4'] and c[1]!=match[1] and c[1] not in edges[match[1]]:edges[match[1]].append(c[1])
   if p:associations[p[1]].add(match[1])
for c in categories:c['parentId']=None
queue=collections.deque(['1','2','3','4']);assigned=set(queue)
while queue:
 parent=queue.popleft()
 for id in edges[parent]:
  if id not in assigned and id in catmap:catmap[id]['parentId']=parent;assigned.add(id);queue.append(id)
for c in categories:
 c['sourceSlug']=cm(c['sourceUrl'])[2];c['slug']=unique_slug(c['sourceSlug'],c['id'])
 s=document(c['sourceUrl'])
 if s is not None:
  heads=s.xpath('//*[@id="main-content"]//h1')
  if heads:c['name']=text(heads[0])
  c['description']=[text(n) for n in s.xpath('//*[@id="main-content"]//*[contains(@class,"opis")]//p') if text(n)]
# Derivatives of one original image are one gallery item, preserving the best linked version.
def local_images(sources,alt):
 groups={}
 for u in sources:
  key=re.sub(r'_(?:crop|resize)_\d+x\d+(?=\.)','',u)
  width=re.search(r'_(?:crop|resize)_(\d+)x',u);rank=int(width[1]) if width else 0
  name=hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp';p=root/'public'/'media'/name
  if not p.exists():continue
  if key in groups and rank<=groups[key][0]:continue
  try:
   im=Image.open(p);record={'src':'/media/'+name,'sourceUrl':u,'alt':alt,'width':im.width,'height':im.height}
  except Exception:continue
  groups[key]=(rank,record)
 return [v[1] for v in groups.values()]
for p in products:
 p['sourceSlug']=pm(p['sourceUrl'])[2];p['slug']=unique_slug(p['sourceSlug'],p['id']);p['categoryIds']=sorted(associations[p['id']])
 p['images']=local_images(p.get('imageSources',[]),p['name'])
 s=document(p['sourceUrl'])
 if s is not None:
  desc=s.xpath('//*[@id="product-description"]')
  if desc:
   p['descriptionText']=text(desc[0])
   if not p['description'] and p['descriptionText']:
    blocks=desc[0].xpath('./div|./section');p['description']=[text(n) for n in blocks if text(n)] or [p['descriptionText']]
   for row in desc[0].xpath('.//tr'):
    cells=[text(c) for c in row.xpath('./th|./td')]
    if len(cells)>=2 and cells[0] and any(cells[1:]):
     pair={'label':cells[0],'value':' · '.join(cells[1:])}
     if pair not in p['specifications']:p['specifications'].append(pair)
   p['descriptionImageSources']=list(dict.fromkeys(urllib.parse.urljoin(base,u) for u in desc[0].xpath('.//img/@src')))

# Reconstruct all corporate/article pages with real headings and collision-safe article IDs.
pageurls={p['sourceUrl'] for p in oldpages}|{u for u in urls if '/pl/article/' in u}
pages=[]
for u in sorted(pageurls):
 s=document(u)
 if s is None:continue
 main=s.xpath('//*[@id="main-content"]')
 if not main:continue
 main=main[0];heads=main.xpath('.//h1|.//h2|.//h3[contains(@class,"news-title")]');slug=urllib.parse.urlparse(u).path.rstrip('/').split('/')[-1];article=re.search(r'/pl/article/(\d+)/',u)
 if article:slug=unique_slug(slug,article[1])
 title=text(heads[0]) if heads else next((p['title'] for p in oldpages if p['sourceUrl']==u),slug)
 pars=[]
 for n in main.xpath('.//p|.//li|.//h2|.//h3|.//h4'):
  if n.xpath('.//p|.//li'):continue
  v=text(n)
  if v and v!=title and v not in pars:pars.append(v)
 sources=list(dict.fromkeys(urllib.parse.urljoin(base,x) for x in main.xpath('.//img/@src')))
 pages.append({'slug':slug,'title':title,'sourceUrl':u,'paragraphs':pars,'imageSources':sources,'images':local_images(sources,title),'kind':'article' if article else 'page','sourceId':article[1] if article else None})
pages.sort(key=lambda p:(p['kind']=='article',-int(p['sourceId'] or 0)))
document_refs=[]
for record in [*products,*pages]:
 s=document(record['sourceUrl'])
 if s is None:continue
 main=s.xpath('//*[@id="main-content"]')
 if not main:continue
 for a in main[0].xpath('.//a[@href]'):
  u=urllib.parse.urljoin(base,a.get('href'))
  if re.match(r'^https?://',u) and (re.search(r'\.(pdf|docx?|xlsx?)(\?|$)',u,re.I) or '/catalog/pdf/' in u):
   document_refs.append({'sourceUrl':u,'pageUrl':record['sourceUrl'],'name':text(a) or 'Dokument źródłowy','blockedByRobots':'/uploads/' in u or '/catalog/pdf/' in u,'availableLocally':False})
(data/'document-references.json').write_text(json.dumps(document_refs,ensure_ascii=False,indent=2))
# Keep only media referred to by collected records; preserve metadata for all downloaded derivatives.
referenced={u for p in products for u in p.get('imageSources',[])}|{c['imageSource'] for c in categories if c.get('imageSource')}|{u for p in pages for u in p.get('imageSources',[])}
brand=load('brand-assets') if (data/'brand-assets.json').exists() else []
referenced.update(b['sourceUrl'] for b in brand)
media=[];invalidMedia=[]
for u in sorted(referenced):
 name=hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp';p=root/'public'/'media'/name
 if p.exists():
  try:
   im=Image.open(p);im.verify();im=Image.open(p);media.append({'src':'/media/'+name,'sourceUrl':u,'width':im.width,'height':im.height,'bytes':p.stat().st_size})
  except Exception:invalidMedia.append(u)
# Content-hash deduplication across URLs, with every source relation retained.
byhash={};aliases={};dedup=[]
for item in media:
 digest=hashlib.sha256((root/'public'/item['src'].lstrip('/')).read_bytes()).hexdigest()
 if digest in byhash:
  canonical=byhash[digest];aliases[item['src']]=canonical['src'];canonical['sourceUrls'].append(item['sourceUrl'])
 else:
  item['sha256']=digest;item['sourceUrls']=[item['sourceUrl']];byhash[digest]=item;dedup.append(item);aliases[item['src']]=item['src']
media=dedup
for r in [*products,*pages]:
 revised=[];used=set()
 for image in r.get('images',[]):
  image['src']=aliases.get(image['src'],image['src'])
  if image['src'] not in used:revised.append(image);used.add(image['src'])
 r['images']=revised
by_source={source:im for im in media for source in im['sourceUrls']}
for c in categories:
 image=by_source.get(c.get('imageSource'))
 if image:c['image']={k:image[k] for k in ['src','sourceUrl','width','height']};c['image']['alt']=c['name']
for r in brand:r['src']=aliases.get(r['src'],r['src'])
(data/'brand-assets.json').write_text(json.dumps(brand,ensure_ascii=False,indent=2)+'\n')
allowed={x['src'].split('/')[-1] for x in media}
for p in (root/'public'/'media').glob('*.webp'):
 if p.name not in allowed:p.unlink()
urlmap=[{'sourceUrl':p['sourceUrl'],'path':'/produkt/'+p['slug']} for p in products]+[{'sourceUrl':c['sourceUrl'],'path':'/kategorie/'+c['slug']} for c in categories]+[{'sourceUrl':p['sourceUrl'],'path':'/'+p['slug']} for p in pages]
known=load('discovered-urls') if (data/'discovered-urls.json').exists() else []
knownProducts={pm(u)[1] for u in known if pm(u)}
coverage.update({'products':len(products),'categories':len(categories),'companyPages':sum(p['kind']=='page' for p in pages),'articles':sum(p['kind']=='article' for p in pages),'contentPages':len(pages),'images':len(media),'productImageReferences':sum(len(p['images']) for p in products),'productsWithoutImages':sum(not p['images'] for p in products),'productsWithoutCategory':[p['id'] for p in products if not p['categoryIds']],'unattachedCategories':[c['id'] for c in categories if c['id'] not in ['1','2','3','4'] and not c['parentId']],'discoveredProductIds':len(knownProducts),'missingProductIds':sorted(knownProducts-{p['id'] for p in products}),'mediaBytes':sum(m['bytes'] for m in media),'snapshotDate':'2026-10-20','sitemapChecked':['/robots.txt','/sitemap.xml','/sitemap_index.xml'],'sitemapStatus':'The checked sitemap endpoints did not return an available XML sitemap. See sitemap-check.json. No sitemap declared in robots.txt.','fullOriginalsDownloaded':False,'invalidMedia':invalidMedia,'documentReferences':len(document_refs),'localDocuments':0,'productsWithoutDescription':[p['id'] for p in products if not p['description']]})
for name,obj in [('products',products),('categories',categories),('pages',pages),('media',media),('coverage',coverage),('url-map',urlmap)]:
 (data/(name+'.json')).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in coverage.items() if k not in ['visitedUrls','blockedUrls','failures']},ensure_ascii=False,indent=2))
