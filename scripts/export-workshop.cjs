// Export the same classic-script data used by the offline pages. No npm dependencies.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync('docs/'+p,'utf8');
const ctx={window:{addEventListener(){}},document:{addEventListener(){},body:{}},URLSearchParams};
vm.createContext(ctx);
vm.runInContext(read('content.js'),ctx);
vm.runInContext(read('secondary-expansion.js'),ctx);
const main=ctx.window.WORKSHOP.prompts;
vm.runInContext(read('obuki/content.js').split('let sector=')[0]+'\nglobalThis.media=data;',ctx);
const visual=read('visual-lab/app.js');
const records=visual.slice(visual.indexOf('const PROMPTS='),visual.indexOf('const CATEGORIES='));
const template=visual.split('\n').find(l=>l.startsWith('function template('));
vm.runInContext(records+'\n'+template+'\nglobalThis.visual=PROMPTS.map(p=>({...p,text:template(p)}));',ctx);
assert.equal(main.length,102);assert.equal(ctx.media.length,90);assert.equal(ctx.visual.length,50);
assert.equal(new Set(ctx.media.map(p=>p.id)).size,90);
for(const category of ['Земјоделство','Хемиско-лабораториско образование','Очна оптика'])assert.equal(main.filter(p=>p.category===category).length,6);
const all=[...main,...ctx.media,...ctx.visual];
for(const p of all){assert.ok(p.title);assert.ok((p.text||p.prompt).length>200);assert.ok(!JSON.stringify(p).includes('\ufffd'));}
const output={counts:{main:main.length,multimedia:ctx.media.length,visual:ctx.visual.length,total:all.length},main,multimedia:ctx.media,visual:ctx.visual};
fs.writeFileSync(process.argv[2]||'workshop-export.json',JSON.stringify(output,null,2));
console.log('PASS: collection export, counts, categories, unique multimedia IDs and Unicode',output.counts);
