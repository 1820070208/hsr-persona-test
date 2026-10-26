/* 起始页：双游戏模式卡片（头像墙 + 已解锁角标） */
(function () {
  'use strict';

  function countOf(key) {
    try {
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(arr) ? arr.length : 0;
    } catch (e) {
      return 0;
    }
  }

  function showCount(id, n) {
    const pill = document.getElementById(id);
    if (pill && n > 0) {
      pill.textContent = n;
      pill.hidden = false;
    }
  }

  showCount('hsrUnlockedCount', countOf('hsrPersonaUnlocked'));
  showCount('gsUnlockedCount', countOf('gsPersonaUnlocked'));

  /* 两个 personas.js 的 img 路径都是相对各自页面的：崩铁在根目录无需前缀，原神需加 genshin/ */
  function fillStrip(id, personas, prefix) {
    const strip = document.getElementById(id);
    if (!strip || !personas) return;
    personas.order.forEach(function (key) {
      const p = personas.byCode[key];
      const members = [p].concat(p.subs || (p.sub ? [p.sub] : [])).filter(Boolean);
      members.forEach(function (m) {
        const img = document.createElement('img');
        img.src = prefix + m.img;
        img.alt = m.name;
        img.title = m.name;
        img.loading = 'lazy';
        strip.appendChild(img);
      });
    });
  }

  fillStrip('hsr-strip', window.HSR_PERSONAS, '');
  fillStrip('gs-strip', window.GS_PERSONAS, 'genshin/');
})();
