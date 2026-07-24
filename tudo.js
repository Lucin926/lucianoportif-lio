/* ==========================================================
   LUCIANO NOGUEIRA — PORTFOLIO SCRIPT
   ========================================================== */

// ===== NAV: scroll state + mobile menu =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Active link highlight
const sections = document.querySelectorAll('main section[id], header[id]');
function highlightNav() {
  const y = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (y >= top && y < top + height) link.classList.add('active');
      else link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });

// ===== TYPING EFFECT (hero terminal) =====
const typingEl = document.querySelector('.typing-text');
const roles = [
  'desenvolvedor back-end',
  'estudante de ciência da computação',
  'construtor de APIs e sistemas'
];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  if (!typingEl) return;
  const current = roles[roleIndex];
  let speed = deleting ? 45 : 80;

  if (!deleting && charIndex <= current.length) {
    typingEl.textContent = current.slice(0, charIndex);
    charIndex++;
    if (charIndex > current.length) { deleting = true; speed = 1600; }
  } else if (deleting) {
    typingEl.textContent = current.slice(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
      speed = 300;
    }
  }
  setTimeout(typeLoop, speed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(typeLoop, 600));

// ===== SCROLL REVEAL =====
// Content is visible by default in CSS. Here we ONLY opt elements
// into the hidden "pre-reveal" state right before observing them,
// so a slow/broken script never leaves the page blank.
try {
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pre-reveal');
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    el.classList.add('pre-reveal');
    revealObserver.observe(el);
  });
} catch (err) {
  console.warn('Reveal animation skipped:', err);
}

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = target.offsetTop - 84;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CONSOLE SIGNATURE =====
console.log('%c luciano.dev ', 'background:#17181C;color:#fff;font-family:monospace;font-size:13px;padding:6px 10px;border-radius:6px;');
console.log('%c GET /contato → lucianogueira156@gmail.com ', 'color:#3A5CFF;font-family:monospace;font-size:12px;');