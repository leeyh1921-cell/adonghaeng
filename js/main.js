(function(){
    var b=document.getElementById('burger'), d=document.getElementById('drawer');
    b.addEventListener('click',function(){
      var open=d.hidden; d.hidden=!open;
      b.setAttribute('aria-expanded',String(open));
      b.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
    });
    d.addEventListener('click',function(e){
      if(e.target.tagName==='A'){d.hidden=true;b.setAttribute('aria-expanded','false');}
    });
    var au=document.getElementById('anthemAudio'), pb=document.getElementById('anthemBtn'),
        ic=document.getElementById('anthemIcon'), sk=document.getElementById('anthemSeek'),
        tm=document.getElementById('anthemTime');
    var PLAY='M8 5.5l11 6.5-11 6.5z', PAUSE='M7 5h3.5v14H7zM13.5 5H17v14h-3.5z';
    function fmt(t){t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}
    function paint(){ tm.textContent = fmt(au.currentTime)+' / '+fmt(au.duration||173); }
    pb.addEventListener('click',function(){ au.paused?au.play():au.pause(); });
    au.addEventListener('play',function(){ic.firstElementChild.setAttribute('d',PAUSE);pb.setAttribute('aria-label','봉사단가 일시정지');});
    au.addEventListener('pause',function(){ic.firstElementChild.setAttribute('d',PLAY);pb.setAttribute('aria-label','봉사단가 재생');});
    au.addEventListener('timeupdate',function(){ if(au.duration){sk.value=(au.currentTime/au.duration)*100;} paint(); });
    au.addEventListener('loadedmetadata',paint);
    sk.addEventListener('input',function(){ if(au.duration){au.currentTime=(sk.value/100)*au.duration;} });
    paint();
    document.documentElement.style.scrollBehavior='smooth';
    var s=document.createElement('style');
    s.textContent='section[id],div[id]{scroll-margin-top:calc(var(--nav-h) + 12px)}';
    document.head.appendChild(s);
  })();


(function(){
  var lb=document.getElementById('lb'), body=document.getElementById('lb-body'),
      one=document.getElementById('lb-one'), im=document.getElementById('lb-im'),
      cap=document.getElementById('lb-cap'), shots=[], cur=0;

  function pic(el){
    var d=el.querySelector('.im');
    if(!d) return {bg:'',alt:''};
    if(d.tagName==='IMG') return {bg:'url("'+d.getAttribute('src')+'")', alt:d.getAttribute('alt')||''};
    return {bg:getComputedStyle(d).backgroundImage, alt:d.getAttribute('aria-label')||''};
  }
  function openAlbum(key){
    var src=document.getElementById('alb-'+key); if(!src) return;
    document.getElementById('lb-time').textContent=src.dataset.time||'';
    document.getElementById('lb-title').textContent=src.dataset.title||'';
    document.getElementById('lb-small').textContent=src.dataset.small||'';
    body.innerHTML=''; body.appendChild(src.querySelector('.shots').cloneNode(true));
    shots=[].slice.call(body.querySelectorAll('.shot'));
    shots.forEach(function(f,n){
      f.setAttribute('tabindex','0'); f.setAttribute('role','button');
      f.addEventListener('click',function(){ showOne(n); });
      f.addEventListener('keydown',function(e){
        if(e.key==='Enter'||e.key===' '){ e.preventDefault(); showOne(n); } });
    });
    lb.hidden=false; document.body.classList.add('lb-open');
    document.getElementById('lb-x').focus(); lb.scrollTop=0;
  }
  function showOne(n){
    cur=(n+shots.length)%shots.length;
    var p=pic(shots[cur]), fc=shots[cur].querySelector('figcaption');
    im.style.backgroundImage=p.bg; im.setAttribute('aria-label',p.alt);
    cap.textContent=fc?fc.textContent.replace(/^\d+/,'').trim():'';
    one.hidden=false;
  }
  function closeOne(){ one.hidden=true; }
  function closeAll(){ closeOne(); lb.hidden=true; document.body.classList.remove('lb-open'); body.innerHTML=''; }

  [].forEach.call(document.querySelectorAll('.acard'),function(b){
    b.addEventListener('click',function(){ openAlbum(b.dataset.a); });
  });
  document.getElementById('lb-x').addEventListener('click',closeAll);
  document.getElementById('lb-prev').addEventListener('click',function(){ showOne(cur-1); });
  document.getElementById('lb-next').addEventListener('click',function(){ showOne(cur+1); });
  one.addEventListener('click',function(e){ if(e.target===one) closeOne(); });
  document.addEventListener('keydown',function(e){
    if(lb.hidden) return;
    if(e.key==='Escape'){ one.hidden?closeAll():closeOne(); }
    else if(!one.hidden&&e.key==='ArrowLeft'){ showOne(cur-1); }
    else if(!one.hidden&&e.key==='ArrowRight'){ showOne(cur+1); }
  });
})();
