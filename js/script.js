window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 450);
  }
});

const revealElements = document.querySelectorAll('.reveal, .skill-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((element) => observer.observe(element));

const roles = [
  'WordPress Developer',
  'IT Support Specialist',
  'Frontend Developer in Progress',
  'Networking Enthusiast',
  'Creative Digital Problem Solver'
];

const typingText = document.getElementById('typingText');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingText) return;

  const current = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingText.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 35 : 75);
}

typeEffect();

const particles = document.getElementById('particles');

if (particles) {
  for (let i = 0; i < 22; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 12 + 's';
    particle.style.animationDuration = 10 + Math.random() * 12 + 's';
    particle.style.opacity = 0.15 + Math.random() * 0.45;
    particles.appendChild(particle);
  }
}

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  if (themeToggle) themeToggle.textContent = '🌙';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });
}
