/*
 * Oluwadoyinsola Aguda — portfolio interactions.
 * No dependencies. Everything degrades gracefully: without JavaScript the
 * page still reads top to bottom, with the first slide and three projects shown.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
   * 1. Rotating hero word
   *    Cycles through the words twice, then settles on "better".
   *    Skipped entirely when the visitor prefers reduced motion.
   * ------------------------------------------------------------- */
  function initRotatingWord() {
    var el = document.querySelector('.rot-word');
    if (!el || reduceMotion) return;

    var words = ['better', 'faster', 'smoother', 'simpler', 'clearer'];
    var ticks = 0;
    var timer = setInterval(function () {
      ticks += 1;
      var done = ticks >= words.length * 2;
      var i = done ? 0 : ticks % words.length;
      el.textContent = words[i];
      // Alternate between two identical keyframes so the entrance replays.
      el.style.animationName = i % 2 === 0 ? 'wordInA' : 'wordInB';
      if (done) clearInterval(timer);
    }, 2600);
  }

  /* ---------------------------------------------------------------
   * 2. "How I approach the work" slideshow
   *    Autoplays every 4.5s, pauses on hover/focus or via the pause
   *    button, and never autoplays with reduced motion.
   * ------------------------------------------------------------- */
  function initSlideshow() {
    var carousel = document.querySelector('[data-carousel]');
    var track = document.querySelector('[data-track]');
    if (!carousel || !track) return;

    var slides = carousel.querySelectorAll('[aria-roledescription="slide"]');
    var dots = document.querySelectorAll('.dot');
    var pauseBtn = document.querySelector('[data-action="pause"]');
    var count = slides.length;
    var current = 0;
    var paused = reduceMotion;
    var hovering = false;
    var timer = null;
    var ACCENT = '#A35C3A';
    var MUTED = '#8A8380';

    function render() {
      track.style.transform = 'translateX(' + (-100 * current) + '%)';
      slides.forEach(function (s, k) {
        s.setAttribute('aria-hidden', k === current ? 'false' : 'true');
      });
      dots.forEach(function (d, k) {
        var pip = d.querySelector('span');
        d.setAttribute('aria-current', k === current ? 'true' : 'false');
        if (pip) {
          pip.style.width = k === current ? '28px' : '10px';
          pip.style.background = k === current ? ACCENT : MUTED;
        }
      });
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
        pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
        pauseBtn.querySelector('[data-icon="pause"]').style.display = paused ? 'none' : 'inline-flex';
        pauseBtn.querySelector('[data-icon="play"]').style.display = paused ? 'inline-flex' : 'none';
      }
    }

    function go(n) {
      current = (n + count) % count;
      render();
      restart();
    }

    function restart() {
      clearInterval(timer);
      if (reduceMotion) return;
      timer = setInterval(function () {
        if (paused || hovering) return;
        current = (current + 1) % count;
        render();
      }, 4500);
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.getAttribute('data-action');
      if (action === 'prev') go(current - 1);
      else if (action === 'next') go(current + 1);
      else if (action === 'go') go(parseInt(btn.getAttribute('data-index'), 10));
      else if (action === 'pause') { paused = !paused; render(); }
    });

    carousel.addEventListener('mouseenter', function () { hovering = true; });
    carousel.addEventListener('mouseleave', function () { hovering = false; });
    carousel.addEventListener('focusin', function () { hovering = true; });
    carousel.addEventListener('focusout', function () { hovering = false; });

    render();
    restart();
  }

  /* ---------------------------------------------------------------
   * 3. "View 2 more projects" toggle
   * ------------------------------------------------------------- */
  function initMoreProjects() {
    var btn = document.querySelector('[data-action="toggle-more"]');
    var extra = document.getElementById('more-projects');
    if (!btn || !extra) return;
    var label = btn.querySelector('[data-more-label]');
    var arrow = btn.querySelector('[data-more-arrow]');
    var open = false;

    btn.addEventListener('click', function () {
      open = !open;
      // "contents" keeps the extra cards inside the parent grid.
      extra.style.display = open ? 'contents' : 'none';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'Show fewer projects' : 'View 2 more projects';
      if (arrow) arrow.style.transform = open ? 'rotate(180deg)' : 'none';
    });
  }

  /* ---------------------------------------------------------------
   * 4. "Show all 20 skills" toggle (phones only; hidden on desktop)
   * ------------------------------------------------------------- */
  function initSkillsToggle() {
    var btn = document.querySelector('[data-action="toggle-skills"]');
    var list = document.getElementById('skill-list');
    if (!btn || !list) return;
    var label = btn.querySelector('[data-skills-label]');

    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'Show fewer skills' : 'Show all 20 skills';
    });
  }


  /* ---------------------------------------------------------------
   * 5. Scroll-to-footer nudge
   *    Appears once when the footer comes into view. Closes with the
   *    X button or Escape, and stays closed for the rest of the visit.
   * ------------------------------------------------------------- */
  function initScrollNudge() {
    var nudge = document.getElementById('scroll-nudge');
    var footer = document.querySelector('footer');
    if (!nudge || !footer || !('IntersectionObserver' in window)) return;

    var KEY = 'nudge-dismissed';
    try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

    var shown = false;

    function show() {
      if (shown) return;
      shown = true;
      nudge.hidden = false;
      // Let the browser paint it hidden first so the entrance animates.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { nudge.classList.add('is-visible'); });
      });
    }

    function hide() {
      nudge.classList.remove('is-visible');
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      setTimeout(function () { nudge.hidden = true; }, reduceMotion ? 0 : 350);
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) { if (e.key === 'Escape' && shown) hide(); }

    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) {
        show();
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(footer);

    nudge.querySelector('[data-nudge-close]').addEventListener('click', hide);
    document.addEventListener('keydown', onKey);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initRotatingWord();
    initSlideshow();
    initMoreProjects();
    initSkillsToggle();
    initScrollNudge();
  });
})();
