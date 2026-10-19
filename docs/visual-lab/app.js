/* Offline Visual Lab UI. Data and prompt templates live in content.js. */
(function(){
'use strict';
const data=window.VISUAL_LAB, prompts=data.prompts, t=data.ui;
const byId=id=>document.getElementById(id);
function node(tag,cls,value){const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;}
document.querySelectorAll('[data-text]').forEach(n=>n.textContent=t[n.dataset.text]);
document.title=t.title;
const list=byId('cards'),search=byId('search'),total=byId('count'),edits=new Map();
search.placeholder=t.searchPlaceholder;
const params=new URLSearchParams(window.location.search);
let area=data.areas.some(a=>a[0]===params.get('area'))?params.get('area'):'all';
let subject=params.get('subject')||'all';
let kind=data.kinds.some(k=>k[0]===params.get('kind'))?params.get('kind'):'all';
function select(id,text){const wrap=node('div','filter-field'),label=node('label','',text),el=node('select');el.id=id;label.htmlFor=id;wrap.append(label,el);byId('filters').append(wrap);return el;}
const areaSelect=select('area-filter',t.area),subjectSelect=select('subject-filter',t.subject),kindSelect=select('kind-filter',t.kind);
function options(el,rows,current){el.replaceChildren(...[['all',t.all],...rows].map(([value,label])=>{const o=node('option','',label);o.value=value;return o;}));el.value=current;}
options(areaSelect,data.areas,area);options(kindSelect,data.kinds,kind);
function subjects(){const values=[...new Set(prompts.filter(p=>area==='all'||p.area===area).map(p=>p.subject))].sort((a,b)=>a.localeCompare(b,'mk'));if(!values.includes(subject))subject='all';options(subjectSelect,values.map(s=>[s,s]),subject);}
subjects();
function announce(message){byId('status').textContent=message;}
async function copy(text,field){try{if(!navigator.clipboard||!window.isSecureContext)throw Error('clipboard');await navigator.clipboard.writeText(text);announce(t.copied);}catch{field.focus();field.select();announce(t.manualCopy);}}
function download(text){const url=URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'})),a=node('a');a.href=url;a.download='ai-visual-lab-'+prompts.length+'-prompts.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
function card(p){
 const item=node('article','card');item.dataset.id=p.id;
 const cap=node('div','card-cap');cap.append(node('span','number',String(p.id).padStart(3,'0')),node('span','category',p.category));item.append(cap);
 const visual=node('figure','visual'),image=node('img','visual-illustration');image.src='illustrations/'+String(p.id).padStart(3,'0')+'.svg';image.alt=t.imageAlt+p.title;image.width=640;image.height=360;image.loading=p.id<=3?'eager':'lazy';image.decoding='async';
 const caption=node('figcaption','visual-caption');caption.append(node('span','visual-command',p.command),node('span','visual-label',t.illustrationPreview));visual.append(image,caption);item.append(visual);
 item.append(node('h3','',p.title),node('p','subject',p.subject+' · '+data.kinds.find(k=>k[0]===p.kind)[1]),node('p','subject',t.example+p.object),node('p','application',p.application));
 const details=node('details','details'),summary=node('summary','',t.edit),label=node('label','prompt-label',t.fullPrompt),field=node('textarea','prompt-editor');
 field.id='prompt-'+p.id;label.htmlFor=field.id;field.rows=12;field.value=edits.get(p.id)??data.template(p);
 const printText=node('pre','print-prompt',field.value);field.addEventListener('input',()=>{edits.set(p.id,field.value);printText.textContent=field.value;});
 const actions=node('div','card-buttons'),copyButton=node('button','primary',t.copy),reset=node('button','secondary',t.reset);copyButton.type=reset.type='button';copyButton.onclick=()=>copy(field.value,field);reset.onclick=()=>{edits.delete(p.id);field.value=data.template(p);printText.textContent=field.value;announce(t.restored);};actions.append(copyButton,reset);
 details.append(summary,label,field,actions,printText);item.append(details);return item;
}
function render(){
 const q=search.value.trim().toLocaleLowerCase('mk');
 const matches=prompts.filter(p=>(area==='all'||p.area===area)&&(subject==='all'||p.subject===subject)&&(kind==='all'||p.kind===kind)&&[p.command,p.title,p.object,p.visual,p.application,p.category,p.subject].join(' ').toLocaleLowerCase('mk').includes(q));
 list.replaceChildren(...matches.map(card));total.textContent=matches.length+' '+t.of+' '+prompts.length+' '+t.prompts;byId('empty').hidden=matches.length>0;
}
function saveUrl(){const url=new URL(window.location.href);for(const [key,value] of [['area',area],['subject',subject],['kind',kind]]){if(value==='all')url.searchParams.delete(key);else url.searchParams.set(key,value);}try{window.history.replaceState(null,'',url);}catch{/* Some file viewers do not allow history changes. */}}
areaSelect.onchange=()=>{area=areaSelect.value;subjects();saveUrl();render();};subjectSelect.onchange=()=>{subject=subjectSelect.value;saveUrl();render();};kindSelect.onchange=()=>{kind=kindSelect.value;saveUrl();render();};search.oninput=render;
byId('clear').onclick=()=>{area=subject=kind='all';areaSelect.value=kindSelect.value='all';subjects();search.value='';saveUrl();render();};
byId('download').onclick=()=>download(t.exportTitle+'\n\n'+prompts.map(p=>'['+p.id+'/'+prompts.length+'] '+p.title+'\n'+p.category+' · '+p.subject+'\n\n'+(edits.get(p.id)??data.template(p))).join('\n\n'+'─'.repeat(40)+'\n\n'));
byId('print').onclick=()=>window.print();
let printState;
window.addEventListener('beforeprint',()=>{if(printState)return;printState={area,subject,kind,query:search.value,open:[...list.querySelectorAll('details[open]')].map(d=>d.closest('.card').dataset.id)};area=subject=kind='all';search.value='';render();list.querySelectorAll('details').forEach(d=>d.open=true);});
window.addEventListener('afterprint',()=>{if(!printState)return;({area,subject,kind}=printState);search.value=printState.query;render();list.querySelectorAll('.card').forEach(c=>c.querySelector('details').open=printState.open.includes(c.dataset.id));printState=null;});
render();
})();
