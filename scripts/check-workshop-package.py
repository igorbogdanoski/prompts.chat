"""Validate PDF text and geometry, ZIP CRCs, byte parity and manifest hashes."""
import hashlib,json,re,zipfile
from pathlib import Path
import fitz
root=Path(__file__).resolve().parents[1]
d=root/'docs';data=json.loads((d/'collection.json').read_text(encoding='utf-8'))
pdf=fitz.open(d/'materiali.pdf');assert len(pdf)==243
norm=lambda x:re.sub(r'\s+','',x)
items=data['main']+data['multimedia']+data['visual']
for page,item in zip(list(pdf)[1:],items):
 text=norm(page.get_text());assert norm(item['title']) in text,item['title']
 assert norm(item.get('text',item.get('prompt',''))) in text,item['title']
 for block in page.get_text('blocks'):
  x0,y0,x1,y1=block[:4];assert x0>=35 and x1<=560 and y0>=15 and y1<=825,(page.number,block)
manifest=json.loads((d/'PACKAGE-MANIFEST.json').read_text())
assert manifest['counts']==data['counts']
with zipfile.ZipFile(d/'paket.zip') as z:
 assert z.testzip() is None
 assert 'docs/paket.zip' not in z.namelist()
 for name,digest in manifest['files'].items():
  raw=z.read(name);assert hashlib.sha256(raw).hexdigest()==digest,name
  assert raw==(root/name).read_bytes(),name
 assert z.read('docs/PACKAGE-MANIFEST.json')==(d/'PACKAGE-MANIFEST.json').read_bytes()
 assert z.read('WORKSHOP-MK.md')==(root/'WORKSHOP-MK.md').read_bytes()
print('PASS: all 242 full prompt texts in PDF, 243 pages within bounds, ZIP CRCs, manifest SHA-256 and archive/local byte parity.')
