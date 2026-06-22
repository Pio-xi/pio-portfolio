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

/* ===== Theme Toggle ===== */

const themeToggles = document.querySelectorAll(
  '#themeToggle, #mobileThemeToggle'
);

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {

  document.body.classList.add('light');

  themeToggles.forEach(btn => {
    btn.textContent = '🌙 Theme';
  });

}

themeToggles.forEach(btn => {

  btn.addEventListener('click', () => {

    document.body.classList.toggle('light');

    const isLight =
      document.body.classList.contains('light');

    themeToggles.forEach(button => {

      button.textContent =
  isLight ? '🌙 Theme' : '☀️ Theme';

    });

    localStorage.setItem(
      'portfolio-theme',
      isLight ? 'light' : 'dark'
    );

  });

});

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

/* ===== Contact Form AJAX Submission ===== */

const contactForm =
  document.getElementById('contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const status =
      document.getElementById('formStatus');

    const submitBtn =
      document.getElementById('submitBtn');

    const formData =
      new FormData(contactForm);

    const name =
      formData.get('name')?.trim();

    const email =
      formData.get('email')?.trim();

    const subject =
      formData.get('subject')?.trim();

    const message =
      formData.get('message')?.trim();

    if (!name || !email || !subject || !message) {

      status.className = 'error';

      status.textContent =
        'Please complete all fields before sending your message.';

      return;
    }

    try {

      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';

      const response = await fetch(contactForm.action, {

        method: 'POST',

        body: formData,

        headers: {
          'Accept': 'application/json'
        }

      });

      if (response.ok) {

        status.className = 'success';

        status.textContent =
          '✓ Message sent successfully. I will get back to you soon.';

        contactForm.reset();

        setTimeout(() => {

          status.textContent = '';

          status.className = '';

        }, 6000);

      } else {

        status.className = 'error';

        status.textContent =
          'Something went wrong. Please try again later.';

      }

    } catch (error) {

      status.className = 'error';

      status.textContent =
        'Unable to send message. Please check your connection and try again.';

    } finally {

      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Send Message';

    }

  });

}

/* ===== Scroll To Top ===== */

const scrollTopBtn =
  document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {

  if (window.scrollY > 400) {

    scrollTopBtn.classList.add('show');

  } else {

    scrollTopBtn.classList.remove('show');

  }

});

scrollTopBtn?.addEventListener('click', () => {

  window.scrollTo({

    top: 0,

    behavior: 'smooth'

  });

});

/* ===== Close Mobile Menu On Scroll ===== */

window.addEventListener('scroll', () => {

  if (
    mobileNav &&
    mobileNav.classList.contains('show')
  ) {

    mobileNav.classList.remove('show');

  }

});