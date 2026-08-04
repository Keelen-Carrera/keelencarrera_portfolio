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
      trail.style.borderColor = 'rgba(31, 28, 21, 0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      trail.style.width = '32px';
      trail.style.height = '32px';
      trail.style.borderColor = 'rgba(212,164,32,0.3)';
    });
  });

  // ── HERO CANVAS GRID ────────────────────────────────
  const canvas = document.getElementById('gridCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const R = 26;                      // hex circumradius
    const HW = Math.sqrt(3) * R;       // pointy-top hex width
    const VSTEP = R * 1.5;             // vertical step between rows
    let W, H, hexes = [], ripples = [];
    let mx = -9999, my = -9999;

    function buildHexes() {
      hexes = [];
      const cols = Math.ceil(W / HW) + 2;
      const rows = Math.ceil(H / VSTEP) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * HW + (row % 2 === 0 ? 0 : HW / 2);
          const y = row * VSTEP;
          hexes.push({ x, y, glow: 0 });
        }
      }
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildHexes();
    }

    function hexPath(cx, cy) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i + Math.PI / 6;
        i === 0
          ? ctx.moveTo(cx + R * Math.cos(a), cy + R * Math.sin(a))
          : ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      }
      ctx.closePath();
    }


    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    document.addEventListener('click', e => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
    });


    function draw() {
      ctx.clearRect(0, 0, W, H);

      ripples = ripples.filter(r => r.life > 0);
      ripples.forEach(r => { r.r += 5; r.life -= 0.013; });

      hexes.forEach(h => {
        const dx = h.x - mx, dy = h.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const target = dist < 170 ? Math.pow(1 - dist / 170, 1.6) : 0;
        h.glow += (target - h.glow) * 0.09;

        let rGlow = 0;
        ripples.forEach(r => {
          const d = Math.sqrt((h.x - r.x) ** 2 + (h.y - r.y) ** 2);
          const wave = Math.abs(d - r.r);
          if (wave < 30) rGlow = Math.max(rGlow, (1 - wave / 30) * r.life);
        });

        const g = h.glow;
        const total = Math.min(1, g + rGlow * 0.85);
        const isRipple = rGlow > g;

        hexPath(h.x, h.y);

        if (total > 0.03) {
          ctx.fillStyle = isRipple
            ? `rgba(0,196,184,${total * 0.13})`
            : `rgba(212,164,32,${total * 0.11})`;
          ctx.fill();
        }
        ctx.strokeStyle = isRipple
          ? `rgba(0,196,184,${0.06 + total * 0.38})`
          : `rgba(212,164,32,${0.05 + total * 0.32})`;
        ctx.lineWidth = 0.5 + total * 0.9;
        ctx.stroke();
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
      const data = new FormData(form);

      // Log submission to localStorage as a local record
      const record = {
        timestamp: new Date().toISOString(),
        name: data.get('name') || '',
        email: data.get('email') || '',
        company: data.get('company') || '',
        phone: data.get('phone') || '',
        inquiry: data.get('inquiry') || '',
        subject: data.get('subject') || '',
        message: data.get('message') || ''
      };
      try {
        const existing = JSON.parse(localStorage.getItem('kc_contact_records') || '[]');
        existing.push(record);
        localStorage.setItem('kc_contact_records', JSON.stringify(existing));
      } catch (_) { /* storage unavailable */ }

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        });
        if (response.ok) {
          btn.textContent = '✓ Message Sent';
          btn.style.background = 'rgba(212,164,32,0.15)';
          btn.style.color = 'var(--accent)';
          btn.style.borderColor = 'rgba(212,164,32,0.3)';
          form.reset();
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
            btn.disabled = false;
          }, 4000);
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

  // ── PROJECT CAROUSELS ───────────────────────────────
  document.querySelectorAll('.project-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const count = slides.length;
    let current = 0;

    function goTo(index) {
      current = (index + count) % count;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  });
  // ── LIGHTBOX ────────────────────────────────────────
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Close image">✕</button>
      <img class="lightbox-img" src="" alt="" />
      <span class="lightbox-caption"></span>
    </div>`;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('.lightbox-img');
  const lbCaption = lb.querySelector('.lightbox-caption');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.carousel-slide img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

})();
