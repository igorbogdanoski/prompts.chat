const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {JSDOM}=require('jsdom');const dir=path.resolve(__dirname,'../docs/visual-lab');
function load(query=''){
 const dom=new JSDOM(fs.readFileSync(path.join(dir,'index.html'),'utf8'),{runScripts:'outside-only',url:'https://example.org/visual-lab/index.html'+query});
 for(const name of ['content.js','app.js'])dom.window.eval(fs.readFileSync(path.join(dir,name),'utf8'));
 return dom;
}
(async()=>{
 let dom=load(),w=dom.window,d=w.document,data=w.VISUAL_LAB;
 assert.equal(data.prompts.length,110);assert.equal(new Set(data.prompts.map(p=>p.id)).size,110);assert.equal(new Set(data.prompts.map(p=>p.command)).size,110);
 const original=JSON.parse(fs.readFileSync(path.join(__dirname,'visual-lab-original-50.json'),'utf8'));
 for(const expected of original){const actual=data.prompts.find(p=>p.id===expected.id);for(const [key,value] of Object.entries(expected)){if(key==='textSha256')assert.equal(crypto.createHash('sha256').update(data.template(actual)).digest('hex'),value);else assert.equal(actual[key],value);}}
 const change=(id,value)=>{const el=d.getElementById(id);el.value=value;el.dispatchEvent(new w.Event('change'));};
 for(const [area] of data.areas){change('area-filter',area);assert.equal(d.querySelectorAll('.card').length,area==='technical'?50:6);if(area!=='technical'){for(const [kind] of data.kinds){change('kind-filter',kind);assert.equal(d.querySelectorAll('.card').length,1);}change('kind-filter','all');}}
 change('area-filter','general');change('subject-filter','Математика');assert.equal(d.querySelectorAll('.card').length,1);assert.ok(d.querySelector('h3').textContent.includes('Функција'));assert.ok(w.location.search.includes('subject='));
 const field=d.querySelector('textarea');field.value='Уреден визуелен промпт';field.dispatchEvent(new w.Event('input'));d.querySelector('details').open=true;
 Object.defineProperty(w,'isSecureContext',{value:true});Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async()=>{throw Error('denied');}}});
 d.querySelector('.card-buttons .primary').click();await new Promise(resolve=>setImmediate(resolve));assert.equal(field.selectionEnd,field.value.length);assert.ok(d.getElementById('status').textContent.includes('Ctrl+C'));
 w.dispatchEvent(new w.Event('beforeprint'));assert.equal(d.querySelectorAll('.card').length,110);assert.ok([...d.querySelectorAll('details')].every(n=>n.open));assert.ok(d.body.textContent.includes('Уреден визуелен промпт'));
 w.dispatchEvent(new w.Event('afterprint'));assert.equal(d.querySelectorAll('.card').length,1);assert.equal(d.querySelector('textarea').value,'Уреден визуелен промпт');assert.equal(d.querySelector('details').open,true);
 // Export must include every prompt and the current edits, regardless of active filters.
 let blob,filename;w.URL.createObjectURL=b=>{blob=b;return 'blob:test'};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};
 d.getElementById('download').click();assert.equal(filename,'ai-visual-lab-110-prompts.txt');const reader=new w.FileReader();const exported=await new Promise(resolve=>{reader.onload=()=>resolve(reader.result);reader.readAsText(blob);});assert.ok(exported.includes('[110/110]'));assert.ok(exported.includes('Уреден визуелен промпт'));
 d.querySelector('.card-buttons .secondary').click();assert.notEqual(d.querySelector('textarea').value,'Уреден визуелен промпт');
 d.getElementById('clear').click();assert.equal(d.querySelectorAll('.card').length,110);
 d.getElementById('search').value='<img src=x onerror=alert(1)>';d.getElementById('search').dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('.card').length,0);assert.equal(d.querySelectorAll('img').length,0);
 for(const p of data.prompts.slice(50)){for(const key of ['goal','source','task','checks','constraints','subject','kind'])assert.ok(p[key],p.title+': '+key);assert.ok(data.template(p).includes('рубрик'));}
 dom.window.close();
 dom=load('?area=optics&kind=comparison');assert.equal(dom.window.document.querySelectorAll('.card').length,1);dom.window.close();
 dom=load('?area=unknown&subject=unknown&kind=unknown');assert.equal(dom.window.document.querySelectorAll('.card').length,110);dom.window.close();
 console.log('PASS: original 50 texts unchanged; 60 new prompts, 11 areas, subject/type/deep links, edits, denied-copy fallback, all-record TXT/print and state restore.');
})().catch(e=>{console.error(e);process.exitCode=1;});
