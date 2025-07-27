// =========================
// Navbar Mobile Toggle
// =========================
const navbarToggle = document.getElementById('navbarToggle');
const navLinks = document.querySelector('.navbar__nav ul');
navbarToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =========================
// Sticky Navbar Background
// =========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(13,27,42,0.98)';
  } else {
    navbar.style.background = 'rgba(13,27,42,0.92)';
  }
});

// =========================
// Scrollspy (Active Nav Link)
// =========================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    // Home link is active for both hero and stats
    if (
      (link.getAttribute('href') === '#hero' && (current === 'hero' || current === 'stats')) ||
      (link.getAttribute('href').includes(current) && current !== 'hero' && current !== 'stats')
    ) {
      link.classList.add('active');
    }
  });
});

// =========================
// Smooth Scroll for Anchor Links
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =========================
// Hero Section Animation
// =========================
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero__content').classList.add('visible');
});

// =========================
// Counter Animation (Stats) - Synchronized
// =========================
const statSection = document.querySelector('.stats__container');
const statNumbers = document.querySelectorAll('.stat__number');
let counterStarted = false;

function animateCountersSync(duration = 1000) {
  const startTime = performance.now();
  const targets = Array.from(statNumbers).map(counter => parseInt(counter.getAttribute('data-target'), 10));

  function updateAll(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    statNumbers.forEach((counter, i) => {
      const target = targets[i];
      const value = Math.floor(target * progress);
      if (counter.firstChild && counter.firstChild.nodeType === 3) {
        counter.firstChild.nodeValue = (progress < 1 ? value : target).toLocaleString();
      }
    });

    if (progress < 1) {
      requestAnimationFrame(updateAll);
    }
  }

  requestAnimationFrame(updateAll);
}

if (statSection && statNumbers.length) {
  const statObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counterStarted) {
      animateCountersSync(1500); // 1.5 seconds
      counterStarted = true;
    }
  }, { threshold: 0.4 });
  statObserver.observe(statSection);
}

// =========================
// Timeline Animation (About)
// =========================
const timelineItems = document.querySelectorAll('.timeline__item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
timelineItems.forEach(item => timelineObserver.observe(item));

// =========================
// Carousel (About Section)
// =========================
const carousel = document.getElementById('carousel');
const carouselItems = carousel ? carousel.querySelectorAll('.carousel__item') : [];
let currentSlide = 0;

function showSlide(idx) {
  if (!carouselItems.length) return;
  carouselItems.forEach((item, i) => {
    item.classList.toggle('active', i === idx);
  });
  // Debug: log current slide
  console.log('Carousel slide:', idx);
}

// Ensure only the first item is active on load
if (carouselItems.length) {
  carouselItems.forEach((item, i) => item.classList.toggle('active', i === 0));
}

// Auto-slide every 1s
function autoCarousel() {
  setInterval(() => {
    if (!carouselItems.length) return;
    currentSlide = (currentSlide + 1) % carouselItems.length;
    showSlide(currentSlide);
  }, 1500);
}

// Show the first slide on load
showSlide(currentSlide);
autoCarousel();

// =========================
// Scrap Filter Buttons (Fade Effect)
// =========================
const filterBtns = document.querySelectorAll('.scrap__filter-btn');
const scrapListItems = document.querySelectorAll('.scrap__list .scrap-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    scrapListItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// =========================
// Scroll/Fade Animations (IntersectionObserver)
// =========================
const fadeEls = document.querySelectorAll('.stat, .service-card, .scrap-item, .about__content, .contact__form-wrap, .contact__info-wrap');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'none';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  fadeObserver.observe(el);
});



function sendQuoteEmail(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  const mailto = `mailto:kruscoprivatelimited@gmail.com`
    + `?subject=Scrap Quotation Request from ${name || 'Unknown Company'}`
    + `&body=Company Name: ${name}%0D%0A`
    + `Work Email: ${email}%0D%0A`
    + `Phone: ${phone}%0D%0A`
    + `Scrap Details:%0D%0A${encodeURIComponent(message)}`;

  window.location.href = mailto;
}
