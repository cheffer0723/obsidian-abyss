/* Obsidian Abyss — Interactive Script
   GSAP + ScrollTrigger + Lenis + Canvas particles */

document.body.classList.remove('no-js');

/* ────────────────────────────────────────────────
   1. LENIS — physics-based smooth scrolling
──────────────────────────────────────────────── */
const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
  orientation: 'vertical',
});

gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

function lenisScrollTo(target, options) {
  lenis.scrollTo(target, { offset: -80, duration: 1.4, ...options });
}

/* ────────────────────────────────────────────────
   2. CANVAS PARTICLES
──────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function mkParticle() {
    return {
      x: rand(0, W), y: rand(0, H),
      r: rand(0.8, 2.5),
      vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
      alpha: rand(0.2, 0.7),
      ps: rand(0.006, 0.018),
      po: rand(0, Math.PI * 2),
    };
  }

  function initParticles(n) {
    particles = [];
    for (let i = 0; i < n; i++) particles.push(mkParticle());
  }

  function drawConnections() {
    const d = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < d) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100,150,255,${(1 - dist / d) * 0.12})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop(t) {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => {
      const pulse = 0.5 + 0.5 * Math.sin(t * p.ps * 0.001 + p.po);
      const gr = p.r * (2.5 + pulse * 4);
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      grd.addColorStop(0, `rgba(100,150,255,${p.alpha * (0.5 + pulse * 0.5)})`);
      grd.addColorStop(1, 'rgba(100,150,255,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,200,255,${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    });
    requestAnimationFrame(loop);
  }

  resize();
  initParticles(45);
  requestAnimationFrame(loop);
  window.addEventListener('resize', resize, { passive: true });
})();

/* ────────────────────────────────────────────────
   3. GSAP — register ScrollTrigger
──────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

/* ────────────────────────────────────────────────
   4. NAVBAR — scroll behaviour + smooth nav links
──────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

lenis.on('scroll', ({ scroll }) => {
  navbar.classList.toggle('scrolled', scroll > 40);
});

// Nav link clicks → Lenis smooth scroll
document.querySelectorAll('[data-nav], .mobile-menu a, .sidebar-item, .hero-scroll-hint').forEach(el => {
  el.addEventListener('click', e => {
    const href = el.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      lenisScrollTo(href);
    }
  });
});

/* ────────────────────────────────────────────────
   5. HAMBURGER MENU
──────────────────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    gsap.to(spans[0], { rotate: 45, y: 6.5, duration: 0.3 });
    gsap.to(spans[1], { opacity: 0, duration: 0.3 });
    gsap.to(spans[2], { rotate: -45, y: -6.5, duration: 0.3 });
  } else {
    gsap.to(spans, { rotate: 0, y: 0, opacity: 1, duration: 0.3 });
  }
});

mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    gsap.to(hamburger.querySelectorAll('span'), { rotate: 0, y: 0, opacity: 1, duration: 0.3 });
  });
});

/* ────────────────────────────────────────────────
   6. SIDEBAR — active tracking
──────────────────────────────────────────────── */
const sidebar = document.getElementById('sidebar');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const sections = document.querySelectorAll('section[id], #footer');

// Show sidebar after hero
ScrollTrigger.create({
  trigger: '#charon',
  start: 'top 80%',
  onEnter: () => gsap.to(sidebar, { opacity: 1, duration: 0.5 }),
  onLeaveBack: () => gsap.to(sidebar, { opacity: 0, duration: 0.3 }),
});
sidebar.classList.add('visible');
setTimeout(() => { sidebar.style.opacity = ''; }, 0);

// Track active section
function setActiveSidebar(id) {
  sidebarItems.forEach(item => {
    item.classList.toggle('active', item.dataset.section === id);
  });
}

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 55%',
    end: 'bottom 55%',
    onEnter: () => setActiveSidebar(section.id),
    onEnterBack: () => setActiveSidebar(section.id),
  });
});

/* ────────────────────────────────────────────────
   7. HERO ANIMATIONS
──────────────────────────────────────────────── */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

// Split hero headline into chars for stagger animation
function splitChars(el) {
  const text = el.textContent;
  el.textContent = '';
  el.innerHTML = text.split('').map(ch =>
    ch === '\n' || ch === ' '
      ? `<span class="char" style="display:inline-block;white-space:pre">${ch}</span>`
      : `<span class="char" style="display:inline-block">${ch}</span>`
  ).join('');
  return el.querySelectorAll('.char');
}

// Hero entrance — wrap each char in a clip container so opacity stays 1
const headlineEl = document.querySelector('.hero-headline');
const heroChars = splitChars(headlineEl);
// Wrap chars so translateY clips without opacity flash
heroChars.forEach(ch => {
  const wrapper = document.createElement('span');
  wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;';
  ch.parentNode.insertBefore(wrapper, ch);
  wrapper.appendChild(ch);
  ch.style.display = 'inline-block';
});

heroTl
  .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.1 })
  .from(heroChars, { yPercent: 110, stagger: 0.025, duration: 0.55, ease: 'power3.out' }, '-=0.5')
  .from('.hero-sub', { opacity: 0, y: 16, duration: 0.6 }, '-=0.2')
  .from('.hero-cta > *', { opacity: 0, y: 12, stagger: 0.1, duration: 0.5 }, '-=0.3')
  .from('.hero-scroll-hint', { opacity: 0, duration: 0.5 }, '-=0.2');

// Hero parallax
gsap.to('.hero-inner', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

/* ────────────────────────────────────────────────
   8. FEATURE SECTION ANIMATIONS (scroll-triggered)
──────────────────────────────────────────────── */
document.querySelectorAll('.section-feature').forEach((section, i) => {
  const inner = section.querySelector('.feature-inner');
  const visual = section.querySelector('.feature-visual');
  const isAlt = section.classList.contains('alt');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    }
  });

  // Feature label
  const label = inner?.querySelector('.feature-label');
  if (label) tl.from(label, { opacity: 0, y: 16, duration: 0.5 });

  // Title char split
  const titleEl = inner?.querySelector('.feature-title');
  if (titleEl) {
    const chars = splitChars(titleEl);
    tl.from(chars, { opacity: 0, y: 40, stagger: 0.02, duration: 0.55, ease: 'power3.out' }, '-=0.2');
  }

  // Body + tags + cta
  const rest = inner ? [...inner.querySelectorAll('.feature-body, .feature-tags, .btn-outline, .btn-pill, .flow-steps')] : [];
  if (rest.length) tl.from(rest, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3');

  // Visual
  if (visual) {
    tl.from(visual, {
      opacity: 0,
      x: isAlt ? -60 : 60,
      scale: 0.92,
      duration: 0.8,
      ease: 'power2.out',
    }, '<0.1');
  }
});

/* ────────────────────────────────────────────────
   9. STATS — scroll trigger + count-up
──────────────────────────────────────────────── */
document.querySelectorAll('.stat-card').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.6,
    delay: i * 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#stats',
      start: 'top 70%',
    }
  });
});

// Count-up animation
document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  const target = +el.dataset.target;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: target,
        duration: 1.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate() { el.textContent = Math.round(+el.textContent); }
      });
    }
  });
});

document.querySelectorAll('.stat-number[data-string]').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      const val = el.dataset.string;
      setTimeout(() => { el.textContent = val; }, 800);
      gsap.from(el, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.7)' });
    }
  });
});

/* ────────────────────────────────────────────────
   10. SECTION TITLE CHARS (stats, pricing)
──────────────────────────────────────────────── */
document.querySelectorAll('#stats .section-title, #pricing .section-title').forEach(el => {
  const chars = splitChars(el);
  gsap.from(chars, {
    opacity: 0,
    y: 50,
    stagger: 0.025,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
    }
  });
});

/* ────────────────────────────────────────────────
   11. PRICING
──────────────────────────────────────────────── */
gsap.from('.pricing-card', {
  opacity: 0,
  y: 60,
  scale: 0.96,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '#pricing',
    start: 'top 70%',
  }
});

gsap.from('.feature-label', {
  opacity: 0,
  y: 16,
  duration: 0.5,
  scrollTrigger: { trigger: '#pricing', start: 'top 75%' }
});

/* ────────────────────────────────────────────────
   12. AUDIO TOGGLE (ambient tone via Web Audio)
──────────────────────────────────────────────── */
const audioBtn = document.getElementById('audio-toggle');
const iconOn = document.getElementById('icon-sound-on');
const iconOff = document.getElementById('icon-sound-off');
let audioCtx = null;
let oscillators = [];
let isSoundOn = false;

function startAmbient() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 1.5);
  masterGain.connect(audioCtx.destination);

  const freqs = [40, 60, 80, 120];
  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.value = freq;
    gain.gain.value = 0.3 / (i + 1);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    oscillators.push({ osc, gain, masterGain });
  });
}

function stopAmbient() {
  oscillators.forEach(({ masterGain }) => {
    masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
  });
  setTimeout(() => {
    oscillators.forEach(({ osc }) => { try { osc.stop(); } catch (_) {} });
    oscillators = [];
  }, 1200);
}

audioBtn?.addEventListener('click', () => {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    startAmbient();
    iconOn.style.display = 'none';
    iconOff.style.display = 'block';
    gsap.fromTo(audioBtn, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
  } else {
    stopAmbient();
    iconOn.style.display = 'block';
    iconOff.style.display = 'none';
  }
});

/* ────────────────────────────────────────────────
   13. CHAT WIDGET
──────────────────────────────────────────────── */
const chatWidget = document.getElementById('chat-widget');
const chatPopup = document.getElementById('chat-popup');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.querySelector('.cp-body');
const chatBadge = document.querySelector('.chat-badge');
let chatOpen = false;

const responses = [
  'Cerberus is currently detecting a bullish regime across 5 of 7 pairs.',
  'The Abyss does not guarantee outcomes. It guarantees clarity.',
  'Backtest results are visible to all subscribers at $9.99/month.',
  'Flow: Ask → Read → Test → Decide. You own every step.',
  'Non-custodial means your keys never leave your control.',
];
let responseIdx = 0;

function openChat() {
  chatOpen = true;
  chatPopup.style.display = 'flex';
  chatBadge.style.display = 'none';
  requestAnimationFrame(() => {
    chatPopup.classList.add('open');
  });
  chatInput.focus();
}

function closeChat() {
  chatOpen = false;
  chatPopup.classList.remove('open');
  setTimeout(() => { chatPopup.style.display = 'none'; }, 300);
}

chatWidget?.addEventListener('click', () => { chatOpen ? closeChat() : openChat(); });
chatClose?.addEventListener('click', closeChat);

function addMsg(text, role) {
  const msg = document.createElement('div');
  msg.className = `cp-msg ${role}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  gsap.from(msg, { opacity: 0, y: 10, duration: 0.3 });
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  const val = chatInput.value.trim();
  if (!val) return;
  addMsg(val, 'user');
  chatInput.value = '';
  setTimeout(() => {
    addMsg(responses[responseIdx % responses.length], 'bot');
    responseIdx++;
  }, 600);
}

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

/* ────────────────────────────────────────────────
   14. GENERAL HOVER EFFECTS — buttons glow on hover
──────────────────────────────────────────────── */
document.querySelectorAll('.btn-pill, .btn-outline, .btn-ghost.large').forEach(btn => {
  btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.25, ease: 'power1.out' }));
  btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }));
});

/* ────────────────────────────────────────────────
   15. PAGE TRANSITION OVERLAY (section-to-section)
──────────────────────────────────────────────── */
// Subtle horizontal line sweep when entering each major section
document.querySelectorAll('.section-feature').forEach(section => {
  const line = document.createElement('div');
  line.style.cssText = `
    position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(100,150,255,0.5),transparent);
    z-index:2;pointer-events:none;transform:scaleX(0);transform-origin:left;
  `;
  section.style.position = 'relative';
  section.appendChild(line);

  ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    once: false,
    onEnter: () => gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }),
    onEnterBack: () => gsap.fromTo(line, { scaleX: 0, transformOrigin: 'right' }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }),
  });
});

/* ────────────────────────────────────────────────
   16. FOOTER fade-in
──────────────────────────────────────────────── */
gsap.from('#footer .footer-inner > *', {
  opacity: 0,
  y: 20,
  stagger: 0.12,
  duration: 0.6,
  scrollTrigger: { trigger: '#footer', start: 'top 90%' }
});
