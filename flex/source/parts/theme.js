  /* ---------- Light / dark switch ---------- */
  (function(){
    const root=document.documentElement,btn=$('#themeBtn'),mq=matchMedia('(prefers-color-scheme: dark)');
    const isDark=()=>{const t=root.dataset.theme;return t?t==='dark':mq.matches};
    function sync(){const d=isDark();root.classList.toggle('is-dark',d);btn.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');btn.setAttribute('aria-pressed',String(d))}
    sync();mq.addEventListener('change',sync);new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-theme']});
    btn.addEventListener('click',()=>{const next=isDark()?'light':'dark',apply=()=>{root.dataset.theme=next;store.set('fa-theme',next)};
      if(document.startViewTransition&&!reduce){const r=btn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
        document.startViewTransition(apply).ready.then(()=>root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${R}px at ${x}px ${y}px)`]},{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',pseudoElement:'::view-transition-new(root)'})).catch(()=>{})}
      else apply()});
  })();

