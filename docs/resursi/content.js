/* Македонска навигација за наставници. MIT; docs/LICENSE */
window.SECONDARY_RESOURCE = {
 title:"Ресурси за наставници",subheading:"Отворена македонска библиотека за средно образование",
 counts:{general:102,multimedia:90,visual:110},
 links:{main:"../index.html",media:"../obuki/index.html",visual:"../visual-lab/index.html",source:"https://github.com/igorbogdanoski/prompts.chat",contribute:"https://github.com/igorbogdanoski/prompts.chat/issues/new?template=nov-prompt-mk.yml"},
 areas:[{"name": "Земјоделство", "type": "Стручно", "icon": "◉", "category": "Земјоделство", "sector": "agriculture", "examples": "Наставни задачи · проверени извори · рубрики", "visual": true}, {"name": "Хемиско-лабораториско образование", "type": "Стручно", "icon": "◉", "category": "Хемиско-лабораториско образование", "sector": "laboratory", "examples": "Наставни задачи · проверени извори · рубрики", "visual": true}, {"name": "Очна оптика", "type": "Стручно", "icon": "◉", "category": "Очна оптика", "sector": "optics", "examples": "Наставни задачи · проверени извори · рубрики", "visual": true},
 {
  "name": "Електротехника и ИКТ",
  "type": "Стручно",
  "icon": "⚡",
  "category": "Техничко образование",
  "sector": "technical",
  "examples": "Електрични кола · PLC · информатички системи",
  "visual": true
 },
 {
  "name": "Машинство",
  "type": "Стручно",
  "icon": "⚙️",
  "category": "Машинско образование",
  "sector": "mechanical",
  "examples": "Техничко цртање · CNC · материјали",
  "visual": true
 },
 {
  "name": "Економија",
  "type": "Стручно",
  "icon": "📈",
  "category": "Економско образование",
  "sector": "economy",
  "examples": "Буџет · сметководство · претприемништво"
 },
 {
  "name": "Сообраќај и логистика",
  "type": "Стручно",
  "icon": "🚚",
  "category": "Сообраќајно образование",
  "sector": "transport",
  "examples": "Маршрути · товар · безбедност"
 },
 {
  "name": "Угостителство и туризам",
  "type": "Стручно",
  "icon": "🏨",
  "category": "Угостителство и туризам",
  "sector": "hospitality",
  "examples": "Рецепција · трошок по порција · туризам"
 },
 {
  "name": "Медицинско образование",
  "type": "Стручно",
  "icon": "🩺",
  "category": "Медицинско образование",
  "sector": "medical",
  "examples": "Комуникација · хигиена · симулација"
 },
 {
  "name": "Хемиско образование",
  "type": "Стручно",
  "icon": "⚗️",
  "category": null,
  "sector": "chemistry",
  "examples": "Хемиски процеси · етика · концептуални модели"
 },
 {
  "name": "Лични услуги",
  "type": "Стручно",
  "icon": "✂️",
  "category": "Лични услуги",
  "sector": "services",
  "examples": "Консултација · организација · портфолио"
 },
 {
  "name": "Гимназиско образование",
  "type": "Гимназиско",
  "icon": "🎓",
  "category": "Гимназиско образование",
  "sector": "gym",
  "examples": "Математика · природни науки · филозофија"
 },
 {
  "name": "Општообразовни предмети",
  "type": "Општообразовно",
  "icon": "📚",
  "category": "Општообразовни предмети",
  "sector": "general",
  "examples": "Историја · јазици · физика · географија"
 }
]
};
window.SECONDARY_RESOURCE.areas.forEach(a=>{a.visual=true;a.visualArea=({chemistry:"laboratory",gym:"general"})[a.sector]||a.sector;});
