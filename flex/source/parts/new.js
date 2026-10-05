  /* ---------- Your numbers: salary calculator (Launch) ---------- */
  (function(){
    const mk={capital:{rate:150,rent:1800,occ:.74},regional:{rate:110,rent:1000,occ:.70},holiday:{rate:135,rent:850,occ:.60}};
    const ut={studio:{r:.8,c:.7},one:{r:1,c:1},two:{r:1.4,c:1.35}};
    const sel={market:'regional',unit:'one',model:'r2r'};
    const house='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z" fill="currentColor"/></svg>';
    let shown=0;
    function run(){
      const sal=+$('#sSal').value;$('#sOut').textContent=money(sal);
      const m=mk[sel.market],u=ut[sel.unit],rate=m.rate*u.r,net=rate*30.4*.85,rev=net*m.occ,bills=180*u.c;
      let profit,be;
      if(sel.model==='r2r'){const rent=m.rent*u.c;profit=rev-rent-bills-rev*.18;be=Math.round((rent+bills)/(net*.82)*100)}
      else{profit=rev*.15;be=null}
      if(profit<50){$('#uNeed').textContent='—';$('#uWord').textContent='';$('#uSub').textContent='This combination doesn\'t make money. Try another market or model.';$('#houses').innerHTML='';shown=0;
        $('#kProfit').textContent=money(profit);$('#kBe').textContent=be?be+'%':'n/a';$('#kTime').textContent='—';window.__faUnits=null;return}
      const n=Math.ceil(sal/profit);window.__faUnits=n;
      $('#uNeed').textContent=n;$('#uWord').textContent=n===1?'unit':'units';$('#uSub').textContent=`to replace your ${money(sal)} a month`;
      $('#kProfit').textContent=money(profit)+'/mo';$('#kBe').textContent=be?be+'%':'No rent to cover';
      const mo=3+(n-1)*2;$('#kTime').textContent=mo<24?`~${mo} months`:`~${(mo/12).toFixed(1)} years`;
      const cap=Math.min(n,20),h=$('#houses');
      if(cap!==shown){let html='';for(let i=0;i<cap;i++)html+=`<span class="${i>=shown?'hn':''}" style="animation-delay:${Math.max(0,i-shown)*40}ms">${house}</span>`;
        h.innerHTML=html+(n>20?`<span class="more">+${n-20}</span>`:'');shown=cap}
    }
    $$('[data-calc]').forEach(g=>g.addEventListener('click',e=>{const c=e.target.closest('.chip');if(!c)return;$$('.chip',g).forEach(x=>x.setAttribute('aria-checked',String(x===c)));sel[g.dataset.calc]=c.dataset.v;run()}));
    $('#sSal').addEventListener('input',run);run();
  })();

  /* ---------- Your numbers: week audit (Scale) ---------- */
  (function(){
    const T=[['msg','Guest messages',12,30,.7],['clean','Cleaning and turnovers',8,20,.6],['price','Pricing and calendars',5,15,.8],['books','Bookkeeping and invoices',4,15,.5],['fix','Maintenance calls',3,10,.3]];
    $('#weekCtl').innerHTML=T.map(t=>`<label class="nrow"><span class="nlab">${t[1]} <output id="w-${t[0]}o"></output></span><input type="range" id="w-${t[0]}" min="0" max="${t[3]}" step="1" value="${t[2]}"></label>`).join('')+'<p class="nnote">Hours per week, across all your units.</p>';
    function run(){
      let tot=0,save=0,top=null;
      T.forEach(t=>{const v=+$('#w-'+t[0]).value;$('#w-'+t[0]+'o').textContent=v+'h';tot+=v;save+=v*t[4];if(!top||v>top[1])top=[t[1],v]});
      const back=Math.round(save);
      $('#hBack').textContent=back;$('#hSub').textContent=back?`That's about ${Math.round(back*52/40)} working weeks a year.`:'Move the sliders to match your week.';
      $('#wbNow').style.width=(tot?100:0)+'%';$('#wbThen').style.width=(tot?(tot-save)/tot*100:0)+'%';
      $('#wbNowT').textContent=tot+'h';$('#wbThenT').textContent=Math.round(tot-save)+'h';
      $('#weekCta').dataset.note=`I spend about ${tot}h a week on operations. Biggest: ${top[0].toLowerCase()} (${top[1]}h).`;
    }
    $$('#weekCtl input').forEach(i=>i.addEventListener('input',run));run();
    $('#weekCta').addEventListener('click',()=>{open('call');$('#cNote').value=$('#weekCta').dataset.note});
  })();

  /* ---------- Journey: room furnishes itself on scroll ---------- */
  (function(){
    const sec=$('#journey'),scene=$('#jScene'),steps=$$('#jSteps li'),wk=['Week 1','Week 3','Week 6','Week 12'];let st=-1,tick=false;
    $('#jPrice').textContent=cur+'120';$('#jT1').textContent=`${cur}640 · Airbnb`;$('#jT2').textContent=`${cur}410 · Booking.com`;
    function upd(){tick=false;const r=sec.getBoundingClientRect(),span=Math.max(1,sec.offsetHeight-innerHeight),p=Math.min(1,Math.max(0,-r.top/span)),s=Math.min(3,Math.floor(p*4));
      if(s===st)return;const prev=st;st=s;
      scene.className='j-scene'+[1,2,3].filter(n=>s>=n).map(n=>' st'+n).join('');scene.dataset.stage=s;$('#jWeek').textContent=wk[s];
      steps.forEach((li,i)=>{li.classList.toggle('on',i===s);li.classList.toggle('done',i<s)});
      if(s===2&&prev<2&&prev>=0&&!reduce)scene.querySelector('.flash').animate([{opacity:0},{opacity:.95,offset:.15},{opacity:0}],{duration:700,easing:'ease-out'});
    }
    addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
    steps.forEach((li,i)=>li.addEventListener('click',()=>{const span=sec.offsetHeight-innerHeight;scrollTo({top:sec.offsetTop+span*(i+.5)/4,behavior:reduce?'auto':'smooth'})}));
  })();

  /* ---------- Preview player ---------- */
  (function(){
    const D={launch:{len:60,ch:[[0,'Why short-term rentals, why now','The model in plain numbers, and who it suits','hero.jpg'],[8,'Three ways in','Rent-to-rent, managing for owners, or owning','unit.jpg'],[20,'A live deal breakdown','We underwrite a real 1-bed, line by line','launch.jpg'],[35,'How we win landlords','The pitch and terms that get a yes','scale.jpg'],[48,'Your first 90 days + Q&A','The plan, then your questions, live','curated.jpg']]},
             scale:{len:25,ch:[[0,'Your portfolio today','Units, occupancy and where your time goes','scale.jpg'],[5,'Where the margin leaks','The three costs we look at first','unit.jpg'],[12,'What to automate first','Channels, pricing and guest messages on Base360','hero.jpg'],[18,'Your 12-week plan','What changes, week by week','curated.jpg'],[22,'Is Scale right for you?','An honest yes or no','launch.jpg']]}};
    const pl=$('#pl'),img=$('#plImg'),fill=$('#plFill'),track=$('#plTrack');
    let d,t=0,playing=!reduce,inView=false,last=0,idx=-1;
    const mmss=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;
    function load(){d=D[document.body.dataset.path]||D.launch;t=0;idx=-1;
      $('#chapList').innerHTML=d.ch.map((c,i)=>`<li><button type="button" class="chap" data-i="${i}"><span class="ct">${mmss(c[0]*60)}</span><b>${c[1]}</b><span class="cl">${c[2]}</span><span class="cp"><i></i></span></button></li>`).join('');
      track.querySelectorAll('.mk').forEach(m=>m.remove());d.ch.slice(1).forEach(c=>{const m=document.createElement('span');m.className='mk';m.style.left=(c[0]/d.len*100)+'%';track.appendChild(m)});paint()}
    function paint(){const L=d.len*60,i=d.ch.reduce((a,c,j)=>t>=c[0]*60?j:a,0);
      fill.style.width=(t/L*100)+'%';$('#plTime').textContent=`${mmss(t)} / ${mmss(L)}`;
      if(i!==idx){idx=i;const c=d.ch[i];$('#plK').textContent=`Chapter ${i+1}`;$('#plT').textContent=c[1];
        img.style.opacity=0;setTimeout(()=>{img.src='assets/'+c[3];img.style.opacity=1},200);
        $$('.chap').forEach((b,j)=>b.classList.toggle('on',j===i))}
      const c=d.ch[i],end=(d.ch[i+1]?d.ch[i+1][0]:d.len)*60,bar=$$('.chap .cp i')[i];if(bar)bar.style.width=((t-c[0]*60)/(end-c[0]*60)*100)+'%'}
    function frame(ts){if(playing&&inView&&last){t+=(ts-last)/1000*(d.len*60/70);if(t>=d.len*60)t=0;paint()}last=ts;requestAnimationFrame(frame)}
    function setPlay(p){playing=p;$('#plIcon').setAttribute('d',p?'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z':'M8 5l11 7-11 7z');$('#plPlay').setAttribute('aria-label',p?'Pause preview':'Play preview')}
    $('#plPlay').addEventListener('click',()=>setPlay(!playing));
    $('#chapList').addEventListener('click',e=>{const b=e.target.closest('.chap');if(!b)return;t=d.ch[+b.dataset.i][0]*60+.1;setPlay(true);paint()});
    track.addEventListener('click',e=>{const r=track.getBoundingClientRect();t=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*d.len*60;paint()});
    new IntersectionObserver(es=>es.forEach(e=>inView=e.isIntersecting),{threshold:.35}).observe(pl);
    document.addEventListener('pathchange',load);load();setPlay(playing);requestAnimationFrame(frame);
  })();

  /* ---------- City map ---------- */
  (function(){
    const P={{PINS}};
    const C={london:['London','United Kingdom',0,'The 90-night rule','London caps short lets of whole homes at 90 nights a year, so we mix in mid-term stays to stay full and compliant.','Module 1 · Local rules','london.jpg',[-14,-8,'end']],
      paris:['Paris','France',0,'Registration and night limits','Paris needs a registration number and caps primary homes at 120 nights. You\'ll learn to check rules before you sign.','Module 1 · Local rules','paris.jpg',[14,5,'start']],
      lisbon:['Lisbon','Portugal',0,'Licences change the maths','Short lets in Portugal need a local licence. We show you how to price that into a deal.','Module 2 · Run the numbers','lisbon.jpg',[14,5,'start']],
      berlin:['Berlin','Germany',0,'Permits and mid-term stays','Berlin restricts short lets without a permit, so 1–6 month stays for professionals carry the model.','Module 5 · Price and distribute','berlin.jpg',[14,5,'start']],
      algiers:['Algiers','Algeria',0,'Corporate and relocation demand','Relocating teams book longer, steadier stays. Learn how to win corporate contracts.','Scale · Weeks 9–10','algiers.jpg',[0,-18,'middle']],
      oran:['Oran','Algeria',0,'Opening a second city','How we copy the playbook into a new city without starting from zero.','Scale · Weeks 7–8','oran.jpg',[-14,20,'end']],
      constantine:['Constantine','Algeria',0,'Running units remotely','Local cleaners, smart locks and Base360 let one team run units it rarely visits.','Module 6 · Run it around your job','constantine.jpg',[14,20,'start']],
      milan:['Milan','Italy',1,'Choosing the next market','The checklist we use to pick a city before signing a single lease.','Free checklist','curated.jpg',[14,5,'start']],
      cairo:['Cairo','Egypt',1,'Planning a launch','Demand, rules, partners and the first ten units: how a new city goes live.','Scale · Weeks 11–12','unit.jpg',[-14,-14,'end']]};
    const ns='http://www.w3.org/2000/svg',g=$('#pins');
    Object.keys(C).forEach(k=>{const [x,y]=P[k],c=C[k],e=document.createElementNS(ns,'g');e.setAttribute('class','pin'+(c[2]?' soon':''));e.dataset.c=k;e.setAttribute('tabindex','0');e.setAttribute('role','button');e.setAttribute('aria-label',`${c[0]}, ${c[2]?'coming soon':'live'}`);
      e.innerHTML=`<circle class="ring" cx="${x}" cy="${y}" r="10"/><circle class="core" cx="${x}" cy="${y}" r="8"/><text x="${x+c[7][0]}" y="${y+c[7][1]}" text-anchor="${c[7][2]}">${c[0]}</text>`;g.appendChild(e)});
    $('#cpList').innerHTML=Object.keys(C).map(k=>`<button type="button" role="tab" data-c="${k}" aria-selected="false">${C[k][0]}</button>`).join('');
    function pick(k){const c=C[k];$$('.pin').forEach(p=>p.classList.toggle('on',p.dataset.c===k));$$('#cpList button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.c===k)));
      const im=$('#cpImg');im.style.opacity=0;setTimeout(()=>{im.src='assets/'+c[6];im.alt=c[0];im.style.opacity=1},150);
      $('#cpSt').textContent=c[2]?'Coming soon':'Live';$('#cpSt').classList.toggle('soon',!!c[2]);$('#cpCountry').textContent=c[1];$('#cpName').textContent=c[0];
      $('#cpLesson').textContent=c[3];$('#cpLine').textContent=c[4];$('#cpMod').textContent=c[5]}
    g.addEventListener('click',e=>{const p=e.target.closest('.pin');if(p)pick(p.dataset.c)});
    g.addEventListener('keydown',e=>{const p=e.target.closest('.pin');if(p&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(p.dataset.c)}});
    $('#cpList').addEventListener('click',e=>{const b=e.target.closest('button');if(b)pick(b.dataset.c)});
    pick('london');
  })();

  /* ---------- Myth cards ---------- */
  $$('.myth').forEach(m=>m.addEventListener('click',()=>m.setAttribute('aria-pressed',String(m.getAttribute('aria-pressed')!=='true'))));

  /* ---------- Quiz ---------- */
  (function(){
    const Q=[['How many hours a week can you give it?',['Under 5','5–10','10–20','20+']],
      ['How much could you put in to start?',[`Under ${cur}5k`,`${cur}5–15k`,`${cur}15–30k`,`${cur}30k+`]],
      ['How many units do you run today?',['None','1–2','3–9','10+']],
      ['Guests, cleaners, late-night problems…',['I\'d rather not','Fine, with systems','I enjoy it']],
      ['Where do you want this in a year?',['Side income','Replace my salary','A real company']]];
    const main=$('#qzMain'),dots=$$('.qz-prog i'),L='ABCD',tk='<svg class="i"><use href="#i-check"/></svg>';let i=0,a=[];
    const prog=n=>dots.forEach((d,j)=>d.classList.toggle('d',j<n));
    function q(){prog(i);main.innerHTML=`<p class="qz-n">Question ${i+1} of ${Q.length}</p><h3>${Q[i][0]}</h3><div class="qopts">${Q[i][1].map((o,j)=>`<button type="button" class="qopt${a[i]===j?' sel':''}" data-j="${j}"><span class="ql">${L[j]}</span>${o}</button>`).join('')}</div>${i?'<button type="button" class="back" data-back>← Back</button>':''}`}
    function result(){prog(Q.length);const[h,m,u,g,y]=a;let path,title,why=[];
      if(u>=2){path='scale';title='You\'re ready for Scale.';why=['You already run units, so the next step is systems, not basics.',y===2?'You want a real company. That\'s exactly what the 12 weeks build.':'Scale frees your time even if you stay small.',h===0?'Short on hours? Automation is the first thing we fix.':'Your time goes further once guest ops run on Base360.']}
      else if(h===0&&m===0){path=null;title='Not yet, and that\'s OK.';why=['Under 5 hours a week is tight for a first unit.','A small starting budget limits your first deal.','Start with the free checklist and come back when one of those changes.']}
      else{path='launch';title='Launch is a strong fit.';why=[m<=1?'Rent-to-rent keeps start-up costs low.':'Your budget covers furnishing and a deposit comfortably.',g===0?'Cleaners and guest scripts handle most of the people work. We show you how.':'You\'re comfortable with guests, which makes reviews easier to win.',y===1?'Replacing your salary is realistic with a handful of units.':'A side income from one or two units is a great start.']}
      main.innerHTML=`<div class="qv"><span class="tick"><svg class="i" viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span><div><p class="qz-n">Your result</p><h3>${title}</h3></div></div>
        <ul class="qr">${why.map(w=>`<li>${tk}<span>${w}</span></li>`).join('')}</ul>
        <div class="qact">${path?`<button class="btn ${path==='scale'?'btn-scale':'btn-launch'}" type="button" data-qopen="${path==='scale'?'call':'webinar'}">${path==='scale'?'Book a free strategy call':'Join the free webinar'}</button>`:''}<button type="button" class="back" data-restart>Retake the quiz</button></div>
        <form class="qmail" novalidate><p>Email me my result + the free checklist</p><div class="fld"><label class="sr" for="qzEmail">Email</label><div class="inl"><input class="inp" id="qzEmail" type="email" placeholder="you@email.com" autocomplete="email"><button class="btn btn-acc" type="submit"><span class="spin"></span><span>Send</span></button></div><span class="err">Enter an email like name@example.com.</span></div></form>`;
      if(path)setPath(path)}
    main.addEventListener('click',e=>{const o=e.target.closest('.qopt');
      if(o){a[i]=+o.dataset.j;o.classList.add('sel');setTimeout(()=>{i++;i<Q.length?q():result()},180);return}
      if(e.target.closest('[data-back]')){i=Math.max(0,i-1);q();return}
      if(e.target.closest('[data-restart]')){i=0;a=[];q();return}
      const b=e.target.closest('[data-qopen]');if(b)open(b.dataset.qopen)});
    main.addEventListener('submit',async e=>{e.preventDefault();const inp=$('#qzEmail');if(!chk_(inp))return;await load(e.target.querySelector('[type=submit]'),900);
      e.target.outerHTML=`<div class="ok"><svg class="i"><use href="#i-mail"/></svg><div><b>Sent.</b><span> Your result and the checklist are on the way to ${inp.value.trim()}.</span></div></div>`});
    const chk_=inp=>chk(inp,okE(inp.value));
    q();
  })();

