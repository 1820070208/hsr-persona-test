/* 结果页分享卡：canvas 竖版卡片生成 + 长按保存 / 下载 */
(function () {
  'use strict';

  const modal = document.getElementById('share-modal');
  if (!modal) return;
  const imageEl = document.getElementById('share-image');
  const tipEl = document.getElementById('share-tip');
  const downloadEl = document.getElementById('share-download');
  const FONT = '"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif';
  /* 分享卡二维码指向的正式地址；更换部署域名时改这里 */
  const SITE_URL = 'https://1820070208.github.io/hsr-persona-test/test.html';

  let objectUrl = null;

  function font(size, weight) {
    return (weight || 400) + ' ' + size + 'px ' + FONT;
  }

  function setLetterSpacing(ctx, value) {
    try { ctx.letterSpacing = value + 'px'; } catch (e) { /* 旧浏览器忽略 */ }
  }

  function wrapLines(ctx, text, maxW, maxLines) {
    const lines = [];
    let line = '';
    for (const ch of text) {
      if (ctx.measureText(line + ch).width > maxW && line) {
        lines.push(line);
        line = ch;
        if (lines.length === maxLines) return lines;
      } else {
        line += ch;
      }
    }
    if (line && lines.length < maxLines) lines.push(line);
    return lines;
  }

  function drawBackground(ctx, W, H) {
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#141c38');
    bg.addColorStop(0.45, '#0b1020');
    bg.addColorStop(1, '#05070f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 星云
    const nebula = ctx.createRadialGradient(120, 120, 0, 120, 120, 520);
    nebula.addColorStop(0, 'rgba(96,116,255,0.22)');
    nebula.addColorStop(1, 'rgba(96,116,255,0)');
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, W, 700);
    const nebula2 = ctx.createRadialGradient(W - 80, 1250, 0, W - 80, 1250, 480);
    nebula2.addColorStop(0, 'rgba(64,196,224,0.14)');
    nebula2.addColorStop(1, 'rgba(64,196,224,0)');
    ctx.fillStyle = nebula2;
    ctx.fillRect(0, 800, W, H - 800);

    // 星星
    for (let i = 0; i < 170; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.4 + 0.3;
      const roll = Math.random();
      ctx.fillStyle = roll < 0.08 ? '#a8d8ff' : roll < 0.16 ? '#ffe2a6' : '#ffffff';
      ctx.globalAlpha = Math.random() * 0.6 + 0.25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 底部行星弧
    const planet = ctx.createRadialGradient(W / 2, H + 470, 0, W / 2, H + 470, 950);
    planet.addColorStop(0, 'rgba(130,150,255,0.20)');
    planet.addColorStop(0.42, 'rgba(24,30,60,0.5)');
    planet.addColorStop(0.72, 'rgba(5,7,15,0)');
    ctx.fillStyle = planet;
    ctx.fillRect(0, H - 520, W, 520);
  }

  function drawAvatar(ctx, cx, cy, r, img) {
    ctx.save();
    ctx.shadowColor = 'rgba(232,191,111,0.55)';
    ctx.shadowBlur = 36;
    const ring = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    ring.addColorStop(0, '#ffe9a8');
    ring.addColorStop(1, '#c89a4a');
    ctx.strokeStyle = ring;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r - 7, 0, Math.PI * 2);
    ctx.clip();
    const size = (r - 7) * 2;
    ctx.drawImage(img, cx - (r - 7), cy - (r - 7), size, size);
    ctx.restore();
  }

  /* 白底二维码面板，保证深浅对比可扫 */
  function drawQR(ctx, x, y, size, url) {
    if (typeof window.qrcode !== 'function') return;
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      const count = qr.getModuleCount();

      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 16;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, size, size, 14);
      else ctx.rect(x, y, size, size);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = 'rgba(232,191,111,0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, size, size, 14);
      else ctx.rect(x, y, size, size);
      ctx.stroke();

      const pad = 16;
      const cell = (size - pad * 2) / count;
      ctx.fillStyle = '#141826';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(x + pad + c * cell, y + pad + r * cell, cell + 0.4, cell + 0.4);
          }
        }
      }
    } catch (e) {
      /* 二维码生成失败时跳过，不影响卡片其余部分 */
    }
  }

  function drawAxes(ctx, W, scores, letters, axisMax) {
    const PERSONAS = window.HSR_PERSONAS;
    const top = 745;
    const groupH = 150;
    const trackX = 140;
    const trackW = 620;
    const centerY = 450;

    PERSONAS.axes.forEach(function (axis, i) {
      const s = scores[axis.key];
      const y = top + i * groupH;
      const letter = letters[axis.key];

      setLetterSpacing(ctx, 2);
      ctx.font = font(21);
      ctx.fillStyle = 'rgba(230,236,255,0.62)';
      ctx.textAlign = 'left';
      ctx.fillText(axis.left, trackX, y);
      ctx.textAlign = 'right';
      ctx.fillText(axis.right, trackX + trackW, y);
      ctx.font = font(23, 600);
      ctx.fillStyle = '#e8bf6f';
      ctx.textAlign = 'center';
      ctx.fillText(axis.label, W / 2, y);
      setLetterSpacing(ctx, 0);

      // 轨道
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(trackX, y + 34, trackW, 10, 5);
      else ctx.rect(trackX, y + 34, trackW, 10);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      ctx.fillRect(centerY - 0.5, y + 26, 1, 26);

      // 倾向填充
      const ratio = Math.min(Math.abs(s), axisMax[axis.key]) / axisMax[axis.key];
      const half = 310;
      const w = ratio * half;
      if (w > 1) {
        const pos = letter === axis.key[0];
        const g = pos
          ? ctx.createLinearGradient(centerY, 0, centerY + w, 0)
          : ctx.createLinearGradient(centerY, 0, centerY - w, 0);
        if (pos) {
          g.addColorStop(0, '#8a6b2f');
          g.addColorStop(1, '#ffe9b0');
        } else {
          g.addColorStop(0, '#33638f');
          g.addColorStop(1, '#9fd8ff');
        }
        ctx.fillStyle = g;
        ctx.shadowColor = pos ? 'rgba(232,191,111,0.4)' : 'rgba(126,200,255,0.35)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pos ? centerY : centerY - w, y + 34, w, 10, 5);
        } else {
          ctx.rect(pos ? centerY : centerY - w, y + 34, w, 10);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  }

  async function generate() {
    const result = window.__hsrLastResult;
    if (!result) return null;
    const persona = result.persona;
    const content = result.content;
    const W = 900;
    const H = 1710;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    drawBackground(ctx, W, H);

    // 顶部徽章
    setLetterSpacing(ctx, 6);
    ctx.font = font(26);
    ctx.fillStyle = '#fff3cf';
    ctx.textAlign = 'center';
    ctx.fillText('✦ 星穹列车 · 心灵观测计划 ✦', W / 2, 96);
    setLetterSpacing(ctx, 0);

    // 头像
    const avatar = new Image();
    avatar.src = persona.img;
    try {
      await avatar.decode();
      drawAvatar(ctx, W / 2, 300, 112, avatar);
    } catch (e) {
      // 图片加载失败时画占位
      ctx.fillStyle = '#1a2138';
      ctx.beginPath();
      ctx.arc(W / 2, 300, 104, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = font(54, 700);
      ctx.fillStyle = '#e8bf6f';
      ctx.textAlign = 'center';
      ctx.fillText(persona.name.charAt(0), W / 2, 318);
    }

    // 称号
    const titleY = 505;
    const gold = ctx.createLinearGradient(0, titleY - 74, 0, titleY + 18);
    gold.addColorStop(0, '#fff8e3');
    gold.addColorStop(0.38, '#ffe7a6');
    gold.addColorStop(0.66, '#e2b264');
    gold.addColorStop(1, '#a97e3a');
    setLetterSpacing(ctx, 12);
    ctx.font = font(86, 800);
    ctx.textAlign = 'center';
    ctx.fillStyle = gold;
    ctx.shadowColor = 'rgba(226,178,100,0.3)';
    ctx.shadowBlur = 24;
    ctx.fillText(persona.title, W / 2, titleY);
    ctx.shadowBlur = 0;
    setLetterSpacing(ctx, 0);

    // 角色 · 代码
    const charY = 580;
    ctx.font = font(34, 600);
    const nameText = persona.name;
    const codeText = ' · ' + persona.code;
    const nameW = ctx.measureText(nameText).width;
    const codeW = ctx.measureText(codeText).width;
    let startX = W / 2 - (nameW + codeW) / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#c9d4f2';
    ctx.fillText(nameText, startX, charY);
    ctx.fillStyle = '#e8bf6f';
    ctx.fillText(codeText, startX + nameW, charY);

    // 引言
    ctx.font = font(24);
    ctx.fillStyle = 'rgba(232,191,111,0.8)';
    ctx.textAlign = 'center';
    const quoteLines = wrapLines(ctx, '「' + content.quote + '」', 640, 2);
    quoteLines.forEach(function (line, i) {
      ctx.fillText(line, W / 2, 645 + i * 38);
    });

    // 四维倾向条
    drawAxes(ctx, W, result.scores, result.letters, result.axisMax);

    // 装饰线
    const ornY = 1362;
    const ornL = ctx.createLinearGradient(200, 0, 380, 0);
    ornL.addColorStop(0, 'rgba(232,191,111,0)');
    ornL.addColorStop(1, 'rgba(232,191,111,0.5)');
    ctx.fillStyle = ornL;
    ctx.fillRect(200, ornY, 180, 1);
    const ornR = ctx.createLinearGradient(W - 380, 0, W - 200, 0);
    ornR.addColorStop(0, 'rgba(232,191,111,0.5)');
    ornR.addColorStop(1, 'rgba(232,191,111,0)');
    ctx.fillStyle = ornR;
    ctx.fillRect(W - 380, ornY, 180, 1);
    ctx.font = font(18);
    ctx.fillStyle = '#e8bf6f';
    ctx.textAlign = 'center';
    ctx.fillText('✦', W / 2, ornY + 7);

    // 站名
    const siteY = 1428;
    const siteGrad = ctx.createLinearGradient(0, siteY - 40, 0, siteY + 8);
    siteGrad.addColorStop(0, '#fff8e3');
    siteGrad.addColorStop(1, '#c89a4a');
    setLetterSpacing(ctx, 10);
    ctx.font = font(46, 800);
    ctx.fillStyle = siteGrad;
    ctx.textAlign = 'center';
    ctx.fillText('崩铁人格测试', W / 2, siteY);
    setLetterSpacing(ctx, 0);

    const now = new Date();
    const dateStr = now.getFullYear() + '.' + String(now.getMonth() + 1).padStart(2, '0') +
      '.' + String(now.getDate()).padStart(2, '0');
    ctx.font = font(19);
    ctx.fillStyle = 'rgba(230,236,255,0.5)';
    ctx.fillText('心灵观测计划 · ' + dateStr + ' 生成 · 粉丝二创作品', W / 2, 1470);

    // 扫码即玩
    drawQR(ctx, W / 2 - 90, 1494, 180, SITE_URL);

    ctx.font = font(19);
    ctx.fillStyle = 'rgba(232,191,111,0.75)';
    ctx.fillText('扫码上车 · 即刻开测', W / 2, 1696);

    return canvas;
  }

  async function open() {
    modal.hidden = false;
    imageEl.hidden = false;
    downloadEl.hidden = false;
    tipEl.textContent = '长按图片保存到手机，或点击下载';
    let canvas;
    try {
      canvas = await generate();
    } catch (e) {
      window.__shareError = String((e && e.stack) || e);
      canvas = null;
    }
    if (!canvas) return;
    try {
      const blob = await new Promise(function (resolve, reject) {
        canvas.toBlob(function (b) { b ? resolve(b) : reject(new Error('toBlob 失败')); }, 'image/png');
      });
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(blob);
      imageEl.src = objectUrl;
      downloadEl.href = objectUrl;
    } catch (e) {
      // 画布被污染（file:// 等环境）：退化为展示画布本身
      imageEl.src = '';
      imageEl.hidden = true;
      downloadEl.hidden = true;
      tipEl.textContent = '当前环境无法导出图片：请通过本地服务器（http://127.0.0.1:4173）打开后重试';
      modal.appendChild(canvas);
      canvas.className = 'share-canvas-fallback';
    }
  }

  function close() {
    modal.hidden = true;
    const fallback = modal.querySelector('.share-canvas-fallback');
    if (fallback) fallback.remove();
  }

  document.getElementById('btn-share').addEventListener('click', open);
  document.getElementById('share-close').addEventListener('click', close);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) close();
  });
})();
