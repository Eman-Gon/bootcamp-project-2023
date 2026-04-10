(function () {
  'use strict';

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    pointerEvents: 'none',
    display: 'block',
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const gridSize = 100;
  const mouseRadius = 220;
  const highlightRadius = 130;
  const accentLines = [
    { base: -160, speed: 0.018, scrollFactor: 0.07, alpha: 0.06, width: 0.9 },
    { base: 70, speed: 0.025, scrollFactor: 0.1, alpha: 0.08, width: 1.1 },
    { base: 290, speed: 0.033, scrollFactor: 0.13, alpha: 0.1, width: 1.3 },
  ];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let scrollY = window.scrollY || 0;
  let mouseX = window.innerWidth * 0.5;
  let mouseY = window.innerHeight * 0.5;
  let mouseActive = false;

  const grid = {
    vertical: [],
    horizontal: [],
    diagonal: [],
  };

  function buildGrid() {
    grid.vertical = [];
    grid.horizontal = [];
    grid.diagonal = [];

    const rows = Math.ceil(height / gridSize) + 2;
    const cols = Math.ceil(width / gridSize) + 2;

    for (let i = -1; i < rows; i++) {
      grid.horizontal.push({
        base: i * gridSize,
        amplitude: 4 + Math.random() * 4,
        speed: 0.0013 + Math.random() * 0.0008,
        phase: Math.random() * Math.PI * 2,
        width: 1,
      });
    }

    for (let j = -1; j < cols; j++) {
      grid.vertical.push({
        base: j * gridSize,
        amplitude: 4 + Math.random() * 4,
        speed: 0.0011 + Math.random() * 0.0009,
        phase: Math.random() * Math.PI * 2,
        width: 1,
      });
    }

    for (let k = -2; k < rows + 2; k++) {
      grid.diagonal.push({
        base: k * gridSize,
        amplitude: 6 + Math.random() * 4,
        speed: 0.001 + Math.random() * 0.0006,
        phase: Math.random() * Math.PI * 2,
        width: 0.5,
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  function distanceToLine(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq === 0) return Math.hypot(px - x1, py - y1);
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
    const cx = x1 + t * dx;
    const cy = y1 + t * dy;
    return Math.hypot(px - cx, py - cy);
  }

  function getVerticalLine(line, time) {
    const drift = Math.sin(time * line.speed + line.phase) * line.amplitude;
    const x = line.base + drift;
    return { x1: x, y1: -gridSize, x2: x, y2: height + gridSize, width: line.width };
  }

  function getHorizontalLine(line, time) {
    const drift = Math.sin(time * line.speed + line.phase) * line.amplitude;
    const y = line.base + drift;
    return { x1: -gridSize, y1: y, x2: width + gridSize, y2: y, width: line.width };
  }

  function getDiagonalLine(line, time) {
    const drift = Math.sin(time * line.speed + line.phase) * line.amplitude;
    return {
      x1: -gridSize,
      y1: line.base + drift,
      x2: width + gridSize,
      y2: line.base + drift + gridSize * 2,
      width: line.width,
    };
  }

  function drawGridFamily(lines, resolver, time) {
    for (const line of lines) {
      const coords = resolver(line, time);
      let alpha = 0.04 + Math.sin(time * 0.00045 + line.phase) * 0.003;

      if (mouseActive) {
        const dist = distanceToLine(mouseX, mouseY, coords.x1, coords.y1, coords.x2, coords.y2);
        const pull = Math.max(0, 1 - dist / mouseRadius);
        alpha = Math.min(0.07, alpha + pull * 0.03);
      }

      ctx.strokeStyle = `rgba(0, 212, 255, ${Math.max(0.02, alpha)})`;
      ctx.lineWidth = coords.width;
      ctx.beginPath();
      ctx.moveTo(coords.x1, coords.y1);
      ctx.lineTo(coords.x2, coords.y2);
      ctx.stroke();
    }
  }

  function drawAccentLines(time) {
    for (const accent of accentLines) {
      const offset = (accent.base + scrollY * accent.scrollFactor + time * accent.speed) % (height + 320);
      const y = offset - 160;
      ctx.strokeStyle = `rgba(0, 212, 255, ${accent.alpha})`;
      ctx.lineWidth = accent.width;
      ctx.beginPath();
      ctx.moveTo(-gridSize, y);
      ctx.lineTo(width + gridSize, y + gridSize * 2.2);
      ctx.stroke();
    }
  }

  function drawHighlights(time) {
    if (!mouseActive) return;

    const families = [
      { lines: grid.vertical, resolver: getVerticalLine },
      { lines: grid.horizontal, resolver: getHorizontalLine },
      { lines: grid.diagonal, resolver: getDiagonalLine },
    ];

    for (const family of families) {
      for (const line of family.lines) {
        const coords = family.resolver(line, time);
        const dist = distanceToLine(mouseX, mouseY, coords.x1, coords.y1, coords.x2, coords.y2);
        if (dist >= highlightRadius) continue;
        const pull = 1 - dist / highlightRadius;
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 + pull * 0.1})`;
        ctx.lineWidth = coords.width + 0.6;
        ctx.beginPath();
        ctx.moveTo(coords.x1, coords.y1);
        ctx.lineTo(coords.x2, coords.y2);
        ctx.stroke();
      }
    }

    for (const vertical of grid.vertical) {
      const vx = getVerticalLine(vertical, time).x1;
      if (Math.abs(vx - mouseX) > highlightRadius) continue;

      for (const horizontal of grid.horizontal) {
        const hy = getHorizontalLine(horizontal, time).y1;
        const dist = Math.hypot(mouseX - vx, mouseY - hy);
        if (dist >= highlightRadius) continue;
        const pull = 1 - dist / highlightRadius;
        ctx.fillStyle = `rgba(0, 212, 255, ${0.03 + pull * 0.12})`;
        ctx.beginPath();
        ctx.arc(vx, hy, 1.2 + pull * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#020818';
    ctx.fillRect(0, 0, width, height);

    drawGridFamily(grid.horizontal, getHorizontalLine, time);
    drawGridFamily(grid.vertical, getVerticalLine, time);
    drawGridFamily(grid.diagonal, getDiagonalLine, time);
    drawAccentLines(time);
    drawHighlights(time);

    requestAnimationFrame(draw);
  }

  document.documentElement.style.backgroundColor = 'transparent';
  document.body.style.backgroundColor = 'transparent';

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseActive = true;
  });

  window.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget) mouseActive = false;
  });

  window.addEventListener('blur', () => {
    mouseActive = false;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset || 0;
  }, { passive: true });

  window.addEventListener('resize', resize);

  resize();
  requestAnimationFrame(draw);
})();
