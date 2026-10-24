/* 人格图鉴渲染 */
(function () {
  'use strict';

  const PERSONAS = window.HSR_PERSONAS;
  const STORAGE_KEY = 'hsrPersonaUnlocked';

  let unlocked = [];
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(saved)) unlocked = saved;
  } catch (e) {
    /* 本地数据损坏时当作全未解锁 */
  }

  const owned = new Set(
    unlocked
      .filter(function (p) { return p && p.code; })
      .map(function (p) { return p.code.replace(/-/g, ''); })
  );

  document.getElementById('gallery-subtitle').textContent =
    '已解锁 ' + owned.size + ' / 16';

  /* 有上次结果时，显示「查看上次结果」并让它作为主按钮 */
  const lastBtn = document.getElementById('btn-last-result');
  try {
    if (lastBtn && localStorage.getItem('hsrPersonaLastResult')) {
      lastBtn.hidden = false;
      lastBtn.classList.replace('btn-ghost', 'btn-primary');
      const startBtn = document.getElementById('btn-start-test');
      if (startBtn) startBtn.classList.replace('btn-primary', 'btn-ghost');
    }
  } catch (e) {
    /* 存储不可用时保持原状 */
  }

  const grid = document.getElementById('persona-grid');
  PERSONAS.order.forEach(function (key) {
    const persona = PERSONAS.byCode[key];
    const card = document.createElement('div');
    if (owned.has(key)) {
      card.className = 'persona-card unlocked';
      card.dataset.code = key;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', '查看' + persona.name + '的人格详情');
      card.addEventListener('click', function () { openPersona(key); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPersona(key);
        }
      });
      card.innerHTML =
        '<img class="persona-avatar" src="' + persona.img + '" alt="' + persona.name + ' 头像" />' +
        '<div class="persona-code">' + persona.code + '</div>' +
        '<div class="persona-name">' + persona.name + '</div>' +
        '<div class="persona-title">' + persona.title + '</div>' +
        '<div class="persona-blurb">' + persona.blurb + '</div>';
    } else {
      card.className = 'persona-card locked';
      card.innerHTML =
        '<div class="persona-avatar locked" aria-hidden="true">？</div>' +
        '<div class="persona-code">· · · ·</div>' +
        '<div class="persona-name">？？？</div>' +
        '<div class="persona-title">尚未解锁</div>';
    }
    grid.appendChild(card);
  });

  /* 点进卡片：最近测出的人格直接还原真实结果，其余用典型倾向合成同款结果页 */
  function openPersona(key) {
    let last = null;
    try {
      last = JSON.parse(localStorage.getItem('hsrPersonaLastResult') || 'null');
    } catch (e) {
      last = null;
    }
    if (last && last.code === key) {
      location.href = 'test.html#result';
      return;
    }
    try {
      sessionStorage.setItem('hsrPersonaView', JSON.stringify({
        code: key,
        axisMax: { EI: 12, TF: 12, JP: 12, SN: 12 }
      }));
    } catch (e) {
      /* 会话存储不可用时无法进入详情 */
      return;
    }
    location.href = 'test.html?card=' + key + '#persona';
  }
})();
