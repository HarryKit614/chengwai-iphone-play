/* 《廿四道·城外》系统数据 —— 取自 docs/TIANSUI_OUTFIT_GUSHAN_DRAFT.md（含末尾各次修订）、
 * docs/XINGZHI_TASK_ITEMS_DRAFT.md、docs/FU_ATTRIBUTE_BALANCE_DRAFT.md。数值均为草案示意。 */
(function () {
  const XB = "xb", DX = "dx";
  // 品级：凡品 / 珍品 / 瑞品（外观按价位归档：薪币档=凡品，道薪<150=珍品，道薪≥150=瑞品；任务得=凡品）
  const GRADE = { fan: "凡品", zhen: "珍品", rui: "瑞品", ji: "极品" };
  const ATTRS = ["耳目", "筋骨", "隐迹", "明断", "推演", "神思"];

  const SLOTS = [
    { k: "cloth", n: "立绘", ic: "cloth" }
  ];
  const SLOT_NAME = {};
  SLOTS.forEach((s) => { if (s.k) SLOT_NAME[s.k] = s.n; });

  // 外观部件
  const I = [];
  const add = (o) => I.push(o);
  // 衣服
  add({ id: "cloth_a", n: "猎服", slot: "cloth", grade: "fan", def: 1, src: "默认", desc: "土褐破猎服，雨青内襟。默认穿着。", ic: "cloth" });
  add({ id: "cloth_b", n: "夜氅", slot: "cloth", grade: "ji", src: "许愿", srcLong: "许愿卡池极品。80 抽小保底随机极品，120 抽大保底出心愿。", desc: "深色夜行披。极品立绘，隐迹偏高。", ic: "cloak", tint: "#b8a8d8" });
  add({ id: "cloth_c", n: "日间旅服", slot: "cloth", grade: "fan", src: "许愿", srcLong: "许愿卡池凡品。", desc: "整洁旅装，像是要带你进城。", ic: "cloth", tint: "#d8c8a0" });
  add({ id: "cloth_d", n: "素暗礼服", slot: "cloth", grade: "zhen", src: "许愿", srcLong: "许愿卡池珍品。", desc: "见礼用的素暗袍，他穿着有点拘谨。", ic: "cloak", tint: "#a0b8c0" });
  add({ id: "cloth_e", n: "雨蓑外袍", slot: "cloth", grade: "fan", src: "许愿", srcLong: "许愿卡池凡品。", desc: "破祠雨意。蓑草压在肩上，下摆还带着一点山路的泥。", ic: "cloak", tint: "#9fd0c8" });
  add({ id: "cloth_f", n: "山火冬袄", slot: "cloth", grade: "ji", src: "许愿", srcLong: "许愿卡池极品。", desc: "厚实，暖色补丁，是他自己缝的。极品立绘，筋骨偏高。", ic: "cloth", tint: "#f0a070" });
  add({ id: "cloth_g", n: "渡气见证袍", slot: "cloth", grade: "ji", src: "许愿", srcLong: "许愿卡池极品。心愿默认是这一件。", desc: "暖金暗纹，带一点神性。极品立绘，神思偏高。", ic: "cloak", tint: "#ffd870" });
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
  // 初始存档（演示余额与已有物件，贴近线框）
  const DEFAULT_SAVE = {
    ver: 1,
    xb: 124860,
    dx: 2350,
    owned: ["cloth_a", "cloth_g"],
    bag: {},
    fuTier: {},
    bought: {},
    ming: { cloth_a: 0, cloth_g: 0 },
    frags: {},
    pityJi: 0,
    pityWish: 0,
    wish: "cloth_g",
    pulls: 0,
    equipped: { cloth: "cloth_a" },
    plan: 1,
    plans: { 1: { cloth: "cloth_a" }, 2: null, 3: null }
  };
  const DEFAULT_OUTFIT = { cloth: "cloth_a" };
  const GU_BASE = [20, 10, 10, 10, 10, 10]; // 初识：主属性耳目 20，其余 10（示意）

  window.CW_DATA = { XB, DX, GRADE, ATTRS, SLOTS, SLOT_NAME, ITEMS, ITEM_LIST: I, DEFAULT_SAVE, DEFAULT_OUTFIT, GU_BASE, GACHA, CLOTH_ATTR };
})();
