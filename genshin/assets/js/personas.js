/* 16 型人格 → 角色映射与维度元数据（原神版，结构与崩铁版 personas.js 保持一致）
   代码字母序沿用 MBTI 惯例：E/I - N/S - F/T - J/P（如 ENFP）
   img 为主人格头像，subs 为同型的「另一面」副人格（可多位）；头像来源 enka.network 游戏资源 */
window.GS_PERSONAS = {
  order: [
    'ESTJ', 'ENTJ', 'ESTP', 'ENTP',
    'ESFJ', 'ENFJ', 'ESFP', 'ENFP',
    'ISTJ', 'INTJ', 'ISTP', 'INTP',
    'ISFJ', 'INFJ', 'ISFP', 'INFP'
  ],
  byCode: {
    ESTJ: {
      code: 'E-S-T-J', title: '执律者', name: '琴', img: 'assets/img/Jean.png',
      blurb: '守序尽责的代理团长，把整座城市扛在肩上，也要把每件事办得妥帖。',
      subs: [
        { name: '烟绯', img: 'assets/img/Yanfei.png', title: '明法者', blurb: '条款烂熟于心，讲价讲到点上，规矩是她的武器也是她的底线。' }
      ]
    },
    ENTJ: {
      code: 'E-N-T-J', title: '筑天者', name: '凝光', img: 'assets/img/Ningguang.png',
      blurb: '从零建起天上楼阁的女主人，眼光、手腕与野心一样不缺。',
      subs: [
        { name: '刻晴', img: 'assets/img/Keqing.png', title: '疾雷手', blurb: '不信神明信自己，雷厉风行，把「务实」刻进每一道政令。' },
        { name: '阿蕾奇诺', img: 'assets/img/Arlecchino.png', title: '仆人', blurb: '炉之家的「父亲」，冷面之下，把每个孩子的前路都铺好。' }
      ]
    },
    ESTP: {
      code: 'E-S-T-P', title: '试锋者', name: '达达利亚', img: 'assets/img/Tartaglia.png',
      blurb: '为战斗而生的公子，越强的对手越让他眼睛发亮。',
      subs: [
        { name: '北斗', img: 'assets/img/Beidou.png', title: '斩浪人', blurb: '死兆星号的船长，豪爽仗义，浪再大也要把兄弟们带回家。' }
      ]
    },
    ENTP: {
      code: 'E-N-T-P', title: '逐风者', name: '温迪', img: 'assets/img/Venti.png',
      blurb: '自由的风神，把一场场「意外」谱成歌，没人猜得到他下一句词。',
      subs: [
        { name: '流浪者', img: 'assets/img/Wanderer.png', title: '浮浪客', blurb: '嘴上不饶人的人偶，把过去摔碎重拼，走一条自己选的路。' }
      ]
    },
    ESFJ: {
      code: 'E-S-F-J', title: '围炉人', name: '托马', img: 'assets/img/Thoma.png',
      blurb: '把每个人的冷暖都放在心上的家政官，稻妻的暖炉本炉。',
      subs: [
        { name: '香菱', img: 'assets/img/Xiangling.png', title: '百味厨', blurb: '什么都能下锅的百万厨娘，用一道菜让陌生人变成朋友。' }
      ]
    },
    ENFJ: {
      code: 'E-N-F-J', title: '擎旗者', name: '娜维娅', img: 'assets/img/Navia.png',
      blurb: '玫瑰骑士团的太阳，淋过雨的人，总想为别人撑把伞。',
      subs: [
        { name: '芭芭拉', img: 'assets/img/Barbara.png', title: '闪耀偶像', blurb: '用歌声与魔法治愈人心的偶像，把「大家」永远排在前面。' }
      ]
    },
    ESFP: {
      code: 'E-S-F-P', title: '烈音', name: '辛焱', img: 'assets/img/Xinyan.png',
      blurb: '把偏见唱成灰烬的摇滚少女，火力全开，从不冷场。',
      subs: [
        { name: '嘉明', img: 'assets/img/Gaming.png', title: '醒狮者', blurb: '舞狮少年，热血上头就冲，把日子过得锣鼓喧天。' }
      ]
    },
    ENFP: {
      code: 'E-N-F-P', title: '小火花', name: '可莉', img: 'assets/img/Klee.png',
      blurb: '火花骑士，好奇与淘气的代名词，蹦蹦炸弹与快乐一起上路。',
      subs: [
        { name: '夏洛蒂', img: 'assets/img/Charlotte.png', title: '定格师', blurb: '枫丹急报的元气记者，快门一响，把所有美好定格收藏。' },
        { name: '爱诺', img: 'assets/img/Aino.png', title: '点子匠', blurb: '天马行空的小小工程师，昨天刚给世界画了张新图纸。' }
      ]
    },
    ISTJ: {
      code: 'I-S-T-J', title: '黑羽卫', name: '九条裟罗', img: 'assets/img/KujouSara.png',
      blurb: '军纪如铁的天狗大将，忠诚刻在骨子里，命令就是命令。',
      subs: [
        { name: '重云', img: 'assets/img/Chongyun.png', title: '驱邪师', blurb: '自律到刻板的驱邪方士，纯阳之体也挡不住他按规矩办事。' }
      ]
    },
    INTJ: {
      code: 'I-N-T-J', title: '永恒者', name: '雷电将军', img: 'assets/img/RaidenShogun.png',
      blurb: '以「永恒」为执念的雷电化身，静坐棋局前，落子无悔。',
      subs: [
        { name: '夜兰', img: 'assets/img/Yelan.png', title: '暗线人', blurb: '深藏幕后的情报头子，三条线一起布局，你只看得见其中一条。' },
        { name: '奈芙尔', img: 'assets/img/Nefer.png', title: '深谋者', blurb: '笑意盈盈的幕后操盘手，所谓巧合，不过是她的布局。' }
      ]
    },
    ISTP: {
      code: 'I-S-T-P', title: '夜枭', name: '迪卢克', img: 'assets/img/Diluc.png',
      blurb: '话少的暗夜英雄，白天守庄园，夜里守城市，从不邀功。',
      subs: [
        { name: '优菈', img: 'assets/img/Eula.png', title: '浪花骑士', blurb: '冷冽的浪花骑士，恩怨记在账上，剑却先递给需要的人。' },
        { name: '菲林斯', img: 'assets/img/Flins.png', title: '守灯人', blurb: '长夜里的守灯人，剑鞘里收着旧年的誓言。' }
      ]
    },
    INTP: {
      code: 'I-N-T-P', title: '解构者', name: '阿贝多', img: 'assets/img/Albedo.png',
      blurb: '天才炼金术士，世界在他眼里是一张等待拆解的图纸。',
      subs: [
        { name: '艾尔海森', img: 'assets/img/Alhaitham.png', title: '求真者', blurb: '求知若渴的学者，效率至上，逻辑是他唯一的信仰。' },
        { name: '桑多涅', img: 'assets/img/Sandrone.png', title: '木偶', blurb: '拆掉重启一百次也不烦的机巧研究者，好胜心藏在木偶外壳下。' }
      ]
    },
    ISFJ: {
      code: 'I-S-F-J', title: '护心盾', name: '诺艾尔', img: 'assets/img/Noelle.png',
      blurb: '想成为骑士的女仆，温柔是她的底色，可靠是她的承诺。',
      subs: [
        { name: '甘雨', img: 'assets/img/Ganyu.png', title: '月海秘书', blurb: '勤恳三千七百年的月海秘书，把每一份托付都记在心上。' },
        { name: '伊涅芙', img: 'assets/img/Ineffa.png', title: '机偶管家', blurb: '认真学习人类情感的家动机偶，礼貌又较真。' }
      ]
    },
    INFJ: {
      code: 'I-N-F-J', title: '智识园丁', name: '纳西妲', img: 'assets/img/Nahida.png',
      blurb: '智慧之神，像园丁一样倾听与点拨，让每颗心长出自己的答案。',
      subs: [
        { name: '钟离', img: 'assets/img/Zhongli.png', title: '尘世客', blurb: '见惯兴衰的往生堂客卿，一盏清茶，道尽人间事。' },
        { name: '菈乌玛', img: 'assets/img/Lauma.png', title: '月祭司', blurb: '倾听月光的祭司，温柔的话语，也能落定人心的霜。' }
      ]
    },
    ISFP: {
      code: 'I-S-F-P', title: '听风客', name: '枫原万叶', img: 'assets/img/KaedeharaKazuha.png',
      blurb: '随遇而安的浪人武士，一片落叶里，听尽风的方向。',
      subs: [
        { name: '申鹤', img: 'assets/img/Shenhe.png', title: '清霜客', blurb: '远离红尘的仙家弟子，清冷少言，心口却留着一分暖。' }
      ]
    },
    INFP: {
      code: 'I-N-F-P', title: '幽夜皇女', name: '菲谢尔', img: 'assets/img/Fischl.png',
      blurb: '断罪皇女，用幻想织一件铠甲，护住里面那颗柔软的心。',
      subs: [
        { name: '琳妮特', img: 'assets/img/Lynette.png', title: '梦游猫', blurb: '安静的魔术助手，梦里藏着比台词更多的故事。' },
        { name: '哥伦比娅', img: 'assets/img/Columbina.png', title: '眠歌者', blurb: '哼着摇篮曲的少女，睡意温柔，力量深不见底。' }
      ]
    }
  },
  axes: [
    { key: 'EI', label: '社交能量', left: 'I · 独旅', right: 'E · 同行' },
    { key: 'SN', label: '目光所向', left: 'N · 幻境', right: 'S · 大地' },
    { key: 'TF', label: '决策罗盘', left: 'F · 心焰', right: 'T · 智谋' },
    { key: 'JP', label: '冒险风格', left: 'P · 逐风', right: 'J · 循路' }
  ]
};
