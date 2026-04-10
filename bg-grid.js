/* bg-grid.js — subtle animated cyan grid background for inner pages.
   Drop a <script src="bg-grid.js"></script> before </body> on any page.
   Works by drawing the page's own background colour + a dim grid onto a
   fixed canvas placed at z-index:-1, then making body/html transparent so
   the canvas shows through while all page content stays above it. */
(function () {
  'use strict';

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '-1',
    pointerEvents: 'none',
    display: 'block',
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Read the body's background colour before we make it transparent.
  // Falls back to the dark navy used on every inner page.
  const rawBg = getComputedStyle(document.body).backgroundColor;
  const pageBg = (rawBg && rawBg !== 'rgba(0, 0, 0, 0)' && rawBg !== 'transparent')
    ? rawBg : '#0f172a';

  // Reveal canvas by making the normal page backgrounds transparent.
  document.documentElement.style.backgroundColor = 'transparent';
  document.body.style.backgroundColor = 'transparent';

  let w, h, t = 0;
  const GRID = 80;          // grid cell size px
  const DOT_EVERY = 4;      // draw a tiny dot at every 4th intersection

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, w, h);

    // --- background fill (replaces the body background we removed) ---
    ctx.fillStyle = pageBg;
    ctx.fillRect(0, 0, w, h);

    // --- breathing grid lines ---
    const lineAlpha = 0.035 + Math.sin(t * 0.012) * 0.012;
    ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= w + GRID; x += GRID) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y <= h + GRID; y += GRID) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // --- faint dots at intersections (every DOT_EVERY cells) ---
    const dotAlpha = 0.06 + Math.sin(t * 0.008 + 1) * 0.02;
    ctx.fillStyle = `rgba(0, 212, 255, ${dotAlpha})`;
    for (let x = 0; x <= w + GRID; x += GRID * DOT_EVERY) {
      for (let y = 0; y <= h + GRID; y += GRID * DOT_EVERY) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
