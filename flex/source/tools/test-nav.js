const p=require('puppeteer-core');const W=ms=>new Promise(r=>setTimeout(r,ms));const O=process.argv[2];
(async()=>{const b=await p.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});const errs=[];
for(const [w,h,n] of [[1440,900,'d'],[390,844,'m']]){const pg=await b.newPage();await pg.setViewport({width:w,height:h,deviceScaleFactor:n==='m'?2:1});pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('http://localhost:8642/v2-academy/index.html',{waitUntil:'networkidle0'});await W(700);
const info=()=>pg.evaluate(()=>{const h=document.getElementById('hdr'),i=h.querySelector('.hdr-in').getBoundingClientRect();return `top=${h.classList.contains('top')} navW=${Math.round(i.width)} navY=${Math.round(i.top)} navH=${Math.round(i.height)} radius=${getComputedStyle(h.querySelector('.hdr-in')).borderTopLeftRadius} heroY=${Math.round(document.querySelector('.hero').getBoundingClientRect().top+scrollY)}`});
console.log(n,'at top    ',await info());await pg.screenshot({path:`${O}/nav-${n}-top.png`,clip:{x:0,y:0,width:w,height:n==='m'?200:160}});
await pg.evaluate(()=>scrollTo(0,300));await W(700);console.log(n,'in hero   ',await info());
await pg.evaluate(()=>{const e=document.querySelector('.hero');scrollTo(0,e.offsetTop+e.offsetHeight)});await W(250);console.log(n,'mid-morph ',await info());await pg.screenshot({path:`${O}/nav-${n}-mid.png`,clip:{x:0,y:0,width:w,height:n==='m'?200:160}});
await W(700);console.log(n,'past hero ',await info());await pg.screenshot({path:`${O}/nav-${n}-float.png`,clip:{x:0,y:0,width:w,height:n==='m'?200:160}});
await pg.evaluate(()=>scrollTo(0,0));await W(800);console.log(n,'back up   ',await info());}
console.log('errors:',errs.length?errs:'none');await b.close()})();
