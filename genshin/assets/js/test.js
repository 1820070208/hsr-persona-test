/* 答题流程与计分（支持快速版 24 题 / 详细版 36 题 / 专业版 48 题） */
(function () {
  'use strict';

  const QUESTIONS = window.GS_QUESTIONS.questions;
  const STANDARD_IDS = new Set(window.GS_QUESTIONS.standardIds);
  const DEEP_IDS = new Set(window.GS_QUESTIONS.deepIds);
  const PERSONAS = window.GS_PERSONAS;
  const CONTENT = window.GS_PERSONA_CONTENT;
  const STORAGE_KEY = 'gsPersonaUnlocked';
  const AXES = ['EI', 'SN', 'TF', 'JP']; // 代码字母序沿用 MBTI 惯例
  const AXIS_SIGN = { E: 1, I: -1, T: 1, F: -1, J: 1, P: -1, S: 1, N: -1 };
  const LIKERT_OPTIONS = ['非常不同意', '比较不同意', '一般', '比较同意', '非常同意'];

  const screens = {
    intro: document.getElementById('screen-intro'),
    quiz: document.getElementById('screen-quiz'),
    calc: document.getElementById('screen-calc'),
    result: document.getElementById('screen-result')
  };
  const els = {
    index: document.getElementById('quiz-index'),
    total: document.getElementById('quiz-total'),
    fill: document.getElementById('progress-fill'),
    card: document.getElementById('quiz-card'),
    tag: document.getElementById('quiz-tag'),
    question: document.getElementById('quiz-question'),
    options: document.getElementById('quiz-options'),
    prev: document.getElementById('btn-prev'),
    title: document.getElementById('result-title'),
    avatar: document.getElementById('result-avatar'),
    backdrop: document.getElementById('result-backdrop-img'),
    character: document.getElementById('result-character'),
    blurb: document.getElementById('result-blurb'),
    sub: document.getElementById('result-subs'),
    quote: document.getElementById('result-quote'),
    profile: document.getElementById('profile-text'),
    radar: document.getElementById('radar-wrap'),
    axes: document.getElementById('result-axes'),
    axisTexts: document.getElementById('axis-texts'),
    strengths: document.getElementById('strengths'),
    shadows: document.getElementById('shadows'),
    partner: document.getElementById('partner-card')
  };

  let version = 'standard';
  let pool = [];
  let axisMaxScore = { EI: 12, TF: 12, JP: 12, SN: 12 };
  let order = [];
  let idx = 0;
  let answers = [];

  function show(name) {
    for (const key of Object.keys(screens)) screens[key].hidden = key !== name;
  }

  function shuffle() {
    order = pool.map(function (_, i) { return i; });
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = order[i];
      order[i] = order[j];
      order[j] = t;
    }
  }

  /* 每轴计分上限 = 该轴同意度题数×2 + 覆盖该轴的情景题数（每题至多贡献 1 分） */
  function computeAxisMax(p) {
    const likert = { EI: 0, TF: 0, JP: 0, SN: 0 };
    const scen = { EI: 0, TF: 0, JP: 0, SN: 0 };
    p.forEach(function (q) {
      if (q.kind === 'likert') {
        likert[q.axis] += 1;
      } else {
        const covered = {};
        q.options.forEach(function (o) {
          o.scores.forEach(function (s) { covered[s.axis] = true; });
        });
        Object.keys(covered).forEach(function (a) { scen[a] += 1; });
      }
    });
    const max = {};
    AXES.forEach(function (a) { max[a] = likert[a] * 2 + scen[a]; });
    return max;
  }

  /* 组卷：情景题选项每次随机打乱（同意度题是量表，保持顺序不变） */
  function buildPool() {
    let base;
    if (version === 'pro') base = QUESTIONS;
    else if (version === 'deep') base = QUESTIONS.filter(function (q) { return DEEP_IDS.has(q.id); });
    else base = QUESTIONS.filter(function (q) { return STANDARD_IDS.has(q.id); });
    return base.map(function (q) {
      if (q.kind !== 'scenario') return q;
      const opts = q.options.slice();
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = opts[i];
        opts[i] = opts[j];
        opts[j] = t;
      }
      return Object.assign({}, q, { options: opts });
    });
  }

  function start() {
    pool = buildPool();
    axisMaxScore = computeAxisMax(pool);
    shuffle();
    idx = 0;
    answers = [];
    els.total.textContent = pool.length;
    show('quiz');
    renderQuestion();
  }

  function renderQuestion() {
    const q = pool[order[idx]];
    els.index.textContent = idx + 1;
    els.fill.style.width = (idx / pool.length) * 100 + '%';
    els.tag.textContent = q.kind === 'likert' ? '心灵观测' : '情景模拟';
    els.question.textContent = q.text;

    els.options.innerHTML = '';
    const labels = q.kind === 'likert'
      ? LIKERT_OPTIONS
      : q.options.map(function (o) { return o.text; });
    labels.forEach(function (label, i) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.textContent = label;
      if (answers[idx] === i) btn.classList.add('selected');
      btn.addEventListener('click', function () { choose(i); });
      els.options.appendChild(btn);
    });

    els.prev.hidden = idx === 0;
    els.card.style.animation = 'none';
    void els.card.offsetWidth; // 重置动画，让每道题都有入场效果
    els.card.style.animation = '';
    saveProgress(false);
  }

  function choose(i) {
    answers[idx] = i;
    const opts = els.options.children;
    for (let k = 0; k < opts.length; k++) {
      opts[k].classList.toggle('selected', k === i);
    }
    els.fill.style.width = ((idx + 1) / pool.length) * 100 + '%';
    setTimeout(function () {
      if (idx < pool.length - 1) {
        idx++;
        renderQuestion();
      } else {
        finish();
      }
    }, 280);
  }

  /* ---------- 断点续答：进度存 sessionStorage，刷新后接着答 ---------- */
  const PROGRESS_KEY = 'gsPersonaQuizProgress';

  function saveProgress(completed, code) {
    try {
      sessionStorage.setItem(PROGRESS_KEY, JSON.stringify({
        version: version,
        order: order,
        answers: answers,
        idx: idx,
        pool: pool,
        completed: !!completed,
        code: code || null
      }));
    } catch (e) {
      /* 隐私模式或容量不足时静默忽略 */
    }
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(PROGRESS_KEY) || 'null');
      if (!saved || !Array.isArray(saved.pool) || !Array.isArray(saved.order) || !Array.isArray(saved.answers)) {
        return null;
      }
      return saved;
    } catch (e) {
      return null;
    }
  }

  function computeScores(orderList, answerList, questionList) {
    const scores = { EI: 0, TF: 0, JP: 0, SN: 0 };
    orderList.forEach(function (qIndex, i) {
      const q = questionList[qIndex];
      const a = answerList[i];
      if (q && q.kind === 'likert') {
        scores[q.axis] += (a - 2) * AXIS_SIGN[q.pole];
      } else if (q && q.options[a]) {
        q.options[a].scores.forEach(function (s) {
          scores[s.axis] += AXIS_SIGN[s.pole];
        });
      }
    });
    return scores;
  }

  function finish() {
    show('calc');
    setTimeout(function () {
      const scores = computeScores(order, answers, pool);
      // 先统一决定每轴取向（恰好为 0 的轴随机取向：真平局，娱乐向测评可接受），
      // 代码、雷达、维度解读共用同一组字母，保证互不矛盾
      const letters = {};
      AXES.forEach(function (axis) {
        letters[axis] = scores[axis] >= 0 ? axis[0] : axis[1];
        if (scores[axis] === 0) {
          letters[axis] = Math.random() < 0.5 ? axis[0] : axis[1];
        }
      });
      const code = AXES.map(function (axis) { return letters[axis]; }).join('');
      try {
        renderResult(scores, letters, PERSONAS.byCode[code], CONTENT[code]);
      } catch (e) {
        window.__renderErr = String((e && e.stack) || e);
      }
      saveUnlock(code);
      saveProgress(true, code);
      show('result');
    }, 1400);
  }

  /* 四维星图：顶=社交能量 右=决策罗盘 底=冒险风格 左=目光所向，
     顶点距离 = 该轴倾向强度（|得分|/该轴满分） */
  function buildRadar(scores, letters) {
    const cx = 170;
    const cy = 148;
    const R = 92;
    const angles = [-90, 0, 90, 180].map(function (deg) { return deg * Math.PI / 180; });

    let inner = '';
    [0.33, 0.66, 1].forEach(function (k) {
      const pts = angles.map(function (a) {
        return (cx + Math.cos(a) * R * k) + ',' + (cy + Math.sin(a) * R * k);
      }).join(' ');
      inner += '<polygon points="' + pts + '" class="radar-ring" />';
    });
    angles.forEach(function (a) {
      inner += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(a) * R) +
        '" y2="' + (cy + Math.sin(a) * R) + '" class="radar-spoke" />';
    });

    const shapePts = PERSONAS.axes.map(function (axis, i) {
      // 半径加 18% 底量，弱倾向时图形依然可读
      const v = 0.18 + 0.82 * (Math.min(Math.abs(scores[axis.key]), axisMaxScore[axis.key]) / axisMaxScore[axis.key]);
      return (cx + Math.cos(angles[i]) * R * v) + ',' + (cy + Math.sin(angles[i]) * R * v);
    }).join(' ');
    inner += '<polygon points="' + shapePts + '" class="radar-shape" />';

    PERSONAS.axes.forEach(function (axis, i) {
      const s = scores[axis.key];
      const pole = letters[axis.key] === axis.key[0] ? axis.right : axis.left;
      const pct = s === 0 ? '均衡' : Math.round(Math.abs(s) / axisMaxScore[axis.key] * 100) + '%';
      const lx = cx + Math.cos(angles[i]) * (R + 28);
      const ly = cy + Math.sin(angles[i]) * (R + 28) + 4;
      inner += '<text x="' + lx + '" y="' + ly + '" class="radar-label" text-anchor="middle">' +
        pole + ' ' + pct + '</text>';
    });

    return '<svg viewBox="0 0 340 300" class="radar" role="img" aria-label="四维强度图">' + inner + '</svg>';
  }

  function poleName(axis, letter) {
    return (letter === axis.key[0] ? axis.right : axis.left).split('·').pop().trim();
  }

  function renderResult(scores, letters, persona, content, persist) {
    els.title.textContent = persona.title;
    els.avatar.src = persona.img;
    els.avatar.alt = persona.name + ' 头像';
    els.backdrop.src = persona.img;
    els.character.textContent = '';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = persona.name;
    const codeSpan = document.createElement('span');
    codeSpan.className = 'result-code';
    codeSpan.textContent = ' · ' + persona.code;
    els.character.appendChild(nameSpan);
    els.character.appendChild(codeSpan);

    // 同型另一面（可多位）
    const subs = persona.subs || [];
    if (subs.length) {
      els.sub.hidden = false;
      els.sub.innerHTML = '';
      subs.forEach(function (sub) {
        const chip = document.createElement('span');
        chip.className = 'result-sub';
        chip.innerHTML =
          '<img src="' + sub.img + '" alt="' + sub.name + ' 头像" />' +
          '<span>另一面 · ' + sub.name + '「' + sub.title + '」</span>';
        els.sub.appendChild(chip);
      });
    } else {
      els.sub.hidden = true;
    }

    els.blurb.textContent = persona.blurb;
    els.quote.textContent = '「' + content.quote + '」';

    els.profile.innerHTML = '';
    content.profile.forEach(function (para) {
      const p = document.createElement('p');
      p.textContent = para;
      els.profile.appendChild(p);
    });

    els.radar.innerHTML = buildRadar(scores, letters);

    els.axes.innerHTML = '';
    els.axisTexts.innerHTML = '';
    PERSONAS.axes.forEach(function (axis) {
      const s = scores[axis.key];
      const letter = letters[axis.key];
      const row = document.createElement('div');
      row.className = 'axis-row';
      const fill = document.createElement('i');
      fill.className = 'axis-fill ' + (letter === axis.key[0] ? 'pos' : 'neg');
      const width = Math.min(Math.abs(s), axisMaxScore[axis.key]) / axisMaxScore[axis.key] * 50;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { fill.style.width = width + '%'; });
      });
      row.innerHTML =
        '<div class="axis-labels"><span>' + axis.left + '</span>' +
        '<span class="axis-name">' + axis.label + '</span>' +
        '<span>' + axis.right + '</span></div>' +
        '<div class="axis-track"><i class="axis-center"></i></div>';
      row.querySelector('.axis-track').appendChild(fill);
      els.axes.appendChild(row);

      const textBlock = document.createElement('div');
      textBlock.className = 'axis-text';
      const head = document.createElement('div');
      head.className = 'axis-text-head';
      head.textContent = axis.label + (s === 0 ? ' · 不偏不倚' : ' · 偏向 ' + poleName(axis, letter));
      const body = document.createElement('p');
      body.textContent = content.axes[axis.key][letter];
      textBlock.appendChild(head);
      textBlock.appendChild(body);
      els.axisTexts.appendChild(textBlock);
    });

    function fillList(ul, items) {
      ul.innerHTML = '';
      items.forEach(function (text) {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
    }
    fillList(els.strengths, content.strengths);
    fillList(els.shadows, content.shadows);

    const partner = PERSONAS.byCode[content.partner.code];
    els.partner.innerHTML =
      '<div class="partner-avatar"><img src="' + partner.img + '" alt="' + partner.name + ' 头像" /></div>' +
      '<div class="partner-info"><div>' +
      '<span class="partner-name">' + partner.name + '</span>' +
      '<span class="partner-code">' + partner.code + ' · ' + partner.title + '</span>' +
      '</div><p>' + content.partner.reason + '</p></div>';

    // 供分享卡生成使用；persist 为 false 时（图鉴浏览）不覆盖真实上次结果
    window.__gsLastResult = {
      scores: scores, letters: letters, persona: persona, content: content,
      axisMax: axisMaxScore
    };
    if (persist !== false) {
      try {
        localStorage.setItem('gsPersonaLastResult', JSON.stringify({
          code: persona.code.replace(/-/g, ''),
          scores: scores,
          letters: letters,
          axisMax: axisMaxScore
        }));
      } catch (e) {
        /* 存储不可用时静默忽略 */
      }
    }
  }

  function saveUnlock(code) {
    const persona = PERSONAS.byCode[code];
    let arr = [];
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) arr = saved.filter(function (p) { return p && p.code; });
    } catch (e) {
      arr = [];
    }
    if (!arr.some(function (p) { return p.code.replace(/-/g, '') === code; })) {
      arr.push({ code: persona.code, name: persona.name, title: persona.title, ts: Date.now() });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  /* 从「查看上次结果」入口还原最近一次的结果页 */
  function restoreLastResult() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem('gsPersonaLastResult') || 'null');
    } catch (e) {
      saved = null;
    }
    if (!saved || !saved.scores || !saved.letters || !saved.axisMax) {
      return false;
    }
    const code = saved.code;
    if (!PERSONAS.byCode[code]) return false;
    axisMaxScore = saved.axisMax;
    renderResult(saved.scores, saved.letters, PERSONAS.byCode[code], CONTENT[code], true);
    return true;
  }

  /* 图鉴点入：用该人格的典型倾向合成结果页（不写回上次结果） */
  function renderPersonaCardView() {
    let view = null;
    try {
      view = JSON.parse(sessionStorage.getItem('gsPersonaView') || 'null');
    } catch (e) {
      view = null;
    }
    if (!view || !PERSONAS.byCode[view.code]) return false;
    const code = view.code;
    const letters = { EI: code[0], SN: code[1], TF: code[2], JP: code[3] };
    const scores = {};
    AXES.forEach(function (axis) {
      scores[axis] = letters[axis] === axis[0] ? 8 : -8;
    });
    axisMaxScore = view.axisMax || { EI: 12, TF: 12, JP: 12, SN: 12 };
    renderResult(scores, letters, PERSONAS.byCode[code], CONTENT[code], false);
    return true;
  }

  document.querySelectorAll('#version-picker .version-card').forEach(function (card) {
    card.addEventListener('click', function () {
      version = card.dataset.version;
      document.querySelectorAll('#version-picker .version-card').forEach(function (c) {
        c.classList.toggle('selected', c === card);
      });
    });
  });

  document.getElementById('btn-start').addEventListener('click', start);
  document.getElementById('btn-retry').addEventListener('click', function () {
    show('intro'); // 回到版本选择，方便换版本重测
  });
  els.prev.addEventListener('click', function () {
    if (idx > 0) {
      idx--;
      renderQuestion();
    }
  });

  const progress = loadProgress();
  if (location.hash === '#persona' && renderPersonaCardView()) {
    show('result');
  } else if (location.hash === '#result' && restoreLastResult()) {
    show('result');
  } else if (progress && progress.completed && progress.code) {
    // 刷新发生在结果页：直接回到结果
    const code = progress.code;
    if (!PERSONAS.byCode[code]) {
      show('intro');
      return;
    }
    axisMaxScore = progress.axisMax || axisMaxScore;
    const scores = computeScores(progress.order, progress.answers, progress.pool);
    const letters = { EI: code[0], SN: code[1], TF: code[2], JP: code[3] };
    renderResult(scores, letters, PERSONAS.byCode[code], CONTENT[code], true);
    show('result');
  } else if (progress && !progress.completed) {
    // 答题中途刷新：接着答
    version = progress.version || 'standard';
    pool = progress.pool;
    order = progress.order;
    answers = progress.answers;
    idx = Math.min(progress.idx || 0, pool.length - 1);
    axisMaxScore = computeAxisMax(pool);
    els.total.textContent = pool.length;
    document.querySelectorAll('#version-picker .version-card').forEach(function (card) {
      card.classList.toggle('selected', card.dataset.version === version);
    });
    show('quiz');
    renderQuestion();
  } else {
    show('intro');
  }
})();
