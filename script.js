/* ============================================================
   MemoryCarePages – script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Copyright year ── */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Mobile nav toggle ── */
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Animate hamburger → X
      var spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(8.75px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-8.75px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close nav when a link inside it is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        var spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        var spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Scroll-reveal: fade cards in as they enter the viewport ── */
  var revealEls = document.querySelectorAll(
    '.book-card, .feature-card, .testimonial-card, .benefits-list li'
  );

  if (revealEls.length && 'IntersectionObserver' in window) {
    // Set initial hidden state via inline style so it only applies with JS
    revealEls.forEach(function (el) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ── Sticky header shadow on scroll ── */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 16px rgba(90,70,50,0.10)';
      } else {
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }

})();
