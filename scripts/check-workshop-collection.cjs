const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');const root=path.resolve(__dirname,'../docs');
function load(folder,scripts,search=''){
 const dir=path.join(root,folder),dom=new JSDOM(fs.readFileSync(path.join(dir,'index.html'),'utf8'),{runScripts:'outside-only',url:'file:///'+dir.replaceAll('\\','/')+'/index.html'+search});
 dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false};
 for(const script of scripts)dom.window.eval(fs.readFileSync(path.join(dir,script),'utf8'));
 return dom;
}
function links(dom){for(const el of dom.window.document.querySelectorAll('[href],[src]')){
 const raw=el.getAttribute('href')??el.getAttribute('src');if(!raw||raw.startsWith('#'))continue;
 const url=new URL(raw,dom.window.location.href);if(url.protocol!=='file:')continue;
 assert.ok(!url.pathname.endsWith('/'),'Offline link must name index.html: '+raw);
 const target=decodeURIComponent(url.pathname).replace(/^\/([A-Za-z]:)/,'$1');assert.ok(fs.existsSync(target),'Missing link: '+target);
}}
let dom=load('',['content.js','secondary-expansion.js','app.js']);let w=dom.window,d=w.document;
for(const category of ['Земјоделство','Хемиско-лабораториско образование','Очна оптика']){const filter=d.getElementById('category');filter.value=category;filter.dispatchEvent(new w.Event('change'));assert.equal(d.querySelectorAll('.prompt').length,6);}
d.getElementById('start-deck').click();const before=d.getElementById('slide-progress').textContent;d.getElementById('presentation').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.notEqual(d.getElementById('slide-progress').textContent,before);d.getElementById('presentation').dispatchEvent(new w.Event('cancel',{cancelable:true}));assert.equal(d.getElementById('presentation').open,false);
const field=d.querySelector('[name="topic"]');field.value='Леќи';field.dispatchEvent(new w.Event('input',{bubbles:true}));assert.ok(d.getElementById('composed').value.includes('Леќи'));links(dom);dom.window.close();
for(const sector of ['agriculture','laboratory','optics']){
 dom=load('obuki',['content.js'],'?sector='+sector);d=dom.window.document;assert.equal(d.querySelectorAll('.card').length,6);
 for(const type of ['lesson','image','video','html','tts','quiz']){d.querySelector('#types [data-value="'+type+'"]').click();assert.equal(d.querySelectorAll('.card').length,1);}
 links(dom);dom.window.close();
}
dom=load('resursi',['content.js','app.js']);assert.equal(dom.window.document.querySelectorAll('.area').length,13);links(dom);dom.window.close();
dom=load('visual-lab',['content.js','app.js']);assert.equal(dom.window.document.querySelectorAll('.card').length,110);links(dom);dom.window.close();
console.log('PASS: new category filters, six media formats and deep links, composition, keyboard slides, 13 portal areas, Visual Lab and local resource links.');
