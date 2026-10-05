const p=require('puppeteer-core');const W=ms=>new Promise(r=>setTimeout(r,ms));const O=process.argv[2];
(async()=>{const b=await p.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
const pg=await b.newPage();await pg.setViewport({width:1440,height:900});const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await pg.goto('http://localhost:8642/v2-academy/index.html',{waitUntil:'networkidle0'});
const go=async(id,blk='start')=>{await pg.evaluate((id,blk)=>document.getElementById(id).scrollIntoView({block:blk}),id,blk);await W(1300)};
const txt=s=>pg.$eval(s,e=>e.textContent.trim());
// numbers
await go('numbers');console.log('salary: need',await txt('#uNeed'),await txt('#uWord'),'| profit',await txt('#kProfit'),'| BE',await txt('#kBe'),'| time',await txt('#kTime'),'| houses',await pg.$$eval('#houses svg',e=>e.length));
await pg.click('[data-calc="market"] [data-v="capital"]');await pg.click('[data-calc="model"] [data-v="manage"]');await W(300);console.log('capital+manage: need',await txt('#uNeed'),'| profit',await txt('#kProfit'));
await pg.click('[data-calc="model"] [data-v="r2r"]');await pg.click('[data-calc="market"] [data-v="regional"]');await W(500);
await pg.screenshot({path:O+'/f-numbers.png'});
// journey stages
const jtop=await pg.evaluate(()=>{const s=document.getElementById('journey');return {top:s.offsetTop,span:s.offsetHeight-innerHeight}});
for(const f of [.05,.3,.55,.85]){await pg.evaluate(y=>scrollTo(0,y),jtop.top+jtop.span*f);await W(1100);console.log('journey',f,'stage',await pg.$eval('#jScene',e=>e.dataset.stage),await txt('#jWeek'));await pg.screenshot({path:`${O}/f-j${Math.round(f*100)}.png`})}
// preview
await go('preview','center');await W(2500);console.log('preview time',await txt('#plTime'),'|',await txt('#plT'));
const ch=await pg.$$('.chap');await ch[2].click();await W(600);console.log('after chapter 3 click',await txt('#plTime'),'|',await txt('#plT'));await pg.screenshot({path:O+'/f-preview.png'});
// map
await go('cities');await pg.click('.pin[data-c="lisbon"]');await W(500);console.log('map pick',await txt('#cpName'),'|',await txt('#cpLesson'),'| pins',await pg.$$eval('.pin',e=>e.length));await pg.screenshot({path:O+'/f-map.png'});
// myths
await go('myths');const m=await pg.$$('.myth');await m[0].click();await W(900);console.log('myth1 pressed',await pg.$eval('.myth',e=>e.getAttribute('aria-pressed')));await pg.screenshot({path:O+'/f-myths.png'});
// quiz
await go('quiz');for(const j of [2,2,0,1,1]){await pg.click(`.qopt[data-j="${j}"]`);await W(450)}console.log('quiz result:',await txt('.qv h3'),'| path now',await pg.evaluate(()=>document.body.dataset.path));await pg.screenshot({path:O+'/f-quiz.png'});
// scale numbers
await go('numbers');await W(400);console.log('week audit back',await txt('#hBack'),'|',await txt('#hSub'));await pg.screenshot({path:O+'/f-week.png'});
await pg.click('#weekCta');await W(600);console.log('call note prefilled:',await pg.$eval('#cNote',e=>e.value));
console.log('errors:',errs.length?errs:'none');await b.close()})();
