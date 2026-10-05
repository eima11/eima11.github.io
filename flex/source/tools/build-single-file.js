const fs=require('fs'),path=require('path');const [src,adir,out]=process.argv.slice(2);
let h=fs.readFileSync(src,'utf8');
const names=new Set();for(const m of h.matchAll(/assets\/([\w.-]+\.(?:jpg|png))/g))names.add(m[1]);for(const m of h.matchAll(/'([a-z-]+\.(?:jpg|png))'/g))names.add(m[1]);
const A={};for(const n of names){const f=path.join(adir,n);if(!fs.existsSync(f)){console.error('missing',n);continue}A[n]=`data:image/${n.endsWith('.png')?'png':'jpeg'};base64,`+fs.readFileSync(f).toString('base64')}
const blank='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
let n=0;
h=h.replace(/src="assets\/([\w.-]+)"/g,(_,x)=>{n++;return `src="${blank}" data-a="${x}"`});
h=h.replace(/srcset="assets\/([\w.-]+)"/g,(_,x)=>{n++;return `data-as="${x}"`});
h=h.replace(/url\(assets\/([\w.-]+)\)/g,(_,x)=>{n++;return `var(--a-${x.replace(/\W/g,'-')})`});
h=h.replace(/'assets\/'\+([a-z])\[(\d)\]/g,(_,v,i)=>{n++;return `__A[${v}[${i}]]`});
const cssVars=[...h.matchAll(/var\(--a-([\w-]+)\)/g)].map(m=>m[1]);
const hydrate=`<script>(function(){var A=window.__A;document.querySelectorAll('[data-a]').forEach(function(e){e.src=A[e.getAttribute('data-a')]});document.querySelectorAll('[data-as]').forEach(function(e){e.srcset=A[e.getAttribute('data-as')]});${[...new Set(cssVars)].map(v=>`document.documentElement.style.setProperty('--a-${v}','url('+A['${v.replace(/-(jpg|png)$/,'.$1')}']+')');`).join('')}})();</script>`;
h=h.replace('</head>',`<script>window.__A=${JSON.stringify(A)};</script>\n</head>`);
// hydrate before the main script so the page script sees real image sources
const idx=h.lastIndexOf('<script>\n(function(){');h=idx>0?h.slice(0,idx)+hydrate+'\n'+h.slice(idx):h.replace('</body>',hydrate+'</body>');
h=h.replace('<title>Flex Academy Brand</title>','<title>The Flex Academy</title>\n<meta name="description" content="Start and grow your own short-term rental company with the playbook, systems and software behind The Flex.">');
fs.writeFileSync(out,h);console.log('assets embedded:',Object.keys(A).length,'| references rewired:',n,'| file size:',(fs.statSync(out).size/1048576).toFixed(2)+'MB');
