// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Nav active link highlight
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
