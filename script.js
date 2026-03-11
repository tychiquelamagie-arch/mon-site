// ── FORMULAIRE CONTACT ──
const btnEnvoyer = document.getElementById('btnEnvoyer');
const formSuccess = document.getElementById('formSuccess');

btnEnvoyer.addEventListener('click', () => {
  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const sujet   = document.getElementById('sujet').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!nom || !email || !sujet || !message) {
    alert('Merci de remplir tous les champs avant d\'envoyer !');
    return;
  }

  // Envoie le message via Formspree
  btnEnvoyer.textContent = 'Envoi en cours...';
  btnEnvoyer.disabled = true;

  fetch('https://formspree.io/f/maqpodjn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, email, sujet, message })
  })
  .then(res => {
    if (res.ok) {
      // Succès
      formSuccess.style.display = 'block';
      document.getElementById('nom').value = '';
      document.getElementById('email').value = '';
      document.getElementById('sujet').value = '';
      document.getElementById('message').value = '';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    } else {
      alert('❌ Une erreur est survenue. Réessaie ou contacte-moi directement.');
    }
  })
  .catch(() => {
    alert('❌ Connexion impossible. Vérifie ta connexion internet.');
  })
  .finally(() => {
    btnEnvoyer.textContent = 'Envoyer le message 📨';
    btnEnvoyer.disabled = false;
  });
});

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── NAV ACTIVE LINK ──
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 200;
  document.querySelectorAll('section[id]').forEach(sec => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      links.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (active) active.style.color = '#ff6b2b';
    }
  });
});
