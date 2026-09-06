(function(){
    var alb=document.getElementById('alb'), abody=document.getElementById('albBody');
    var lb=document.getElementById('lb'), img=document.getElementById('lbImg'),
        cap=document.getElementById('lbCap');
    var shots=[], i=0;

    function show(n){
      if(!shots.length) return;
      i=(n+shots.length)%shots.length;
      var f=shots[i], im=f.querySelector('img');
      img.src=im.src; img.alt=im.alt; cap.textContent=f.getAttribute('data-cap')||'';
      lb.classList.add('on');
    }
    function hide(){ lb.classList.remove('on'); img.src=''; }

    function openSet(key){
      var s=document.getElementById('set-'+key); if(!s) return;
      document.getElementById('albTitle').textContent=s.getAttribute('data-title')||'';
      var w=document.getElementById('albWhen');
      w.textContent=s.getAttribute('data-when')||'';
      w.className = s.getAttribute('data-unknown')==='1' ? 'when unknown' : 'when';
      document.getElementById('albNote').textContent=s.getAttribute('data-note')||'';
      abody.innerHTML='';
      abody.appendChild(s.querySelector('.grid').cloneNode(true));
      shots=Array.prototype.slice.call(abody.querySelectorAll('.shot'));
      shots.forEach(function(f,n){
        f.setAttribute('tabindex','0'); f.setAttribute('role','button');
        f.addEventListener('click',function(){show(n);});
        f.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();show(n);} });
      });
      alb.hidden=false; document.body.classList.add('alb-open');
      alb.scrollTop=0; document.getElementById('albX').focus();
    }
    function closeSet(){ hide(); alb.hidden=true; document.body.classList.remove('alb-open');
      abody.innerHTML=''; shots=[]; }

    Array.prototype.forEach.call(document.querySelectorAll('.acard'),function(b){
      b.addEventListener('click',function(){ openSet(b.getAttribute('data-a')); });
    });
    document.getElementById('albX').addEventListener('click',closeSet);
    document.getElementById('lbX').addEventListener('click',hide);
    document.getElementById('lbP').addEventListener('click',function(e){e.stopPropagation();show(i-1);});
    document.getElementById('lbN').addEventListener('click',function(e){e.stopPropagation();show(i+1);});
    lb.addEventListener('click',function(e){ if(e.target===lb) hide(); });
    document.addEventListener('keydown',function(e){
      if(lb.classList.contains('on')){
        if(e.key==='Escape') hide();
        else if(e.key==='ArrowLeft') show(i-1);
        else if(e.key==='ArrowRight') show(i+1);
        return;
      }
      if(!alb.hidden && e.key==='Escape') closeSet();
    });
  })();
