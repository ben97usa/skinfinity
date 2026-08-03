/* ============================================================
   SKINFINITY LOUNGE — interactions
   ============================================================ */
(() => {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  const preloader = $('#preloader');
  const finishLoad = () => {
    document.body.style.overflow = '';
    preloader && preloader.classList.add('is-done');
    // trigger hero words
    requestAnimationFrame(() => $('.hero')?.classList.add('is-inview'));
  };
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => setTimeout(finishLoad, reduced ? 0 : 1500));
  // safety net
  setTimeout(finishLoad, 3500);

  /* ---------- Hero word reveal (CSS via .is-inview) ---------- */
  const heroStyle = document.createElement('style');
  heroStyle.textContent = `
    .hero.is-inview [data-word]{ transition:transform 1s var(--ease); transform:none; }
    .hero [data-word]{ transition-delay:calc(var(--i,0) * .08s + .1s); }`;
  document.head.appendChild(heroStyle);
  $$('.hero [data-word]').forEach((w, i) => w.style.setProperty('--i', i));

  /* ---------- Reveal on scroll ---------- */
  $$('[data-reveal-delay]').forEach(el => el.style.setProperty('--d', el.dataset.revealDelay + 's'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal], .philosophy__art, .step').forEach(el => io.observe(el));

  /* ---------- Staggered children ---------- */
  $$('[data-stagger]').forEach(group => {
    [...group.children].forEach((child, i) => {
      child.classList.add('reveal');
      child.style.setProperty('--d', (i * 0.06) + 's');
      child.style.transitionDelay = (i * 0.06) + 's';
      io.observe(child);
    });
  });

  /* ---------- Count-up stats ---------- */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      countObs.unobserve(el);
      if (reduced) { el.textContent = target + suffix; return; }
      const dur = 1600, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countObs.observe(el));

  /* ---------- Nav: scroll behavior ---------- */
  const nav = $('#nav');
  let lastY = 0, ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 30);
    if (y > 400 && y > lastY + 4) nav.classList.add('is-hidden');
    else if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger'), mobile = $('#mobileMenu');
  const toggleMenu = (open) => {
    burger.classList.toggle('is-open', open);
    mobile.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    mobile.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(!mobile.classList.contains('is-open')));
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['philosophy', 'concerns', 'menu', 'visit', 'location'].map(id => $('#' + id)).filter(Boolean);
  const navLinks = $$('.nav__links a');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObs.observe(s));

  /* ---------- Services accordion ---------- */
  $$('.row__head').forEach(head => {
    head.addEventListener('click', () => {
      const row = head.closest('.row');
      const open = row.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- FAQ: smooth body height (native details) ---------- */
  $$('.qa').forEach(qa => {
    const body = $('.qa__body', qa);
    qa.addEventListener('toggle', () => {
      if (qa.open) body.style.maxHeight = body.scrollHeight + 'px';
    });
  });

  /* ---------- Concern matcher ---------- */
  const DATA = {
    acne: {
      concern: 'Acne & Breakouts',
      title: 'Calm the breakout, clear the congestion.',
      desc: 'We target active breakouts and the buildup behind them — clearing congestion, reducing inflammation, and restoring balance without stripping your barrier.',
      grad: 'linear-gradient(135deg,#CFE0CE,#9fb5a0)',
      recos: [
        { name: 'Acne Detox', meta: '75 min' },
        { name: 'Acne Peel', meta: 'Peel' },
        { name: 'Clarifying Back Treatment', meta: '60 min' }
      ]
    },
    aging: {
      concern: 'Aging & Fine Lines',
      title: 'Rebuild bounce, soften the years.',
      desc: 'Collagen-stimulating treatments and regenerative actives work below the surface to firm, lift, and restore the elasticity that makes skin look rested.',
      grad: 'linear-gradient(135deg,#F1D7B8,#d8a877)',
      recos: [
        { name: 'Luxury Stem Cell Anti-Aging', meta: '90 min' },
        { name: 'RF Skin Tightening Therapy', meta: '90 min' },
        { name: 'Skinfinity Signature Facial', meta: '80 min' }
      ]
    },
    dehydration: {
      concern: 'Dehydration & Barrier Damage',
      title: 'Flood the barrier, lock in the glow.',
      desc: 'When skin is tight, flaky, or reactive, the barrier needs rebuilding. We layer deep hydration and repair to restore that plump, dewy, glass-skin finish.',
      grad: 'linear-gradient(135deg,#E7C6CF,#cf9aa9)',
      recos: [
        { name: 'Instant Glass Skin', meta: '60 min' },
        { name: 'Skinfinity Signature Facial', meta: '80 min' },
        { name: 'Customized Facial', meta: '75 min' }
      ]
    },
    dullness: {
      concern: 'Dullness & Uneven Texture',
      title: 'Brighten the tone, refine the surface.',
      desc: 'Vitamin C infusion and gentle resurfacing wake up tired, uneven skin — smoothing texture and bringing back that lit-from-within clarity.',
      grad: 'linear-gradient(135deg,#F1D7B8,#E7C6CF)',
      recos: [
        { name: 'Korean Brightening', meta: '75 min' },
        { name: 'Brightening Peel', meta: 'Peel' },
        { name: 'Green Sea Spicule Peel', meta: 'Peel' }
      ]
    },
    sensitivity: {
      concern: 'Sensitivity & Irritation',
      title: 'Soothe first, strengthen always.',
      desc: 'Reactive, easily-irritated skin gets a gentle, barrier-first approach — calming actives and a fully customized plan that respects your skin’s limits.',
      grad: 'linear-gradient(135deg,#CFE0CE,#E7C6CF)',
      recos: [
        { name: 'Customized Facial', meta: '75 min' },
        { name: 'Instant Glass Skin', meta: '60 min' },
        { name: 'Express Glow', meta: '50 min' }
      ]
    }
  };

  const panel = $('#matcherPanel');
  const leafIcon = `<svg class="mp__icon" viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="1.3">
      <path d="M48 86V40"/><path d="M48 58C30 58 18 46 16 26c20 2 32 14 32 32"/>
      <path d="M48 48C66 48 78 36 80 18c-20 2-32 12-32 30"/><circle cx="48" cy="20" r="4" fill="currentColor" stroke="none"/>
    </svg>`;

  const renderPanel = (key) => {
    const d = DATA[key];
    panel.innerHTML = `
      <div class="mp__text">
        <p class="mp__concern">${d.concern}</p>
        <h3 class="mp__title">${d.title}</h3>
        <p class="mp__desc">${d.desc}</p>
        <div class="mp__recos">
          ${d.recos.map(r => `<a href="#menu" class="mp__reco"><b>${r.name}</b><span>${r.meta}</span></a>`).join('')}
        </div>
      </div>
      <div class="mp__visual" style="--grad:${d.grad}"><div class="grain"></div>${leafIcon}</div>`;
  };

  const swapPanel = (key) => {
    panel.classList.add('is-swap');
    setTimeout(() => { renderPanel(key); panel.classList.remove('is-swap'); }, 280);
  };

  renderPanel('acne');
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('is-active')) return;
      $$('.chip').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('is-active'); chip.setAttribute('aria-selected', 'true');
      reduced ? renderPanel(chip.dataset.concern) : swapPanel(chip.dataset.concern);
    });
  });

  /* ---------- Custom cursor ---------- */
  const cursor = $('#cursor');
  if (cursor && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY; cursor.classList.add('is-active');
    });
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    const grow = 'a, button, .chip, .row__head, summary, [data-magnetic]';
    $$(grow).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-grow'));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Smooth anchor + close menu ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id === '#top') return;
      const target = $(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
