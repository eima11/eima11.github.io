const p=require('puppeteer-core');const W=ms=>new Promise(r=>setTimeout(r,ms));const O=process.argv[2];
(async()=>{const b=await p.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
const pg=await b.newPage();await pg.setViewport({width:1440,height:900});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('http://localhost:8642/v2-academy/index.html',{waitUntil:'networkidle0'});
const go=async(id,blk='start')=>{await pg.evaluate((id,blk)=>document.getElementById(id).scrollIntoView({block:blk}),id,blk);await W(1300)};
await go('cities');await pg.screenshot({path:O+'/g-map.png'});
await go('myths');const m=await pg.$$('.myth');await m[1].click();await W(900);await pg.screenshot({path:O+'/g-myths.png'});
await go('quiz');for(const j of [0,0,0,0,0]){await pg.click(`.qopt[data-j="${j}"]`);await W(450)}await pg.screenshot({path:O+'/g-quiz.png'});
await pg.type('#qzEmail','sam@test.com');await pg.click('.qmail [type=submit]');await W(1300);console.log('quiz email ok:',!!(await pg.$('#qzMain .ok')));
await pg.evaluate(()=>document.querySelector('[data-path-btn="scale"]').click());await go('numbers');await pg.screenshot({path:O+'/g-week.png'});
await pg.click('#weekCta');await W(700);console.log('call note:',await pg.$eval('#cNote',e=>e.value));
// mobile
const mp=await b.newPage();await mp.setViewport({width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:2});mp.on('pageerror',e=>errs.push('mobile:'+e.message));
await mp.goto('http://localhost:8642/v2-academy/index.html',{waitUntil:'networkidle0'});
const jt=await mp.evaluate(()=>{const s=document.getElementById('journey');return {top:s.offsetTop,span:s.offsetHeight-innerHeight}});
await mp.evaluate(y=>scrollTo(0,y),jt.top+jt.span*.85);await W(1400);await mp.screenshot({path:O+'/g-mj.png'});
await mp.evaluate(()=>document.getElementById('numbers').scrollIntoView());await W(1200);await mp.screenshot({path:O+'/g-mnum.png'});
console.log('overflow-x mobile:',await mp.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
console.log('errors:',errs.length?errs:'none');await b.close()})();
