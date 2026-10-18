const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const dir=path.resolve(__dirname,'../docs/obuki');
const dom=new JSDOM(fs.readFileSync(path.join(dir,'index.html'),'utf8'),{runScripts:'outside-only',url:'https://example.org/obuki/'});
const w=dom.window;
w.eval(fs.readFileSync(path.join(dir,'content.js'),'utf8'));
const d=w.document;
const all=[...d.querySelectorAll('#sectors button')];
assert.equal(d.querySelectorAll('#cards .card').length,48,'48 cards must render');
assert.equal(all.length,7,'All plus 6 sector filters');
function check(label,count){const b=all.find(el=>el.textContent===label);assert.ok(b,'Missing filter: '+label);b.click();assert.equal(d.querySelectorAll('#cards .card').length,count,'Count for '+label);}
check('Медицинска',6);check('Лични услуги',6);check('Техничка',14);check('Хемиска',6);check('Општообразовни',8);check('Гимназии',8);
d.getElementById('clear').click();assert.equal(d.querySelectorAll('#cards .card').length,48);
const search=d.getElementById('search');search.value='допирница';search.dispatchEvent(new w.Event('input'));assert.equal(d.querySelectorAll('#cards .card').length,1);
const text=d.querySelector('#cards textarea');text.value='Изменет промпт';text.dispatchEvent(new w.Event('input'));
const category=d.querySelector('#sectors button[data-value="gym"]');category.click();assert.equal(d.querySelector('#cards textarea').value,'Изменет промпт');
console.log('PASS: 48 prompts, sector filters, search and prompt editing.');dom.window.close();
