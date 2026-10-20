#!/usr/bin/env python3
from pathlib import Path
import importlib.util,hashlib,json,io
from PIL import Image
from lxml import html
spec=importlib.util.spec_from_file_location('importer',Path(__file__).with_name('import_catalog.py'));m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
b=m.get(m.BASE+'/robots.txt')
if b:m.robot.parse(b.decode('utf-8','replace').splitlines())
s=html.fromstring(m.get(m.BASE+'/'));assets=[]
for source in dict.fromkeys(s.xpath('//img/@src')):
 if not source.startswith(m.BASE+'/img/'):continue
 b=m.get(source)
 if not b:continue
 try:
  im=Image.open(io.BytesIO(b));im.thumbnail((1400,1400));name=hashlib.sha256(source.encode()).hexdigest()[:20]+'.webp';im.save(m.ROOT/'public'/'media'/name,'WEBP',quality=88)
  assets.append({'src':'/media/'+name,'sourceUrl':source,'width':im.width,'height':im.height,'alt':Path(source.split('?')[0]).stem})
 except Exception:continue
(m.ROOT/'data'/'brand-assets.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2));print('brand assets',len(assets))
