/* 16 型人格 → 角色映射与维度元数据（与 docs/题目设计规范.md 保持一致）
   img 为本地头像（assets/img/{游戏角色ID}.png，来源 enka.network 游戏资源） */
window.HSR_PERSONAS = {
  order: [
    'ETJS', 'ETJN', 'ETPS', 'ETPN',
    'EFJS', 'EFJN', 'EFPS', 'EFPN',
    'ITJS', 'ITJN', 'ITPS', 'ITPN',
    'IFJS', 'IFJN', 'IFPS', 'IFPN'
  ],
  byCode: {
    ETJS: { code: 'E-T-J-S', title: '执算师', name: '托帕', img: 'assets/img/1112.png', blurb: '目标明确，精明务实，把一切打理得井井有条。' },
    ETJN: { code: 'E-T-J-N', title: '统帅', name: '布洛妮娅', img: 'assets/img/1101.png', blurb: '规划全局，责任感强，克制的领导力。' },
    ETPS: { code: 'E-T-P-S', title: '闯将', name: '卢卡', img: 'assets/img/1111.png', blurb: '热血直给，行动至上，活在当下。' },
    ETPN: { code: 'E-T-P-N', title: '造局者', name: '花火', img: 'assets/img/1306.png', blurb: '打破常规，混乱即乐趣。' },
    EFJS: { code: 'E-F-J-S', title: '东道主', name: '停云', img: 'assets/img/1202.png', blurb: '热情周到，人情练达，照顾每个人的体面。' },
    EFJN: { code: 'E-F-J-N', title: '主唱', name: '知更鸟', img: 'assets/img/1309.png', blurb: '理想主义，用舞台鼓舞人心。' },
    EFPS: { code: 'E-F-P-S', title: '烈焰', name: '希儿', img: 'assets/img/1102.png', blurb: '直率热烈，护短，先干再说。' },
    EFPN: { code: 'E-F-P-N', title: '追光者', name: '三月七', img: 'assets/img/1001.png', blurb: '元气好奇，记录一切美好。' },
    ITJS: { code: 'I-T-J-S', title: '磐岩', name: '杰帕德', img: 'assets/img/1104.png', blurb: '忠诚守序，沉默可靠。' },
    ITJN: { code: 'I-T-J-N', title: '执棋者', name: '符玄', img: 'assets/img/1208.png', blurb: '算无遗策，掌控全局。' },
    ITPS: { code: 'I-T-P-S', title: '冷刃', name: '丹恒', img: 'assets/img/1002.png', blurb: '寡言冷静，务实可靠。' },
    ITPN: { code: 'I-T-P-N', title: '破壁人', name: '银狼', img: 'assets/img/1006.png', blurb: '天才骇客，用游戏思维解构世界。' },
    IFJS: { code: 'I-F-J-S', title: '春蕨', name: '克拉拉', img: 'assets/img/1107.png', blurb: '温柔而坚定，以善意面对世界。' },
    IFJN: { code: 'I-F-J-N', title: '引路人', name: '姬子', img: 'assets/img/1003.png', blurb: '温暖的导师，深藏热情与远方。' },
    IFPS: { code: 'I-F-P-S', title: '剑影', name: '镜流', img: 'assets/img/1212.png', blurb: '寡言独行，剑与旧梦。' },
    IFPN: { code: 'I-F-P-N', title: '织梦者', name: '流萤', img: 'assets/img/1310.png', blurb: '纯真，心中藏着火焰。' }
  },
  axes: [
    { key: 'EI', label: '社交能量', left: 'I · 深空', right: 'E · 群星' },
    { key: 'TF', label: '决策罗盘', left: 'F · 心潮', right: 'T · 星图' },
    { key: 'JP', label: '航行风格', left: 'P · 漂流', right: 'J · 航线' },
    { key: 'SN', label: '目光所向', left: 'N · 星海', right: 'S · 大地' }
  ]
};
