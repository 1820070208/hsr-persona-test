/* 16 型人格 → 角色映射与维度元数据（与 docs/题目设计规范.md 保持一致）
   代码字母序沿用 MBTI 惯例：E/I - N/S - F/T - J/P（如 ENFP）
   img 为主人格头像，sub 为同型的「另一面」副人格；头像来源 enka.network 游戏资源 */
window.HSR_PERSONAS = {
  order: [
    'ESTJ', 'ENTJ', 'ESTP', 'ENTP',
    'ESFJ', 'ENFJ', 'ESFP', 'ENFP',
    'ISTJ', 'INTJ', 'ISTP', 'INTP',
    'ISFJ', 'INFJ', 'ISFP', 'INFP'
  ],
  byCode: {
    ESTJ: {
      code: 'E-S-T-J', title: '执算师', name: '托帕', img: 'assets/img/1112.png',
      blurb: '目标明确，精明务实，把一切打理得井井有条。',
      sub: { name: '砂金', img: 'assets/img/1304.png', title: '豪赌客', blurb: '把人生押上牌桌，还总能笑着赢。' }
    },
    ENTJ: {
      code: 'E-N-T-J', title: '统帅', name: '布洛妮娅', img: 'assets/img/1101.png',
      blurb: '规划全局，责任感强，克制的领导力。',
      sub: { name: '景元', img: 'assets/img/1204.png', title: '弈帅', blurb: '神游局外，落子定乾坤。' }
    },
    ESTP: {
      code: 'E-S-T-P', title: '闯将', name: '卢卡', img: 'assets/img/1111.png',
      blurb: '热血直给，行动至上，活在当下。',
      sub: { name: '桑博', img: 'assets/img/1108.png', title: '机灵鬼', blurb: '没有他打不开的门，也没有他躲不开的债。' }
    },
    ENTP: {
      code: 'E-N-T-P', title: '造局者', name: '花火', img: 'assets/img/1306.png',
      blurb: '打破常规，混乱即乐趣。',
      sub: { name: '卡芙卡', img: 'assets/img/1005.png', title: '织网人', blurb: '她的剧本没有下一幕，你就是变量。' }
    },
    ESFJ: {
      code: 'E-S-F-J', title: '东道主', name: '停云', img: 'assets/img/1202.png',
      blurb: '热情周到，人情练达，照顾每个人的体面。',
      sub: { name: '艾丝妲', img: 'assets/img/1009.png', title: '小太阳', blurb: '把朋友宠上天，把排场办漂亮。' }
    },
    ENFJ: {
      code: 'E-N-F-J', title: '主唱', name: '知更鸟', img: 'assets/img/1309.png',
      blurb: '理想主义，用舞台鼓舞人心。',
      sub: { name: '银枝', img: 'assets/img/1302.png', title: '玫瑰骑士', blurb: '把美德与浪漫，讲给宇宙每个角落。' }
    },
    ESFP: {
      code: 'E-S-F-P', title: '烈焰', name: '希儿', img: 'assets/img/1102.png',
      blurb: '直率热烈，护短，先干再说。',
      sub: { name: '虎克', img: 'assets/img/1109.png', title: '小老大', blurb: '铆足了劲，天塌下来也照样嗨。' }
    },
    ENFP: {
      code: 'E-N-F-P', title: '追光者', name: '三月七', img: 'assets/img/1001.png',
      blurb: '元气好奇，记录一切美好。',
      sub: { name: '白露', img: 'assets/img/1211.png', title: '元气医师', blurb: '本医师的方子：开心最好，糖不能停。' }
    },
    ISTJ: {
      code: 'I-S-T-J', title: '磐岩', name: '杰帕德', img: 'assets/img/1104.png',
      blurb: '忠诚守序，沉默可靠。',
      sub: { name: '瓦尔特', img: 'assets/img/1004.png', title: '引星人', blurb: '曾经沧海，仍愿为后人举灯。' }
    },
    INTJ: {
      code: 'I-N-T-J', title: '执棋者', name: '符玄', img: 'assets/img/1208.png',
      blurb: '算无遗策，掌控全局。',
      sub: { name: '佩拉', img: 'assets/img/1106.png', title: '破雾者', blurb: '真相藏在细节里，而她从不放过细节。' }
    },
    ISTP: {
      code: 'I-S-P-J', title: '冷刃', name: '丹恒', img: 'assets/img/1002.png',
      blurb: '寡言冷静，务实可靠。',
      sub: { name: '黄泉', img: 'assets/img/1308.png', title: '浪客', blurb: '话不多说，路自己走，雷自己担。' }
    },
    INTP: {
      code: 'I-N-P-J', title: '破壁人', name: '银狼', img: 'assets/img/1006.png',
      blurb: '天才骇客，用游戏思维解构世界。',
      sub: { name: '真理医生', img: 'assets/img/1305.png', title: '直言学者', blurb: '对愚昧零容忍，对知识有无限耐心。' }
    },
    ISFJ: {
      code: 'I-S-F-J', title: '春蕨', name: '克拉拉', img: 'assets/img/1107.png',
      blurb: '温柔而坚定，以善意面对世界。',
      sub: { name: '罗刹', img: 'assets/img/1203.png', title: '过客医师', blurb: '背一只药箱走天下，救人不留名。' }
    },
    INFJ: {
      code: 'I-N-F-J', title: '引路人', name: '姬子', img: 'assets/img/1003.png',
      blurb: '温暖的导师，深藏热情与远方。',
      sub: { name: '黑天鹅', img: 'assets/img/1307.png', title: '织忆者', blurb: '记忆是她的酒，越深越醉人。' }
    },
    ISFP: {
      code: 'I-S-F-P', title: '剑影', name: '镜流', img: 'assets/img/1212.png',
      blurb: '寡言独行，剑与旧梦。',
      sub: { name: '刃', img: 'assets/img/1205.png', title: '执刃者', blurb: '把痛苦磨成锋，把名字丢在路上。' }
    },
    INFP: {
      code: 'I-N-F-P', title: '织梦者', name: '流萤', img: 'assets/img/1310.png',
      blurb: '纯真，心中藏着火焰。',
      sub: { name: '青雀', img: 'assets/img/1201.png', title: '悠闲牌友', blurb: '能躺着绝不坐着，赢牌全靠梦里练习。' }
    }
  },
  axes: [
    { key: 'EI', label: '社交能量', left: 'I · 深空', right: 'E · 群星' },
    { key: 'SN', label: '目光所向', left: 'N · 星海', right: 'S · 大地' },
    { key: 'TF', label: '决策罗盘', left: 'F · 心潮', right: 'T · 星图' },
    { key: 'JP', label: '航行风格', left: 'P · 漂流', right: 'J · 航线' }
  ],
  /* 旧版字母序为 E/I-T/F-J/P-S/N（第二位是 T/F）；迁移到现行惯例序 */
  migrateCode: function (code) {
    if (typeof code !== 'string') return code;
    const clean = code.replace(/-/g, '');
    if (clean.length !== 4) return code;
    if ('TF'.indexOf(clean[1]) !== -1) {
      return clean[0] + clean[3] + clean[1] + clean[2];
    }
    return clean;
  }
};
