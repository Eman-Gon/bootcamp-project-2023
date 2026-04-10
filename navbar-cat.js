(function () {
  'use strict';

  const nav = document.querySelector('.navbar');
  const canvas = document.getElementById('navCatCanvas');
  if (!nav || !canvas) return;

  const ctx = canvas.getContext('2d');
  const cat = {
    x: 52,
    direction: 1,
    speed: 0.95,
    state: 'walking',
    timer: 0,
    frame: 0,
    nextLieAt: performance.now() + 32000 + Math.random() * 22000,
    nextTrickAt: performance.now() + 12000 + Math.random() * 12000,
    reactionGlowUntil: 0,
    reactCooldownUntil: 0,
    reactResumeState: 'walking',
    meowText: '',
    meowUntil: 0,
    hopLift: 0,
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

  const colors = {
    fur: '#f7fbff',
    furShade: '#dbe6ff',
    outline: 'rgba(255, 255, 255, 0.18)',
    tail: '#eef3ff',
    bubbleText: '#0b1020',
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

  function roundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }

  function catBounds() {
    return {
      left: cat.x - 24,
      right: cat.x + 24,
      top: baseY() - 18,
      bottom: baseY() + 18,
    };
  }

  function meow(text, duration) {
    cat.meowText = text;
    cat.meowUntil = performance.now() + duration;
  }

  function sitFor(duration, nextState) {
    cat.state = 'sitting';
    cat.timer = duration;
    cat.reactResumeState = nextState || 'walking';
  }

  function startLyingDown(duration) {
    cat.state = 'lying';
    cat.timer = duration;
    meow('mew...', 1400);
  }

  function startTrick(duration) {
    cat.state = 'trick';
    cat.timer = duration;
    cat.hopLift = 0;
    meow('mrrp!', 1200);
  }

  function triggerMouseNotice(now) {
    if (now < cat.reactCooldownUntil || cat.state === 'lying') return;

    const bounds = catBounds();
    const centerX = (bounds.left + bounds.right) * 0.5;
    const centerY = (bounds.top + bounds.bottom) * 0.5;
    const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
    if (dist > 60) return;

    cat.direction = mouse.x >= centerX ? 1 : -1;
    cat.state = 'sitting';
    cat.timer = 950;
    cat.reactionGlowUntil = now + 1300;
    cat.reactCooldownUntil = now + 5000;
    cat.reactResumeState = 'walking';
    meow('meow?', 1300);
  }

  function clampAtEdges() {
    const minX = 26;
    const maxX = Math.max(26, dimensions.width - 26);

    if (cat.x <= minX) {
      cat.x = minX;
      cat.direction = 1;
      sitFor(1200, 'walking');
      meow('mew!', 1200);
    } else if (cat.x >= maxX) {
      cat.x = maxX;
      cat.direction = -1;
      sitFor(1200, 'walking');
      meow('mrrp!', 1200);
    }
  }

  function maybeChangeBehavior(now) {
    if (cat.state !== 'walking') return;

    if (now >= cat.nextLieAt) {
      startLyingDown(3200);
      cat.nextLieAt = now + 32000 + Math.random() * 22000;
      return;
    }

    if (now >= cat.nextTrickAt) {
      startTrick(1700);
      cat.nextTrickAt = now + 14000 + Math.random() * 18000;
      return;
    }

    if (Math.random() < 0.0012) {
      sitFor(2000 + Math.random() * 1000, 'walking');
      if (Math.random() < 0.55) meow('meow', 1200);
    }
  }

  function update(now) {
    cat.frame += 1;
    triggerMouseNotice(now);

    if (cat.state === 'walking') {
      cat.x += cat.direction * cat.speed;
      clampAtEdges();
      maybeChangeBehavior(now);
      return;
    }

    if (cat.state === 'trick') {
      cat.hopLift = Math.max(0, Math.sin((cat.timer / 1700) * Math.PI * 3)) * 7;
    } else {
      cat.hopLift = 0;
    }

    if (cat.timer > 0) cat.timer -= 16.67;
    if (cat.timer > 0) return;

    if (cat.state === 'sitting') {
      cat.state = cat.reactResumeState || 'walking';
      return;
    }

    if (cat.state === 'lying' || cat.state === 'trick') {
      cat.state = 'walking';
      cat.hopLift = 0;
    }
  }

  function drawTail(x, y, sway, pose) {
    ctx.strokeStyle = colors.tail;
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
    } else if (pose === 'trick') {
      ctx.moveTo(x - 8, y + 6);
      ctx.bezierCurveTo(x - 18, y - 8, x - 10, y - 12 + sway * 3, x - 4, y - 2);
    } else {
      ctx.moveTo(x - 8, y + 5);
      ctx.bezierCurveTo(x - 16, y - 1, x - 17, y + 8 + sway * 2, x - 8, y + 10);
    }

    ctx.stroke();
  }

  function drawLegs(x, y, fastCycle) {
    ctx.fillStyle = colors.fur;
    const cadence = fastCycle ? Math.floor(cat.frame / 6) % 2 === 0 : Math.floor(cat.frame / 12) % 2 === 0;
    const frontOffset = cadence ? 2 : 0;
    const backOffset = cadence ? 0 : 2;
    ctx.fillRect(x - 5, y + 10 + backOffset, 2.5, 6 - backOffset);
    ctx.fillRect(x - 1, y + 10 + frontOffset, 2.5, 6 - frontOffset);
    ctx.fillRect(x + 5, y + 10 + frontOffset, 2.5, 6 - frontOffset);
    ctx.fillRect(x + 9, y + 10 + backOffset, 2.5, 6 - backOffset);
  }

  function drawEyes(headX, headY, bright) {
    ctx.save();
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = bright ? 18 : 7;
    ctx.fillStyle = bright ? '#8dfdff' : '#00d4ff';
    ctx.beginPath();
    ctx.arc(headX - 3, headY - 1, 1.1, 0, Math.PI * 2);
    ctx.arc(headX + 1.5, headY - 1, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawSpeechBubble(headX, headY, direction, now) {
    if (!cat.meowText || now > cat.meowUntil) return;

    const bubbleX = direction > 0 ? headX + 13 : headX - 59;
    const bubbleY = headY - 27;
    ctx.save();
    ctx.fillStyle = 'rgba(250, 252, 255, 0.94)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.lineWidth = 1;
    roundedRect(bubbleX - 4, bubbleY - 14, 50, 20, 8);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    if (direction > 0) {
      ctx.moveTo(bubbleX + 4, bubbleY + 6);
      ctx.lineTo(bubbleX - 1, bubbleY + 14);
      ctx.lineTo(bubbleX + 10, bubbleY + 8);
    } else {
      ctx.moveTo(bubbleX + 41, bubbleY + 6);
      ctx.lineTo(bubbleX + 47, bubbleY + 14);
      ctx.lineTo(bubbleX + 35, bubbleY + 8);
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = colors.bubbleText;
    ctx.font = "10px 'Share Tech Mono', monospace";
    ctx.fillText(cat.meowText, bubbleX + 3, bubbleY);
    ctx.restore();
  }

  function drawCat(now) {
    const y = baseY() - cat.hopLift;
    const brightEyes = now < cat.reactionGlowUntil;
    const headX = cat.x + 8;
    const headY = y + (cat.state === 'lying' ? 9 : 3);
    const screenHeadX = cat.direction > 0 ? cat.x + 8 : cat.x - 8;
    const sway = Math.sin(cat.frame * 0.04);

    ctx.save();
    ctx.translate(cat.x, 0);
    if (cat.direction < 0) ctx.scale(-1, 1);
    ctx.translate(-cat.x, 0);

    drawTail(cat.x, y, sway, cat.state);

    ctx.fillStyle = colors.fur;
    ctx.strokeStyle = colors.outline;
    ctx.lineWidth = 1;
    ctx.shadowColor = 'rgba(180, 210, 255, 0.18)';
    ctx.shadowBlur = 10;

    if (cat.state === 'lying') {
      roundedRect(cat.x - 9, y + 5, 22, 8, 4);
      ctx.fill();
      ctx.stroke();
    } else if (cat.state === 'sitting') {
      roundedRect(cat.x - 8, y + 1, 16, 15, 6);
      ctx.fill();
      ctx.stroke();
    } else if (cat.state === 'trick') {
      roundedRect(cat.x - 8, y + 4, 19, 10, 5);
      ctx.fill();
      ctx.stroke();
      drawLegs(cat.x, y + 4, true);
    } else {
      roundedRect(cat.x - 9, y + 2, bodyWidth, bodyHeight, 5);
      ctx.fill();
      ctx.stroke();
      drawLegs(cat.x, y + 2, false);
    }

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(headX, headY, cat.state === 'lying' ? 8 : headRadius * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX - 6, headY - 5);
    ctx.lineTo(headX - 2, headY - 13);
    ctx.lineTo(headX + 1, headY - 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX + 1, headY - 4);
    ctx.lineTo(headX + 5, headY - 13);
    ctx.lineTo(headX + 8, headY - 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = colors.furShade;
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
    drawSpeechBubble(screenHeadX, headY, cat.direction, now);
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
