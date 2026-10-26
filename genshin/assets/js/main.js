/* 原神人格测试 · 通用脚本（星空背景 + 七元素光点；结构与崩铁版 main.js 一致） */
(function () {
  'use strict';

  /* ---------- 夜空背景：星幕 + 缓缓上浮的七元素光点 ---------- */
  const canvas = document.getElementById('starfield');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* 七元素颜色：火/水/风/雷/草/岩/冰 */
    const ELEMENT_COLORS = [
      '#ff8663', '#4cc2f1', '#6fd8c4', '#b18cf5',
      '#9edb62', '#f5b453', '#a8e6f7'
    ];

    let W = 0;
    let H = 0;
    let stars = [];
    const motes = [];
    let nextMoteAt = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(260, Math.round((W * H) / 7000));
      stars = [];
      for (let i = 0; i < count; i++) {
        const roll = Math.random();
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.3,
          base: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 1.4 + 0.3,
          phase: Math.random() * Math.PI * 2,
          color: roll < 0.08 ? '#a8e6f7' : roll < 0.16 ? '#ffe2a6' : '#ffffff',
          big: i < Math.ceil(count * 0.06)
        });
      }
    }

    function spawnMote() {
      motes.push({
        x: Math.random() * W,
        y: H + 14,
        vy: -(0.25 + Math.random() * 0.45), // 缓缓上浮
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.4 + Math.random() * 0.6,
        swayAmp: 8 + Math.random() * 16,
        r: 1.4 + Math.random() * 2.2,
        color: ELEMENT_COLORS[Math.floor(Math.random() * ELEMENT_COLORS.length)],
        life: 0,
        maxLife: 240 + Math.random() * 160 // 帧
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
        if (now > nextMoteAt && motes.length < 22) {
          spawnMote();
          nextMoteAt = now + 600 + Math.random() * 900;
        }
        for (let i = motes.length - 1; i >= 0; i--) {
          const m = motes[i];
          m.life += 1;
          m.y += m.vy;
          const x = m.x + Math.sin(m.life / 60 * m.swaySpeed + m.sway) * m.swayAmp * 0.12;
          if (m.life >= m.maxLife || m.y < -20) {
            motes.splice(i, 1);
            continue;
          }
          const fade = Math.min(m.life / 40, 1) * Math.min((m.maxLife - m.life) / 60, 1);
          ctx.globalAlpha = 0.75 * fade;
          ctx.fillStyle = m.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = m.color;
          ctx.beginPath();
          ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    if (reduced) {
      draw(0); // 静态一帧即可
    } else {
      nextMoteAt = performance.now() + 1200;
      requestAnimationFrame(draw);
    }
  }

  /* ---------- 首页：已解锁人格数量角标 ---------- */
  const badge = document.getElementById('unlockedCount');
  if (badge) {
    try {
      const saved = JSON.parse(localStorage.getItem('gsPersonaUnlocked') || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        badge.textContent = saved.length;
        badge.hidden = false;
      }
    } catch (e) {
      /* 本地数据损坏时静默忽略 */
    }
  }

  /* ---------- 首页：同路人头像 ---------- */
  const strip = document.getElementById('crew-strip');
  if (strip && window.GS_PERSONAS) {
    window.GS_PERSONAS.order.forEach(function (key) {
      const p = window.GS_PERSONAS.byCode[key];
      const members = [p].concat(p.subs || []).filter(Boolean);
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
