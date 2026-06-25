/* ── Particle Canvas ── */
(function () {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      r: randomBetween(1.2, 3.2),
      vx: randomBetween(-0.35, 0.35),
      vy: randomBetween(-0.35, 0.35),
      alpha: randomBetween(0.3, 0.85),
      pulseSpeed: randomBetween(0.008, 0.022),
      pulseOffset: randomBetween(0, Math.PI * 2),
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticle(p, t) {
    const pulse = 0.5 + 0.5 * Math.sin(t * p.pulseSpeed + p.pulseOffset);
    const glowRadius = p.r * (3 + pulse * 5);

    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
    grd.addColorStop(0, `rgba(100, 150, 255, ${p.alpha * (0.6 + pulse * 0.4)})`);
    grd.addColorStop(0.5, `rgba(80, 120, 255, ${p.alpha * 0.25})`);
    grd.addColorStop(1, 'rgba(100, 150, 255, 0)');

    ctx.beginPath();
    ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160, 190, 255, ${p.alpha})`;
    ctx.fill();
  }

  function drawConnections() {
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop(t) {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => {
      drawParticle(p, t);
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    });
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
  initParticles();
  requestAnimationFrame(loop);
})();

/* ── Hamburger menu ── */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
})();

/* ── Fade-in on scroll ── */
(function () {
  const targets = document.querySelectorAll(
    '.card, .stat, .feature-box, .hero-content, section h2, .section-subtitle, .price-display, .pricing-section > p'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el, i) => {
    el.dataset.delay = i * 60;
    observer.observe(el);
  });

  document.querySelectorAll('.hero-content *').forEach(el => {
    el.classList.add('visible');
  });
  document.querySelector('.hero-content')?.classList.add('visible');
})();

/* ── Navbar scroll style ── */
(function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 10, 15, 0.75)';
    }
  }, { passive: true });
})();
