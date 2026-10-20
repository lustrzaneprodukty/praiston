#!/usr/bin/env python3
"""Package local, optimized WebP assets into small Git-friendly archives."""
from pathlib import Path
import json,gzip,base64,hashlib
root=Path(__file__).resolve().parents[1]
out=root/'assets';out.mkdir(exist_ok=True)
for old in out.glob('catalog-media-*.json.gz'):old.unlink()
files=[];size=0;part=0;manifest=[]
def flush():
 global files,size,part
 if not files:return
 name=f'catalog-media-{part:03d}.json.gz'
 payload=gzip.compress(json.dumps(files,separators=(',',':')).encode(),compresslevel=6,mtime=0)
 (out/name).write_bytes(payload);manifest.append({'file':name,'files':len(files),'bytes':len(payload),'sha256':hashlib.sha256(payload).hexdigest()})
 part+=1;files=[];size=0
for p in sorted((root/'public'/'media').glob('*.webp')):
 b=p.read_bytes();files.append({'path':'media/'+p.name,'sha256':hashlib.sha256(b).hexdigest(),'base64':base64.b64encode(b).decode()});size+=len(b)
 if size>8*1024*1024:flush()
flush();(out/'manifest.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(manifest))
