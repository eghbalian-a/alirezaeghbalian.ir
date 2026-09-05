/* ============================================
   Legal Website — Interactive Features
   ============================================ */

(function () {
  'use strict';

  /* ===== Theme Toggle ===== */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک');
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateThemeIcon();
    });
  }

  /* ===== Mobile Menu ===== */
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMenu() {
    if (!mobileMenu || !mobileOverlay) return;
    mobileMenu.classList.add('mobile-menu--open');
    mobileOverlay.classList.add('mobile-menu__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu || !mobileOverlay) return;
    mobileMenu.classList.remove('mobile-menu--open');
    mobileOverlay.classList.remove('mobile-menu__overlay--visible');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ===== Sticky Header Behavior ===== */
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      header && header.classList.add('header--scrolled');
    } else {
      header && header.classList.remove('header--scrolled');
    }

    if (scrollY > lastScrollY && scrollY > 200) {
      header && header.classList.add('header--hidden');
    } else {
      header && header.classList.remove('header--hidden');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ===== Scroll Reveal Animations ===== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  /* ===== Contact Form ===== */
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var subject = document.getElementById('subject').value;
      var message = document.getElementById('message').value.trim();

      if (!name || !phone || !subject || !message) {
        showFormMessage('error', 'لطفاً تمام فیلدهای ضروری را تکمیل کنید.');
        return;
      }

      // Phone validation (Iranian format)
      var phonePattern = /^09\d{9}$/;
      if (!phonePattern.test(phone.replace(/\s/g, ''))) {
        showFormMessage('error', 'شماره تماس را به‌صورت 09xxxxxxxxx وارد کنید.');
        return;
      }

      // Success
      showFormMessage('success', 'درخواست شما با موفقیت ارسال شد. به‌زودی با شما تماس خواهیم گرفت.');
      form.reset();

      setTimeout(function () {
        hideFormMessage();
      }, 6000);
    });
  }

  function showFormMessage(type, text) {
    if (!formMessage) return;
    formMessage.className = 'form-message form-message--' + type;
    formMessage.textContent = text;
  }

  function hideFormMessage() {
    if (!formMessage) return;
    formMessage.className = 'form-message';
    formMessage.textContent = '';
  }

  /* ===== Smooth Scroll for Anchor Links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();
