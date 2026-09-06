(function(){
    var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
    var lb=document.getElementById('lb'), img=document.getElementById('lbImg'),
        cap=document.getElementById('lbCap'), i=0;
    function show(n){
      i=(n+shots.length)%shots.length;
      var f=shots[i], im=f.querySelector('img');
      img.src=im.src; img.alt=im.alt; cap.textContent=f.getAttribute('data-cap')||'';
      lb.classList.add('on'); document.body.style.overflow='hidden';
    }
    function hide(){ lb.classList.remove('on'); document.body.style.overflow=''; img.src=''; }
    shots.forEach(function(f,n){
      f.addEventListener('click',function(){show(n);});
      f.setAttribute('tabindex','0');
      f.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();show(n);} });
    });
    document.getElementById('lbX').addEventListener('click',hide);
    document.getElementById('lbP').addEventListener('click',function(e){e.stopPropagation();show(i-1);});
    document.getElementById('lbN').addEventListener('click',function(e){e.stopPropagation();show(i+1);});
    lb.addEventListener('click',function(e){ if(e.target===lb) hide(); });
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('on')) return;
      if(e.key==='Escape') hide();
      else if(e.key==='ArrowLeft') show(i-1);
      else if(e.key==='ArrowRight') show(i+1);
    });
  })();
