/* 星穹人格测试 · 通用脚本 */
(function () {
  'use strict';

  /* ---------- 星空背景 ---------- */
  const canvas = document.getElementById('starfield');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let stars = [];
    const meteors = [];
    let nextMeteorAt = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(280, Math.round((W * H) / 6200));
      stars = [];
      for (let i = 0; i < count; i++) {
        const roll = Math.random();
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.3 + 0.3,
          base: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 1.5 + 0.3,
          phase: Math.random() * Math.PI * 2,
          color: roll < 0.08 ? '#a8d8ff' : roll < 0.16 ? '#ffe2a6' : '#ffffff',
          big: i < Math.ceil(count * 0.06) // 少数亮星带光晕
        });
      }
    }

    function spawnMeteor() {
      const fromRight = Math.random() < 0.7;
      meteors.push({
        x: W * (0.05 + Math.random() * 0.9),
        y: Math.random() * H * 0.4,
        vx: (fromRight ? -1 : 1) * (4.5 + Math.random() * 4),
        vy: 1.8 + Math.random() * 2.2,
        len: 90 + Math.random() * 120,
        life: 1,
        decay: 0.01 + Math.random() * 0.012
      });
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      const t = now / 1000;

      for (const s of stars) {
        ctx.globalAlpha = s.base * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = s.color;
        if (s.big) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = s.color;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.big) ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      if (!reduced) {
        if (now > nextMeteorAt) {
          spawnMeteor();
          if (Math.random() < 0.35) spawnMeteor(); // 偶尔成双
          nextMeteorAt = now + 900 + Math.random() * 1800;
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x += m.vx;
          m.y += m.vy;
          m.life -= m.decay;
          if (m.life <= 0) {
            meteors.splice(i, 1);
            continue;
          }
          const tx = m.x - m.vx * (m.len / 6);
          const ty = m.y - m.vy * (m.len / 6);
          const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
          grad.addColorStop(0, 'rgba(255,246,220,' + (0.85 * m.life).toFixed(3) + ')');
          grad.addColorStop(1, 'rgba(255,246,220,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
        requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    if (reduced) {
      draw(0); // 静态一帧即可
    } else {
      nextMeteorAt = performance.now() + 1800;
      requestAnimationFrame(draw);
    }
  }

  /* ---------- 首页：已解锁人格数量角标 ---------- */
  const badge = document.getElementById('unlockedCount');
  if (badge) {
    try {
      const saved = JSON.parse(localStorage.getItem('hsrPersonaUnlocked') || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        badge.textContent = saved.length;
        badge.hidden = false;
      }
    } catch (e) {
      /* 本地数据损坏时静默忽略 */
    }
  }

  /* ---------- 首页：列车乘员头像 ---------- */
  const strip = document.getElementById('crew-strip');
  if (strip && window.HSR_PERSONAS) {
    window.HSR_PERSONAS.order.forEach(function (key) {
      const p = window.HSR_PERSONAS.byCode[key];
      const members = [p, p.sub].filter(Boolean);
      members.forEach(function (m) {
        const img = document.createElement('img');
        img.src = m.img;
        img.alt = m.name;
        img.title = m.name;
        img.loading = 'lazy';
        strip.appendChild(img);
      });
    });
  }
})();
