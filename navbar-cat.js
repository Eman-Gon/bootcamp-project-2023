(function () {
  'use strict';

  const nav = document.querySelector('.navbar');
  const canvas = document.getElementById('navCatCanvas');
  if (!nav || !canvas) return;

  const ctx = canvas.getContext('2d');
  const cat = {
    x: 52,
    direction: 1,
    speed: 0.5,
    state: 'walking',
    timer: 0,
    frame: 0,
    nextLieAt: performance.now() + 30000 + Math.random() * 30000,
    reactionGlowUntil: 0,
    reactCooldownUntil: 0,
    reactResumeState: 'walking',
  };

  const mouse = {
    x: -1000,
    y: -1000,
  };

  const dimensions = {
    width: 0,
    height: 0,
    dpr: 1,
  };

  const bodyWidth = 18;
  const bodyHeight = 12;
  const headRadius = 10;
  function resize() {
    dimensions.dpr = Math.min(window.devicePixelRatio || 1, 2);
    dimensions.width = nav.clientWidth;
    dimensions.height = nav.clientHeight;
    canvas.width = Math.round(dimensions.width * dimensions.dpr);
    canvas.height = Math.round(dimensions.height * dimensions.dpr);
    ctx.setTransform(dimensions.dpr, 0, 0, dimensions.dpr, 0, 0);
    cat.x = Math.min(Math.max(cat.x, 26), Math.max(26, dimensions.width - 26));
  }

  function baseY() {
    return dimensions.height - Math.max(bodyHeight, headRadius * 1.5) - 2;
  }

  function catBounds() {
    return {
      left: cat.x - 22,
      right: cat.x + 22,
      top: baseY() - 16,
      bottom: baseY() + 18,
    };
  }

  function sitFor(duration, nextState) {
    cat.state = 'sitting';
    cat.timer = duration;
    cat.reactResumeState = nextState || 'walking';
  }

  function startLyingDown(duration) {
    cat.state = 'lying';
    cat.timer = duration;
  }

  function clampDirectionAtEdges() {
    const minX = 26;
    const maxX = dimensions.width - 26;

    if (cat.x <= minX) {
      cat.x = minX;
      cat.direction = 1;
      sitFor(1100, 'walking');
    } else if (cat.x >= maxX) {
      cat.x = maxX;
      cat.direction = -1;
      sitFor(1100, 'walking');
    }
  }

  function triggerMouseNotice(now) {
    if (now < cat.reactCooldownUntil) return;
    if (cat.state === 'lying') return;

    const bounds = catBounds();
    const catCenterX = (bounds.left + bounds.right) * 0.5;
    const catCenterY = (bounds.top + bounds.bottom) * 0.5;
    const dist = Math.hypot(mouse.x - catCenterX, mouse.y - catCenterY);
    if (dist > 60) return;

    cat.direction = mouse.x >= catCenterX ? 1 : -1;
    cat.state = 'sitting';
    cat.timer = 900;
    cat.reactionGlowUntil = now + 1200;
    cat.reactCooldownUntil = now + 5000;
    cat.reactResumeState = 'walking';
  }

  function maybeStartIdle(now) {
    if (cat.state !== 'walking') return;

    if (now >= cat.nextLieAt) {
      startLyingDown(3200);
      cat.nextLieAt = now + 30000 + Math.random() * 30000;
      return;
    }

    if (Math.random() < 0.0012) {
      sitFor(2000 + Math.random() * 1000, 'walking');
    }
  }

  function update(now) {
    cat.frame += 1;
    triggerMouseNotice(now);

    if (cat.state === 'walking') {
      cat.x += cat.direction * cat.speed;
      clampDirectionAtEdges();
      maybeStartIdle(now);
      return;
    }

    if (cat.timer > 0) {
      cat.timer -= 16.67;
    }

    if (cat.timer > 0) return;

    if (cat.state === 'sitting') {
      cat.state = cat.reactResumeState || 'walking';
      return;
    }

    if (cat.state === 'lying') {
      cat.state = 'walking';
    }
  }

  function roundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  function drawEyes(headX, headY, bright) {
    const glow = bright ? 12 : 6;
    ctx.save();
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = glow;
    ctx.fillStyle = bright ? '#7ef9ff' : '#00d4ff';
    ctx.beginPath();
    ctx.arc(headX - 3, headY - 1, 1.1, 0, Math.PI * 2);
    ctx.arc(headX + 1.5, headY - 1, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawTail(x, y, sway, pose) {
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();

    if (pose === 'sitting') {
      ctx.moveTo(x - 7, y + 5);
      ctx.bezierCurveTo(x - 16, y + 10, x - 8, y + 15, x + 2, y + 13);
    } else if (pose === 'lying') {
      const flick = Math.sin(cat.frame * 0.22) * 4;
      ctx.moveTo(x - 8, y + 8);
      ctx.bezierCurveTo(x - 18, y + 10, x - 20 + flick, y + 4, x - 10 + flick * 0.25, y + 3);
    } else {
      ctx.moveTo(x - 8, y + 5);
      ctx.bezierCurveTo(x - 16, y - 1, x - 17, y + 8 + sway * 2, x - 8, y + 10);
    }

    ctx.stroke();
  }

  function drawLegs(x, y, legSwing) {
    ctx.fillStyle = '#111111';
    const frontOffset = legSwing ? 2 : 0;
    const backOffset = legSwing ? 0 : 2;
    ctx.fillRect(x - 5, y + 10 + backOffset, 2.5, 6 - backOffset);
    ctx.fillRect(x - 1, y + 10 + frontOffset, 2.5, 6 - frontOffset);
    ctx.fillRect(x + 5, y + 10 + frontOffset, 2.5, 6 - frontOffset);
    ctx.fillRect(x + 9, y + 10 + backOffset, 2.5, 6 - backOffset);
  }

  function drawCat(now) {
    const y = baseY();
    const brightEyes = now < cat.reactionGlowUntil;
    const headX = cat.x + 8;
    const headY = y + (cat.state === 'lying' ? 9 : 3);
    const sway = Math.sin(cat.frame * 0.04);

    ctx.save();
    ctx.translate(cat.x, 0);
    if (cat.direction < 0) ctx.scale(-1, 1);
    ctx.translate(-cat.x, 0);

    drawTail(cat.x, y, sway, cat.state);

    ctx.fillStyle = '#111111';

    if (cat.state === 'lying') {
      roundedRect(cat.x - 9, y + 5, 22, 8, 4);
      ctx.fill();
    } else if (cat.state === 'sitting') {
      roundedRect(cat.x - 8, y + 1, 16, 15, 6);
      ctx.fill();
    } else {
      roundedRect(cat.x - 9, y + 2, bodyWidth, bodyHeight, 5);
      ctx.fill();
      drawLegs(cat.x, y + 2, Math.floor(cat.frame / 12) % 2 === 0);
    }

    ctx.beginPath();
    ctx.arc(headX, headY, cat.state === 'lying' ? 8 : headRadius * 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(headX - 6, headY - 5);
    ctx.lineTo(headX - 2, headY - 13);
    ctx.lineTo(headX + 1, headY - 4);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(headX + 1, headY - 4);
    ctx.lineTo(headX + 5, headY - 13);
    ctx.lineTo(headX + 8, headY - 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.moveTo(headX - 4.5, headY - 5.5);
    ctx.lineTo(headX - 2.1, headY - 10.2);
    ctx.lineTo(headX - 0.2, headY - 5.7);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(headX + 2.2, headY - 5.7);
    ctx.lineTo(headX + 4.7, headY - 10.4);
    ctx.lineTo(headX + 6.3, headY - 5.5);
    ctx.closePath();
    ctx.fill();

    drawEyes(headX, headY, brightEyes);
    ctx.restore();
  }

  function render(now) {
    update(now);
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    drawCat(now);
    requestAnimationFrame(render);
  }

  document.addEventListener('mousemove', (event) => {
    const rect = nav.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });

  window.addEventListener('resize', resize);

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(resize).observe(nav);
  }

  resize();
  requestAnimationFrame(render);
})();
