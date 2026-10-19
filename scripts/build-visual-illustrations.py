"""Create original, offline SVG topic illustrations for every Visual Lab card.

These are conceptual editorial previews, not generated answers or technical plans.
Only local paths, shapes and text; no scripts, external fonts or linked resources.
"""
from pathlib import Path
import json
from html import escape

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/visual-lab/illustrations'
OUT.mkdir(exist_ok=True)
data=json.loads((ROOT/'docs/collection.json').read_text(encoding='utf-8'))['visual']

def path(d,fill='none',extra=''):
 return f'<path d="{d}" fill="{fill}" {extra}/>'
def rect(x,y,w,h,fill='white',radius=8,extra=''):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" {extra}/>'
def circle(x,y,r,fill='white',extra=''):
 return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" {extra}/>'
def line(x,y,a,b,extra=''):
 return f'<path d="M{x} {y}L{a} {b}" fill="none" {extra}/>'
def text(x,y,t,size=18,fill='var(--ink)',extra=''):
 return f'<text x="{x}" y="{y}" fill="{fill}" stroke="none" font-size="{size}" font-family="Arial, sans-serif" {extra}>{escape(str(t))}</text>'
def group(svg,transform=''):
 return f'<g transform="{transform}">{svg}</g>'
def paper():
 return rect(70,20,185,185,'white',12)+''.join(line(93,y,230,y,extra='stroke="var(--soft)"') for y in [60,85,110,135,160])
def bars():
 return line(45,190,290,190)+line(45,190,45,35)+''.join(rect(x,190-h,32,h,c,4) for x,h,c in [(70,60,'var(--soft)'),(125,95,'var(--accent)'),(180,125,'var(--soft)'),(235,155,'var(--accent)')])
def motor():
 return rect(78,65,150,104,'var(--soft)',26)+circle(226,117,49,'white')+circle(226,117,23,'var(--pale)')+rect(244,108,52,18,'var(--accent)',4)+rect(72,171,180,12,'var(--ink)',3)+''.join(line(x,77,x,155) for x in range(99,200,17))+rect(123,35,67,29,'var(--accent)',6)
def transformer():
 return rect(65,35,205,155,'var(--soft)',12)+rect(98,69,138,89,'white',4)+''.join(path(f'M{x} 62v102q6 16 12 0V62', 'var(--accent)') for x in [77,90,103,218,231,244])+line(162,35,162,69)+line(162,158,162,190)
def pcb():
 return rect(45,30,245,170,'var(--soft)',12)+rect(127,80,80,66,'var(--ink)',5)+''.join(rect(x,63,7,16,'var(--accent)',1)+rect(x,146,7,16,'var(--accent)',1) for x in range(135,198,15))+''.join(path(d,extra='stroke="var(--accent)"') for d in ['M60 65h35v45h32','M60 155h30v-25h37','M207 112h42V57h20','M205 138h50v40h18'])+circle(67,46,6,'white')+circle(269,183,6,'white')
def cabinet():
 return rect(73,12,187,207,'white',10)+rect(90,31,153,33,'var(--pale)',4)+''.join(rect(x,y,27,31,'var(--soft)',3)+line(x+6,y+10,x+20,y+10) for y in [84,130] for x in [93,132,171])+rect(223,90,9,43,'var(--accent)',3)+line(92,188,223,188)
def relay():
 return rect(77,47,175,140,'var(--pale)',14)+rect(103,78,122,82,'var(--soft)',8)+''.join(path(f'M{x} 89v58q6 10 12 0V89', 'var(--accent)') for x in [113,128,143,158])+''.join(line(x,189,x,207) for x in [105,140,185,220])+rect(97,31,136,15,'var(--ink)',4)
def cable():
 colors=['var(--accent)','var(--soft)','white','var(--pale)']
 return circle(165,117,88,'var(--ink)')+circle(165,117,71,'var(--soft)')+''.join(circle(x,y,24,colors[i])+circle(x,y,10,'var(--warm)') for i,(x,y) in enumerate([(135,85),(194,91),(133,146),(194,149)]))
def capacitor():
 return rect(103,44,130,134,'var(--soft)',16)+f'<ellipse cx="168" cy="44" rx="65" ry="20" fill="var(--pale)"/>'+line(143,178,143,215)+line(191,178,191,215)+line(131,45,205,45)+line(168,29,168,59)+path('M111 70v81q0 15 15 16',extra='stroke="white" stroke-width="7"')
def drill():
 return path('M56 73h161l25 20h53v27h-53l-26 20h-42l-19 70h-65l20-70H56Z','var(--soft)')+rect(57,80,64,50,'var(--accent)',5)+line(297,106,324,106)+rect(110,147,34,26,'var(--ink)',4)
def supply():
 return rect(48,57,245,129,'white',12)+rect(67,75,115,49,'var(--ink)',6)+path('M79 109h17l9-20 18 22 10-8h35',extra='stroke="var(--accent)" stroke-width="4"')+circle(239,104,24,'var(--soft)')+circle(208,157,9,'var(--accent)')+circle(258,157,9,'var(--ink)')+line(68,148,167,148)+line(68,161,135,161)
def solar():
 return path('M68 48h185l-19 115H48Z','var(--soft)')+''.join(line(65,y,244,y) for y in [76,104,132])+line(111,48,93,162)+line(159,48,141,162)+line(205,48,187,162)+path('M133 164v31M104 198h59')+circle(282,47,26,'var(--warm)')+''.join(line(x,y,a,b,extra='stroke="var(--accent)"') for x,y,a,b in [(282,9,282,0),(321,47,332,47),(309,20,316,13),(251,18,245,10)])
def bulb():
 return path('M123 151c0-31-39-37-39-79a66 66 0 0 1 132 0c0 42-40 48-40 79Z','var(--soft)')+rect(121,156,57,17,'var(--accent)',5)+rect(128,179,43,14,'var(--ink)',4)+path('M149 151V89m-20-16 20 16 20-16')+''.join(line(x,y,a,b,extra='stroke="var(--accent)"') for x,y,a,b in [(150,0,150,15),(47,63,64,69),(245,61,230,68),(67,8,82,24),(229,11,217,26)])
def waves(digital=False):
 d='M38 143h36V75h43v68h42V75h42v68h42V75h47' if digital else 'M36 110c25-95 50-95 75 0s50 95 75 0 50-95 75 0 30 35 48 0'
 return rect(16,25,305,176,'white',13)+''.join(line(35,y,300,y,extra='stroke="var(--pale)"') for y in [55,85,115,145,175])+''.join(line(x,43,x,185,extra='stroke="var(--pale)"') for x in [62,107,152,197,242,287])+path(d,extra='stroke="var(--accent)" stroke-width="5"')
def microphone():
 return rect(129,24,77,111,'var(--soft)',38)+path('M104 91v24a63 63 0 0 0 126 0V91M167 181v29M125 211h86')+''.join(line(145,y,190,y) for y in [53,72,91])
def logic():
 return path('M42 45h42a47 47 0 0 1 0 94H42Z','var(--soft)')+line(17,68,42,68)+line(17,116,42,116)+line(131,92,166,92)+path('M188 135q40 25 91 0-15 65-91 65 22-33 0-65Z','var(--pale)')+line(164,151,197,151)+line(164,186,197,186)+line(270,169,307,169)
def thermometer():
 return path('M141 135V38a24 24 0 0 1 48 0v97a45 45 0 1 1-48 0Z','white')+circle(165,171,26,'var(--accent)')+rect(157,57,16,110,'var(--accent)',8)+''.join(line(200,y,223,y) for y in [50,78,106,134])
def router():
 return rect(60,122,230,75,'var(--soft)',16)+line(90,122,69,52)+line(260,122,281,52)+''.join(circle(x,162,4,'var(--accent)') for x in [90,111,132])+''.join(path(f'M{168-r} {92-r/2}q{r} {-r} {r*2} 0',extra='stroke="var(--accent)"') for r in [22,44,66])
def traffic():
 return rect(119,10,90,176,'var(--ink)',18)+circle(164,46,22,'#f2a094')+circle(164,98,22,'var(--warm)')+circle(164,150,22,'var(--accent)')+rect(154,187,20,35,'var(--soft)',2)
def conveyor():
 return rect(30,131,278,46,'var(--ink)',23)+''.join(circle(x,154,14,'var(--soft)') for x in range(57,290,39))+line(63,178,45,218)+line(266,178,284,218)+rect(66,69,66,60,'var(--soft)',5)+rect(176,87,55,42,'var(--accent)',5)+path('M72 63h53M181 81h45',extra='stroke="var(--accent)"')
def tank():
 return rect(102,42,142,160,'white',18)+path('M105 133q35-15 68 0t68 0v52q0 15-17 15H122q-17 0-17-15Z','var(--soft)')+path('M134 40V15h145v69')+rect(260,84,36,25,'var(--accent)',6)+line(165,202,165,221)+line(211,202,211,221)
def graph():
 return ''.join(rect(x,y,70,39,'var(--soft)',6) for x,y in [(130,15),(25,100),(235,100),(130,187)])+path('M165 54v19H60v27M165 73h105v27M60 139v24h105v24M270 139v24H165')+circle(165,73,5,'var(--accent)')
def door():
 return rect(64,22,208,197,'var(--soft)',7)+rect(79,38,82,179,'white',3)+rect(174,38,82,179,'white',3)+line(151,100,151,137)+line(185,100,185,137)+path('M11 111h39m-12-12 12 12-12 12M324 111h-39m12-12-12 12 12 12',extra='stroke="var(--accent)"')
def plant():
 return path('M168 191V68M168 130q-90 3-90-60 84-6 90 60Z','var(--soft)')+path('M168 92q7-79 81-69 6 69-81 69Z','var(--accent)')+path('M168 175q-63-2-64-45 58-4 64 45Z','var(--pale)')+path('M112 191h112l-15 46h-80Z','var(--warm)')
def soil():
 return rect(44,39,249,162,'white',10)+path('M46 61q41-26 82-4t81 0 82-1v34H46Z','var(--accent)')+rect(46,91,245,43,'var(--warm)',0)+rect(46,134,245,64,'var(--soft)',0)+''.join(circle(x,y,3,'var(--ink)') for x,y in [(75,158),(116,176),(160,155),(210,175),(263,150)])+path('M156 68v53m0-24-19 16m19-29 20 19',extra='stroke="white"')
def field():
 return path('M26 139 166 65l143 74-143 81Z','var(--soft)')+''.join(line(47+i*34,150+i*0,173+i*25,87+i*13,extra='stroke="var(--accent)" stroke-width="8"') for i in range(4))+circle(262,43,23,'var(--warm)')+path('M48 113q42-57 87-55',extra='stroke="var(--accent)" stroke-width="4"')
def beaker():
 return path('M102 27h120M112 29v145q0 25 25 25h58q25 0 25-25V29','white')+path('M115 123q25-15 51 0t51 0v50q0 24-23 24h-56q-23 0-23-24Z','var(--soft)')+''.join(line(118,y,140,y) for y in [62,85,108])+circle(162,159,7,'var(--pale)')+circle(191,139,5,'var(--pale)')
def flask():
 return path('M143 24h49v79l66 95q7 14-14 14H93q-18 0-10-14l60-95Z','white')+path('M113 153h111l31 46q5 9-12 9H97q-15 0-10-9Z','var(--soft)')+line(138,24,197,24)+line(147,65,189,65)+circle(168,167,7,'var(--pale)')
def safety():
 return path('M166 18 260 52v60q0 75-94 108-94-33-94-108V52Z','var(--soft)')+path('M119 110 151 143 214 77',extra='stroke="var(--accent)" stroke-width="12"')
def glasses():
 return rect(24,90,122,83,'var(--pale)',30)+rect(190,90,122,83,'var(--pale)',30)+path('M146 119q22-24 44 0M24 106 7 63M312 106l17-43',extra='stroke-width="8"')+path('M45 105h45M210 105h45',extra='stroke="white" stroke-width="6"')
def lens():
 return path('M168 18q-77 96 0 197 77-101 0-197Z','var(--soft)')+line(15,117,320,117,extra='stroke="var(--ink)" stroke-dasharray="7 7"')+path('M22 66h146l136 102M22 168h146L304 66',extra='stroke="var(--accent)" stroke-width="3"')+circle(236,117,4,'var(--accent)')
def human():
 return circle(168,43,29,'var(--soft)')+path('M128 86q40-17 80 0l37 70-26 14-22-43v92h-25v-53h-12v53h-25v-92l-22 43-26-14Z','var(--soft)')+path('M155 107q-21-27-29-4-7 22 30 46 36-23 31-43-8-24-32 1Z','var(--accent)')
def skin():
 return path('M42 82q42-35 85-6t85-4 87 0v131H42Z','var(--soft)')+path('M42 82q42-35 85-6t85-4 87 0v31q-43-30-87 0t-85-4-85 7Z','var(--warm)')+''.join(path(f'M{x} 115v60q8 15 15 0v-25',extra='stroke="var(--accent)"') for x in [79,138,204,261])+path('M166 173V32q0-23 22-13',extra='stroke="var(--ink)"')
def dialog():
 return rect(25,24,190,82,'white',16)+path('M67 106v22l30-22','white')+rect(134,120,179,74,'var(--soft)',16)+path('M272 194v21l-29-21','var(--soft)')+''.join(line(48,y,189,y) for y in [51,76])+''.join(circle(x,157,7,'var(--accent)') for x in [177,224,271])
def document():
 return paper()+rect(91,43,23,22,'var(--soft)',3)+path('M96 54 102 60 112 46',extra='stroke="var(--accent)"')+circle(249,173,34,'var(--pale)')+path('M232 171 245 184 269 158',extra='stroke="var(--accent)" stroke-width="5"')
def salon():
 return rect(83,22,170,104,'var(--pale)',17)+rect(104,45,128,59,'white',10)+rect(104,145,127,49,'var(--soft)',12)+line(168,195,168,222)+line(124,223,210,223)+line(97,168,76,168)+line(238,168,260,168)+path('M279 40q30 15 0 44m0-22h25',extra='stroke="var(--accent)"')
def hair():
 return path('M168 16q-100 5-93 163l28 30q-5-95 25-126 22 84 91 96l24 29q28-192-75-192Z','var(--soft)')+path('M142 29q-52 59-43 154M174 30q-13 66 59 153M192 40q32 45 40 102',extra='stroke="var(--accent)" stroke-width="5"')
def palette():
 return path('M159 23c-121 0-144 142-35 174 55 19 39-43 79-34 125 26 132-140-44-140Z','white')+''.join(circle(x,y,18,c) for x,y,c in [(100,74,'var(--accent)'),(153,53,'var(--warm)'),(213,78,'var(--soft)'),(248,124,'var(--pale)')])+circle(120,146,18,'var(--pale)')
def gear():
 return path('M144 20h45l9 26 24 13 27-5 23 40-18 20v27l18 21-23 39-27-5-24 14-9 25h-45l-9-25-24-14-27 5-23-39 18-21v-27L61 94l23-40 27 5 24-13Z','var(--soft)')+circle(166,126,52,'white')+circle(166,126,24,'var(--accent)')
def caliper():
 return rect(42,95,261,22,'var(--soft)',2)+path('M57 95V38h24v46h88V38h24v79H81v70H57v-70','white')+rect(137,84,82,46,'var(--accent)',6)+''.join(line(x,99,x,110) for x in range(230,294,12))
def truck():
 return rect(30,64,180,103,'var(--soft)',7)+path('M211 96h48l46 42v29h-94Z','var(--accent)')+path('M224 108h31l28 26h-59Z','var(--pale)')+circle(85,172,27,'var(--ink)')+circle(85,172,12,'white')+circle(253,172,27,'var(--ink)')+circle(253,172,12,'white')
def warehouse():
 return path('M27 84 169 22 310 84v126H27Z','var(--pale)')+rect(57,96,222,115,'white',3)+line(165,97,165,211)+line(57,152,279,152)+''.join(rect(x,y,58,38,'var(--soft)',3)+line(x+28,y,x+28,y+12) for x,y in [(72,107),(192,107),(72,164),(192,164)])
def route():
 return path('M49 166q-30-125 83-76t112-42q56-18 50 50-3 62-82 56t-71 49',extra='stroke="var(--accent)" stroke-width="6" stroke-dasharray="10 8"')+''.join(circle(x,y,21,'white')+circle(x,y,6,'var(--warm)') for x,y in [(48,166),(132,89),(251,49),(144,203)])
def bed():
 return rect(37,92,260,99,'var(--soft)',12)+rect(49,58,235,68,'white',12)+rect(61,70,91,42,'var(--pale)',10)+rect(174,70,91,42,'var(--pale)',10)+path('M38 151h258M53 191v26M280 191v26')
def service():
 return path('M46 161a122 122 0 0 1 244 0Z','var(--soft)')+circle(168,31,13,'var(--accent)')+line(31,168,306,168)+rect(47,181,243,16,'white',6)+path('M92 130q16-44 52-52',extra='stroke="white" stroke-width="6"')
def cell():
 return f'<ellipse cx="168" cy="117" rx="143" ry="91" fill="var(--soft)"/>'+f'<ellipse cx="168" cy="117" rx="124" ry="76" fill="var(--pale)" stroke-dasharray="5 5"/>'+circle(174,114,37,'var(--accent)')+circle(180,109,13,'var(--pale)')+''.join(path(d,'var(--warm)') for d in ['M62 99q-14-27 12-31t17 30q-10 19-29 1Z','M237 146q-27-10-16-27t35 8q11 23-19 19Z'])+path('M104 143q15-13 28 1m-36 12q17-13 34 1')
def language():
 return rect(27,39,130,142,'white',8)+rect(177,39,130,142,'var(--pale)',8)+text(62,104,'Аа',35)+text(212,104,'Бб',35)+''.join(line(x,y,x+92,y,extra='stroke="var(--accent)"') for x in [45,195] for y in [130,149])+path('M157 112h20m-7-7 7 7-7 7')
def timeline():
 return line(26,122,310,122)+''.join(circle(x,122,10,'var(--accent)')+line(x,112,x,70)+rect(x-29,28,58,40,'var(--soft)',6) for x in [55,165,275])+line(111,133,111,182)+rect(82,184,59,35,'var(--warm)',6)
def globe():
 return circle(168,114,91,'var(--pale)')+f'<ellipse cx="168" cy="114" rx="42" ry="91" fill="none"/>'+f'<ellipse cx="168" cy="114" rx="91" ry="37" fill="none"/>'+line(77,114,259,114)+line(168,23,168,205)+circle(204,69,14,'var(--accent)')+line(213,80,266,33)+circle(274,26,9,'var(--warm)')

MOTIFS={name:fn for name,fn in list(globals().items()) if callable(fn) and name in ['motor','transformer','pcb','cabinet','relay','cable','capacitor','drill','supply','solar','bulb','microphone','logic','thermometer','router','traffic','conveyor','tank','graph','door','plant','soil','field','beaker','flask','safety','glasses','lens','human','skin','dialog','document','salon','hair','palette','gear','caliper','truck','warehouse','route','bed','service','cell','language','timeline','globe','bars']}
MOTIFS.update(waves=lambda:waves(),digital=lambda:waves(True))
technical=['motor','relay','motor','transformer','cabinet','drill','relay','cable','capacitor','supply','bulb','pcb','solar','relay','transformer','motor','cabinet','bulb','cabinet','supply','pcb','pcb','microphone','logic','digital','waves','thermometer','pcb','router','pcb','door','traffic','conveyor','tank','motor','graph','bulb','motor','cabinet','safety','solar','pcb','waves','timeline','pcb','transformer','logic','cabinet','motor','solar']
extra={
 'agriculture':['plant','soil','plant','plant','field','document'],
 'laboratory':['beaker','flask','safety','document','safety','cell'],
 'optics':['glasses','lens','lens','document','glasses','lens'],
 'medical':['human','skin','dialog','document','safety','human'],
 'services':['salon','hair','dialog','document','palette','safety'],
 'mechanical':['gear','gear','gear','document','caliper','gear'],
 'economy':['bars','document','waves','graph','bars','dialog'],
 'transport':['route','warehouse','truck','document','timeline','traffic'],
 'hospitality':['service','bed','dialog','service','route','document'],
 'general':['waves','cell','language','timeline','globe','waves']}
colors={
 'technical':('#24578b','#d5e9f8','#eaf4fc','#ecaf68'),
 'agriculture':('#2d7567','#c8e6d5','#edf7f0','#e4bd83'),
 'laboratory':('#317a8a','#c8e6ec','#eaf6f8','#e9b979'),
 'optics':('#5b67a0','#dde1f6','#f0f1fc','#f0bb85'),
 'medical':('#a45b63','#f3d2d3','#fdf0f0','#e9b67e'),
 'services':('#9d6784','#ecd6e4','#fbf0f7','#efbb8a'),
 'mechanical':('#446c88','#d5e2eb','#edf3f7','#dcac72'),
 'economy':('#716098','#e1d9ef','#f3eff9','#e5b96f'),
 'transport':('#39728e','#cde6ec','#ecf7fa','#ecb474'),
 'hospitality':('#ab7947','#efddc4','#fcf5e9','#85bcb3'),
 'general':('#4269a6','#d7e5f5','#eff5fc','#e9b785')}
for p in data:
 ident=p['id'];area=p['area'];accent,soft,pale,warm=colors[area]
 motif=technical[ident-1] if ident<=50 else extra[area][(ident-51)%6]
 kind=p['kind'];drawing=MOTIFS[motif]()
 # Different visual framing expresses the six formats without inventing subject facts.
 framing=''
 if kind=='cutaway':framing=path('M319 78v204',extra='stroke="var(--accent)" stroke-dasharray="6 6"')+line(304,80,334,80)+line(304,281,334,281)
 elif kind=='comparison':framing=rect(35,65,47,225,'white',10)+rect(558,65,47,225,'white',10)+''.join(line(47,y,69,y,extra='stroke="var(--accent)"')+line(572,y,591,y,extra='stroke="var(--accent)"') for y in [105,142,179,216,253])
 elif kind=='process':framing=path('M62 175H119m-12-12 12 12-12 12M522 175h57m-12-12 12 12-12 12',extra='stroke="var(--accent)" stroke-width="3"')
 elif kind=='infographic':framing=''.join(circle(x,y,7,'var(--accent)',extra='stroke="none"')+line(x+15,y,x+50,y,extra='stroke="var(--soft)"') for x,y in [(45,86),(505,92),(45,266),(505,270)])
 elif kind=='quiz':framing=circle(564,68,27,'white')+text(555,78,'?',29,'var(--accent)')+''.join(circle(x,302,8,c,'stroke="none"') for x,c in [(281,'var(--accent)'),(306,'var(--soft)'),(331,'var(--warm)'),(356,'var(--soft)')])
 # A cutaway motif gets a split line as an editorial cue, not a construction section.
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="title desc">
<title id="title">{escape(p['title'])}</title><desc id="desc">Авторска концептуална илустрација: {escape(p['object'])}. Илустративен преглед на темата.</desc>
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="{pale}"/><stop offset="1" stop-color="{soft}"/></linearGradient><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="{accent}" stroke-opacity=".055"/></pattern></defs>
<g style="--ink:#203c50;--accent:{accent};--soft:{soft};--pale:{pale};--warm:{warm}">
<rect width="640" height="360" fill="{pale}"/>
<path d="{''.join(f'M{x} 0v360' for x in range(24,640,24))+''.join(f'M0 {y}h640' for y in range(24,360,24))}" stroke="{accent}" stroke-opacity=".045" fill="none"/>
<circle cx="322" cy="181" r="142" fill="white" opacity=".58"/><ellipse cx="326" cy="307" rx="153" ry="13" fill="{accent}" opacity=".08"/>
<g stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">{framing}{group(drawing,'translate(153 52)')}</g>
<path d="M28 31h26M28 31v26M612 329h-26M612 329v-26" fill="none" stroke="{accent}" stroke-opacity=".35" stroke-width="2"/>
{text(572,34,f'{ident:03d}',13,accent)}
</g></svg>'''
 for token,value in [('ink','#203c50'),('accent',accent),('soft',soft),('pale',pale),('warm',warm)]:svg=svg.replace(f'var(--{token})',value)
 (OUT/f'{ident:03d}.svg').write_bytes(svg.encode('utf-8'))
assert len(list(OUT.glob('*.svg')))==110
print('Created 110 local conceptual topic illustrations.')
