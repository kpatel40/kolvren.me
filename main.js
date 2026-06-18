/* =============================================
   KOLVREN — Microsoft Copilot Adoption Partner
   main.js — vanilla JS, zero dependencies
   ============================================= */

'use strict';

/* Mark HTML element so CSS animations activate */
document.documentElement.classList.add('js-loaded');

/* ─── Utility ────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ─── Nav: scroll shadow + active link ──────── */
(function initNav() {
  const nav = $('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mark active nav link based on current page
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (
      href === currentFile ||
      (currentFile === '' && href === 'index.html') ||
      (currentFile === 'index.html' && href === 'index.html')
    ) {
      a.classList.add('active');
    }
  });
})();

/* ─── Mobile hamburger menu ──────────────────── */
(function initMobileMenu() {
  const toggle = $('.nav__toggle');
  const menu = $('.nav__mobile');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  $$('.nav__mobile a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─── Scroll-reveal ──────────────────────────── */
(function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('revealed'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.04, rootMargin: '0px 0px 0px 0px' });

  // Immediately reveal elements already visible on load
  els.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 100) {
      el.classList.add('revealed');
    } else {
      io.observe(el);
    }
  });

  // Nuclear fallback: force-reveal everything after 1.5s
  // Ensures no content ever stays invisible due to IO failures
  setTimeout(() => {
    els.forEach(el => el.classList.add('revealed'));
  }, 1500);
})();

/* ─── Stat counter animation ─────────────────── */
(function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animate = el => {
    const raw    = el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const target = parseFloat(raw);
    const dur    = 1800;
    const start  = performance.now();

    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const v = easeOutCubic(p) * target;
      const display = Number.isInteger(target) ? Math.round(v) : v.toFixed(1);
      el.textContent = prefix + display + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(el => io.observe(el));
})();

/* ─── Accordion ──────────────────────────────── */
(function initAccordion() {
  $$('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isActive = trigger.classList.contains('active');

      // Close all
      $$('.accordion-trigger').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
        const body = t.nextElementSibling;
        if (body) body.style.maxHeight = null;
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        const body = trigger.nextElementSibling;
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
})();

/* ─── Contact form ───────────────────────────── */
(function initContactForm() {
  const form    = $('#contactForm');
  const success = $('.form__success');
  if (!form) return;

  // Live red-border clear on input
  $$('[required]', form).forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) field.style.borderColor = '';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    $$('[required]', form).forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
    });
    if (!valid) return;

    const btn = $('[type="submit"]', form);
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Formspree handles submission — show success on response
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        btn.disabled = false;
        btn.textContent = 'Try Again';
        alert('Something went wrong. Please email ceo@anchorforhotels.com directly.');
      }
    }).catch(() => {
      btn.disabled = false;
      btn.textContent = 'Try Again';
    });
  });
})();

/* ─── Smooth hash scroll ─────────────────────── */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
