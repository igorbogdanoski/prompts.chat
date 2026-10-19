"""Run export-workshop.cjs first. Requires reportlab; embeds a Cyrillic TTF font."""
import argparse, hashlib, json, os, subprocess, zipfile
from pathlib import Path
from html import escape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor

root=Path(__file__).resolve().parents[1]
os.chdir(root)
Path('docs/VODIC-ZA-OBUKA.md').write_text(Path('WORKSHOP-MK.md').read_text(encoding='utf-8').replace('(docs/','('),encoding='utf-8',newline='\n')
parser=argparse.ArgumentParser(); parser.add_argument('--font',default='C:/Windows/Fonts/arial.ttf'); args=parser.parse_args()
subprocess.run(['node','scripts/export-workshop.cjs','docs/collection.json'],check=True)
data=json.loads(Path('docs/collection.json').read_text(encoding='utf-8'))
pdfmetrics.registerFont(TTFont('MK',args.font))
styles=getSampleStyleSheet()
for name in ['Normal','Title','Heading1','Heading2']:
 styles[name].fontName='MK';styles[name].textColor=HexColor('#163847')
styles['Normal'].fontSize=10;styles['Normal'].leading=15
styles['Title'].fontSize=25;styles['Title'].leading=33
styles['Heading2'].fontSize=16;styles['Heading2'].leading=22
story=[]
def p(text,style='Normal'):
 return Paragraph(escape(text).replace('\n','<br/>'),styles[style])
story+=[p('Промптови за наставници','Title'),Spacer(1,18),p('Целосна македонска колекција · 19.10.2026','Heading2'),p('102 главни + 90 мултимедијални + 50 Visual Lab = 242 промптови.'),Spacer(1,18),p('Избери цел од својата програма, приложи проверен извор, приспособи, провери и употреби. Ова се наставни предлози, а не официјални програми или проверени AI-одговори. Очна оптика е работна претпоставка за профилот; наставникот ја потврдува точната квалификација.'),Spacer(1,12),p('Безбедност: без измислени концентрации, дијагнози или практични постапки. Лабораториска работа само по одобрен наставнички протокол, актуелен SDS, процена на ризик и надзор. Ако извор недостига, практичната постапка не се изработува.'),Spacer(1,12),p('Рамка за проверка: ACS, Safety & Sustainability / RAMP. Препознај опасности, процени и намали ризик, подготви се за итни ситуации. Оваа рамка не заменува конкретен училишен протокол.'),p('https://www.acs.org/education/policies/middle-and-high-school-chemistry/safety.html'),Spacer(1,12),p('Офлајн: распакувај paket.zip, отвори docs/index.html и зачувај ја целата папка. Главна библиотека: docs/index.html; мултимедија: docs/obuki/index.html; Visual Lab: docs/visual-lab/index.html; портал: docs/resursi/index.html. Надворешните AI-услуги бараат интернет.'),Spacer(1,12),p('Авторски македонски дополнувања: MIT, docs/LICENSE. Изворен проект: f/prompts.chat. Овој пакет е посебен од идната PowerPoint презентација.'),PageBreak()]
for label,key in [('Главна библиотека','main'),('Мултимедијална библиотека','multimedia'),('AI Visual Lab','visual')]:
 for i,item in enumerate(data[key],1):
  story += [p(f'{label} · {i}/{len(data[key])}','Heading2'),p(item['title'],'Title'),Spacer(1,14)]
  for field in ['category','target','outcome','application']:
   if item.get(field):story += [p(item[field]),Spacer(1,8)]
  story += [p(item.get('text',item.get('prompt',''))),Spacer(1,12)]
  for field in ['checks','task']:
   if item.get(field):story += [p('Наставничка проверка / задача: '+item[field]),Spacer(1,8)]
  story += [PageBreak()]
def footer(canvas,doc):
 canvas.setFont('MK',8);canvas.setFillColor(HexColor('#50616a'));canvas.drawString(42,25,'Наставничка библиотека · MK · 242 промптови');canvas.drawRightString(553,25,str(doc.page))
SimpleDocTemplate('docs/materiali.pdf',pagesize=(595,842),leftMargin=42,rightMargin=42,topMargin=42,bottomMargin=42,title='Промптови за наставници - 242',author='Игор Богданоски').build(story,onFirstPage=footer,onLaterPages=footer)
files=sorted(p for p in Path('docs').rglob('*') if p.is_file() and p.name not in ['paket.zip','AGENTS.md','PACKAGE-MANIFEST.json'])
manifest={'date':'2026-10-19','counts':data['counts'],'files':{str(p).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}}
Path('docs/PACKAGE-MANIFEST.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8',newline='\n')
with zipfile.ZipFile('docs/paket.zip','w',zipfile.ZIP_DEFLATED) as z:
 for pth in files+[Path('docs/PACKAGE-MANIFEST.json'),Path('WORKSHOP-MK.md'),Path('CONTRIBUTING-MK.md'),Path('.github/ISSUE_TEMPLATE/nov-prompt-mk.yml')]:z.write(pth,str(pth).replace('\\','/'))
 z.writestr('POCNI-TUKA.txt','Распакувај ја целата архива. Отвори docs/index.html. 102 + 90 + 50 = 242 промптови. Надворешни AI-услуги бараат интернет. Види WORKSHOP-MK.md и docs/PACKAGE-MANIFEST.json.')
print('Built docs/materiali.pdf and docs/paket.zip; counts:',data['counts'])
