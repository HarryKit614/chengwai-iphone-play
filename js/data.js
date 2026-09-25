/* 《廿四道·城外》系统数据 —— 取自 docs/TIANSUI_OUTFIT_GUSHAN_DRAFT.md（含末尾各次修订）、
 * docs/XINGZHI_TASK_ITEMS_DRAFT.md、docs/FU_ATTRIBUTE_BALANCE_DRAFT.md。数值均为草案示意。 */
(function () {
  const XB = "xb", DX = "dx";
  // 品级：凡品 / 珍品 / 瑞品（外观按价位归档：薪币档=凡品，道薪<150=珍品，道薪≥150=瑞品；任务得=凡品）
  const GRADE = { fan: "凡品", zhen: "珍品", rui: "瑞品", ji: "极品" };
  const ATTRS = ["耳目", "筋骨", "隐迹", "明断", "推演", "神思"];

  const SLOTS = [
    { k: "hair", n: "头发", ic: "hair" },
    { k: "cloth", n: "立绘", ic: "cloth" },
    { grp: "配饰 · 六格" },
    { k: "acc_head", n: "头饰", ic: "head", acc: 1 },
    { k: "acc_ear", n: "耳饰", ic: "ear", acc: 1 },
    { k: "acc_neck", n: "颈胸佩", ic: "neck", acc: 1 },
    { k: "acc_hand", n: "腕手", ic: "hand", acc: 1 },
    { k: "acc_waist", n: "腰佩", ic: "waist", acc: 1 },
    { k: "acc_back", n: "背负", ic: "back", acc: 1 },
    { k: "emo", n: "动作表情", ic: "emo" },
    { k: "fu", n: "符箓", ic: "fu_paper" }
  ];
  const SLOT_NAME = {};
  SLOTS.forEach((s) => { if (s.k) SLOT_NAME[s.k] = s.n; });

  // 外观部件
  const I = [];
  const add = (o) => I.push(o);
  // 头发
  add({ id: "hair_a", n: "短碎发", slot: "hair", grade: "fan", def: 1, src: "默认", desc: "默认脸锁。雨后还有点乱，他自己不太在意。", ic: "hair" });
  add({ id: "hair_b", n: "猎人髻", slot: "hair", grade: "fan", price: [XB, 800], desc: "利落束起，进山前会这么扎。", ic: "hair_bun", tint: "#d8c8a0" });
  add({ id: "hair_c", n: "肩上长发", slot: "hair", grade: "fan", price: [XB, 1200], desc: "放下来略遮颊，看着比平时安静。", ic: "hair_long", tint: "#c8b890" });
  add({ id: "hair_d", n: "雨湿短发", slot: "hair", grade: "fan", src: "行职解锁", srcLong: "道途行职「帮他补猎服的破口」解锁", desc: "贴额、带水光，是破祠那夜的样子。", ic: "hair", tint: "#9fd0c8" });
  add({ id: "hair_e", n: "风掀碎发", slot: "hair", grade: "zhen", price: [DX, 60], desc: "动感略乱，山风正好吹过来。", ic: "hair", tint: "#f0c890" });
  add({ id: "hair_f", n: "夜猎半束", slot: "hair", grade: "zhen", price: [DX, 90], desc: "半束半散，夜里跟他上山时的发型。", ic: "hair_bun", tint: "#b8a8d8" });
  // 衣服
  add({ id: "cloth_a", n: "猎服", slot: "cloth", grade: "fan", def: 1, src: "默认", desc: "土褐破猎服，雨青内襟。默认穿着。", ic: "cloth" });
  add({ id: "cloth_b", n: "夜氅", slot: "cloth", grade: "ji", src: "许愿", srcLong: "许愿卡池极品。80 抽小保底随机极品，120 抽大保底出心愿。", desc: "深色夜行披。极品立绘，隐迹偏高。", ic: "cloak", tint: "#b8a8d8" });
  add({ id: "cloth_c", n: "日间旅服", slot: "cloth", grade: "fan", price: [XB, 1200], desc: "整洁旅装，像是要带你进城。", ic: "cloth", tint: "#d8c8a0" });
  add({ id: "cloth_d", n: "素暗礼服", slot: "cloth", grade: "zhen", src: "许愿", srcLong: "许愿卡池珍品。", desc: "见礼用的素暗袍，他穿着有点拘谨。", ic: "cloak", tint: "#a0b8c0" });
  add({ id: "cloth_e", n: "雨蓑外袍", slot: "cloth", grade: "fan", src: "行职解锁", srcLong: "行职解锁，或以物换物：山货皮 × 3", trade: ["swap_hide", 3], desc: "破祠雨意。蓑草压在肩上，下摆还带着一点山路的泥。", ic: "cloak", tint: "#9fd0c8" });
  add({ id: "cloth_f", n: "山火冬袄", slot: "cloth", grade: "ji", src: "许愿", srcLong: "许愿卡池极品。", desc: "厚实，暖色补丁，是他自己缝的。极品立绘，筋骨偏高。", ic: "cloth", tint: "#f0a070" });
  add({ id: "cloth_g", n: "渡气见证袍", slot: "cloth", grade: "ji", src: "许愿", srcLong: "许愿卡池极品。心愿默认是这一件。", desc: "暖金暗纹，带一点神性。极品立绘，神思偏高。", ic: "cloak", tint: "#ffd870" });
  // 配饰 · 头饰
  add({ id: "head_cord", n: "麻绳束带", slot: "acc_head", grade: "fan", price: [XB, 300], desc: "一截麻绳，随手束发。", ic: "head" });
  add({ id: "head_bone_pin", n: "骨木细簪", slot: "acc_head", grade: "fan", price: [XB, 600], desc: "骨与木削成的细簪。", ic: "head", tint: "#e8dcc0" });
  add({ id: "head_rain_brim", n: "雨笠缘饰", slot: "acc_head", grade: "zhen", price: [DX, 40], desc: "雨笠边缘垂下的一圈细绳。", ic: "head", tint: "#9fd0c8" });
  add({ id: "head_leaf", n: "山叶别发", slot: "acc_head", grade: "fan", src: "行职掉落", srcLong: "行职掉落，或以物换物：山叶签 × 2", trade: ["swap_leaf", 2], desc: "一片山叶别在发间，他说是顺手。", ic: "leaf" });
  // 耳饰
  add({ id: "ear_bone_ring", n: "小骨环", slot: "acc_ear", grade: "fan", price: [XB, 400], desc: "单耳一枚小骨环。", ic: "ear" });
  add({ id: "ear_cyan_drop", n: "雨青坠", slot: "acc_ear", grade: "zhen", price: [DX, 50], desc: "雨青色的小坠子，晃起来像水光。", ic: "ear", tint: "#9fd0c8" });
  // 颈胸佩
  add({ id: "neck_bone_wood", n: "骨木佩", slot: "acc_neck", grade: "fan", price: [XB, 700], desc: "骨木相嵌的胸佩，贴身戴了很多年。", ic: "neck" });
  add({ id: "neck_fang", n: "兽牙佩", slot: "acc_neck", grade: "fan", price: [XB, 900], desc: "一枚兽牙，用皮绳穿着。", ic: "neck", tint: "#e8dcc0" });
  add({ id: "neck_fu_pouch", n: "小符囊", slot: "acc_neck", grade: "zhen", price: [DX, 60], desc: "挂在胸前的小符囊，里头装着香灰。", ic: "pouch", tint: "#f0c060" });
  // 腕手
  add({ id: "hand_bracer", n: "皮护腕", slot: "acc_hand", grade: "fan", price: [XB, 500], desc: "拉弓用的皮护腕，磨得发亮。", ic: "hand" });
  add({ id: "hand_wrap", n: "猎布缠手", slot: "acc_hand", grade: "fan", price: [XB, 350], trade: ["swap_hide", 2], desc: "猎布缠在手上，防磨也防冷。", ic: "hand", tint: "#d8c8a0" });
  add({ id: "hand_ring_wood", n: "木戒", slot: "acc_hand", grade: "zhen", price: [DX, 45], desc: "山木削的戒指。", ic: "ring", tint: "#d0a070" });
  // 腰佩
  add({ id: "waist_knife", n: "短刀", slot: "acc_waist", grade: "fan", price: [XB, 800], desc: "刀柄凉，他不让你碰刃口。", ic: "waist" });
  add({ id: "waist_herb", n: "药草袋", slot: "acc_waist", grade: "fan", price: [XB, 450], desc: "装着止血的草药。", ic: "pouch", tint: "#a8c890" });
  add({ id: "waist_flint", n: "火折子挂", slot: "acc_waist", grade: "fan", price: [XB, 300], desc: "山里夜长，身上得有个亮。", ic: "pouch", tint: "#f0a070" });
  // 背负
  add({ id: "back_bow", n: "短弓袋", slot: "acc_back", grade: "fan", price: [XB, 1000], desc: "背上的短弓与箭袋。", ic: "back" });
  add({ id: "back_pack", n: "粗布行囊", slot: "acc_back", grade: "fan", price: [XB, 600], desc: "粗布包袱，装着干粮。", ic: "pouch", tint: "#d8c8a0" });
  add({ id: "back_mino", n: "蓑影披", slot: "acc_back", grade: "zhen", price: [DX, 80], desc: "背后一片蓑影，雨夜里看不清轮廓。", ic: "cloak", tint: "#9fd0c8" });
  // 动作表情
  add({ id: "emo_idle", n: "平常", slot: "emo", grade: "fan", def: 1, src: "默认", sprite: "idle", desc: "默认待机，立绘 gu_idle。", ic: "emo" });
  add({ id: "emo_cold", n: "沉眉", slot: "emo", grade: "fan", def: 1, src: "默认", sprite: "cold", desc: "戒备残留，立绘 gu_cold。", ic: "emo", tint: "#a0b8c0" });
  add({ id: "emo_watch", n: "照看", slot: "emo", grade: "fan", def: 1, src: "默认", sprite: "watch", desc: "憨厚照看，立绘 gu_watch。", ic: "emo", tint: "#f0c890" });
  add({ id: "emo_soft", n: "眉目放缓", slot: "emo", grade: "fan", price: [XB, 800], desc: "更暖的待机。立绘未出，暂用默认。", ic: "emo", tint: "#ffd870" });
  add({ id: "emo_shy", n: "耳尖微红", slot: "emo", grade: "zhen", price: [DX, 70], desc: "轻触高好感时的样子。立绘未出。", ic: "emo", tint: "#f0a0a0" });
  add({ id: "emo_alert", n: "闻风侧耳", slot: "emo", grade: "fan", src: "行职解锁", srcLong: "道途行职解锁", desc: "山里有动静时，他会先侧耳。", ic: "emo", tint: "#9fd0c8" });
  add({ id: "pose_sit_fire", n: "灶边坐姿", slot: "emo", grade: "fan", price: [XB, 1200], desc: "共处专用姿态，也可由共处行职解锁。", ic: "pose", tint: "#f0a070" });
  add({ id: "pose_door", n: "后门倚门", slot: "emo", grade: "zhen", price: [DX, 90], desc: "共处专用姿态，倚着后门守夜。", ic: "pose", tint: "#b8a8d8" });

  // 符箓：属性顺序 耳目 筋骨 隐迹 明断 推演 神思（第一段数值，一阶；升一阶约 ×1.2）
  add({ id: "fu_candle_night", n: "烛夜长明", slot: "fu", fuType: "天市符", grade: "zhen", price: [DX, 240], period: "本期", sub: "本期主打", attrs: [2, 2, 2, 2, 2, 2], kind: "通用",
    desc: "单张夹符：食指中指夹一张烛芯符，举在脸侧。火光把符边烧出一道金线，照亮他的手与眉眼。",
    img: "images/ui/thumb_fu_floor.png", pv: "images/fu/fu_floor_baseline.png", pvCap: "效果示意 · 品质下限样图（正式版更精细）", ic: "fu_flame" });
  add({ id: "fu_mountain_god", n: "山君护身", slot: "fu", fuType: "天市符", grade: "rui", price: [DX, 280], period: "本期", sub: "本期", attrs: [3, 3, 3, 3, 3, 3], kind: "通用",
    desc: "暖金山形纹在身后浮现，落叶化作光粒子飘散。", ic: "fu_bronze" });
  add({ id: "fu_duqi", n: "渡气余辉", slot: "fu", fuType: "天市符", grade: "zhen", price: [DX, 200], sub: "常驻", attrs: [2, 2, 2, 2, 2, 2], kind: "通用",
    desc: "淡金丝线从胸口向外流转，身后一圈柔光。", ic: "fu_light" });
  add({ id: "fu_ember", n: "灶余暖符", slot: "fu", fuType: "行职符", grade: "fan", src: "行职绘制", srcLong: "行职绘制：黄符纸 × 3 + 朱砂 × 2", sub: "自绘", attrs: [1, 1, 1, 1, 1, 1], kind: "通用",
    desc: "肩侧几点暖金碎光。黄纸，画面简单。", ic: "fu_flame" });
  add({ id: "fu_rain_ward", n: "避雨符影", slot: "fu", fuType: "行职符", grade: "fan", src: "行职绘制", srcLong: "行职绘制：黄符纸 × 3 + 雨青墨 × 3", sub: "材料绘制", attrs: [1, 1, 1, 1, 1, 1], kind: "通用",
    desc: "雨青薄圈，轻轻呼吸。", ic: "fu_paper", tint: "#9fd0c8" });
  add({ id: "fu_hunt_mark", n: "猎户山印", slot: "fu", fuType: "行职符", grade: "fan", src: "行职获取", srcLong: "道途行职「雨夜守门一晚」获得", sub: "道途行职", attrs: [4, 1, 1, 0, 0, 0], kind: "顾山专属",
    desc: "土褐山纹，贴地一层淡光。", ic: "fu_paper", tint: "#d0a070" });
  add({ id: "fu_sky_rift", n: "天缝微痕", slot: "fu", fuType: "章节符", grade: "zhen", src: "主线节点", srcLong: "主线行职「第一次看见天缝」获得", sub: "主线节点", attrs: [2, 1, 1, 2, 2, 2], kind: "通用",
    desc: "身后一道细细的光缕。", ic: "fu_light", tint: "#fff0c0" });
  add({ id: "fu_24dao", n: "廿四道天章", slot: "fu", fuType: "章节符", grade: "rui", src: "章节奖励", srcLong: "章节剧情通关后的章节任务奖励", sub: "章节通关", attrs: [2, 2, 2, 3, 3, 3], kind: "通用",
    desc: "二十四枚金色符字，顶上一束天缝光落下。", img: "images/ui/thumb_fu_24dao.png", pv: "images/fu/fu_24dao_effect_v1.png", pvCap: "效果示意 · 早期样图", ic: "fu_paper" });
  add({ id: "fu_beast_bone", n: "兽骨符", slot: "fu", fuType: "道途符", grade: "zhen", src: "道途解锁", srcLong: "与顾山羁绊阶 4 解锁（待做）", sub: "顾山 · 羁绊阶 4", attrs: [5, 1, 1, 1, 1, 1], kind: "顾山专属",
    desc: "顾山的兽骨片，磨得温润。", ic: "fu_bone" });
  add({ id: "fu_mountain_wood", n: "山木令", slot: "fu", fuType: "道途符", grade: "rui", src: "道途解锁", srcLong: "与顾山羁绊阶 8 解锁（待做）", sub: "顾山 · 羁绊阶 8", attrs: [10, 1, 1, 1, 1, 1], kind: "顾山专属",
    desc: "山木片刻的令，他说只给你一个人看。", ic: "fu_paper", tint: "#c8a070" });

  // 顾山衣装展示 CG（定稿，16:9）：cg=大图，img=裁切缩略图；cgX/cgY=人物焦点（0~1），用于 cover 裁切定位
  const BV = ((document.querySelector('meta[name="cw-build"]') || {}).content) || "";
  const CG_DIR = "images/art/outfits/cg/final/gu_cg_";
  const CG = { cloth_a: ["liefu", .49, .35], cloth_b: ["yechang", .49, .35], cloth_c: ["rijian", .33, .35], cloth_d: ["suan", .62, .45],
    cloth_e: ["yusuo", .49, .35], cloth_f: ["dongao", .47, .4], cloth_g: ["duqi", .5, .4] };
  I.forEach((it) => {
    const c = CG[it.id]; if (!c) return;
    it.cg = CG_DIR + c[0] + ".jpg?v=" + BV; it.img = CG_DIR + c[0] + "_thumb.jpg?v=" + BV; it.cgX = c[1]; it.cgY = c[2];
  });
  const PAINT_ATTR = { fan: [3, 2, 2, 1, 1, 1], zhen: [6, 4, 3, 3, 3, 3], rui: [10, 6, 4, 5, 5, 6], ji: [12, 9, 8, 8, 8, 10] };
  const CLOTH_ATTR = {
    cloth_a: [4, 3, 2, 2, 1, 1],
    cloth_c: [3, 2, 3, 2, 2, 1],
    cloth_e: [2, 3, 4, 1, 2, 2],
    cloth_d: [7, 5, 4, 6, 5, 4],
    cloth_b: [12, 8, 14, 7, 8, 9],
    cloth_f: [14, 12, 6, 8, 7, 8],
    cloth_g: [10, 9, 8, 12, 11, 14]
  };
  const GACHA = {
    cost: 160,
    cost10: 1500,
    rate: { ji: 0.015, zhen: 0.135, fan: 0.85 },
    pityJi: 80,
    pityWish: 120,
    frag: { fan: 15, zhen: 8, ji: 3 },
    costMing: {
      fan: [15, 30, 45, 70, 100, 140],
      zhen: [8, 16, 28, 44, 64, 90],
      ji: [3, 6, 10, 16, 24, 36]
    },
    mingStep: [8, 10, 14, 18, 24, 32]
  };
  I.forEach((it) => {
    if (it.slot === "cloth") it.attrs = (CLOTH_ATTR[it.id] || PAINT_ATTR[it.grade] || PAINT_ATTR.fan).slice();
    if (it.slot === "fu") it.attrs = [0, 0, 0, 0, 0, 0];
  });
  const ITEMS = {};
  I.forEach((it) => { ITEMS[it.id] = it; });

  // 行囊里的任务物（信物 / 材料 / 共处用品 / 兑换物）
  const BAG = {
    keep_ash: { n: "破祠香灰", cat: "keep", ic: "pouch", line: "他扫了半天，还是留了一小撮给你。" },
    keep_flint: { n: "顾山的火折子", cat: "keep", ic: "waist", line: "他说山里夜长，身上得有个亮。" },
    keep_rift_light: { n: "天缝碎光", cat: "keep", ic: "fu_light", line: "握着不烫，像一小块没落下来的天。" },
    keep_arrow: { n: "断了的木箭", cat: "keep", ic: "back", line: "他不肯扔，说还能削成别的。" },
    mat_paper: { n: "黄符纸", cat: "mat", ic: "fu_paper", line: "日常行职所得。绘制行职符用。" },
    mat_cinnabar: { n: "朱砂", cat: "mat", ic: "fu_flame", line: "日常／道途行职所得。绘制行职符用。" },
    mat_rain_ink: { n: "雨青墨", cat: "mat", ic: "fu_paper", tint: "#9fd0c8", line: "顾山道途行职所得。绘制避雨符影用。" },
    mat_gold_dust: { n: "天缝金屑", cat: "mat", ic: "fu_light", line: "主线行职所得。主线信物升级、共处特殊事件用。" },
    mat_sand: { n: "凝符砂", cat: "mat", ic: "fu_light", tint: "#fff0c0", line: "符箓重绘升阶用。只从免费来源拿，天市不卖。" },
    use_firewood: { n: "干柴束", cat: "use", ic: "bundle", line: "带去「添柴」：这捆干，你哪儿捡的？手没划着吧。" },
    use_cloth: { n: "干净粗布", cat: "use", ic: "cloth", line: "带去「整理榻席」：铺这个，夜里不扎人。" },
    use_water_jar: { n: "山泉水罐", cat: "use", ic: "pouch", line: "带去「盛水」：这水甜，你先喝。" },
    use_door_wedge: { n: "木楔", cat: "use", ic: "waist", line: "带去「关门避雨」：塞上就不响了，你睡得踏实点。" },
    swap_hide: { n: "山货皮", cat: "swap", ic: "hide", line: "道途行职所得。天市「以物换物」可换雨蓑外袍、猎布缠手。" },
    swap_leaf: { n: "山叶签", cat: "swap", ic: "leaf", line: "日常行职所得。天市「以物换物」可换山叶别发。" }
  };
  const BAG_CATS = [["keep", "信物"], ["mat", "材料"], ["use", "共处用品"], ["swap", "兑换物"]];

  // 礼包：目前只有一个新人礼包（内容暂定，不含行职符）
  const BUNDLES = [
    { id: "bundle_newbie", n: "新人礼包", grade: "zhen", price: [DX, 60], limit: 1,
      parts: ["cloth_c", "head_cord"], bag: { use_firewood: 2, use_water_jar: 1 },
      desc: "给刚进城外的你：日间旅服、麻绳束带，外加干柴束 × 2、山泉水罐 × 1。",
      note: "内容暂定 · 限购一次 · 外观拆成部件入库，可混搭" }
  ];

  // 行职录示意任务（摘自 XINGZHI_TASK_ITEMS_DRAFT）
  const TASKS = {
    daily: { n: "日常行职", tip: "每天 3 条 · 漏一天不扣东西", list: [
      { t: "在场轻触顾山 3 次", r: "150 薪币 · 黄符纸 × 1", go: "presence" },
      { t: "共处做任意 2 个动作", r: "150 薪币 · 山叶签 × 1", go: "homelife" },
      { t: "看一段剧情或回顾一段", r: "150 薪币 · 朱砂 × 1", go: "story" }
    ] },
    path: { n: "道途行职", tip: "猎户山路 · 每周 3 条", list: [
      { t: "跟他去后山看套子", r: "雨青墨 × 2 · 山货皮 × 1", go: "story" },
      { t: "帮他补猎服的破口", r: "30 道薪 · 解锁 雨湿短发", go: "homelife" },
      { t: "雨夜守门一晚", r: "雨青墨 × 1 · 解锁 猎户山印", go: "homelife" }
    ] },
    main: { n: "主线行职", tip: "跟章节走", list: [
      { t: "第一章「渡气」通关", r: "信物 顾山的火折子 · 50 道薪", go: "story" },
      { t: "第一次看见天缝", r: "信物 天缝碎光 · 天缝金屑 × 2 · 解锁 天缝微痕", go: "story" },
      { t: "章节剧情通关", r: "章节奖励 廿四道天章", go: "story" }
    ] },
    home: { n: "共处行职", tip: "随共处状态", list: [
      { t: "破祠「整洁」达标", r: "干净粗布 × 2 · 解锁 灶边坐姿", go: "homelife" },
      { t: "「烟火」与「避雨」同时达标", r: "木楔 × 1 · 30 道薪", go: "homelife" }
    ] }
  };

  // 初始存档（演示余额与已有物件，贴近线框）
  const DEFAULT_SAVE = {
    ver: 1,
    xb: 124860,
    dx: 2350,
    owned: ["hair_a", "cloth_a", "emo_idle", "emo_cold", "emo_watch", "cloth_g", "neck_bone_wood", "hand_bracer", "head_leaf", "fu_duqi", "fu_ember"],
    bag: { keep_ash: 1, mat_paper: 2, mat_cinnabar: 1, mat_rain_ink: 1, swap_hide: 3, swap_leaf: 5 },
    fuTier: {},
    bought: {},
    ming: { cloth_a: 0, cloth_g: 0 },
    frags: {},
    pityJi: 0,
    pityWish: 0,
    wish: "cloth_g",
    pulls: 0,
    equipped: { hair: "hair_a", cloth: "cloth_a", acc_head: null, acc_ear: null, acc_neck: "neck_bone_wood", acc_hand: "hand_bracer", acc_waist: null, acc_back: null, emo: "emo_idle", fu: null },
    plan: 1,
    plans: {
      1: { hair: "hair_a", cloth: "cloth_a", acc_head: null, acc_ear: null, acc_neck: "neck_bone_wood", acc_hand: "hand_bracer", acc_waist: null, acc_back: null, emo: "emo_idle", fu: null },
      2: null,
      3: null
    }
  };
  const DEFAULT_OUTFIT = { hair: "hair_a", cloth: "cloth_a", acc_head: null, acc_ear: null, acc_neck: null, acc_hand: null, acc_waist: null, acc_back: null, emo: "emo_idle", fu: null };
  const GU_BASE = [20, 10, 10, 10, 10, 10]; // 初识：主属性耳目 20，其余 10（示意）

  window.CW_DATA = { XB, DX, GRADE, ATTRS, SLOTS, SLOT_NAME, ITEMS, ITEM_LIST: I, BAG, BAG_CATS, BUNDLES, TASKS, DEFAULT_SAVE, DEFAULT_OUTFIT, GU_BASE, GACHA, CLOTH_ATTR };
})();
