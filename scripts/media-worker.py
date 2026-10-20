#!/usr/bin/env python3
"""Optional parallel media prefetch; uses the same robots policy and disk cache."""
import importlib.util,json,time,concurrent.futures as cf,hashlib
from pathlib import Path
spec=importlib.util.spec_from_file_location('importer',Path(__file__).with_name('import_catalog.py'));m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
b=m.get(m.BASE+'/robots.txt')
if b:m.robot.parse(b.decode('utf-8','replace').splitlines())
root=Path(__file__).resolve().parents[1];attempted=set();pool=cf.ThreadPoolExecutor(max_workers=24);active={};total=0
while not (root.parent/'stop-media').exists():
 sources=set()
 for filename in ['products','categories','pages']:
  try:records=json.loads((root/'data'/f'{filename}.json').read_text())
  except Exception:continue
  for r in records:
   sources.update(r.get('imageSources',[]))
   if r.get('imageSource'):sources.add(r['imageSource'])
 for u in sorted(sources-attempted):
  local=root/'public'/'media'/(hashlib.sha256(u.encode()).hexdigest()[:20]+'.webp')
  if local.exists() or not m.robot.can_fetch(m.UA,u):attempted.add(u);continue
  if len(active)>=32:break
  attempted.add(u);active[pool.submit(m.media,u)]=u
 if active:
  done,_=cf.wait(active,timeout=1,return_when=cf.FIRST_COMPLETED)
  for f in done:
   u=active.pop(f)
   try:result=f.result()
   except Exception:result=None
   total+=bool(result)
  if total and total%50==0:print('media downloaded',total,'active',len(active),flush=True)
 else:time.sleep(3)
pool.shutdown(wait=True)
print('DONE',total,flush=True)
