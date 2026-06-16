/* ============================================
   Apex Grill Chepterit - Main JavaScript
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ---------- MOBILE MENU TOGGLE ----------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ---------- STICKY HEADER & SCROLL TO TOP ----------
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('sticky', window.scrollY > 50);
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('show', window.scrollY > 600);
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- ACTIVE NAV LINK HIGHLIGHT (based on current page) ----------
  const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentLocation || (currentLocation === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---------- TESTIMONIAL SLIDER ----------
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  if (testimonialCards.length > 0 && dots.length > 0) {
    let currentIndex = 0;
    const total = testimonialCards.length;

    function showTestimonial(index) {
      testimonialCards.forEach(card => card.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      testimonialCards[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    // Auto-rotate every 5 seconds
    setInterval(() => {
      let next = (currentIndex + 1) % total;
      showTestimonial(next);
    }, 5000);

    // Dot click navigation
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
      });
    });
  }

  // ---------- COUNTER ANIMATION (Intersection Observer) ----------
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-target');
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              el.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          };
          updateCounter();
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---------- MENU CATEGORY FILTERING ----------
  const catTabs = document.querySelectorAll('.cat-tab');
  const categorySections = document.querySelectorAll('.menu-category-section');
  if (catTabs.length > 0 && categorySections.length > 0) {
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-category');

        if (filter === 'all') {
          categorySections.forEach(section => section.style.display = 'block');
        } else {
          categorySections.forEach(section => {
            const cat = section.getAttribute('data-category');
            if (cat === filter) {
              section.style.display = 'block';
            } else {
              section.style.display = 'none';
            }
          });
        }
      });
    });
  }

  // ---------- IMAGE FALLBACK HANDLING (optional enhancement) ----------
  // Already done inline with onerror in HTML, but this ensures all images have fallback if not specified
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.dataset.fallbackApplied) {
        this.dataset.fallbackApplied = 'true';
        // Generic fallback icon based on parent class (optional)
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent) {
          const fallback = document.createElement('div');
          fallback.className = 'img-fallback';
          fallback.innerHTML = '<i class="fas fa-image"></i>';
          parent.appendChild(fallback);
        }
      }
    });
  });

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS (if any) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- YEAR AUTO-UPDATE IN FOOTER (optional) ----------
  const yearSpan = document.querySelector('.footer-bottom p');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
  }

});