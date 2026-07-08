/* =========================================================
   COLLECTION CATEGORY GRID — Interaction Layer
   Vanilla JS, zero dependencies, ~1KB gzipped
   ========================================================= */

(function () {
  'use strict';

  function initCategoryGrid(sectionEl) {
    if (!sectionEl || sectionEl.dataset.cgInitialized === 'true') return;
    sectionEl.dataset.cgInitialized = 'true';

    var items = sectionEl.querySelectorAll('.category-grid__item');
    if (!items.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-inview');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            var delay = index * 90;
            setTimeout(function () {
              entry.target.classList.add('is-inview');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initAll() {
    document
      .querySelectorAll('[data-section-type="category-grid"]')
      .forEach(initCategoryGrid);
  }

  document.addEventListener('DOMContentLoaded', initAll);

  document.addEventListener('shopify:section:load', function (event) {
    var sectionEl = event.target.querySelector('[data-section-type="category-grid"]');
    if (sectionEl) {
      sectionEl.dataset.cgInitialized = 'false';
      initCategoryGrid(sectionEl);
    }
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAll();
  }
})();
