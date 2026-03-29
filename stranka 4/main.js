// === Dark/Light Mode Toggle ===
(function () {
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      toggle.setAttribute('aria-label', 'Prepnúť na ' + (currentTheme === 'dark' ? 'svetlý' : 'tmavý') + ' režim');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    if (currentTheme === 'dark') {
      toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    } else {
      toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }
})();

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

// === Contact Form Handler (Netlify Forms AJAX) ===
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.btn-submit');
    var originalText = btn.innerHTML;
    btn.innerHTML = 'Odosielanie...';
    btn.disabled = true;

    var formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(function (response) {
      if (response.ok) {
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Správa odoslaná';
        btn.style.background = '#437a22';
        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 2500);
      } else {
        btn.innerHTML = 'Chyba pri odosielaní';
        btn.style.background = '#c0392b';
        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 2500);
      }
    })
    .catch(function () {
      btn.innerHTML = 'Chyba pri odosielaní';
      btn.style.background = '#c0392b';
      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 2500);
    });
  });
})();
