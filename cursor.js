(function () {
  'use strict';

  const canvas = document.getElementById('cursorCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const mouse = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    lastX: window.innerWidth * 0.5,
    lastY: window.innerHeight * 0.5,
    active: false,
  };

  const trail = [];
  const sparks = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addTrailPoint(x, y) {
    trail.push({ x, y, age: 0, maxAge: 28 });
    if (trail.length > 28) trail.shift();
  }

  function addSparks(dx, dy, velocity) {
    if (velocity <= 3) return;

    for (let i = 0; i < Math.floor(velocity * 0.28); i++) {
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI * 0.45;
      sparks.push({
        x: mouse.x - dx * 0.25,
        y: mouse.y - dy * 0.25,
        vx: Math.cos(angle) * velocity * 0.55,
        vy: Math.sin(angle) * velocity * 0.55,
        life: 1,
        size: Math.random() * 1.6 + 0.6,
      });
    }
  }

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    addTrailPoint(mouse.x, mouse.y);
    addSparks(dx, dy, velocity);
    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
    mouse.active = true;
  });

  window.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget) mouse.active = false;
  });

  window.addEventListener('blur', () => {
    mouse.active = false;
  });

  window.addEventListener('resize', resize);

  function update() {
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].age += 1;
      if (trail[i].age >= trail[i].maxAge) trail.splice(i, 1);
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vy += 0.18;
      spark.life -= 0.035;
      if (spark.life <= 0) sparks.splice(i, 1);
    }
  }

  function drawTrail() {
    for (const point of trail) {
      const progress = point.age / point.maxAge;
      const size = Math.max(0, 4 * (1 - progress));
      ctx.fillStyle = `rgba(0, 238, 255, ${(1 - progress) * 0.8})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawSparks() {
    for (const spark of sparks) {
      ctx.fillStyle = `rgba(0, 212, 255, ${spark.life})`;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawRing() {
    const rotation = frame * 0.05;
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 1;

    for (let i = 0; i < 8; i++) {
      const startAngle = (i / 8) * Math.PI * 2 + rotation;
      const x1 = mouse.x + Math.cos(startAngle) * 20;
      const y1 = mouse.y + Math.sin(startAngle) * 20;
      const x2 = mouse.x + Math.cos(startAngle + 0.3) * 20;
      const y2 = mouse.y + Math.sin(startAngle + 0.3) * 20;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  function drawOrbitDots() {
    for (let i = 0; i < 3; i++) {
      const angle = frame * 0.08 + (i / 3) * Math.PI * 2;
      ctx.fillStyle = '#00d4ff';
      ctx.beginPath();
      ctx.arc(mouse.x + Math.cos(angle) * 15, mouse.y + Math.sin(angle) * 15, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCursor() {
    if (!mouse.active && trail.length === 0 && sparks.length === 0) return;

    drawTrail();
    drawSparks();

    if (!mouse.active) return;

    drawRing();
    drawOrbitDots();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function animate() {
    frame += 1;
    update();
    ctx.clearRect(0, 0, width, height);
    drawCursor();
    requestAnimationFrame(animate);
  }

  resize();
  requestAnimationFrame(animate);
})();
