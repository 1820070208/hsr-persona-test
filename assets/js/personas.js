/* 16 型人格 → 角色映射与维度元数据（与 docs/题目设计规范.md 保持一致）
   img 为主人格头像，sub 为同型的「另一面」副人格；头像来源 enka.network 游戏资源 */
window.HSR_PERSONAS = {
  order: [
    'ETJS', 'ETJN', 'ETPS', 'ETPN',
    'EFJS', 'EFJN', 'EFPS', 'EFPN',
    'ITJS', 'ITJN', 'ITPS', 'ITPN',
    'IFJS', 'IFJN', 'IFPS', 'IFPN'
  ],
  byCode: {
    ETJS: {
      code: 'E-T-J-S', title: '执算师', name: '托帕', img: 'assets/img/1112.png',
      blurb: '目标明确，精明务实，把一切打理得井井有条。',
      sub: { name: '砂金', img: 'assets/img/1304.png', title: '豪赌客', blurb: '把人生押上牌桌，还总能笑着赢。' }
    },
    ETJN: {
      code: 'E-T-J-N', title: '统帅', name: '布洛妮娅', img: 'assets/img/1101.png',
      blurb: '规划全局，责任感强，克制的领导力。',
      sub: { name: '景元', img: 'assets/img/1204.png', title: '弈帅', blurb: '神游局外，落子定乾坤。' }
    },
    ETPS: {
      code: 'E-T-P-S', title: '闯将', name: '卢卡', img: 'assets/img/1111.png',
      blurb: '热血直给，行动至上，活在当下。',
      sub: { name: '桑博', img: 'assets/img/1108.png', title: '机灵鬼', blurb: '没有他打不开的门，也没有他躲不开的债。' }
    },
    ETPN: {
      code: 'E-T-P-N', title: '造局者', name: '花火', img: 'assets/img/1306.png',
      blurb: '打破常规，混乱即乐趣。',
      sub: { name: '卡芙卡', img: 'assets/img/1005.png', title: '织网人', blurb: '她的剧本没有下一幕，你就是变量。' }
    },
    EFJS: {
      code: 'E-F-J-S', title: '东道主', name: '停云', img: 'assets/img/1202.png',
      blurb: '热情周到，人情练达，照顾每个人的体面。',
      sub: { name: '艾丝妲', img: 'assets/img/1009.png', title: '小太阳', blurb: '把朋友宠上天，把排场办漂亮。' }
    },
    EFJN: {
      code: 'E-F-J-N', title: '主唱', name: '知更鸟', img: 'assets/img/1309.png',
      blurb: '理想主义，用舞台鼓舞人心。',
      sub: { name: '银枝', img: 'assets/img/1302.png', title: '玫瑰骑士', blurb: '把美德与浪漫，讲给宇宙每个角落。' }
    },
    EFPS: {
      code: 'E-F-P-S', title: '烈焰', name: '希儿', img: 'assets/img/1102.png',
      blurb: '直率热烈，护短，先干再说。',
      sub: { name: '虎克', img: 'assets/img/1109.png', title: '小老大', blurb: '铆足了劲，天塌下来也照样嗨。' }
    },
    EFPN: {
      code: 'E-F-P-N', title: '追光者', name: '三月七', img: 'assets/img/1001.png',
      blurb: '元气好奇，记录一切美好。',
      sub: { name: '白露', img: 'assets/img/1211.png', title: '元气医师', blurb: '本医师的方子：开心最好，糖不能停。' }
    },
    ITJS: {
      code: 'I-T-J-S', title: '磐岩', name: '杰帕德', img: 'assets/img/1104.png',
      blurb: '忠诚守序，沉默可靠。',
      sub: { name: '瓦尔特', img: 'assets/img/1004.png', title: '引星人', blurb: '曾经沧海，仍愿为后人举灯。' }
    },
    ITJN: {
      code: 'I-T-J-N', title: '执棋者', name: '符玄', img: 'assets/img/1208.png',
      blurb: '算无遗策，掌控全局。',
      sub: { name: '佩拉', img: 'assets/img/1106.png', title: '破雾者', blurb: '真相藏在细节里，而她从不放过细节。' }
    },
    ITPS: {
      code: 'I-T-P-S', title: '冷刃', name: '丹恒', img: 'assets/img/1002.png',
      blurb: '寡言冷静，务实可靠。',
      sub: { name: '黄泉', img: 'assets/img/1308.png', title: '浪客', blurb: '话不多说，路自己走，雷自己担。' }
    },
    ITPN: {
      code: 'I-T-P-N', title: '破壁人', name: '银狼', img: 'assets/img/1006.png',
      blurb: '天才骇客，用游戏思维解构世界。',
      sub: { name: '真理医生', img: 'assets/img/1305.png', title: '直言学者', blurb: '对愚昧零容忍，对知识有无限耐心。' }
    },
    IFJS: {
      code: 'I-F-J-S', title: '春蕨', name: '克拉拉', img: 'assets/img/1107.png',
      blurb: '温柔而坚定，以善意面对世界。',
      sub: { name: '罗刹', img: 'assets/img/1203.png', title: '过客医师', blurb: '背一只药箱走天下，救人不留名。' }
    },
    IFJN: {
      code: 'I-F-J-N', title: '引路人', name: '姬子', img: 'assets/img/1003.png',
      blurb: '温暖的导师，深藏热情与远方。',
      sub: { name: '黑天鹅', img: 'assets/img/1307.png', title: '织忆者', blurb: '记忆是她的酒，越深越醉人。' }
    },
    IFPS: {
      code: 'I-F-P-S', title: '剑影', name: '镜流', img: 'assets/img/1212.png',
      blurb: '寡言独行，剑与旧梦。',
      sub: { name: '刃', img: 'assets/img/1205.png', title: '执刃者', blurb: '把痛苦磨成锋，把名字丢在路上。' }
    },
    IFPN: {
      code: 'I-F-P-N', title: '织梦者', name: '流萤', img: 'assets/img/1310.png',
      blurb: '纯真，心中藏着火焰。',
      sub: { name: '青雀', img: 'assets/img/1201.png', title: '悠闲牌友', blurb: '能躺着绝不坐着，赢牌全靠梦里练习。' }
    }
  },
  axes: [
    { key: 'EI', label: '社交能量', left: 'I · 深空', right: 'E · 群星' },
    { key: 'TF', label: '决策罗盘', left: 'F · 心潮', right: 'T · 星图' },
    { key: 'JP', label: '航行风格', left: 'P · 漂流', right: 'J · 航线' },
    { key: 'SN', label: '目光所向', left: 'N · 星海', right: 'S · 大地' }
  ]
};
