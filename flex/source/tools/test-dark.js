const p=require('puppeteer-core');const W=ms=>new Promise(r=>setTimeout(r,ms));const O=process.argv[2];
(async()=>{const b=await p.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});const errs=[];
const pg=await b.newPage();await pg.setViewport({width:1440,height:900});pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('http://localhost:8642/v2-academy/index.html',{waitUntil:'networkidle0'});await W(500);
console.log('before:',await pg.evaluate(()=>[document.documentElement.dataset.theme||'(system)',document.documentElement.classList.contains('is-dark')]));
await pg.click('#themeBtn');await W(1000);await pg.click('#themeBtn');await W(1000);
console.log('after click:',await pg.evaluate(()=>[document.documentElement.dataset.theme,document.documentElement.classList.contains('is-dark'),localStorage.getItem('fa-theme'),getComputedStyle(document.body).backgroundColor]));
const sh=async(id,name,blk='start')=>{await pg.evaluate((id,blk)=>document.getElementById(id).scrollIntoView({block:blk}),id,blk);await W(1500);await pg.screenshot({path:`${O}/dk-${name}.png`})};
await pg.evaluate(()=>scrollTo(0,0));await W(400);await pg.screenshot({path:O+'/dk-hero.png'});
for(const [id,n] of [['you','you'],['numbers','numbers'],['paths','paths'],['inside','inside'],['cities','map'],['founders','founders'],['compare','compare'],['quiz','quiz'],['checklist','final']])await sh(id,n);
await pg.evaluate(()=>scrollTo(0,0));await W(300);await pg.click('[data-open="webinar"]');await W(800);await pg.screenshot({path:O+'/dk-dialog.png'});
// reload keeps choice, no flash
const p2=await b.newPage();await p2.setViewport({width:390,height:844,deviceScaleFactor:2});await p2.goto('http://localhost:8642/v2-academy/index.html',{waitUntil:'domcontentloaded'});
console.log('reload theme at DOM ready:',await p2.evaluate(()=>document.documentElement.dataset.theme));await W(900);await p2.screenshot({path:O+'/dk-mobile.png'});
console.log('errors:',errs.length?errs:'none');await b.close()})();
