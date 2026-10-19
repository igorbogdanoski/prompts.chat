"""Check the offline image set, semantic labels and inert SVG content."""
from pathlib import Path
import json,hashlib,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]/'docs'
items=json.loads((root/'collection.json').read_text(encoding='utf-8'))['visual']
files=list((root/'visual-lab/illustrations').glob('*.svg'))
assert len(files)==len(items)==110
digests=set()
for p in items:
 file=root/'visual-lab/illustrations'/f"{p['id']:03}.svg"
 raw=file.read_bytes();digests.add(hashlib.sha256(raw).hexdigest());svg=ET.fromstring(raw)
 assert svg.attrib['viewBox']=='0 0 640 360'
 title=svg.find('{http://www.w3.org/2000/svg}title');assert title is not None and title.text==p['title']
 assert len(list(svg.iter()))>=15
 for node in svg.iter():
  assert node.tag.rsplit('}',1)[-1] not in ['script','foreignObject','image']
  for key,value in node.attrib.items():
   assert not key.lower().startswith('on')
   if key.rsplit('}',1)[-1]=='href':assert value.startswith('#')
 assert b'@import' not in raw and b'http:' not in raw.replace(b'http://www.w3.org/2000/svg',b'')
 assert b'https:' not in raw
assert len(digests)==110
print('PASS: 110 local SVGs, matching titles, valid XML, dimensions, unique assets and no executable/external image content.')
