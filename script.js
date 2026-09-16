// ===================================================
// Mo Anas — Portfolio Script
// Theme toggle, mobile nav, and graceful image fallbacks
// ===================================================

// --- Theme toggle (dark default, light on click) ---
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  const icon = themeBtn.querySelector('i');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    icon.className = 'fa-solid fa-sun';
  }

  const toggleTheme = () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };

  themeBtn.addEventListener('click', toggleTheme);
  themeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
}

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Active link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
if (sections.length && navAnchors.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('active'));
          const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}

// --- Graceful fallback when profile.jpg / project images are missing ---
function handleImgFallback(img, type) {
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';

  const fallback = document.createElement('div');
  fallback.className = `img-fallback ${type}-fallback`;

  if (type === 'profile') {
    fallback.innerHTML = '<i class="fa-solid fa-user"></i>';
  } else {
    fallback.innerHTML = '<i class="fa-solid fa-chart-simple"></i>';
  }

  img.replaceWith(fallback);
}

// Expose globally since it's referenced via inline onerror attributes
window.handleImgFallback = handleImgFallback;
