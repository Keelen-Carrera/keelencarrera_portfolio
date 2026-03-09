/* ══════════════════════════════════════════════════════
   KEELEN CARRERA — PORTFOLIO JS
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── CURSOR ──────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth trail
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.14;
    trailY += (mouseY - trailY) * 0.14;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Cursor scale on interactive elements
  document.querySelectorAll('a, button, .project-card, .skill-category, .cert-badge').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      trail.style.width = '48px';
      trail.style.height = '48px';
      trail.style.borderColor = 'rgba(0,232,122,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      trail.style.width = '32px';
      trail.style.height = '32px';
      trail.style.borderColor = 'rgba(0,232,122,0.3)';
    });
  });

  // ── HERO CANVAS GRID ────────────────────────────────
  const canvas = document.getElementById('gridCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, dots = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildDots();
    }

    function buildDots() {
      dots = [];
      const spacing = 48;
      for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
          dots.push({
            x, y,
            ox: x, oy: y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.2 + 0.4,
            alpha: Math.random() * 0.5 + 0.1
          });
        }
      }
    }

    let mx = -9999, my = -9999;
    document.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(26,38,64,0.5)';
      ctx.lineWidth = 0.5;
      const spacing = 48;
      for (let x = 0; x <= W; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Draw & animate dots
      dots.forEach(d => {
        // Mouse repulsion
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          d.x += (dx / dist) * force * 2;
          d.y += (dy / dist) * force * 2;
        }
        // Drift back to origin
        d.x += (d.ox - d.x) * 0.04;
        d.y += (d.oy - d.y) * 0.04;

        // Proximity glow near mouse
        const mdist = Math.sqrt(Math.pow(d.x - mx, 2) + Math.pow(d.y - my, 2));
        const glow = mdist < 120 ? (120 - mdist) / 120 : 0;
        const alpha = d.alpha + glow * 0.7;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow > 0.1
          ? `rgba(0,232,122,${alpha})`
          : `rgba(56,189,248,${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  // ── HERO TITLE ROTATOR ───────────────────────────────
  const titleItems = document.querySelectorAll('.title-item');
  if (titleItems.length) {
    let current = 0;
    setInterval(() => {
      titleItems[current].classList.remove('active');
      current = (current + 1) % titleItems.length;
      titleItems[current].classList.add('active');
    }, 2800);
  }

  // ── NAV SCROLL EFFECT ───────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  }, { passive: true });

  // ── ACTIVE NAV HIGHLIGHT ────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(a => a.classList.remove('active'));
        document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(a => a.classList.add('active'));
      }
    });
  }

  // ── MOBILE NAV ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  hamburger?.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
  });

  // ── SMOOTH SCROLL ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── REVEAL ON SCROLL ────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Trigger hero reveals immediately
  document.querySelectorAll('#hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });

  // ── SKILL BAR ANIMATION ─────────────────────────────
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.dataset.pct;
        entry.target.style.width = pct + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  // ── TERMINAL TYPEWRITER ─────────────────────────────
  const termBody = document.getElementById('terminalBody');
  if (termBody) {
    const lines = termBody.querySelectorAll('.t-line');
    lines.forEach((line, i) => {
      line.style.opacity = '0';
      setTimeout(() => {
        line.style.transition = 'opacity 0.3s';
        line.style.opacity = '1';
      }, 800 + i * 130);
    });
  }

  // ── CONTACT FORM ────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const data = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        });
        if (response.ok) {
          btn.textContent = '✓ Message Sent';
          btn.style.background = 'rgba(0,232,122,0.15)';
          btn.style.color = 'var(--accent)';
          form.reset();
        } else {
          throw new Error('Form error');
        }
      } catch {
        btn.textContent = 'Error — Try Again';
        btn.style.borderColor = 'rgba(248,113,113,0.5)';
        btn.style.color = 'var(--red)';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }
    });
  }

})();
