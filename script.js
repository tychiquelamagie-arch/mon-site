/* ═══════════════════════════════════════════════
   Script.js — Portfolio Tychique Emmanuel
   Version complète — toutes fonctionnalités
═══════════════════════════════════════════════ */

/* ─────────────────────────────────────
   1. BOUTON "MON CV"
───────────────────────────────────────*/
window.showImpossible = function() {
  var msg = document.getElementById('impossibleMsg');
  if (!msg) return;
  msg.style.display = 'flex';
  var inner = msg.querySelector('.imp-inner');
  if (inner) { inner.style.animation = 'none'; setTimeout(function(){ inner.style.animation = 'popIn .4s cubic-bezier(.34,1.56,.64,1)'; }, 10); }
};
window.closeImpossible = function() {
  var msg = document.getElementById('impossibleMsg');
  if (!msg) return;
  msg.style.opacity = '0';
  setTimeout(function(){ msg.style.display = 'none'; msg.style.opacity = '1'; }, 250);
};
document.addEventListener('click', function(e) {
  var msg = document.getElementById('impossibleMsg');
  if (msg && e.target === msg) window.closeImpossible();
});

/* ─────────────────────────────────────
   2. ANIMATION NOM
───────────────────────────────────────*/
(function() {
  var n1 = document.getElementById('nameFirst');
  var n2 = document.getElementById('nameLast');
  if (!n1 || !n2) return;
  var THEMES = [
    {a:'#FFFFFF',b:'#FF8C00',s:'255,140,0'},
    {a:'#00DCFF',b:'#FFFFFF',s:'255,255,255'},
    {a:'#FF4ECD',b:'#00DCFF',s:'0,220,255'},
    {a:'#FFD700',b:'#FF8C00',s:'255,140,0'},
    {a:'#00FF88',b:'#A855F7',s:'168,85,247'},
    {a:'#FFFFFF',b:'#FF4ECD',s:'255,78,205'},
    {a:'#A855F7',b:'#00FF88',s:'0,255,136'},
    {a:'#00DCFF',b:'#FFD700',s:'255,215,0'},
  ];
  var idx = 0;
  function anim() {
    n1.classList.add('name-falling'); n2.classList.add('name-falling');
    setTimeout(function(){
      idx = (idx+1) % THEMES.length;
      var t = THEMES[idx];
      n1.style.color = t.a; n2.style.color = t.b;
      n2.style.textShadow = '0 0 50px rgba('+t.s+',.7)';
    }, 480);
    setTimeout(function(){ n1.classList.remove('name-falling'); n2.classList.remove('name-falling'); }, 1250);
  }
  setInterval(anim, 5000);
})();

/* ─────────────────────────────────────
   3. BOULES "QUI SUIS-JE"
───────────────────────────────────────*/
(function() {
  var c = document.getElementById('quiBalls');
  if (!c) return;
  var COLORS = ['#00DCFF','#FF8C00','#00FF88','#A855F7','#FF4ECD','#FFD700','#FF6B6B','#4ECDC4'];
  for (var i = 0; i < 18; i++) {
    var b = document.createElement('div'); b.className = 'qball';
    var sz = Math.random()*12+5, col = COLORS[i%COLORS.length];
    b.style.cssText = 'width:'+sz+'px;height:'+sz+'px;background:'+col+';left:'+(Math.random()*140-10)+'%;top:'+(Math.random()*80-15)+'px;box-shadow:0 0 '+(sz*1.5)+'px '+col+';animation-duration:'+(Math.random()*3+2.5)+'s;animation-delay:-'+(Math.random()*4)+'s;--dx1:'+(Math.random()-.5)*60+'px;--dy1:'+(Math.random()-.5)*40+'px;--dx2:'+(Math.random()-.5)*80+'px;--dy2:'+(Math.random()-.5)*50+'px;--dx3:'+(Math.random()-.5)*50+'px;--dy3:'+(Math.random()-.5)*35+'px;';
    c.appendChild(b);
  }
})();

/* ─────────────────────────────────────
   4. BOULES SECTIONS (Projets, Compétences, Ambitions, CV, Contact)
───────────────────────────────────────*/
(function() {
  var COLORS = ['#00DCFF','#FF8C00','#00FF88','#A855F7','#FF4ECD','#FFD700','#FF6B6B','#4ECDC4'];
  var IDS = ['projectsBalls','skillsBalls','ambitionsBalls','cvBalls','contactBalls'];
  IDS.forEach(function(id) {
    var c = document.getElementById(id);
    if (!c) return;
    for (var i = 0; i < 18; i++) {
      var b = document.createElement('div'); b.className = 'sball';
      var sz = Math.random()*12+5, col = COLORS[i%COLORS.length];
      b.style.cssText = 'width:'+sz+'px;height:'+sz+'px;background:'+col+';left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;box-shadow:0 0 '+(sz*1.5)+'px '+col+';animation-duration:'+(Math.random()*3+2.5)+'s;animation-delay:-'+(Math.random()*4)+'s;--dx1:'+(Math.random()-.5)*60+'px;--dy1:'+(Math.random()-.5)*40+'px;--dx2:'+(Math.random()-.5)*80+'px;--dy2:'+(Math.random()-.5)*50+'px;--dx3:'+(Math.random()-.5)*50+'px;--dy3:'+(Math.random()-.5)*35+'px;';
      c.appendChild(b);
    }
  });
})();

/* ─────────────────────────────────────
   5. CURSEUR PERSONNALISÉ
───────────────────────────────────────*/
var cursor = document.getElementById('cursor');
var cursorRing = document.getElementById('cursorRing');
var mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
(function animRing(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; cursorRing.style.left=rx+'px'; cursorRing.style.top=ry+'px'; requestAnimationFrame(animRing); })();
document.querySelectorAll('a,button,.htag,.atag,.proj-card,.skill-card,.clink').forEach(function(el){
  el.addEventListener('mouseenter',function(){ cursor.classList.add('hovered'); cursorRing.classList.add('hovered'); });
  el.addEventListener('mouseleave',function(){ cursor.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
});

/* ─────────────────────────────────────
   6. PARTICULES CANVAS
───────────────────────────────────────*/
var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);
function Particle(){ this.init(); }
Particle.prototype.init = function(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.vx=(Math.random()-.5)*.38; this.vy=(Math.random()-.5)*.38; this.r=Math.random()*1.4+.4; this.a=Math.random()*.45+.08; this.col=Math.random()>.5?'rgba(0,220,255,'+this.a+')':'rgba(255,140,0,'+(this.a*.55)+')'; };
Particle.prototype.update = function(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width)this.vx*=-1; if(this.y<0||this.y>canvas.height)this.vy*=-1; };
Particle.prototype.draw = function(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=this.col; ctx.fill(); };
var PARTS=[]; for(var i=0;i<80;i++) PARTS.push(new Particle());
(function animP(){ ctx.clearRect(0,0,canvas.width,canvas.height); PARTS.forEach(function(p){p.update();p.draw();}); for(var i=0;i<PARTS.length;i++) for(var j=i+1;j<PARTS.length;j++){ var dx=PARTS[i].x-PARTS[j].x,dy=PARTS[i].y-PARTS[j].y,d=Math.sqrt(dx*dx+dy*dy); if(d<110){ctx.beginPath();ctx.moveTo(PARTS[i].x,PARTS[i].y);ctx.lineTo(PARTS[j].x,PARTS[j].y);ctx.strokeStyle='rgba(0,220,255,'+((1-d/110)*.13)+')';ctx.lineWidth=.5;ctx.stroke();} } requestAnimationFrame(animP); })();

/* ─────────────────────────────────────
   7. HORLOGE ANALOGIQUE
───────────────────────────────────────*/
var hHand=document.getElementById('hHand'), mHand=document.getElementById('mHand'), sHand=document.getElementById('sHand'), rotRing=document.getElementById('rotRing'), ticks=document.getElementById('ticks');
for(var t=0;t<60;t++){
  var maj=t%5===0, r1=maj?112:118, rad=(t/60*360-90)*(Math.PI/180);
  var ln=document.createElementNS('http://www.w3.org/2000/svg','line');
  ln.setAttribute('x1',150+r1*Math.cos(rad)); ln.setAttribute('y1',150+r1*Math.sin(rad));
  ln.setAttribute('x2',150+123*Math.cos(rad)); ln.setAttribute('y2',150+123*Math.sin(rad));
  ln.setAttribute('stroke',maj?'rgba(0,220,255,.6)':'rgba(0,220,255,.2)'); ln.setAttribute('stroke-width',maj?'2':'1');
  ticks.appendChild(ln);
}
var ringAngle=0;
(function animClock(){
  var now=new Date(), h=now.getHours()%12, m=now.getMinutes(), s=now.getSeconds(), ms=now.getMilliseconds();
  hHand.setAttribute('transform','rotate('+((h+m/60)*30)+',150,150)');
  mHand.setAttribute('transform','rotate('+((m+s/60)*6)+',150,150)');
  sHand.setAttribute('transform','rotate('+((s+ms/1000)*6)+',150,150)');
  ringAngle+=.12; rotRing.setAttribute('transform','rotate('+ringAngle+',150,150)');
  requestAnimationFrame(animClock);
})();

/* ─────────────────────────────────────
   8. COULEURS AIGUILLES (chaque seconde)
───────────────────────────────────────*/
(function(){
  var C=['#00DCFF','#FF8C00','#00FF88','#A855F7','#FF4ECD','#FFD700','#FF6B6B','#4ECDC4','#FF3366','#33FF99','#FF9900','#00CCFF','#FF00FF','#00FF00','#FFFF00','#FF4444','#44FFFF','#FF8844','#88FF44','#4488FF','#FF44FF','#44FF88','#FFAA00','#00FFAA','#AA00FF','#FF00AA','#00AAFF','#AAFF00','#FF5500','#0055FF','#55FF00','#FF0055','#00FF55','#5500FF','#FFDD00','#00FFDD','#DD00FF','#FF00DD','#00DDFF','#DDFF00','#FF6600','#0066FF','#66FF00','#FF0066','#00FF66','#6600FF','#FFCC00','#00FFCC','#CC00FF','#FF00CC','#00CCFF','#CCFF00','#FF7700','#0077FF','#77FF00','#FF0077','#00FF77','#7700FF','#FFBB00','#00FFBB'];
  var last=-1, idx=0;
  function tick(){
    var s=new Date().getSeconds();
    if(s!==last){ last=s; idx=(idx+1)%C.length;
      var c1=C[idx], c2=C[(idx+20)%C.length], c3=C[(idx+40)%C.length];
      sHand.setAttribute('stroke',c1); sHand.style.filter='drop-shadow(0 0 6px '+c1+') drop-shadow(0 0 12px '+c1+')';
      mHand.setAttribute('stroke',c2); mHand.style.filter='drop-shadow(0 0 5px '+c2+') drop-shadow(0 0 10px '+c2+')';
      hHand.setAttribute('stroke',c3); hHand.style.filter='drop-shadow(0 0 4px '+c3+') drop-shadow(0 0 8px '+c3+')';
      var cd=document.querySelector('#clockSVG circle:nth-last-child(2)');
      if(cd) cd.setAttribute('fill',c1);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ─────────────────────────────────────
   9. HORLOGE DIGITALE
───────────────────────────────────────*/
var JOURS=['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'];
var MOIS=['JAN','FÉV','MAR','AVR','MAI','JUN','JUL','AOÛ','SEP','OCT','NOV','DÉC'];
function updateDigital(){
  var n=new Date();
  document.getElementById('dtime').textContent=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0')+':'+String(n.getSeconds()).padStart(2,'0');
  document.getElementById('ddate').textContent=JOURS[n.getDay()]+' '+String(n.getDate()).padStart(2,'0')+' '+MOIS[n.getMonth()]+' '+n.getFullYear();
}
setInterval(updateDigital,1000); updateDigital();

/* ─────────────────────────────────────
   10. EFFET DE FRAPPE
───────────────────────────────────────*/
var ROLES=['Innovateur Digital','Développeur Web','Étudiant en Informatique','Créateur de Solutions','Passionné du Code'];
var rIdx=0,cIdx=0,deleting=false,paused=false;
var typedEl=document.getElementById('typedText');
function type(){
  if(paused) return;
  var cur=ROLES[rIdx];
  if(!deleting){ typedEl.textContent=cur.substring(0,cIdx+1); cIdx++;
    if(cIdx===cur.length){paused=true;setTimeout(function(){deleting=true;paused=false;setTimeout(type,60);},2200);return;}
    setTimeout(type,85);
  } else { typedEl.textContent=cur.substring(0,cIdx-1); cIdx--;
    if(cIdx===0){deleting=false;rIdx=(rIdx+1)%ROLES.length;setTimeout(type,400);return;}
    setTimeout(type,48);
  }
}
setTimeout(type,1400);

/* ─────────────────────────────────────
   11. NAVBAR SCROLL + LIENS ACTIFS
───────────────────────────────────────*/
var navbar=document.getElementById('navbar');
window.addEventListener('scroll',function(){ navbar.classList.toggle('scrolled',window.scrollY>60); });
document.querySelectorAll('section[id]').forEach(function(sec){
  new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) document.querySelectorAll('.nav-a').forEach(function(a){ a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id); }); });
  },{threshold:0.45}).observe(sec);
});

/* ─────────────────────────────────────
   12. REVEAL AU SCROLL
───────────────────────────────────────*/
var revObs=new IntersectionObserver(function(entries){ entries.forEach(function(e,i){ if(e.isIntersecting){setTimeout(function(){e.target.classList.add('visible');},i*80);revObs.unobserve(e.target);} });},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(function(el){revObs.observe(el);});

/* ─────────────────────────────────────
   13. BARRES COMPÉTENCES
───────────────────────────────────────*/
var skillObs=new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){e.target.querySelectorAll('.sb-fill').forEach(function(b){b.style.width=b.dataset.w+'%';});skillObs.unobserve(e.target);} });},{threshold:0.25});
document.querySelectorAll('.skill-card').forEach(function(c){skillObs.observe(c);});

/* ─────────────────────────────────────
   14. HAMBURGER MENU
───────────────────────────────────────*/
var hamburger=document.getElementById('hamburger');
var navLinks=document.getElementById('navLinks');
var menuOpen=false;
hamburger.addEventListener('click',function(){
  menuOpen=!menuOpen;
  navLinks.style.cssText=menuOpen?'display:flex;flex-direction:column;position:absolute;top:62px;left:0;right:0;background:rgba(6,8,16,.98);padding:1.5rem 2rem;gap:1rem;border-bottom:1px solid rgba(0,220,255,.2);z-index:999;':'display:none;';
});
navLinks.querySelectorAll('.nav-a').forEach(function(a){ a.addEventListener('click',function(){menuOpen=false;navLinks.style.display='none';}); });

/* ─────────────────────────────────────
   15. SCROLL DOUX
───────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){ var t=document.querySelector(a.getAttribute('href')); if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});} });
});

/* ─────────────────────────────────────
   16. FORMULAIRE DE CONTACT
───────────────────────────────────────*/
var EMAILJS_PUBLIC_KEY='0fu5JOYB2SgZ7qKPS';
var EMAILJS_SERVICE_ID='service_420xdk9';
var EMAILJS_TEMPLATE_ID='cn2hwe8';
var WHATSAPP_NUMBER='2250788890448';
emailjs.init({publicKey:EMAILJS_PUBLIC_KEY});
var currentChoice=null;

window.prepareSend=function(choice){
  var name=document.getElementById('fName').value.trim();
  var email=document.getElementById('fEmail').value.trim();
  var subject=document.getElementById('fSubject').value.trim();
  var message=document.getElementById('fMessage').value.trim();
  if(!name||!email||!subject||!message){showAlert('⚠️ Veuillez remplir tous les champs','error');return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showAlert('⚠️ Adresse email invalide','error');return;}
  currentChoice=choice;
  var btn=document.getElementById('btnSend'), btnText=document.getElementById('btnText');
  btn.classList.remove('ready-email','ready-wa','ready'); btn.classList.add('ready');
  if(choice==='email'){btn.classList.add('ready-email');btnText.textContent='Envoyer par Email';document.getElementById('btnChoiceEmail').classList.add('active');document.getElementById('btnChoiceWa').classList.remove('active');}
  else{btn.classList.add('ready-wa');btnText.textContent='Envoyer par WhatsApp';document.getElementById('btnChoiceWa').classList.add('active');document.getElementById('btnChoiceEmail').classList.remove('active');}
  showAlert('✅ Prêt à envoyer ! Clique sur le bouton','success');
};

window.sendMessage=function(){
  if(!currentChoice){showAlert("⚠️ Choisis d'abord Email ou WhatsApp",'error');return;}
  var name=document.getElementById('fName').value.trim();
  var email=document.getElementById('fEmail').value.trim();
  var subject=document.getElementById('fSubject').value.trim();
  var message=document.getElementById('fMessage').value.trim();
  var btn=document.getElementById('btnSend'), btnText=document.getElementById('btnText'), btnIcon=document.getElementById('btnIcon');
  btnIcon.className='fa-solid fa-circle-notch'; btnText.textContent='Envoi en cours';
  btn.classList.add('sending'); btn.disabled=true;
  if(currentChoice==='email'){
    emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{from_name:name,from_email:email,subject:subject,message:message,reply_to:email})
    .then(function(){btnIcon.className='fa-solid fa-check';btnText.textContent='Envoyé !';btn.classList.add('success');showAlert('✅ Message envoyé !','success');setTimeout(resetForm,2000);})
    .catch(function(err){btnIcon.className='fa-solid fa-times';btnText.textContent='Erreur';btn.classList.add('error');showAlert('❌ Erreur : '+err.text,'error');setTimeout(resetForm,2000);});
  } else {
    setTimeout(function(){
      window.open('https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent('👤 *Nom :* '+name+'\n📧 *Email :* '+email+'\n💡 *Sujet :* '+subject+'\n\n💬 *Message :*\n'+message),'_blank');
      btnIcon.className='fa-solid fa-check'; btnText.textContent='WhatsApp ouvert !';
      btn.classList.add('success'); showAlert('✅ WhatsApp ouvert !','success'); setTimeout(resetForm,2000);
    },1000);
  }
};

function resetForm(){
  var btn=document.getElementById('btnSend');
  document.getElementById('btnIcon').className='fa-solid fa-paper-plane';
  document.getElementById('btnText').textContent="Choisis d'abord Email ou WhatsApp";
  btn.classList.remove('sending','success','error','ready','ready-email','ready-wa'); btn.disabled=false;
  document.querySelectorAll('.btn-choice').forEach(function(b){b.classList.remove('active');});
  currentChoice=null;
}

/* ─────────────────────────────────────
   17. CHANGEMENT COULEUR TOUTES LES 5 SECONDES
   Projets, Ambitions, CV, Contact
───────────────────────────────────────*/
(function(){
  var PALETTES = [
    {c1:'#00DCFF', c2:'rgba(0,220,255,0.15)',  glow:'0 0 60px rgba(0,220,255,0.4)'},
    {c1:'#FF8C00', c2:'rgba(255,140,0,0.15)',  glow:'0 0 60px rgba(255,140,0,0.4)'},
    {c1:'#A855F7', c2:'rgba(168,85,247,0.15)', glow:'0 0 60px rgba(168,85,247,0.4)'},
    {c1:'#00FF88', c2:'rgba(0,255,136,0.15)',  glow:'0 0 60px rgba(0,255,136,0.4)'},
    {c1:'#FF4ECD', c2:'rgba(255,78,205,0.15)', glow:'0 0 60px rgba(255,78,205,0.4)'},
    {c1:'#FFD700', c2:'rgba(255,215,0,0.15)',  glow:'0 0 60px rgba(255,215,0,0.4)'},
    {c1:'#FF6B6B', c2:'rgba(255,107,107,0.15)',glow:'0 0 60px rgba(255,107,107,0.4)'},
    {c1:'#4ECDC4', c2:'rgba(78,205,196,0.15)', glow:'0 0 60px rgba(78,205,196,0.4)'},
  ];

  var SECTION_TITLES = {
    'projects':   'Mes Projets',
    'ambitions':  'Mes Ambitions',
    'cv-section': 'Mon CV',
    'contact':    'Travaillons Ensemble'
  };

  var idx = 0;

  /* Animation d'écriture lettre par lettre */
  function typeWrite(el, text, color) {
    el.textContent = '';
    el.style.color = color;
    el.style.textShadow = '0 0 25px ' + color;
    var i = 0;
    var interval = setInterval(function(){
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
  }

  function applyColor(){
    idx = (idx + 1) % PALETTES.length;
    var p = PALETTES[idx];

    Object.keys(SECTION_TITLES).forEach(function(id){
      var sec = document.getElementById(id);
      if (!sec) return;

      /* Glow autour de la section */
      sec.style.transition = 'box-shadow 1s ease';
      sec.style.boxShadow = p.glow + ', inset 0 0 80px ' + p.c2;

      /* Animation écriture sur le titre .wc */
      var wc = sec.querySelector('.wc');
      if (wc) typeWrite(wc, wc.getAttribute('data-text') || wc.textContent, p.c1);

      /* Couleur de la ligne .line-o */
      var lo = sec.querySelector('.line-o');
      if (lo) { lo.style.transition = 'background 1s ease'; lo.style.background = p.c1; }

      /* Couleur des boules */
      sec.querySelectorAll('.sball').forEach(function(b, i){
        if (i % 2 === 0) { b.style.background = p.c1; b.style.boxShadow = '0 0 12px ' + p.c1; }
      });
    });
  }

  /* Sauvegarder le texte original des titres */
  Object.keys(SECTION_TITLES).forEach(function(id){
    var sec = document.getElementById(id);
    if (!sec) return;
    var wc = sec.querySelector('.wc');
    if (wc && !wc.getAttribute('data-text')) wc.setAttribute('data-text', wc.textContent);
  });

  setTimeout(applyColor, 1000);
  setInterval(applyColor, 5000);
})();

window.showAlert=function(msg,type){
  var box=document.getElementById('alertBox');
  box.textContent=msg; box.className='alert-box '+type; box.style.display='block'; box.style.opacity='1';
  setTimeout(function(){box.style.opacity='0';setTimeout(function(){box.style.display='none';box.style.opacity='1';},500);},4000);
};
