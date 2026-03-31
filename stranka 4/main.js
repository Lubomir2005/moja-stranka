// === Mobile Menu ===
(function () {
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.getElementById('mobileNav');
  var mobileLinks = document.querySelectorAll('[data-mobile-link]');
  var isOpen = false;

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      isOpen = !isOpen;
      if (isOpen) {
        mobileNav.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Zavrieť menu');
        document.body.style.overflow = 'hidden';
      } else {
        closeMobileNav();
      }
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  function closeMobileNav() {
    isOpen = false;
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Otvoriť menu');
    document.body.style.overflow = '';
  }
})();

// === Scroll-aware Header ===
(function () {
  var header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    var currentScrollY = window.scrollY;
    if (currentScrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }, { passive: true });
})();

// === Scroll Reveal ===
(function () {
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

// === Gallery Lightbox ===
(function () {
  var lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) return;
  var lightboxImg = lightbox.querySelector('.lightbox__img');
  var lightboxCaption = lightbox.querySelector('.lightbox__caption');
  var closeBtn = lightbox.querySelector('[data-lightbox-close]');

  document.querySelectorAll('[data-gallery-item]').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
      }
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();

// === Contact Form Handler (mailto) ===
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.btn-submit');
    var originalText = btn.innerHTML;

    var name = (form.querySelector('[name="name"]') || {}).value || '';
    var email = (form.querySelector('[name="email"]') || {}).value || '';
    var message = (form.querySelector('[name="message"]') || {}).value || '';

    var subject = encodeURIComponent('Záujem o prenájom — ' + name);
    var body = encodeURIComponent(
      'Meno: ' + name + '\n' +
      'E-mail: ' + email + '\n\n' +
      'Správa:\n' + message
    );

    window.location.href = 'mailto:posta@agrostav.sk?subject=' + subject + '&body=' + body;

    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Otvára sa e-mailový klient…';
    btn.style.background = '#437a22';
    setTimeout(function () {
      btn.innerHTML = originalText;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
})();
