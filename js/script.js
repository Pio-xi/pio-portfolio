window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 450);
  }
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
  entry.target.classList.add('active');
  observer.unobserve(entry.target);
}
  });
}, { threshold: 0.15 });

revealElements.forEach((element) => observer.observe(element));

const roles = [
  'Full-Stack Developer',
  'Computer Engineer',
  'IT Support Specialist',
  'Web Developer',
  'Software Solutions Engineer'
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

/* ===== Animated Counters ===== */

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = +counter.dataset.target;

    let current = 0;
    const increment = target / 60;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";

counter.classList.add('pop');

setTimeout(() => {
  counter.classList.remove('pop');
}, 300);
      }
    };

    updateCounter();

    counterObserver.unobserve(counter);

  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

/* ===== Particle Parallax ===== */

window.addEventListener('scroll', () => {

  const scrollY = window.scrollY;

  document.querySelectorAll('.particle').forEach((particle, index) => {

    particle.style.transform =
      `translateY(${scrollY * (0.03 + index * 0.002)}px)`;

  });

});

/* ===== Scroll Progress ===== */

window.addEventListener('scroll', () => {

  const winScroll =
    document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled =
    (winScroll / height) * 100;

  const progress =
    document.getElementById('scrollProgress');

  if (progress) {
    progress.style.width = scrolled + '%';
  }

});

/* ===== Project Card Tilt ===== */

document.querySelectorAll('.project-card').forEach(card => {

  card.addEventListener('mousemove', (e) => {

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateY =
      (x / rect.width - 0.5) * 6;

    const rotateX =
      -(y / rect.height - 0.5) * 6;

    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-8px)`;

  });

  card.addEventListener('mouseleave', () => {

    card.style.transform = '';

  });

});

/* ===== Active Navigation ===== */

const sections =
  document.querySelectorAll('section[id]');

const navLinks =
  document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {

  let current = '';

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 120;

    const sectionHeight =
      section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute('id');
    }

  });

  navLinks.forEach(link => {

    link.classList.remove('active');

    if (
      link.getAttribute('href') ===
      `#${current}`
    ) {
      link.classList.add('active');
    }

  });

});

/* ===== Mobile Menu ===== */

const menuToggle =
  document.getElementById('menuToggle');

const mobileNav =
  document.getElementById('mobileNav');

if (menuToggle && mobileNav) {

  menuToggle.addEventListener('click', () => {

    mobileNav.classList.toggle('show');

  });

}

/* ===== Close Menu After Click ===== */

document.querySelectorAll('.nav-links a')
  .forEach(link => {

    link.addEventListener('click', () => {

      if (mobileNav) {
        mobileNav.classList.remove('show');
      }

    });

});