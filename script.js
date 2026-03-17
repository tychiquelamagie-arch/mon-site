/* ═══════════════════════════════════════════════
   SCRIPT.JS — Portfolio Tychique Emmanuel
   Version complète avec toutes les fonctionnalités
═══════════════════════════════════════════════ */

/* ─────────────────────────────────────
   0. BOUTON "MON CV" → SCROLL + AFFICHAGE CV
───────────────────────────────────────*/
window.showImpossible = function() {
  const msg = document.getElementById('impossibleMsg');
  if (msg) {
    msg.style.display = 'flex';
    const inner = msg.querySelector('.imp-inner');
    if (inner) {
      inner.style.animation = 'none';
      setTimeout(() => { inner.style.animation = 'popIn .4s cubic-bezier(.34,1.56,.64,1)'; }, 10);
    }
  }
};

window.closeImpossible = function() {
  const msg = document.getElementById('impossibleMsg');
  if (!msg) return;
  msg.style.animation = 'fadeOut .25s ease forwards';
  setTimeout(() => { msg.style.display = 'none'; msg.style.animation = ''; }, 250);
};

document.addEventListener('click', e => {
  const msg = document.getElementById('impossibleMsg');
  if (msg && e.target === msg) window.closeImpossible();
});

const extraStyles = document.createElement('style');
extraStyles.textContent = `
  @keyframes fadeOut { from{opacity:1} to{opacity:0} }
`;
document.head.appendChild(extraStyles);


/* ─────────────────────────────────────
   0c. ANIMATION NOM — TOMBE & RÉAPPARAÎT
───────────────────────────────────────*/
(function initNameAnimation() {
  const nameFirst = document.getElementById('nameFirst');
  const nameLast  = document.getElementById('nameLast');
  if (!nameFirst || !nameLast) return;

  const THEMES = [
    { n1: '#FFFFFF',  n2: '#FF8C00', shadow2: '255,140,0'   },
    { n1: '#00DCFF',  n2: '#FFFFFF', shadow2: '255,255,255' },
    { n1: '#FF4ECD',  n2: '#00DCFF', shadow2: '0,220,255'   },
    { n1: '#FFD700',  n2: '#FF8C00', shadow2: '255,140,0'   },
    { n1: '#00FF88',  n2: '#A855F7', shadow2: '168,85,247'  },
    { n1: '#FFFFFF',  n2: '#FF4ECD', shadow2: '255,78,205'  },
    { n1: '#A855F7',  n2: '#00FF88', shadow2: '0,255,136'   },
    { n1: '#00DCFF',  n2: '#FFD700', shadow2: '255,215,0'   },
  ];

  let themeIndex = 0;

  function animateName() {
    nameFirst.classList.add('name-falling');
    nameLast.classList.add('name-falling');

    setTimeout(() => {
      themeIndex = (themeIndex + 1) % THEMES.length;
      const t = THEMES[themeIndex];

      nameFirst.style.color      = t.n1;
      nameFirst.style.textShadow = `0 0 40px rgba(${t.n1 === '#FFFFFF' ? '255,255,255' : t.n1.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.5)`;

      nameLast.style.color      = t.n2;
      nameLast.style.textShadow = `0 0 50px rgba(${t.shadow2},0.7)`;
    }, 480);

    setTimeout(() => {
      nameFirst.classList.remove('name-falling');
      nameLast.classList.remove('name-falling');
    }, 1250);
  }

  setInterval(animateName, 5000);
})();


/* ─────────────────────────────────────
   0d. BOULES ANIMÉES "QUI SUIS-JE"
───────────────────────────────────────*/
(function initQuiBalls() {
  const container = document.getElementById('quiBalls');
  if (!container) return;

  const COLORS = [
    '#00DCFF', '#FF8C00', '#00FF88', '#A855F7',
    '#FF4ECD', '#FFD700', '#FF6B6B', '#4ECDC4'
  ];

  const BALL_COUNT = 18;

  for (let i = 0; i < BALL_COUNT; i++) {
    const ball = document.createElement('div');
    ball.className = 'qball';

    const size   = Math.random() * 12 + 5;
    const color  = COLORS[i % COLORS.length];
    const delay  = Math.random() * 4;
    const dur    = Math.random() * 3 + 2.5;

    const startX = Math.random() * 140 - 10;
    const startY = Math.random() * 80 - 15;

    const dx1 = (Math.random() - 0.5) * 60 + 'px';
    const dy1 = (Math.random() - 0.5) * 40 + 'px';
    const dx2 = (Math.random() - 0.5) * 80 + 'px';
    const dy2 = (Math.random() - 0.5) * 50 + 'px';
    const dx3 = (Math.random() - 0.5) * 50 + 'px';
    const dy3 = (Math.random() - 0.5) * 35 + 'px';

    ball.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${startX}%;
      top: ${startY}px;
      box-shadow: 0 0 ${size * 1.5}px ${color};
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      --dx1: ${dx1}; --dy1: ${dy1};
      --dx2: ${dx2}; --dy2: ${dy2};
      --dx3: ${dx3}; --dy3: ${dy3};
    `;
    container.appendChild(ball);
  }
})();


/* ─────────────────────────────────────
   1. CURSEUR PERSONNALISÉ
───────────────────────────────────────*/
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .htag, .atag, .proj-card, .skill-card, .clink').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorRing.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorRing.classList.remove('hovered');
  });
});


/* ─────────────────────────────────────
   2. PARTICULES CANVAS
───────────────────────────────────────*/
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.init(); }
  init() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.38;
    this.vy = (Math.random() - 0.5) * 0.38;
    this.r  = Math.random() * 1.4 + 0.4;
    this.a  = Math.random() * 0.45 + 0.08;
    this.col = Math.random() > 0.5
      ? `rgba(0,220,255,${this.a})`
      : `rgba(255,140,0,${this.a * 0.55})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.col;
    ctx.fill();
  }
}

const PARTS = Array.from({ length: 80 }, () => new Particle());

function drawLines() {
  for (let i = 0; i < PARTS.length; i++) {
    for (let j = i + 1; j < PARTS.length; j++) {
      const dx = PARTS[i].x - PARTS[j].x;
      const dy = PARTS[i].y - PARTS[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(PARTS[i].x, PARTS[i].y);
        ctx.lineTo(PARTS[j].x, PARTS[j].y);
        ctx.strokeStyle = `rgba(0,220,255,${(1 - d / 110) * 0.13})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
}

(function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  PARTS.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animParticles);
})();


/* ─────────────────────────────────────
   3. HORLOGE ANALOGIQUE
───────────────────────────────────────*/
const hHand  = document.getElementById('hHand');
const mHand  = document.getElementById('mHand');
const sHand  = document.getElementById('sHand');
const rotRing = document.getElementById('rotRing');
const ticks  = document.getElementById('ticks');

for (let i = 0; i < 60; i++) {
  const isMaj = i % 5 === 0;
  const r1  = isMaj ? 112 : 118;
  const rad = (i / 60 * 360 - 90) * (Math.PI / 180);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', 150 + r1   * Math.cos(rad));
  line.setAttribute('y1', 150 + r1   * Math.sin(rad));
  line.setAttribute('x2', 150 + 123  * Math.cos(rad));
  line.setAttribute('y2', 150 + 123  * Math.sin(rad));
  line.setAttribute('stroke', isMaj ? 'rgba(0,220,255,.6)' : 'rgba(0,220,255,.2)');
  line.setAttribute('stroke-width', isMaj ? '2' : '1');
  ticks.appendChild(line);
}

let ringAngle = 0;
(function animClock() {
  const now = new Date();
  const h = now.getHours() % 12, m = now.getMinutes(),
        s = now.getSeconds(),    ms = now.getMilliseconds();

  const secDeg  = (s + ms / 1000) * 6;
  const minDeg  = (m + s / 60) * 6;
  const hourDeg = (h + m / 60) * 30;

  hHand.setAttribute('transform',  `rotate(${hourDeg},150,150)`);
  mHand.setAttribute('transform',  `rotate(${minDeg},150,150)`);
  sHand.setAttribute('transform',  `rotate(${secDeg},150,150)`);
  ringAngle += 0.12;
  rotRing.setAttribute('transform', `rotate(${ringAngle},150,150)`);

  requestAnimationFrame(animClock);
})();


/* ─────────────────────────────────────
   4. HORLOGE DIGITALE
───────────────────────────────────────*/
const JOURS = ['DIMANCHE','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI'];
const MOIS  = ['JAN','FÉV','MAR','AVR','MAI','JUN','JUL','AOÛ','SEP','OCT','NOV','DÉC'];

function updateDigital() {
  const n = new Date();
  const h = String(n.getHours()).padStart(2,'0');
  const m = String(n.getMinutes()).padStart(2,'0');
  const s = String(n.getSeconds()).padStart(2,'0');
  document.getElementById('dtime').textContent = `${h}:${m}:${s}`;
  document.getElementById('ddate').textContent =
    `${JOURS[n.getDay()]} ${String(n.getDate()).padStart(2,'0')} ${MOIS[n.getMonth()]} ${n.getFullYear()}`;
}
setInterval(updateDigital, 1000);
updateDigital();


/* ─────────────────────────────────────
   5. EFFET DE FRAPPE
───────────────────────────────────────*/
const ROLES = [
  'Innovateur Digital',
  'Développeur Web',
  'Étudiant en Informatique',
  'Créateur de Solutions',
  'Passionné du Code',
];
let rIdx = 0, cIdx = 0, deleting = false, paused = false;
const typedEl = document.getElementById('typedText');

function type() {
  if (paused) return;
  const cur = ROLES[rIdx];
  if (!deleting) {
    typedEl.textContent = cur.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === cur.length) {
      paused = true;
      setTimeout(() => { deleting = true; paused = false; setTimeout(type, 60); }, 2200);
      return;
    }
    setTimeout(type, 85);
  } else {
    typedEl.textContent = cur.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % ROLES.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 48);
  }
}
setTimeout(type, 1400);


/* ─────────────────────────────────────
   6. NAVBAR SCROLL + LIENS ACTIFS
───────────────────────────────────────*/
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-a');

allSections.forEach(sec => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        allNavLinks.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`)
        );
      }
    });
  }, { threshold: 0.45 }).observe(sec);
});


/* ─────────────────────────────────────
   7. REVEAL AU SCROLL
───────────────────────────────────────*/
const reveals = document.querySelectorAll('.reveal');
const revObs  = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revObs.observe(el));


/* ─────────────────────────────────────
   8. BARRES DE COMPÉTENCES
───────────────────────────────────────*/
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sb-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.skill-card').forEach(card => skillObs.observe(card));


/* ─────────────────────────────────────
   9. HAMBURGER MENU
───────────────────────────────────────*/
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    navLinks.style.cssText = `
      display:flex; flex-direction:column; position:absolute;
      top:62px; left:0; right:0;
      background:rgba(6,8,16,.98); padding:1.5rem 2rem; gap:1rem;
      border-bottom:1px solid rgba(0,220,255,.2); z-index:999;
    `;
  } else {
    navLinks.style.display = 'none';
  }
});

navLinks.querySelectorAll('.nav-a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    navLinks.style.display = 'none';
  });
});


/* ─────────────────────────────────────
   10. SCROLL DOUX
───────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─────────────────────────────────────
   11. ANIMATIONS BOULES POUR AMBITIONS
───────────────────────────────────────*/
(function initAmbitionsBalls() {
  const container = document.getElementById('ambitionsBalls');
  if (!container) return;

  const COLORS = [
    '#00DCFF', '#FF8C00', '#00FF88', '#A855F7',
    '#FF4ECD', '#FFD700', '#FF6B6B', '#4ECDC4'
  ];

  const BALL_COUNT = 18;

  for (let i = 0; i < BALL_COUNT; i++) {
    const ball = document.createElement('div');
    ball.className = 'ambition-ball';

    const size   = Math.random() * 12 + 5;
    const color  = COLORS[i % COLORS.length];
    const delay  = Math.random() * 4;
    const dur    = Math.random() * 3 + 2.5;

    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    const dx1 = (Math.random() - 0.5) * 60 + 'px';
    const dy1 = (Math.random() - 0.5) * 40 + 'px';
    const dx2 = (Math.random() - 0.5) * 80 + 'px';
    const dy2 = (Math.random() - 0.5) * 50 + 'px';
    const dx3 = (Math.random() - 0.5) * 50 + 'px';
    const dy3 = (Math.random() - 0.5) * 35 + 'px';

    ball.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${startX}%;
      top: ${startY}%;
      box-shadow: 0 0 ${size * 1.5}px ${color};
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      --dx1: ${dx1}; --dy1: ${dy1};
      --dx2: ${dx2}; --dy2: ${dy2};
      --dx3: ${dx3}; --dy3: ${dy3};
    `;
    container.appendChild(ball);
  }
})();


/* ─────────────────────────────────────
   FORMULAIRE DE CONTACT AVEC CHOIX
───────────────────────────────────────*/

// CONFIGURATION EMAILJS
const EMAILJS_PUBLIC_KEY  = '0fu5JOYB2SgZ7qKPS';
const EMAILJS_SERVICE_ID  = 'service_420xdk9';
const EMAILJS_TEMPLATE_ID = 'cn2hwe8';
const WHATSAPP_NUMBER     = '2250788890448';

// Initialisation EmailJS
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY
});

// Variable pour stocker le choix
let currentChoice = null;

// Fonction pour préparer l'envoi
window.prepareSend = function(choice) {
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const subject = document.getElementById('fSubject').value.trim();
  const message = document.getElementById('fMessage').value.trim();

  // Vérification des champs
  if (!name || !email || !subject || !message) {
    showAlert('⚠️ Veuillez remplir tous les champs', 'error');
    return;
  }

  // Vérification email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert('⚠️ Adresse email invalide', 'error');
    return;
  }

  // Stocker le choix
  currentChoice = choice;

  // Récupérer le bouton
  const btnSend = document.getElementById('btnSend');
  const btnText = document.getElementById('btnText');

  // Enlever les anciennes classes
  btnSend.classList.remove('ready-email', 'ready-wa', 'ready');

  // Ajouter les classes appropriées
  btnSend.classList.add('ready');

  if (choice === 'email') {
    btnSend.classList.add('ready-email');
    btnText.textContent = 'Envoyer par Email';
  } else {
    btnSend.classList.add('ready-wa');
    btnText.textContent = 'Envoyer par WhatsApp';
  }

  // Mettre en évidence le bouton choisi
  document.querySelectorAll('.btn-choice').forEach(btn => {
    btn.classList.remove('active');
  });
  if (choice === 'email') {
    document.getElementById('btnChoiceEmail').classList.add('active');
  } else {
    document.getElementById('btnChoiceWa').classList.add('active');
  }

  // Animation du bouton
  btnSend.style.transform = 'scale(1.05)';
  setTimeout(() => {
    btnSend.style.transform = 'scale(1)';
  }, 200);

  showAlert('✅ Prêt à envoyer ! Clique sur le bouton', 'success');
}

// Fonction d'envoi
window.sendMessage = function() {
  if (!currentChoice) {
    showAlert('⚠️ Choisis d\'abord Email ou WhatsApp', 'error');

    // Animation d'erreur sur le bouton
    const btnSend = document.getElementById('btnSend');
    btnSend.classList.add('error');
    setTimeout(() => {
      btnSend.classList.remove('error');
    }, 500);

    return;
  }

  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const subject = document.getElementById('fSubject').value.trim();
  const message = document.getElementById('fMessage').value.trim();
  const btn = document.getElementById('btnSend');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');

  // Changer l'icône et le texte
  btnIcon.className = 'fa-solid fa-circle-notch';
  btnText.textContent = 'Envoi en cours';
  btn.classList.add('sending');
  btn.disabled = true;

  if (currentChoice === 'email') {
    // Envoi par Email
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      reply_to: email
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        // Succès
        btnIcon.className = 'fa-solid fa-check';
        btnText.textContent = 'Envoyé !';
        btn.classList.add('success');
        showAlert('✅ Message envoyé avec succès !', 'success');

        setTimeout(() => {
          resetForm();
        }, 2000);
      })
      .catch((error) => {
        // Erreur
        console.error('Erreur:', error);
        btnIcon.className = 'fa-solid fa-times';
        btnText.textContent = 'Erreur';
        btn.classList.add('error');
        showAlert('❌ Erreur: ' + error.text, 'error');

        setTimeout(() => {
          resetForm();
        }, 2000);
      });

  } else {
    // Envoi par WhatsApp
    setTimeout(() => {
      const waMsg = encodeURIComponent(
        `👤 *Nom :* ${name}\n` +
        `📧 *Email :* ${email}\n` +
        `💡 *Sujet :* ${subject}\n\n` +
        `💬 *Message :*\n${message}`
      );

      const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
      window.open(waURL, '_blank');

      btnIcon.className = 'fa-solid fa-check';
      btnText.textContent = 'WhatsApp ouvert !';
      btn.classList.add('success');
      showAlert('✅ WhatsApp ouvert ! Envoie ton message', 'success');

      setTimeout(() => {
        resetForm();
      }, 2000);
    }, 1000);
  }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
  const btn = document.getElementById('btnSend');
  const btnIcon = document.getElementById('btnIcon');
  const btnText = document.getElementById('btnText');

  btnIcon.className = 'fa-solid fa-paper-plane';
  btnText.textContent = 'Choisis d\'abord Email ou WhatsApp';
  btn.classList.remove('sending', 'success', 'error', 'ready', 'ready-email', 'ready-wa');
  btn.disabled = false;

  document.querySelectorAll('.btn-choice').forEach(btn => {
    btn.classList.remove('active');
  });

  currentChoice = null;
}

// Fonction pour afficher les alertes
window.showAlert = function(msg, type) {
  const box = document.getElementById('alertBox');
  box.textContent = msg;
  box.className = `alert-box ${type}`;
  box.style.display = 'block';

  setTimeout(() => {
    box.style.opacity = '0';
    setTimeout(() => {
      box.style.display = 'none';
      box.style.opacity = '1';
    }, 500);
  }, 4000);
}
