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
