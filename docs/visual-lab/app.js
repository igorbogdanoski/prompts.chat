/* AI Visual Lab: 50 original Macedonian technical education prompts. MIT; docs/LICENSE. */
/* Commands are conventions, not built-in ChatGPT slash commands. */
(function () {
"use strict";
const PROMPTS=[
 {
  "id": 1,
  "category": "Конструкција",
  "command": "/blueprint",
  "title": "Технички нацрт",
  "object": "Електромотор",
  "visual": "Технички нацрт со главни проекции, пропорции и конструктивни ознаки, без измислени димензии.",
  "application": "Читање и толкување технички цртежи."
 },
 {
  "id": 2,
  "category": "Конструкција",
  "command": "/explodedview",
  "title": "Експлодиран приказ",
  "object": "Контактор",
  "visual": "Просторно раздвоен приказ на составните делови со логичен редослед на склопување.",
  "application": "Препознавање делови и нивната функција."
 },
 {
  "id": 3,
  "category": "Конструкција",
  "command": "/cutaway",
  "title": "Делумно отворена конструкција",
  "object": "Електричен генератор",
  "visual": "Тридимензионален приказ со делумно отстрането куќиште и видливи внатрешни компоненти.",
  "application": "Поврзување на надворешниот изглед со внатрешната градба."
 },
 {
  "id": 4,
  "category": "Конструкција",
  "command": "/crosssection",
  "title": "Конструктивен пресек",
  "object": "Трансформатор",
  "visual": "Пресек со јадро, намотки и изолација, само ако нивната поставеност е потврдена од изворот.",
  "application": "Проучување на градбата на трансформаторот."
 },
 {
  "id": 5,
  "category": "Конструкција",
  "command": "/isometric",
  "title": "Изометриски приказ",
  "object": "PLC-ормар",
  "visual": "Изометриска техничка илустрација со просторен распоред на препознатливите компоненти.",
  "application": "Развивање просторна претстава."
 },
 {
  "id": 6,
  "category": "Конструкција",
  "command": "/multiview",
  "title": "Повеќе ортогонални погледи",
  "object": "Електрична дупчалка",
  "visual": "Преден, заден, страничен и горен поглед во единствена техничка табла.",
  "application": "Споредување различни проекции."
 },
 {
  "id": 7,
  "category": "Конструкција",
  "command": "/transparentview",
  "title": "Проѕирно куќиште",
  "object": "Електромагнетно реле",
  "visual": "Полупроѕирно куќиште што ги истакнува потврдените внатрешни елементи.",
  "application": "Објаснување на механизам."
 },
 {
  "id": 8,
  "category": "Конструкција",
  "command": "/layers",
  "title": "Приказ на материјални слоеви",
  "object": "Повеќежилен кабел",
  "visual": "Приказ на проводници, изолација и заштитни обвивки со раздвоени слоеви.",
  "application": "Разликување материјали и улоги."
 },
 {
  "id": 9,
  "category": "Конструкција",
  "command": "/macrodetail",
  "title": "Макродетал",
  "object": "Кондензатор",
  "visual": "Зголемен приказ на ситни видливи елементи, со читливи насочувачки ознаки.",
  "application": "Набљудување конструктивни детали."
 },
 {
  "id": 10,
  "category": "Конструкција",
  "command": "/annotated",
  "title": "Означена фотографија",
  "object": "Лабораториски извор на напојување",
  "visual": "Задржи ја фотографијата и додади ознаки само на сигурно препознатливи приклучоци и контроли.",
  "application": "Идентификување на приклучоци и функции."
 },
 {
  "id": 11,
  "category": "Електротехника",
  "command": "/wiringdiagram",
  "title": "Шема на поврзување",
  "object": "Реле и нисконапонска светилка",
  "visual": "Концептуална електрична шема со стандардизирани симболи; не претставувај ја како одобрен монтажен план.",
  "application": "Анализа на електрични поврзувања."
 },
 {
  "id": 12,
  "category": "Електротехника",
  "command": "/circuitflow",
  "title": "Насока на струја",
  "object": "Батерија и отпорник",
  "visual": "Разликувај конвенционална насока на струјата од движењето на електроните во идеализирано коло.",
  "application": "Разбирање електрично коло."
 },
 {
  "id": 13,
  "category": "Електротехника",
  "command": "/powerflow",
  "title": "Тек на електрична енергија",
  "object": "Соларен панел и инвертер",
  "visual": "Блок-дијаграм на пренос и преобразување енергија со обележани влез и излез.",
  "application": "Анализа на енергетски систем."
 },
 {
  "id": 14,
  "category": "Електротехника",
  "command": "/fieldlines",
  "title": "Силови линии",
  "object": "Соленоид",
  "visual": "Концептуална илустрација на магнетно поле со насочени силови линии и јасна легенда.",
  "application": "Објаснување електромагнетни појави."
 },
 {
  "id": 15,
  "category": "Електротехника",
  "command": "/transformerflux",
  "title": "Магнетен флукс",
  "object": "Еднофазен трансформатор",
  "visual": "Прикажи концептуален флукс во јадрото и неговата врска со примарната и секундарната намотка.",
  "application": "Разбирање електромагнетна индукција."
 },
 {
  "id": 16,
  "category": "Електротехника",
  "command": "/motoroperation",
  "title": "Работа на електромотор",
  "object": "Асинхронен мотор",
  "visual": "Серија фази за создавање вртежно магнетно поле и неговата интеракција со роторот.",
  "application": "Принцип на работа на асинхронен мотор."
 },
 {
  "id": 17,
  "category": "Електротехника",
  "command": "/protectionmap",
  "title": "Мапа на заштитни уреди",
  "object": "Разводна табла",
  "visual": "Информативна мапа на препознатливите заштитни уреди и нивните улоги.",
  "application": "Разликување електрични заштити."
 },
 {
  "id": 18,
  "category": "Електротехника",
  "command": "/loadpath",
  "title": "Патека до потрошувач",
  "object": "Нисконапонска инсталација",
  "visual": "Блок-дијаграм на патот од изворот преку заштитата до потрошувачот, без монтажни упатства.",
  "application": "Разбирање на распределба на енергија."
 },
 {
  "id": 19,
  "category": "Електротехника",
  "command": "/groundingview",
  "title": "Заштитно заземјување",
  "object": "Метален електричен ормар",
  "visual": "Поедноставен концептуален приказ на заштитниот проводник и неговата безбедносна улога.",
  "application": "Дискусија за заштита од електричен удар."
 },
 {
  "id": 20,
  "category": "Електротехника",
  "command": "/thermalview",
  "title": "Термографски концепт",
  "object": "Електрични клеми",
  "visual": "Симулиран термографски приказ на потенцијални топли точки со јасен натпис дека нема реално мерење.",
  "application": "Анализа на ризик од загревање."
 },
 {
  "id": 21,
  "category": "Електроника",
  "command": "/pcbview",
  "title": "PCB-плочка",
  "object": "Електронска плочка",
  "visual": "Прикажи ги видливите печатени водови и идентификувани компоненти без измислени скриени врски.",
  "application": "Ориентација на електронска плочка."
 },
 {
  "id": 22,
  "category": "Електроника",
  "command": "/componentmap",
  "title": "Мапа на компоненти",
  "object": "Arduino развојна плочка",
  "visual": "Означи чипови, пинови и конектори само според препознатлив модел или даден податочен лист.",
  "application": "Препознавање електронски елементи."
 },
 {
  "id": 23,
  "category": "Електроника",
  "command": "/signalflow",
  "title": "Тек на електронски сигнал",
  "object": "Микрофон и засилувач",
  "visual": "Функционален дијаграм на обработката на сигналот од влезот до излезот.",
  "application": "Следење сигнал низ систем."
 },
 {
  "id": 24,
  "category": "Електроника",
  "command": "/logicgates",
  "title": "Логички порти",
  "object": "AND, OR и NOT",
  "visual": "Стандардни логички симболи и вистинитосни таблици усогласени со зададените функции.",
  "application": "Булова алгебра и дигитална логика."
 },
 {
  "id": 25,
  "category": "Електроника",
  "command": "/timingdiagram",
  "title": "Временски дијаграм",
  "object": "Дигитално коло",
  "visual": "Дијаграм со прецизни логички нивоа, означени временски интервали и преоди.",
  "application": "Анализа на дигитални сигнали."
 },
 {
  "id": 26,
  "category": "Електроника",
  "command": "/waveform",
  "title": "Бранова форма",
  "object": "Осцилоскоп",
  "visual": "Графички прикажи синусен, правоаголен и триаголен сигнал со правилни оски и единици ако се зададени.",
  "application": "Споредување периодични сигнали."
 },
 {
  "id": 27,
  "category": "Електроника",
  "command": "/sensorflow",
  "title": "Сензорски систем",
  "object": "Температурен сензор",
  "visual": "Од мерена физичка величина, преку сензор и обработка, до излезна реакција.",
  "application": "Разбирање мерни системи."
 },
 {
  "id": 28,
  "category": "Електроника",
  "command": "/microcontroller",
  "title": "Микроконтролер",
  "object": "Развојна плочка",
  "visual": "Функционален приказ со влезови, обработка, меморија и излези, без измислен пински распоред.",
  "application": "Вовед во вградени системи."
 },
 {
  "id": 29,
  "category": "Електроника",
  "command": "/communicationpath",
  "title": "Комуникациска патека",
  "object": "Рутер и локална мрежа",
  "visual": "Мрежен дијаграм со јасни уреди, врски и насоки на пренос.",
  "application": "Основи на компјутерски мрежи."
 },
 {
  "id": 30,
  "category": "Електроника",
  "command": "/datasheetvisual",
  "title": "Визуелизиран податочен лист",
  "object": "Транзистор",
  "visual": "Картичка со симбол, изглед, проверен пински распоред и поле за потврдени карактеристики.",
  "application": "Читање datasheet-документација."
 },
 {
  "id": 31,
  "category": "Автоматика",
  "command": "/blockdiagram",
  "title": "Функционален блок-дијаграм",
  "object": "Автоматска врата",
  "visual": "Поврзи ги сензорите, контролерот, актуаторот и повратната информација во шематски систем.",
  "application": "Анализа на функционална архитектура."
 },
 {
  "id": 32,
  "category": "Автоматика",
  "command": "/flowchart",
  "title": "Алгоритамски дијаграм",
  "object": "Семафор",
  "visual": "Дијаграм на тек со почеток, услови, дејства, разгранувања и повторувања.",
  "application": "Развивање алгоритамско мислење."
 },
 {
  "id": 33,
  "category": "Автоматика",
  "command": "/plcsequence",
  "title": "PLC-секвенца",
  "object": "Транспортна лента",
  "visual": "Редослед на сензорски сигнали, логички услови и управувачки дејства во примерен процес.",
  "application": "Подготовка за PLC-програмирање."
 },
 {
  "id": 34,
  "category": "Автоматика",
  "command": "/processflow",
  "title": "Процесен дијаграм",
  "object": "Автоматско полнење резервоар",
  "visual": "Прикажи резервоар, сензори, вентил, насоки на проток и едноставна повратна врска.",
  "application": "Моделирање индустриски процеси."
 },
 {
  "id": 35,
  "category": "Автоматика",
  "command": "/controlloop",
  "title": "Регулациска јамка",
  "object": "Регулација на брзина на мотор",
  "visual": "Зададена вредност, грешка, регулатор, објект и мерна повратна врска со правилни стрелки.",
  "application": "Разбирање затворена регулациска јамка."
 },
 {
  "id": 36,
  "category": "Автоматика",
  "command": "/statemachine",
  "title": "Дијаграм на состојби",
  "object": "Контролер на лифт",
  "visual": "Поедноставени состојби, премини и услови за учебен симулациски модел.",
  "application": "Моделирање дискретни системи."
 },
 {
  "id": 37,
  "category": "Автоматика",
  "command": "/faulttree",
  "title": "Дрво на дефекти",
  "object": "Светилка што не свети",
  "visual": "Дрво на хипотетички причини со логички разгранувања и означени претпоставки.",
  "application": "Систематско дијагностичко размислување."
 },
 {
  "id": 38,
  "category": "Автоматика",
  "command": "/troubleshoot",
  "title": "Дијагностичка логика",
  "object": "Мотор што не стартува",
  "visual": "Безбедна едукативна шема за разликување можни неисправности без работа под напон.",
  "application": "Анализа на дефекти со наставнички надзор."
 },
 {
  "id": 39,
  "category": "Автоматика",
  "command": "/beforeafter",
  "title": "Споредба пред и потоа",
  "object": "Кабли во контролен ормар",
  "visual": "Споредбен приказ на две организациски состојби со означени видливи разлики.",
  "application": "Анализа на квалитет на организација."
 },
 {
  "id": 40,
  "category": "Автоматика",
  "command": "/safetyview",
  "title": "Безбедносна мапа",
  "object": "Електротехничка работилница",
  "visual": "Мапа на ризици и мерки за превенција без оперативни упатства за опасни интервенции.",
  "application": "Препознавање опасности."
 },
 {
  "id": 41,
  "category": "Наставни ресурси",
  "command": "/infographic",
  "title": "Образовен инфографик",
  "object": "Обновливи извори",
  "visual": "Една прегледна страница со компактни проверени факти, икони и поврзани секции.",
  "application": "Резимирање на сложена тема."
 },
 {
  "id": 42,
  "category": "Наставни ресурси",
  "command": "/stepbystep",
  "title": "Чекор-по-чекор илустрација",
  "object": "LED-коло со батерија",
  "visual": "Последователни слики за безопасен нисконапонски училиштен модел според одобрен извор.",
  "application": "Следење практична активност."
 },
 {
  "id": 43,
  "category": "Наставни ресурси",
  "command": "/comparison",
  "title": "Визуелна споредба",
  "object": "AC и DC",
  "visual": "Две симетрични колони со клучни сличности, разлики и соодветни шематски прикази.",
  "application": "Разликување сродни поими."
 },
 {
  "id": 44,
  "category": "Наставни ресурси",
  "command": "/timeline",
  "title": "Временска линија",
  "object": "Развој на електромотор",
  "visual": "Хронологија со исклучиво проверени технолошки пресвртници, датуми и извори.",
  "application": "Историски контекст на технологија."
 },
 {
  "id": 45,
  "category": "Наставни ресурси",
  "command": "/quizimage",
  "title": "Квиз со слика",
  "object": "Електронска плочка",
  "visual": "Неназначена фотографија со нумерирани елементи за препознавање и одделен клуч.",
  "application": "Формативно оценување."
 },
 {
  "id": 46,
  "category": "Наставни ресурси",
  "command": "/labelchallenge",
  "title": "Пополнување ознаки",
  "object": "Трансформатор",
  "visual": "Илустрација со празни линии за именување, без прикажан клуч во ученичката верзија.",
  "application": "Активно присетување во парови."
 },
 {
  "id": 47,
  "category": "Наставни ресурси",
  "command": "/misconception",
  "title": "Честа заблуда",
  "object": "Сериско и паралелно коло",
  "visual": "Два спротивставени шематски примери и прашање што иницира концептуална дискусија.",
  "application": "Препознавање и корекција на заблуди."
 },
 {
  "id": 48,
  "category": "Наставни ресурси",
  "command": "/aroverlay",
  "title": "AR-стил на фотографија",
  "object": "Електричен контролен ормар",
  "visual": "Симулирани дигитални ознаки поставени врз реалната фотографија, без тврдење за вистинска AR-апликација.",
  "application": "Поврзување реални уреди и теорија."
 },
 {
  "id": 49,
  "category": "Наставни ресурси",
  "command": "/360view",
  "title": "Повеќе агли",
  "object": "Електромотор",
  "visual": "Серија концептуални погледи со ознака дека невидливите страни се приближна реконструкција.",
  "application": "Просторна ориентација."
 },
 {
  "id": 50,
  "category": "Наставни ресурси",
  "command": "/storyboard",
  "title": "Наставна визуелна приказна",
  "object": "Соларен панел до светилка",
  "visual": "Шест логички поврзани кадри за патот и преобразбата на енергијата со јасни премини.",
  "application": "Објаснување технички процеси."
 }
];
const CATEGORIES=["Сите","Конструкција","Електротехника","Електроника","Автоматика","Наставни ресурси"];
const ICONS={"Конструкција":"◈","Електротехника":"ϟ","Електроника":"▦","Автоматика":"⌘","Наставни ресурси":"✦"};
const total=document.getElementById("count"), list=document.getElementById("cards");
const search=document.getElementById("search"), filters=document.getElementById("filters"), status=document.getElementById("status");
const edits=new Map();
let selected="Сите";
function node(tag,cls,value){const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;}
function template(p){return p.command+"\n\nКОНТЕКСТ\nТема/уред: "+p.object+".\nОбразовна година: [внеси].\nНаставна цел: [внеси].\nПроверен извор/документација: [приложи или наведи].\nПриложена фотографија: [прикачи ако имаш].\n\nЗАДАЧА\nСоздај "+p.visual.charAt(0).toLocaleLowerCase("mk")+p.visual.slice(1)+"\n\nВИЗУЕЛЕН СТИЛ\nПрофесионална наставна визуелизација со јасна хиерархија, чиста композиција, прецизни линии, сини акценти и читливи ознаки на стандарден македонски јазик. Формат 16:9. Раздвој визуелни елементи за да не се преклопуваат ознаките.\n\nТОЧНОСТ И БЕЗБЕДНОСТ\nПотпирај се на фотографијата и доставениот проверен извор. Не измислувај технички параметри, димензии, скриени компоненти, врски, пински распоред, температури или измерени вредности. Ако нешто не може да се утврди, означи го приказот како концептуален или побарај документација. Електричните шеми не се одобрени монтажни планови. Не давај опасни инструкции за работа под напон.\n\nНАСТАВНА ПРИМЕНА\n"+p.application+"\nПредложи едно кратко прашање за учениците и список од 3 проверки што наставникот треба да ги направи пред употреба. Одвој ги текстуалните ознаки од сликата ако не можеш сигурно да ги испишеш.";}
function announce(s){status.textContent=s;}
function download(content,name){const blob=new Blob(["\ufeff"+content],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob),a=node("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
async function copy(text,field){try{if(!navigator.clipboard||!window.isSecureContext)throw Error("clipboard");await navigator.clipboard.writeText(text);announce("Промптот е копиран.");}catch(e){field.focus();field.select();announce("Текстот е означен. Копирај со Ctrl+C (или Command+C).");}}
function card(p){const item=node("article","card"),cap=node("div","card-cap");cap.append(node("span","number",String(p.id).padStart(2,"0")),node("span","category",p.category));item.append(cap);
const visual=node("div","visual "+p.category.replace(/ /g,"-"));visual.setAttribute("aria-hidden","true");visual.append(node("span","visual-icon",ICONS[p.category]),node("span","visual-command",p.command));item.append(visual);
item.append(node("h3","",p.title),node("p","subject","Пример: "+p.object),node("p","application",p.application));
const details=node("details","details"),summary=node("summary","", "Отвори и уреди го промптот");
const label=node("label","prompt-label","Целосен промпт"),area=node("textarea","prompt-editor");area.rows=12;area.id="prompt-"+p.id;label.htmlFor=area.id;area.value=edits.get(p.id)??template(p);area.addEventListener("input",()=>edits.set(p.id,area.value));
const buttons=node("div","card-buttons"),copyButton=node("button","primary","Копирај"),resetButton=node("button","secondary","Врати оригинал");copyButton.type=resetButton.type="button";copyButton.addEventListener("click",()=>copy(area.value,area));resetButton.addEventListener("click",()=>{edits.delete(p.id);area.value=template(p);printText.textContent=area.value;announce("Вратен е оригиналниот промпт.");});buttons.append(copyButton,resetButton);
const printText=node("pre","print-prompt",area.value);area.addEventListener("input",()=>{printText.textContent=area.value;});details.append(summary,label,area,buttons,printText);item.append(details);return item;}
function render(){[...filters.children].forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.category===selected)));const q=search.value.trim().toLocaleLowerCase("mk");const matches=PROMPTS.filter(p=>(selected==="Сите"||p.category===selected)&&[p.command,p.title,p.object,p.visual,p.application].join(" ").toLocaleLowerCase("mk").includes(q));const frag=document.createDocumentFragment();matches.forEach(p=>frag.append(card(p)));list.replaceChildren(frag);total.textContent=matches.length+" од "+PROMPTS.length+" команди";document.getElementById("empty").hidden=matches.length>0;}
CATEGORIES.forEach(c=>{const b=node("button","chip",c==="Сите"?"Сите (50)":c+" (10)");b.type="button";b.dataset.category=c;b.setAttribute("aria-pressed",String(c===selected));b.addEventListener("click",()=>{selected=c;render();});filters.append(b);});
search.addEventListener("input",render);
document.getElementById("clear").addEventListener("click",()=>{selected="Сите";search.value="";render();});
document.getElementById("download").addEventListener("click",()=>{const all=PROMPTS.map(p=>"["+p.id+"/50] "+p.title+" ("+p.category+")\nПример: "+p.object+"\nНаставна примена: "+p.application+"\n\n"+(edits.get(p.id)??template(p))).join("\n\n"+"─".repeat(42)+"\n\n");download("AI Visual Lab — 50 команди за техничка настава\nИгор Богданоски\n\n"+all,"ai-visual-lab-50-prompts.txt");});
document.getElementById("print").addEventListener("click",()=>window.print());
window.addEventListener("beforeprint",()=>{document.querySelectorAll(".card details").forEach(d=>d.open=true);});
render();
})();