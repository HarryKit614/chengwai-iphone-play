/* 《廿四道·城外》系统层：舞台缩放、主殿、天市、衣冠、行职录、行囊、署务、图鉴、存档 */
(function () {
  const D = window.CW_DATA;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const SAVE_KEY = "chengwai-system-v1";
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const stage = $("#stage");
  const scr = { scene: $("#scene"), hub: $("#hub"), page: $("#page") };
  const dock = $("#dock");

  /* ---------------- 舞台缩放：1280×720 固定舞台按比例缩放到可视区 ---------------- */
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";
  document.body.appendChild(probe);
  function fit() {
    const cs = getComputedStyle(probe);
    const st = parseFloat(cs.paddingTop) || 0, sr = parseFloat(cs.paddingRight) || 0;
    const sb = parseFloat(cs.paddingBottom) || 0, sl = parseFloat(cs.paddingLeft) || 0;
    const vv = window.visualViewport;
    const vw = vv ? vv.width : window.innerWidth, vh = vv ? vv.height : window.innerHeight;
    const aw = Math.max(100, vw - sl - sr), ah = Math.max(100, vh - st - sb);
    const s = Math.min(aw / 1280, ah / 720);
    stage.style.setProperty("--stage-scale", s.toFixed(4));
    stage.style.left = (sl + aw / 2) + "px";
    stage.style.top = (st + ah / 2) + "px";
  }
  window.addEventListener("resize", fit);
  window.addEventListener("orientationchange", () => setTimeout(fit, 250));
  if (window.visualViewport) window.visualViewport.addEventListener("resize", fit);
  fit();

  /* ---------------- 存档 ---------------- */
  let S;
  function load() {
    let d = null;
    try { d = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); } catch (_) {}
    S = clone(D.DEFAULT_SAVE);
    if (d && typeof d === "object" && d.ver === 1) {
      Object.assign(S, d);
      S.equipped = Object.assign(clone(D.DEFAULT_OUTFIT), d.equipped || {});
      S.plans = Object.assign({ 1: null, 2: null, 3: null }, d.plans || {});
      S.bag = d.bag || {}; S.owned = Array.isArray(d.owned) ? d.owned : clone(D.DEFAULT_SAVE.owned);
      S.bought = d.bought || {}; S.fuTier = d.fuTier || {};
    }
    D.ITEM_LIST.forEach((it) => { if (it.def && !S.owned.includes(it.id)) S.owned.push(it.id); });
    if (!S.ming || typeof S.ming !== "object") S.ming = {};
    if (!S.frags || typeof S.frags !== "object") S.frags = {};
    ["pityJi", "pityWish", "pulls"].forEach((k) => { if (typeof S[k] !== "number" || S[k] < 0) S[k] = 0; });
    if (!D.ITEMS[S.wish] || D.ITEMS[S.wish].slot !== "cloth" || D.ITEMS[S.wish].grade !== "ji") S.wish = "cloth_g";
    S.owned.forEach((id) => { const it = D.ITEMS[id]; if (it && it.slot === "cloth" && S.ming[id] == null) S.ming[id] = 0; });
    applySkin();
  }
  function applySkin() {
    const it = D.ITEMS[(S.equipped && S.equipped.cloth) || "cloth_a"] || D.ITEMS.cloth_a;
    stage.classList.remove("skin-fan", "skin-zhen", "skin-rui", "skin-ji");
    stage.classList.add(it.id === "cloth_g" ? "skin-ji" : it.grade === "rui" ? "skin-rui" : it.grade === "zhen" ? "skin-zhen" : "skin-fan");
  }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (_) {} }
  load();
  const owns = (id) => S.owned.includes(id);
  const bagQty = (id) => S.bag[id] || 0;
  const tierOf = (id) => S.fuTier[id] || 1;
  const TIER_CN = ["", "一阶", "二阶", "三阶"];

  /* ---------------- 通用 ---------------- */
  const toastEl = $("#toast");
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }
  const modal = $("#modal");
  function confirmBox(o) {
    modal.innerHTML = `<div class="lacq mbox" id="mbox"><div class="mt">${o.title}</div><div class="mb">${o.body || ""}</div>
      <div class="mbtns">${o.cancel === false ? "" : `<button class="cw cw-d cw-secondary" data-m="no"><span class="cw-label">${o.cancelText || "取消"}</span></button>`}
      <button class="cw cw-d cw-primary" data-m="ok"><span class="cw-label">${o.okText || "确认"}</span></button></div></div>`;
    V4.decorate($("#mbox"));
    modal.classList.add("on"); modal.setAttribute("aria-hidden", "false");
    const close = () => { modal.classList.remove("on"); modal.setAttribute("aria-hidden", "true"); modal.innerHTML = ""; };
    $$("[data-m]", modal).forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation(); const ok = b.dataset.m === "ok"; close();
      if (ok && o.onOk) o.onOk(); if (!ok && o.onCancel) o.onCancel();
    }));
  }
  modal.addEventListener("click", (e) => { if (e.target === modal) { modal.classList.remove("on"); modal.innerHTML = ""; } });

  const curIco = (c, s) => (c === D.XB ? V4.icoXinbi(s) : V4.icoDaoxin(s));
  const curName = (c) => (c === D.XB ? "薪币" : "道薪");
  const priceHTML = (p, s) => curIco(p[0], s) + `<span>${fmt(p[1])}</span>`;
  const bal = (c) => (c === D.XB ? S.xb : S.dx);
  const icon = (k, tint) => ICONS(k, tint || "#e8c878");
  const rar = (g) => `<span class="rar ${g}">${D.GRADE[g]}</span>`;
  function attrRow(attrs, tier) {
    const m = Math.pow(1.2, (tier || 1) - 1);
    return `<div class="attr-row">` + D.ATTRS.map((a, i) => {
      const v = Math.round(attrs[i] * m * 10) / 10;
      return `<span class="${v ? "" : "z"}">${a} <b>+${Math.round(v)}</b></span>`;
    }).join("") + `</div>`;
  }
  const attrSum = (attrs) => attrs.reduce((a, b) => a + b, 0);
  function mingOf(id) { return (S.ming && S.ming[id]) || 0; }
  function fragOf(id) { return (S.frags && S.frags[id]) || 0; }
  function mingPct(ming) {
    const steps = D.GACHA.mingStep;
    let pct = 0;
    for (let i = 0; i < ming && i < steps.length; i++) pct += steps[i];
    return pct;
  }
  function clothAttrs(it) {
    const base = (it && it.attrs) || [0, 0, 0, 0, 0, 0];
    const pct = mingPct(mingOf(it && it.id));
    return base.map((v) => Math.round(v * (100 + pct) / 100));
  }
  const FRAME = {
    cloth_a: { stroke: "#c4a06a", gold: "#e7d3b0", fill: "rgba(92,58,28,.42)", glow: "rgba(127,191,180,.55)",
      d: "M14,58 L24,44 L18,28 L34,32 L42,14 L54,30 L70,20 L74,40 L64,52 L70,68 L50,58 L42,74 L26,62 L14,72 Z",
      mark: `<path d="M30,46 L34,58 M48,40 L44,54" stroke="#7fbfb4" stroke-width="1.7" fill="none"/>`,
      mid: `<path d="M8,16 L16,8 L22,14 L30,4 L38,14 L46,8 L54,16 L46,22 L36,16 L28,24 L18,18 Z" fill="rgba(92,58,28,.45)" stroke="#c4a06a" stroke-width="1.2"/><path d="M30,10 L28,20" stroke="#7fbfb4" stroke-width="1.4"/>` },
    cloth_b: { stroke: "#c5d0ea", gold: "#8e9bb8", fill: "rgba(18,16,36,.55)", glow: "rgba(170,186,220,.5)",
      d: "M8,46 C12,30 26,28 34,38 C36,18 54,14 62,32 C74,22 84,38 72,48 C80,60 62,70 50,58 C46,74 28,70 26,56 C12,68 2,58 8,46 Z",
      mark: `<path d="M54,18 A9,9 0 1 1 53.9,18.2" fill="#e4ecf8" stroke="none"/><path d="M58,18 A6,6 0 1 0 58,32 A5,5 0 1 1 58,18" fill="#12101f"/>`,
      mid: `<path d="M6,16 C14,6 28,8 32,16 C40,4 58,8 62,18 C52,14 40,20 32,16 C24,22 12,20 6,16 Z" fill="rgba(18,16,36,.6)" stroke="#c5d0ea" stroke-width="1.1"/><circle cx="34" cy="12" r="3.2" fill="#e4ecf8"/>` },
    cloth_c: { stroke: "#e2b45e", gold: "#fff0c4", fill: "rgba(210,160,70,.22)", glow: "rgba(255,214,130,.6)",
      d: "M16,54 C4,40 16,24 30,34 C28,12 50,6 60,26 C74,10 90,28 74,42 C86,52 74,70 56,60 C52,78 30,74 30,58 C16,72 6,64 16,54 Z",
      mark: `<circle cx="48" cy="36" r="5" fill="#fff6d4" stroke="#e2b45e" stroke-width="1.2"/><path d="M48,26 V30 M48,42 V46 M38,36 H42 M54,36 H58" stroke="#fff0c4" stroke-width="1.1"/>`,
      mid: `<path d="M4,16 C12,4 24,8 28,16 C34,2 52,6 56,16 C48,10 36,18 28,14 C20,20 10,18 4,16 Z" fill="rgba(255,220,140,.28)" stroke="#e2b45e" stroke-width="1.2"/><circle cx="30" cy="11" r="3" fill="#fff6d4"/>` },
    cloth_d: { stroke: "#b7c0c8", gold: "#e6ebf0", fill: "rgba(36,42,48,.5)", glow: "rgba(190,198,206,.28)",
      d: "M20,50 C18,36 30,30 38,38 C40,24 54,22 58,36 C68,30 76,40 68,50 C76,62 62,68 54,58 C50,70 36,66 34,56 C24,66 16,60 20,50 Z",
      mark: `<rect x="40" y="40" width="9" height="9" fill="none" stroke="#d5dde3" stroke-width="1.15" transform="rotate(45 44.5 44.5)"/>`,
      mid: `<path d="M10,14 H26 L32,8 L38,14 H58" fill="none" stroke="#b7c0c8" stroke-width="1.2"/><rect x="29" y="11" width="6" height="6" fill="none" stroke="#e6ebf0" stroke-width="1" transform="rotate(45 32 14)"/>` },
    cloth_e: { stroke: "#8ecfc4", gold: "#e4d0a2", fill: "rgba(28,72,64,.4)", glow: "rgba(120,200,188,.5)",
      d: "M10,44 C14,26 30,24 36,36 C38,16 58,12 64,32 C78,22 86,40 72,48 C78,60 60,64 52,54 C50,70 32,72 30,54 C16,66 2,56 10,44 Z",
      mark: `<path d="M28,62 L26,76 M40,66 L41,78 M54,60 L57,74" stroke="#e4d0a2" stroke-width="1.3" fill="none"/>`,
      mid: `<path d="M8,12 C16,4 26,8 30,14 C36,4 50,6 54,14 C46,10 36,16 30,12 C22,16 14,14 8,12 Z" fill="rgba(28,72,64,.45)" stroke="#8ecfc4" stroke-width="1.1"/><path d="M24,14 L22,24 M36,14 L37,24 M48,14 L50,22" stroke="#e4d0a2" stroke-width="1.1"/>` },
    cloth_f: { stroke: "#f08a48", gold: "#ffd2a8", fill: "rgba(110,36,12,.4)", glow: "rgba(255,110,50,.5)",
      d: "M18,66 C12,50 26,46 30,30 C32,46 44,24 48,8 C54,28 66,22 70,40 C82,34 84,54 70,60 C74,76 54,78 48,62 C36,80 16,76 18,66 Z",
      mark: `<path d="M46,34 C44,42 50,46 48,54 C54,46 56,40 52,32 C50,36 48,36 46,34 Z" fill="#ffb060"/>`,
      mid: `<path d="M12,20 C16,8 26,12 28,4 C32,14 42,6 46,16 C56,8 64,16 60,22 C48,16 36,24 24,18 C18,22 12,20 12,20 Z" fill="rgba(160,48,12,.45)" stroke="#f08a48" stroke-width="1.1"/>` },
    cloth_g: { stroke: "#f0d78a", gold: "#fff6d2", fill: "rgba(90,58,16,.28)", glow: "rgba(255,214,120,.7)",
      d: "M12,50 C6,32 24,26 34,36 C32,14 54,8 64,28 C78,14 92,32 76,46 C88,56 72,74 56,62 C52,80 28,76 28,60 C12,74 2,62 12,50 Z",
      mark: `<path d="M46,30 L52,40 L46,50 L40,40 Z" fill="#fff6d2" stroke="#f0d78a" stroke-width="0.8"/><path d="M22,48 C30,40 42,40 50,48" fill="none" stroke="#fff6d2" stroke-width="0.9" opacity=".8"/>`,
      mid: `<path d="M4,16 C12,4 24,8 30,16 C36,2 54,6 60,16 C50,10 38,18 30,14 C20,20 10,18 4,16 Z" fill="rgba(240,200,100,.25)" stroke="#f0d78a" stroke-width="1.15"/><path d="M30,8 L33,14 L30,20 L27,14 Z" fill="#fff6d2"/>` }
  };
  function fullMing(it) { return !!(it && it.slot === "cloth" && mingOf(it.id) >= 6 && FRAME[it.id]); }
  function frameHTML(it) {
    if (!fullMing(it)) return "";
    const p = FRAME[it.id];
    const cn = (cls) => `<svg class="cn ${cls}" viewBox="0 0 96 80"><path d="${p.d}" fill="${p.fill}" stroke="${p.stroke}" stroke-width="1.7" stroke-linejoin="round"/>${p.mark}</svg>`;
    return `<span class="ming-frame" style="--mf:${p.stroke};--mg:${p.gold};--glow:${p.glow}">${cn("tl")}${cn("tr")}${cn("bl")}${cn("br")}<svg class="mid t" viewBox="0 0 68 28">${p.mid}</svg><svg class="mid b" viewBox="0 0 68 28">${p.mid}</svg></span>`;
  }
  function clothPool(grade) {
    return D.ITEM_LIST.filter((it) => it.slot === "cloth" && it.grade === grade);
  }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function grantPull(it) {
    const neu = !owns(it.id);
    let frag = 0;
    if (neu) {
      S.owned.push(it.id);
      S.ming[it.id] = 0;
    } else {
      frag = D.GACHA.frag[it.grade] || D.GACHA.frag.fan;
      S.frags[it.id] = fragOf(it.id) + frag;
    }
    return { it, neu, frag, ji: it.grade === "ji", wish: it.id === S.wish };
  }
  function pullOne() {
    const G = D.GACHA;
    S.pityJi += 1;
    S.pityWish += 1;
    S.pulls += 1;
    const wish = D.ITEMS[S.wish];
    let it;
    if (S.pityWish >= G.pityWish) it = wish;
    else if (S.pityJi >= G.pityJi) it = pick(clothPool("ji"));
    else {
      const r = Math.random();
      const grade = r < G.rate.ji ? "ji" : r < G.rate.ji + G.rate.zhen ? "zhen" : "fan";
      it = pick(clothPool(grade));
    }
    if (it.grade === "ji") S.pityJi = 0;
    if (it.id === wish.id) S.pityWish = 0;
    return grantPull(it);
  }
  /* 衣装 CG：16:9 原图按 cover 填入 bw×bh 框时，按人物焦点算 object-position，不拉伸 */
  function cgPos(it, bw, bh) {
    const k = Math.max(bw / 1280, bh / 720), sw = 1280 * k, sh = 720 * k;
    const f = (c, s2, b) => (s2 - b > 1 ? Math.min(100, Math.max(0, ((c * s2 - b / 2) / (s2 - b)) * 100)) : 50);
    return `${f(it.cgX == null ? .5 : it.cgX, sw, bw).toFixed(1)}% ${f(it.cgY == null ? .5 : it.cgY, sh, bh).toFixed(1)}%`;
  }
  function cgView(it) {
    modal.innerHTML = `<div class="cg-lb"><img src="${it.cg}" alt="${it.n}"><div class="cg-cap"><b>${it.n}</b> · 顾山衣装 CG · 点击任意处关闭</div></div>`;
    modal.classList.add("on"); modal.setAttribute("aria-hidden", "false");
    $(".cg-lb", modal).addEventListener("click", (e) => { e.stopPropagation(); modal.classList.remove("on"); modal.setAttribute("aria-hidden", "true"); modal.innerHTML = ""; });
  }

  function topLeft(title, sub, seal) {
    return `<div class="topleft"><button class="cw cw-d cw-secondary cw-back" data-act="hub"><span class="cw-label"><span class="arr"><svg width="14" height="14" viewBox="0 0 18 18"><path d="M11,3 L5,9 L11,15" fill="none" stroke="#3a2808" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>回主殿</span></button>
      <div class="page-title">${title}<span class="pt-sub">${sub}</span></div><div class="seal-box">${seal}</div></div>`;
  }
  function currencyBar(orb) {
    const c = (cur, lb, v) => `<div class="cw cw-d dframe" data-cur="${cur}"><span class="cw-label">${curIco(cur)}<span class="lb">${lb}</span><span class="val">${fmt(v)}</span><button class="plus" data-act="plus" aria-label="${lb}">+</button></span></div>`;
    return `<div class="currency-bar">${c(D.XB, "薪币", S.xb)}${c(D.DX, "道薪", S.dx)}${orb ? `<button class="orb" data-act="shuwu" aria-label="署务 · 设置"></button>` : ""}</div>`;
  }
  function bindCommon(root) {
    $$("[data-act]", root).forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      const a = b.dataset.act;
      if (a === "hub") goHub();
      else if (a === "plus") toast("个人自玩版不设充值 · 可在署务恢复演示余额");
      else if (a === "shuwu") openPage("shuwu");
    }));
  }

  /* ---------------- 屏幕切换 ---------------- */
  let cur = "hub";
  function show(name) {
    cur = name;
    Object.keys(scr).forEach((k) => scr[k].classList.toggle("on", k === name));
    if (name !== "hub") scr.hub.classList.remove("hub-film");
    dock.classList.toggle("on", name === "hub" || name === "scene");
    if (name === "hub") setDockSel(null);
    const vid = $(".hub-film-vid", scr.hub);
    if (vid) {
      if (name === "hub") { vid.muted = true; const p = vid.play(); if (p && p.catch) p.catch(function () {}); }
      else vid.pause();
    }
  }
  function setDockSel(tab) {
    $$(".dock-btn", dock).forEach((b) => {
      const on = b.dataset.tab === tab;
      b.classList.toggle("on", on); b.classList.toggle("is-selected", on);
      if (on) b.setAttribute("aria-selected", "true"); else b.removeAttribute("aria-selected");
    });
  }

  /* ---------------- 底栏外框与图标 ---------------- */
  $(".dock-frame", dock).innerHTML = `<svg viewBox="0 0 720 92" preserveAspectRatio="none"><defs>
    <linearGradient id="dkF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2a16" stop-opacity=".92"/><stop offset="40%" stop-color="#1a1208" stop-opacity=".96"/><stop offset="100%" stop-color="#2a1c0c" stop-opacity=".97"/></linearGradient>
    <linearGradient id="dkG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6a4810"/><stop offset="20%" stop-color="#e8c878"/><stop offset="50%" stop-color="#fff0b8"/><stop offset="80%" stop-color="#e8c878"/><stop offset="100%" stop-color="#6a4810"/></linearGradient></defs>
    <path d="M48,8 C32,8 18,18 14,32 C10,46 14,64 28,74 C36,80 48,84 60,84 L660,84 C672,84 684,80 692,74 C706,64 710,46 706,32 C702,18 688,8 672,8 Z" fill="url(#dkF)" stroke="url(#dkG)" stroke-width="2"/>
    <path d="M56,14 L664,14" fill="none" stroke="#e8c878" stroke-width="0.7" opacity=".4"/><path d="M56,78 L664,78" fill="none" stroke="#8a6020" stroke-width="0.7" opacity=".55"/>
    <g fill="none" stroke="#e8c878" stroke-width="1.35" stroke-linecap="round">
      <path d="M30,46 C18,40 20,24 36,22 C48,20 52,30 44,36 C36,42 28,34 38,30"/><path d="M30,46 C20,54 26,68 42,68 C54,68 56,56 48,52 C40,48 34,56 42,58"/>
      <path d="M44,28 C52,20 68,22 66,34 C64,42 54,40 56,32"/><path d="M48,60 C56,70 72,68 70,56 C68,48 58,50 60,58"/>
      <path d="M690,46 C702,40 700,24 684,22 C672,20 668,30 676,36 C684,42 692,34 682,30"/><path d="M690,46 C700,54 694,68 678,68 C666,68 664,56 672,52 C680,48 686,56 678,58"/>
      <path d="M676,28 C668,20 652,22 654,34 C656,42 666,40 664,32"/><path d="M672,60 C664,70 648,68 650,56 C652,48 662,50 660,58"/>
      <circle cx="34" cy="46" r="2" fill="#f5e0a0" stroke="none"/><circle cx="686" cy="46" r="2" fill="#f5e0a0" stroke="none"/></g>
    <g transform="translate(360,5)" fill="none" stroke="#e8c878" stroke-width="1" opacity=".8"><path d="M0,0 C-8,4 -8,12 0,14 C8,12 8,4 0,0"/></g></svg>`;
  $$(".dock-ico", dock).forEach((s) => { s.innerHTML = HUB_ICONS[s.dataset.ico] || ""; });

  /* ---------------- 主殿 ---------------- */
  const cloudSvg = `<svg viewBox="0 0 120 90"><g fill="none" stroke="#e8c878" stroke-width="1.6" stroke-linecap="round">
    <path d="M20,60 C6,56 8,36 26,36 C30,22 50,20 56,34 C66,26 84,32 80,46 C96,46 100,64 84,68 L28,68 C22,68 18,64 20,60 Z" fill="rgba(232,200,120,.1)"/>
    <path d="M34,52 C30,46 38,42 42,46 C46,50 40,56 36,52"/><path d="M58,50 C56,44 64,40 68,46"/><path d="M14,76 H106" opacity=".7"/><path d="M6,82 H60" opacity=".45"/></g></svg>`;
  const SIDE = [
    { k: "xingzhi", n: "行职录", ico: "xingzhi" },
    { k: "yiguan", n: "出战", ico: "yiguan" },
    { k: "xingnang", n: "行囊", ico: "xingnang" },
    { k: "tianshi", n: "天市", ico: "tianshi" },
    { k: "shuwu", n: "署务", ico: "shuwu" }
  ];
  const BUILD = ((document.querySelector('meta[name="cw-build"]') || {}).content) || "";
  const HUB_HITS = [
    ["xingzhi", "行职录", 32, 142, 276, 76],
    ["yiguan", "出战", 32, 224, 276, 82],
    ["xingnang", "行囊", 32, 314, 276, 78],
    ["tianshi", "天市", 32, 400, 276, 76],
    ["shuwu", "署务", 32, 486, 276, 70]
  ];
  const DOCK_HITS = [["home", "在场"], ["story", "主线"], ["home-life", "共处"], ["gallery", "图鉴"]];
  /* 成片底部六个头像圆，盖住原画上的圆。fx,fy 是缩略图里脸的中心。只有渡气见证袍用这段界面。 */
  const FILM_CLOTH = "cloth_g";
  const FILM_AV = 60;
  const FILM_PICKS = [
    ["cloth_a", 627, 599, 236, 58],
    ["cloth_b", 699, 599, 176, 58],
    ["cloth_c", 770, 599, 250, 56],
    ["cloth_d", 841, 599, 196, 62],
    ["cloth_e", 913, 599, 176, 68],
    ["cloth_g", 984, 599, 190, 62]
  ];
  function bindHubPaint() {
    $$("[data-hubpaint]", scr.hub).forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      const pid = b.dataset.hubpaint;
      const item = D.ITEMS[pid];
      if (!item) return;
      if (!owns(pid)) { toast(`还没得到「${item.n}」。去天市看看。`); return; }
      if (S.equipped.cloth === pid) return;
      S.equipped.cloth = pid;
      save();
      toast(pid === FILM_CLOTH ? `换成「${item.n}」· 精致主页` : `主页换成「${item.n}」`);
      renderHub();
    }));
  }
  function bindHubLines() {
    let gi = 0;
    const lines = ["……你回来了。外头雨小了点。", "看我做什么。我在这儿，不走。", "天市那边别乱花。想要什么，跟我说。", "火我添过了。你坐近些。"];
    $(".hub-touch", scr.hub).addEventListener("click", () => {
      const line = $("#hub-aside", scr.hub);
      line.textContent = lines[gi++ % lines.length];
      line.classList.remove("show");
      void line.offsetWidth;
      line.classList.add("show");
    });
  }
  function renderHub() {
    const it = D.ITEMS[(S.equipped && S.equipped.cloth) || "cloth_a"] || D.ITEMS.cloth_a;
    if (it.id === FILM_CLOTH) renderHubFilm();
    else renderHubClassic(it);
  }
  function renderHubClassic(it) {
    scr.hub.classList.remove("hub-rui", "hub-zhen", "hub-film");
    if (it.grade === "rui" || it.grade === "zhen") scr.hub.classList.add(it.grade === "rui" ? "hub-rui" : "hub-zhen");
    applySkin();
    scr.hub.style.backgroundImage = `url("${it.cg}")`;
    const focusX = it.grade === "rui" ? 78 : it.grade === "zhen" ? 74 : 70;
    scr.hub.style.backgroundPosition = focusX + "% 42%";
    const paints = D.ITEM_LIST.filter((p) => p.slot === "cloth" && p.cg && owns(p.id));
    const picks = paints.map((p) => `<button type="button" class="hub-pick ${p.id === it.id ? "on" : ""}" data-hubpaint="${p.id}"><img src="${p.img}" alt="${p.n}"></button>`).join("");
    scr.hub.innerHTML = `
      <div class="hub-shade-top"></div><div class="hub-side"></div>
      <div class="hub-band"><span class="cloud l">${cloudSvg}</span><span class="cloud r">${cloudSvg}</span></div>
      <button type="button" class="hub-touch" aria-label="顾山"></button>
      <div class="hub-title"><div class="tf"><svg viewBox="0 0 220 46" preserveAspectRatio="none"><rect x="1.5" y="1.5" width="217" height="43" fill="none" stroke="#c9a045" stroke-width="1.6"/><rect x="4.5" y="4.5" width="211" height="37" fill="none" stroke="#8a6020" stroke-width="0.7" opacity=".7"/></svg>廿四道·城外</div><div class="seal-box">外</div></div>
      <button class="cw cw-d cw-chip hub-chapter" data-go="story"><span class="cw-label">主线 · <b>第一章「渡气」</b></span></button>
      ${currencyBar(true)}
      <div class="sidebar">${SIDE.map((s) => `<div class="side-wrap"><button class="cw cw-d cw-secondary side-btn" data-page="${s.k}"><span class="cw-label"><span class="sb-icon">${HUB_ICONS[s.ico]}</span><span>${s.n}</span></span></button><span class="tassel">${HUB_ICONS.tassel}</span></div>`).join("")}</div>
      <div class="hub-picks">${picks}</div><span class="hub-look">${it.grade === "rui" ? "瑞品主殿 · " : it.grade === "zhen" ? "珍品主殿 · " : ""}${it.n}</span>
      <p class="hub-aside" id="hub-aside"></p>`;
    bindCommon(scr.hub);
    $$("[data-page]", scr.hub).forEach((b) => b.addEventListener("click", () => openPage(b.dataset.page)));
    $("[data-go=story]", scr.hub).addEventListener("click", () => window.CW_SCENE && window.CW_SCENE.openStory());
    bindHubLines();
    bindHubPaint();
  }
  function renderHubFilm() {
    scr.hub.classList.remove("hub-rui", "hub-zhen");
    scr.hub.classList.add("hub-film");
    applySkin();
    scr.hub.style.backgroundImage = "none";
    const hits = HUB_HITS.map(([k, n, x, y, w, h]) =>
      `<button type="button" class="hub-hit" data-page="${k}" aria-label="${n}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></button>`).join("");
    const docks = DOCK_HITS.map(([k, n], i) =>
      `<button type="button" class="hub-hit" data-dock="${k}" aria-label="${n}" style="left:${250 + i * 195}px;top:656px;width:190px;height:56px"></button>`).join("");
    scr.hub.innerHTML = `
      <video class="hub-film-vid" src="images/ui/hub_live.mp4?v=${BUILD}" poster="" muted playsinline webkit-playsinline loop autoplay preload="auto"></video>
      <button type="button" class="hub-touch" aria-label="顾山"></button>
      ${hits}
      <button type="button" class="hub-hit" data-act="plus" aria-label="薪币" style="left:948px;top:34px;width:156px;height:58px"></button>
      <button type="button" class="hub-hit" data-act="plus" aria-label="道薪" style="left:1112px;top:34px;width:150px;height:58px"></button>
      ${docks}
      ${FILM_PICKS.map(([id, x, y, fx, fy]) => {
        const item = D.ITEMS[id];
        const on = id === FILM_CLOTH ? " on" : "";
        const lock = owns(id) ? "" : " lock";
        const sc = FILM_AV / 76;
        const img = `width:${(340 * sc).toFixed(1)}px;height:${(208 * sc).toFixed(1)}px;margin-left:${(-((fx - 38) * sc)).toFixed(1)}px;margin-top:${(-((fy - 38) * sc)).toFixed(1)}px`;
        return `<button type="button" class="hub-hit hub-avatar${on}${lock}" data-hubpaint="${id}" aria-label="${item.n}" style="left:${x}px;top:${y}px"><img src="${item.img}" alt="${item.n}" style="${img}"></button>`;
      }).join("")}
      <p class="hub-aside" id="hub-aside"></p>`;
    const vid = $(".hub-film-vid", scr.hub);
    vid.muted = true;
    vid.playsInline = true;
    bindCommon(scr.hub);
    $$("[data-page]", scr.hub).forEach((b) => b.addEventListener("click", () => openPage(b.dataset.page)));
    $$("[data-dock]", scr.hub).forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      const tab = b.dataset.dock;
      if (tab === "home" && window.CW_SCENE) window.CW_SCENE.goPresence();
      else if (tab === "story" && window.CW_SCENE) window.CW_SCENE.openStory();
      else if (tab === "home-life" && window.CW_SCENE) window.CW_SCENE.openPanel("home-life");
      else if (tab === "gallery") openPage("tujian");
    }));
    bindHubLines();
    bindHubPaint();
  }
  function goHub() { renderHub(); show("hub"); }

  /* ---------------- 系统页路由 ---------------- */
  function openPage(k, opt) {
    opt = opt || {};
    const R = { tianshi: renderTianshi, yiguan: renderYiguan, xingzhi: renderXingzhi, xingnang: renderXingnang, shuwu: renderShuwu, tujian: renderTujian, battle: renderBattle, xuyuan: renderXuyuan };
    if (!R[k]) return;
    R[k](opt);
    show("page");
  }
  function mount(cls, html, decorateIds) {
    scr.page.innerHTML = `<div class="pg ${cls}">${html}</div>`;
    (decorateIds || []).forEach((id) => { const el = document.getElementById(id); if (el) V4.decorate(el); });
    bindCommon(scr.page);
  }

  /* ================= 天市 ================= */
  const TS_TABS = [
    { k: "waiguan", n: "外观", ico: "cloth" },
    { k: "fu", n: "符箓", ico: "fu_paper" },
    { k: "libao", n: "礼包", ico: "bundle" },
    { k: "jiaohuan", n: "以物换物", ico: "hide" }
  ];
  const WG_SUBS = [["头发", ["hair"]], ["衣服", ["cloth"]], ["配饰", ["acc_head", "acc_ear", "acc_neck", "acc_hand", "acc_waist", "acc_back"]], ["动作表情", ["emo"]]];
  const FU_SUBS = ["全部", "天市符", "行职符", "章节符", "道途符"];
  const FU_ORDER = { "天市符": 0, "行职符": 1, "章节符": 2, "道途符": 3 };
  const ts = { tab: "fu", sub: { waiguan: 1, fu: 0, libao: 0, jiaohuan: 0 }, sel: {} };

  function tsList() {
    if (ts.tab === "waiguan") {
      const slots = WG_SUBS[ts.sub.waiguan][1];
      return D.ITEM_LIST.filter((it) => slots.includes(it.slot));
    }
    if (ts.tab === "fu") {
      const f = FU_SUBS[ts.sub.fu];
      return D.ITEM_LIST.filter((it) => it.slot === "fu" && (f === "全部" || it.fuType === f)).sort((a, b) => FU_ORDER[a.fuType] - FU_ORDER[b.fuType]);
    }
    if (ts.tab === "libao") return D.BUNDLES.map((b) => Object.assign({ bundle: 1 }, b));
    return D.ITEM_LIST.filter((it) => it.trade);
  }
  function itemState(it) {
    if (it.bundle) {
      if (S.bought[it.id] >= (it.limit || 99)) return { k: "owned", t: "已购" };
      return { k: "buy", p: it.price };
    }
    if (owns(it.id)) return { k: "owned", t: "已拥有" };
    if (ts.tab === "jiaohuan" && it.trade) return { k: "trade", tr: it.trade };
    if (it.price) return { k: "buy", p: it.price };
    const lock = it.fuType === "章节符" || it.fuType === "道途符";
    return { k: lock ? "lock" : "task", t: (it.src || "行职解锁") + " · 不售" };
  }
  function cardArt(it) {
    if (it.img) return `<img src="${it.img}" alt="">${it.slot === "fu" ? `<span class="ph-tag" style="background:rgba(60,40,10,.85)">示意</span>` : ""}`;
    return `<span class="ic">${icon(it.bundle ? "bundle" : it.ic, it.tint)}</span><span class="ph-tag">占位</span>`;
  }
  function renderTianshi(opt) {
    if (opt.tab) ts.tab = opt.tab;
    if (opt.sub != null) ts.sub[ts.tab] = opt.sub;
    if (opt.sel) ts.sel[ts.tab] = opt.sel;
    const list = tsList();
    let selId = ts.sel[ts.tab + ":" + ts.sub[ts.tab]];
    if (!selId || !list.find((x) => x.id === selId)) {
      const firstBuy = list.find((x) => itemState(x).k === "buy" || itemState(x).k === "trade");
      selId = (firstBuy || list[0] || {}).id;
    }
    ts.sel[ts.tab + ":" + ts.sub[ts.tab]] = selId;
    const sel = list.find((x) => x.id === selId);

    let html = topLeft("天市", "购得入行囊", "市") + currencyBar(false);
    html += `<div class="tabs" role="tablist">` + TS_TABS.map((t) => {
      const on = t.k === ts.tab;
      return `<button class="cw cw-d cw-tab ${on ? "is-selected" : ""}" role="tab" ${on ? 'aria-selected="true"' : ""} data-tab="${t.k}"><span class="cw-label"><span class="ti">${icon(t.ico, on ? "#fff0c0" : "#e8c878")}</span><span>${t.n}</span></span></button>`;
    }).join("") + `</div>`;

    const BN = {
      fu: { thumb: "images/ui/thumb_fu_floor.png", k: "天市符 · 按期上新", t: "第壹期「烛夜长明」", d: "本期上新：烛夜长明、山君护身<br>符材随期更换，不限于黄纸", time: "9月25日 — 10月8日", left: "本期余 13 日" },
      waiguan: { thumb: D.ITEMS.cloth_g.img, k: "天市外观 · 常驻", t: "凡品可买 · 珍品极品许愿", d: "凡品用薪币或行职换<br>珍品、极品只在许愿卡池", time: "极品 1.5% · 80／120 保底", left: "去许愿" },
      libao: { ic: "bundle", k: "礼包 · 暂只一款", t: "新人礼包", d: "外观拆成部件入库，可混搭<br>外观礼包、道具礼包以后再加", time: "限购一次", left: "内容暂定" },
      jiaohuan: { ic: "hide", k: "以物换物 · 不花道薪", t: "行职兑换物换外观", d: "山货皮出自道途行职<br>山叶签出自日常行职", time: "只换「行职解锁」外观", left: "兑换物在行囊" }
    }[ts.tab];
    html += `<div class="lacq banner" id="ts-banner"><div class="bn-glow"></div><div class="bn-thumb" style="${BN.thumb ? `background-image:url('${BN.thumb}')` : ""}">${BN.ic ? `<span class="ic">${icon(BN.ic, "#ffe9a0")}</span>` : ""}</div>
      <div class="bn-kicker">${BN.k}</div><div class="bn-title">${BN.t}</div><div class="bn-desc">${BN.d}</div>
      <div class="bn-time"><div class="d">${BN.time}</div><div class="left">${BN.left}</div></div></div>`;

    let subs = "";
    if (ts.tab === "waiguan") subs = WG_SUBS.map((s, i) => [s[0], i]);
    if (ts.tab === "fu") subs = FU_SUBS.map((s, i) => [s, i]);
    if (ts.tab === "libao") subs = [["全部礼包", 0]];
    const hint = { waiguan: "衣服里的珍品、极品去许愿", fu: "符箓不计战力 · 不售的标来源", libao: "礼包暂只一个 · 内容暂定", jiaohuan: "只换已有的行职立绘 · 不花道薪" }[ts.tab];
    html += `<div class="subtabs">`;
    if (ts.tab === "jiaohuan") {
      html += `<span class="hold-lb">行囊兑换物</span>` + ["swap_hide", "swap_leaf"].map((id) => `<span class="hold"><span class="mi">${icon(D.BAG[id].ic)}</span>${D.BAG[id].n} <b>× ${bagQty(id)}</b></span>`).join("");
    } else {
      html += subs.map(([s, i]) => { const on = i === ts.sub[ts.tab]; return `<button class="cw cw-d cw-chip ${on ? "is-selected" : ""}" ${on ? 'aria-selected="true"' : ""} data-sub="${i}"><span class="cw-label">${s}</span></button>`; }).join("");
    }
    html += `<span class="hint">${hint}</span><button class="cw cw-d cw-chip" data-go-xuyuan><span class="cw-label">许愿</span></button></div>`;

    const cols = ts.tab === "libao" ? 3 : 4;
    let cards = list.map((it) => {
      const st = itemState(it);
      let pr;
      if (st.k === "owned") pr = `<div class="pr state owned">${st.t}</div>`;
      else if (st.k === "buy") pr = `<div class="pr">${priceHTML(st.p, 19)}</div>`;
      else if (st.k === "trade") pr = `<div class="pr"><span class="mi">${icon(D.BAG[st.tr[0]].ic)}</span><span>${D.BAG[st.tr[0]].n} × ${st.tr[1]}</span></div>`;
      else pr = `<div class="pr state ${st.k}">${st.k === "lock" ? V4.lockIco(18, "#b8a080") : ""}${st.t}</div>`;
      let sb;
      if (it.bundle) sb = it.desc;
      else if (it.slot === "fu") sb = `${it.fuType} · ${it.sub || ""}`;
      else sb = `${D.SLOT_NAME[it.slot]} · ${it.desc.split(/[，。]/)[0]}`;
      const dim = st.k === "lock" || st.k === "task";
      return `<button class="card ${it.id === selId ? "sel" : ""} ${dim ? "dim" : ""}${fullMing(it) ? " ming6" : ""}" data-id="${it.id}">
        ${frameHTML(it)}<div class="art">${cardArt(it)}</div>${rar(it.grade)}${it.period ? `<span class="ribbon">${it.period}</span>` : ""}
        ${st.k === "owned" ? `<span class="owned-seal">${V4.checkSeal(28)}</span>` : ""}
        <div class="nm">${it.n}</div><div class="sb">${sb}</div>${pr}</button>`;
    }).join("");
    if (ts.tab === "libao") cards += `<div class="card placeholder"><div class="nm">外观礼包</div><div class="sb">以后再加 · 待商量</div></div><div class="card placeholder"><div class="nm">道具礼包</div><div class="sb">以后再加 · 待商量</div></div>`;
    html += `<div class="grid scroll ${cols === 3 ? "bundle" : ""}" style="grid-template-columns:repeat(${cols},1fr)">${cards}</div>`;
    html += sel ? tsPreview(sel) : `<div class="lacq preview" id="ts-preview"></div>`;

    mount("ts", html, ["ts-banner", "ts-preview"]);
    $$(".card.sel", scr.page).forEach((el) => V4.decorate(el, true, "#ffe9a0"));
    $$("[data-tab]", scr.page).forEach((b) => b.addEventListener("click", () => { renderTianshi({ tab: b.dataset.tab }); }));
    $$("[data-sub]", scr.page).forEach((b) => b.addEventListener("click", () => { renderTianshi({ sub: +b.dataset.sub }); }));
    $$(".card[data-id]", scr.page).forEach((b) => b.addEventListener("click", () => {
      ts.sel[ts.tab + ":" + ts.sub[ts.tab]] = b.dataset.id;
      const g = $(".grid", scr.page), top = g.scrollTop;
      renderTianshi({}); $(".grid", scr.page).scrollTop = top;
    }));
    const buyBtn = $("#pv-buy", scr.page);
    if (buyBtn) buyBtn.addEventListener("click", () => doBuy(sel));
    const goYg = $("#pv-goyg", scr.page);
    if (goYg) goYg.addEventListener("click", () => openPage("yiguan", { slot: sel.slot || "cloth" }));
    const goXy = $("[data-go-xuyuan]", scr.page);
    if (goXy) goXy.addEventListener("click", () => openPage("xuyuan"));
    const pvXy = $("#pv-xuyuan", scr.page);
    if (pvXy) pvXy.addEventListener("click", () => openPage("xuyuan"));
    $$("[data-cgview]", scr.page).forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); cgView(D.ITEMS[b.dataset.cgview]); }));
    const pvCg = $(".pv-img img.cg", scr.page);
    if (pvCg && sel && sel.cg) pvCg.addEventListener("click", () => cgView(sel));
  }
  function tsPreview(it) {
    const st = itemState(it);
    let img, cap;
    if (it.cg) { img = `<img class="scene cg" src="${it.cg}" alt="${it.n}" style="object-position:${cgPos(it, 400, 296)}"><button class="cg-full" data-cgview="${it.id}">全图</button>`; cap = `出战立绘 · ${it.n}`; }
    else if (it.pv) { img = `<img class="scene" src="${it.pv}" alt="">`; cap = it.pvCap; }
    else {
      const spr = it.sprite ? `images/sprites/gu_${it.sprite}.png` : "images/sprites/gu_idle.png";
      img = `<div class="halo"></div><img class="sprite" src="${spr}" alt=""><span class="pv-ic">${icon(it.bundle ? "bundle" : it.ic, it.tint)}</span><span class="ph-tag">占位</span>`;
      cap = it.bundle ? "套装立绘未出图：暂以默认立绘示意" : it.sprite ? "现有立绘：" + it.n : it.slot === "fu" ? "符箓效果图未出：暂以默认立绘示意" : "立绘部件层未出图：暂以默认立绘示意";
    }
    let tier, note;
    if (it.bundle) {
      tier = "礼包 · 暂定";
      const parts = it.parts.map((p) => D.ITEMS[p].n).concat(Object.keys(it.bag).map((b) => `${D.BAG[b].n} × ${it.bag[b]}`));
      note = `含：<b>${parts.join("、")}</b><br>${it.note}`;
    } else if (it.slot === "fu") {
      tier = `${it.fuType} · ${it.kind}`;
      const how = it.price ? "购得只作收藏，不提供战力，也不改出战形象。" : `来源：${it.srcLong} · 天市不售，只标来源方便查找。`;
      note = `不计战力。战力在出战立绘上。<div style="margin-top:6px">${how}</div>`;
    } else {
      tier = it.slot === "cloth" ? `出战立绘 · ${D.GRADE[it.grade]}` : `${D.SLOT_NAME[it.slot]}`;
      const how = it.slot === "cloth"
        ? (it.price ? "买下后可在「出战」里选这张进副本。" : `来源：${it.srcLong || it.src}。`)
        : `来源：${it.srcLong || it.src || "暂不穿戴"}。换装已取消，这件不单独上身。`;
      const live = it.slot === "cloth" ? clothAttrs(it) : null;
      note = how + (live ? `<br>出战战力 +${attrSum(live)}（${D.GRADE[it.grade]}${owns(it.id) ? " · " + mingOf(it.id) + "命" : ""}）。主线形象不变。` : "") + (it.trade ? `<br>也可以物换物：${D.BAG[it.trade[0]].n} × ${it.trade[1]}。` : "");
    }
    let price = "", btn = "购买", dis = false;
    if (st.k === "owned") { dis = true; btn = st.t; price = it.price ? `<div class="price">${priceHTML(it.price, 26)}</div>` : ""; }
    else if (st.k === "buy") {
      price = `<div class="price">${priceHTML(st.p, 26)}</div>`;
      if (bal(st.p[0]) < st.p[1]) { dis = true; btn = curName(st.p[0]) + "不足"; }
    } else if (st.k === "trade") {
      price = `<div class="price"><span class="mi">${icon(D.BAG[st.tr[0]].ic)}</span>${D.BAG[st.tr[0]].n} × ${st.tr[1]}</div>`;
      btn = "兑换"; if (bagQty(st.tr[0]) < st.tr[1]) { dis = true; btn = "兑换物不足"; }
    } else { price = `<div class="price"><small>${it.src || "行职解锁"}</small></div>`; btn = it.src === "许愿" ? "去许愿" : "不售"; dis = it.src !== "许愿"; }
    const goYg = st.k === "owned" && it.slot === "cloth" ? `<button class="cw cw-d cw-chip go-yg" id="pv-goyg"><span class="cw-label">设为出战</span></button>` : "";
    const wishGo = it.src === "许愿" && st.k !== "owned";
    return `<div class="lacq preview" id="ts-preview">
      <div class="pv-head"><span>试穿预览 · 顾山</span><span class="tog"><span>原装</span><b>试穿中</b></span></div>
      <div class="pv-img${fullMing(it) ? " ming6" : ""}">${frameHTML(it)}${img}<div class="cap">${cap}</div></div>
      <div class="pv-name"><span class="n">${it.n}</span>${rar(it.grade)}<span class="tier">${tier}</span></div>
      <div class="pv-body scroll"><div class="pv-desc">${it.desc}</div><div class="pv-note">${note}</div></div>
      <div class="pv-buy">${price}${goYg}<button class="cw cw-d cw-primary" id="${wishGo ? "pv-xuyuan" : "pv-buy"}" ${dis ? "disabled" : ""}><span class="cw-label">${btn}</span></button></div></div>`;
  }
  function doBuy(it) {
    const st = itemState(it);
    if (st.k === "buy") {
      const p = st.p, after = bal(p[0]) - p[1];
      confirmBox({
        title: "确认购买", okText: "确认购买",
        body: `购买「${it.n}」${rar(it.grade)}<div class="mi-line">${priceHTML(p, 24)}</div><small>购后余 ${fmt(after)} ${curName(p[0])} · 物件放入行囊</small>`,
        onOk() {
          if (bal(p[0]) < p[1]) { toast(curName(p[0]) + "不足"); return; }
          if (p[0] === D.XB) S.xb -= p[1]; else S.dx -= p[1];
          if (it.bundle) {
            it.parts.forEach((id) => { if (!owns(id)) S.owned.push(id); });
            Object.keys(it.bag).forEach((b) => { S.bag[b] = bagQty(b) + it.bag[b]; });
            S.bought[it.id] = (S.bought[it.id] || 0) + 1;
          } else if (!owns(it.id)) S.owned.push(it.id);
          save(); renderTianshi({});
          toast(`已购得「${it.n}」· 已放入行囊`);
        }
      });
    } else if (st.k === "trade") {
      const m = D.BAG[st.tr[0]];
      confirmBox({
        title: "确认兑换", okText: "确认兑换",
        body: `用 ${m.n} × ${st.tr[1]} 兑换「${it.n}」<small>行囊中 ${m.n} 剩 ${bagQty(st.tr[0]) - st.tr[1]}</small>`,
        onOk() {
          if (bagQty(st.tr[0]) < st.tr[1]) { toast("兑换物不足"); return; }
          S.bag[st.tr[0]] -= st.tr[1]; if (!owns(it.id)) S.owned.push(it.id);
          save(); renderTianshi({}); toast(`已换得「${it.n}」· 已放入行囊`);
        }
      });
    }
  }

  /* ================= 出战立绘（衣冠换装已取消） ================= */
  const ROSTER = [["顾山", 1], ["沈砚"], ["陆星阑"], ["萧铁衣"], ["裴无咎"], ["白鹤眠"]];
  function guEmo() {
    const e = D.ITEMS[S.equipped.emo];
    return e && e.sprite ? e.sprite : "idle";
  }
  function mingLine(it) {
    const m = mingOf(it.id);
    const attrs = clothAttrs(it);
    const G = D.GACHA;
    const have = fragOf(it.id);
    if (m >= 6) return { attrs, text: `满命 6 · 碎片 ${have}（先留着）`, btn: "已满命", dis: true };
    const need = (G.costMing[it.grade] || G.costMing.fan)[m];
    const next = m + 1;
    const gain = G.mingStep[m];
    return { attrs, need, text: `${m}命 · 碎片 ${have}/${need} · 升到 ${next}命 全属性 +${gain}%`, btn: have >= need ? `升到${next}命` : "碎片不足", dis: have < need };
  }
  function renderYiguan() {
    const id = S.equipped.cloth || "cloth_a";
    const it = D.ITEMS[id] || D.ITEMS.cloth_a;
    const paints = D.ITEM_LIST.filter((p) => p.slot === "cloth" && p.cg);
    const ml = mingLine(it);
    let html = topLeft("出战", "选一张立绘进副本 · 主线不换形象", "战") + currencyBar(false);
    html += `<div class="lacq battle" id="bt-main">
      <div class="bt-cg${fullMing(it) ? " ming6" : ""}">${frameHTML(it)}<img src="${it.cg}" alt="${it.n}"><span class="cg-tag">当前出战 · <b>${it.n}</b> · ${D.GRADE[it.grade]} · ${mingOf(it.id)}命 · 战力 +${attrSum(ml.attrs)}</span><button class="cg-full" data-cgview="${it.id}">全图</button></div>
      <div class="bt-side">
        <div class="bt-t">立绘</div>
        <div class="bt-d">${ml.text}。重复抽到的这张会拆成碎片。</div>
        <div class="paint-list">` + paints.map((p) => {
          const on = p.id === it.id;
          const have = owns(p.id);
          const bonus = have ? attrSum(clothAttrs(p)) : 0;
          return `<button class="paint ${on ? "on" : ""} ${have ? "" : "no"}${fullMing(p) ? " ming6" : ""}" data-paint="${p.id}">${frameHTML(p)}<img src="${p.img}" alt=""><b>${p.n}</b><small>${have ? `${D.GRADE[p.grade]} ${mingOf(p.id)}命 +${bonus}` : "未有"}</small></button>`;
        }).join("") + `</div>
        <button class="cw cw-d cw-secondary" id="yg-ming" ${ml.dis ? "disabled" : ""}><span class="cw-label">${ml.btn}</span></button>
        <button class="cw cw-d cw-primary" id="yg-battle"><span class="cw-label">进入副本</span></button>
      </div></div>`;
    mount("gp", html, ["bt-main"]);
    const root = scr.page;
    $$("[data-cgview]", root).forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); cgView(D.ITEMS[b.dataset.cgview]); }));
    $(".bt-cg", root).addEventListener("click", () => cgView(it));
    $$("[data-paint]", root).forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      const pid = b.dataset.paint;
      if (!owns(pid)) { toast(`还没有「${D.ITEMS[pid].n}」`); return; }
      S.equipped.cloth = pid;
      save();
      toast(`出战改为「${D.ITEMS[pid].n}」`);
      renderYiguan();
    }));
    $("#yg-battle", root).addEventListener("click", () => openPage("battle"));
    const up = $("#yg-ming", root);
    if (up) up.addEventListener("click", () => {
      const cur = mingLine(it);
      if (cur.dis) { toast(mingOf(it.id) >= 6 ? "已经满命" : "碎片不够"); return; }
      S.frags[it.id] = fragOf(it.id) - cur.need;
      S.ming[it.id] = mingOf(it.id) + 1;
      save();
      toast(`「${it.n}」升到 ${S.ming[it.id]} 命`);
      renderYiguan();
    });
  }

  function renderBattle() {
    const it = D.ITEMS[S.equipped.cloth] || D.ITEMS.cloth_a;
    const bonus = clothAttrs(it);
    const base = D.GU_BASE.reduce((a, b) => a + b, 0);
    const power = base + attrSum(bonus);
    const foe = it.grade === "ji" || it.grade === "rui" ? 100 : it.grade === "zhen" ? 90 : 88;
    const ok = power >= foe;
    let html = topLeft("副本", "出战用选定立绘 · 主线不改", "战") + currencyBar(false);
    html += `<div class="lacq battle" id="bt-main">
      <div class="bt-cg${fullMing(it) ? " ming6" : ""}">${frameHTML(it)}<img src="${it.cg}" alt="${it.n}"><span class="cg-tag">出战 · <b>${it.n}</b> · ${D.GRADE[it.grade]}</span></div>
      <div class="bt-side">
        <div class="bt-t">山道遇袭</div>
        <div class="bt-d">顾山以「${it.n}」进入这场副本。主线「渡气」仍是剧情里的原定形象，不会换成这身。</div>
        <div class="bt-p">战力 <b>${power}</b> · 关卡 ${foe} · ${mingOf(it.id)}命<br>${D.ATTRS.map((a, i) => `${a} ${D.GU_BASE[i] + bonus[i]}`).join(" · ")}</div>
        <div class="bt-r ${ok ? "ok" : ""}">${ok ? "战力够，这一关过了。" : "这身战力不够，换一张更高的立绘再来。"}</div>
        <button class="cw cw-d cw-secondary" id="bt-back"><span class="cw-label">换一张立绘</span></button>
      </div>
    </div>`;
    mount("gp", html, ["bt-main"]);
    $("#bt-back", scr.page).addEventListener("click", () => openPage("yiguan", { slot: "cloth" }));
  }

  /* ================= 许愿 ================= */
  function showPulls(rows) {
    const cards = rows.map((r) => `<div class="pull-card ${r.it.grade}${r.wish ? " wish" : ""}${fullMing(r.it) ? " ming6" : ""}">${frameHTML(r.it)}<img src="${r.it.img}" alt=""><b>${r.it.n}</b><span>${D.GRADE[r.it.grade]}${r.wish ? " · 心愿" : ""}</span><em>${r.neu ? "新获得 · 0命" : fullMing(r.it) ? "满命卡面 · 分解 +" + r.frag : "分解 +" + r.frag}</em></div>`).join("");
    modal.innerHTML = `<div class="lacq mbox pull-box" id="mbox"><div class="mt">${rows.length > 1 ? "十连" : "单抽"}</div><div class="pull-grid">${cards}</div><div class="mbtns"><button class="cw cw-d cw-primary" data-m="ok"><span class="cw-label">收下</span></button></div></div>`;
    V4.decorate($("#mbox"));
    modal.classList.add("on"); modal.setAttribute("aria-hidden", "false");
    $("[data-m]", modal).addEventListener("click", (e) => {
      e.stopPropagation();
      modal.classList.remove("on"); modal.setAttribute("aria-hidden", "true"); modal.innerHTML = "";
      renderXuyuan();
    });
  }
  function doPull(n) {
    const G = D.GACHA;
    const cost = n === 10 ? G.cost10 : G.cost;
    if (S.dx < cost) { toast("道薪不足"); return; }
    confirmBox({
      title: n === 10 ? "十连许愿" : "单抽",
      okText: "抽出",
      body: `花费 ${fmt(cost)} 道薪<br><small>抽出后余 ${fmt(S.dx - cost)} 道薪 · 重复立绘自动分解成碎片</small>`,
      onOk() {
        if (S.dx < cost) { toast("道薪不足"); return; }
        S.dx -= cost;
        const rows = [];
        for (let i = 0; i < n; i++) rows.push(pullOne());
        save();
        showPulls(rows);
      }
    });
  }
  function renderXuyuan() {
    const G = D.GACHA;
    const wish = D.ITEMS[S.wish] || D.ITEMS.cloth_g;
    const jis = clothPool("ji");
    const fans = clothPool("fan").map((it) => it.n).join("、");
    const zhens = clothPool("zhen").map((it) => it.n).join("、");
    let html = topLeft("许愿", "立绘卡池 · 重复自动分解", "愿") + currencyBar(false);
    html += `<div class="lacq battle" id="xy-main">
      <div class="bt-cg${fullMing(wish) ? " ming6" : ""}">${frameHTML(wish)}<img src="${wish.cg}" alt="${wish.n}"><span class="cg-tag">心愿 · <b>${wish.n}</b> · 极品${fullMing(wish) ? " · 满命卡面" : ""}</span><button class="cg-full" data-cgview="${wish.id}">全图</button></div>
      <div class="bt-side xy-side">
        <div class="bt-t">卡池</div>
        <div class="bt-d">凡品 ${Math.round(G.rate.fan * 1000) / 10}%（${fans}）<br>珍品 ${Math.round(G.rate.zhen * 1000) / 10}%（${zhens}）<br>极品 ${Math.round(G.rate.ji * 1000) / 10}%（三张均分，心愿不加权）</div>
        <div class="bt-p">小保底 <b>${S.pityJi}/${G.pityJi}</b> 随机极品<br>大保底 <b>${S.pityWish}/${G.pityWish}</b> 必出心愿<br>同一抽出两保底时，出心愿。非心愿极品只清小保底。</div>
        <div class="wish-row">` + jis.map((it) => `<button class="paint ${it.id === wish.id ? "on" : ""}${fullMing(it) ? " ming6" : ""}" data-wish="${it.id}">${frameHTML(it)}<img src="${it.img}" alt=""><b>${it.n}</b><small>${owns(it.id) ? mingOf(it.id) + "命 · 碎片" + fragOf(it.id) : "未有"}</small></button>`).join("") + `</div>
        <button class="cw cw-d cw-secondary" id="xy-one"><span class="cw-label">单抽 ${G.cost}</span></button>
        <button class="cw cw-d cw-primary" id="xy-ten"><span class="cw-label">十连 ${fmt(G.cost10)}</span></button>
      </div></div>`;
    mount("gp", html, ["xy-main"]);
    const root = scr.page;
    $$("[data-cgview]", root).forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); cgView(D.ITEMS[b.dataset.cgview]); }));
    $$("[data-wish]", root).forEach((b) => b.addEventListener("click", () => {
      S.wish = b.dataset.wish;
      save();
      toast(`心愿改为「${D.ITEMS[S.wish].n}」`);
      renderXuyuan();
    }));
    $("#xy-one", root).addEventListener("click", () => doPull(1));
    $("#xy-ten", root).addEventListener("click", () => doPull(10));
  }

  /* ================= 行职录 ================= */
  let xzTab = "daily";
  function renderXingzhi(opt) {
    if (opt.tab) xzTab = opt.tab;
    const T = D.TASKS[xzTab];
    const goName = { presence: "去在场", homelife: "去共处", story: "去主线" };
    const goIco = { presence: "emo", homelife: "bundle", story: "fu_light" };
    let html = topLeft("行职录", "做任务是为了多陪他一会儿", "职") + currencyBar(false);
    html += `<div class="lacq main" id="gp-main"><div class="gtabs">` + Object.keys(D.TASKS).map((k) => { const on = k === xzTab; return `<button class="cw cw-d cw-tab ${on ? "is-selected" : ""}" ${on ? 'aria-selected="true"' : ""} data-xz="${k}"><span class="cw-label">${D.TASKS[k].n}</span></button>`; }).join("") +
      `<span class="note">示意任务 · 奖励未接入</span></div><div class="gbody scroll"><div class="tip">${T.tip} · 漏做不扣东西</div>` +
      T.list.map((t) => `<div class="xz-task"><span class="tk-ico">${icon(goIco[t.go])}</span><div class="tk-main"><div class="tk-t">${t.t}</div><div class="tk-r">奖励：<b>${t.r}</b></div></div><span class="demo">示意</span><button class="cw cw-d cw-secondary" data-gogo="${t.go}"><span class="cw-label">${goName[t.go]}</span></button></div>`).join("") + `</div></div>`;
    mount("gp", html, ["gp-main"]);
    $$("[data-xz]", scr.page).forEach((b) => b.addEventListener("click", () => renderXingzhi({ tab: b.dataset.xz })));
    $$("[data-gogo]", scr.page).forEach((b) => b.addEventListener("click", () => {
      const g = b.dataset.gogo, SC = window.CW_SCENE; if (!SC) return;
      if (g === "presence") SC.goPresence(); else if (g === "homelife") SC.openPanel("home-life"); else SC.openStory();
    }));
  }

  /* ================= 行囊 ================= */
  let xnTab = "look";
  function renderXingnang(opt) {
    if (opt.tab) xnTab = opt.tab;
    const TABS = [["look", "外观"], ["fu", "符箓"]].concat(D.BAG_CATS);
    let cells = [];
    if (xnTab === "look") cells = S.owned.map((id) => D.ITEMS[id]).filter((it) => it && it.slot !== "fu").map((it) => ({ id: it.id, slot: it.slot, n: it.n, st: D.SLOT_NAME[it.slot], ic: it.ic, tint: it.tint, g: it.grade, img: it.img, line: `${it.n}（${D.GRADE[it.grade]} · ${D.SLOT_NAME[it.slot]}${fullMing(it) ? " · 满命卡面" : ""}）：${it.desc}` }));
    else if (xnTab === "fu") cells = S.owned.map((id) => D.ITEMS[id]).filter((it) => it && it.slot === "fu").map((it) => ({ n: it.n, st: "不计战力", ic: it.ic, tint: it.tint, img: it.img, g: it.grade, line: `${it.n}（${it.fuType}）：不再提供属性，战力在出战立绘上。` }));
    else cells = Object.keys(S.bag).filter((id) => S.bag[id] > 0 && D.BAG[id] && D.BAG[id].cat === xnTab).map((id) => ({ n: D.BAG[id].n, st: { keep: "信物", mat: "材料", use: "共处用品", swap: "兑换物" }[xnTab], ic: D.BAG[id].ic, tint: D.BAG[id].tint, q: S.bag[id], line: `${D.BAG[id].n}：${D.BAG[id].line}` }));
    let html = topLeft("行囊", "天市购得 · 行职所得", "囊") + currencyBar(false);
    html += `<div class="lacq main" id="gp-main"><div class="gtabs">` + TABS.map(([k, n]) => { const on = k === xnTab; return `<button class="cw cw-d cw-tab ${on ? "is-selected" : ""}" ${on ? 'aria-selected="true"' : ""} data-xn="${k}" style="min-width:112px"><span class="cw-label">${n}</span></button>`; }).join("") +
      `<span class="note">共 ${cells.length} 种</span></div><div class="gbody scroll" style="bottom:96px">` +
      (cells.length ? `<div class="bag-grid">` + cells.map((c, i) => `<button class="oc${fullMing(c) ? " ming6" : ""}" data-xi="${i}">${frameHTML(c)}<div class="art">${c.img ? `<img src="${c.img}" alt="">` : `<span class="ic">${icon(c.ic, c.tint)}</span><span class="ph-tag">占位</span>`}</div>${c.g ? rar(c.g) : ""}${c.q ? `<span class="qty">× ${c.q}</span>` : ""}<div class="nm">${c.n}</div><div class="st">${c.st}</div></button>`).join("") + `</div>` : `<div class="tip">这一格还空着。去行职录或天市看看。</div>`) +
      `</div><div class="bag-detail" id="xn-detail"><b>行囊</b><span>点一件物品看详情。出战只选立绘，符箓不计战力。</span></div></div>`;
    mount("gp", html, ["gp-main"]);
    $$("[data-xn]", scr.page).forEach((b) => b.addEventListener("click", () => renderXingnang({ tab: b.dataset.xn })));
    $$("[data-xi]", scr.page).forEach((b) => b.addEventListener("click", () => {
      $$(".oc.sel", scr.page).forEach((x) => x.classList.remove("sel")); b.classList.add("sel");
      const c = cells[+b.dataset.xi]; $("#xn-detail", scr.page).innerHTML = `<b>${c.n}</b><span>${c.line.replace(c.n + "：", "").replace(c.n, "")}</span>`;
    }));
  }

  /* ================= 署务 ================= */
  function renderShuwu() {
    let html = topLeft("署务", "设置 · 存档", "署") + currencyBar(false);
    html += `<div class="lacq main" id="gp-main"><div class="gtabs"><button class="cw cw-d cw-tab is-selected" aria-selected="true"><span class="cw-label">设置</span></button><span class="note">本地自玩 · 进度只存在本机 Safari</span></div><div class="gbody scroll">
      <div class="set-row"><div class="sr-t">恢复演示余额</div><div class="sr-d">把薪币、道薪恢复为 124,860 ／ 2,350。已拥有的物件不变。</div><button class="cw cw-d cw-secondary" data-set="bal"><span class="cw-label">恢复</span></button></div>
      <div class="set-row"><div class="sr-t">重置系统存档</div><div class="sr-d">货币、行囊和出战立绘回到初始。</div><button class="cw cw-d cw-secondary" data-set="sys"><span class="cw-label">重置</span></button></div>
      <div class="set-row"><div class="sr-t">重置剧情进度</div><div class="sr-d">主线「渡气」读档点、共处状态、轻触台词进度回到开头。</div><button class="cw cw-d cw-secondary" data-set="story"><span class="cw-label">重置</span></button></div>
      <div class="set-row"><div class="sr-t">关于</div><div class="sr-d">《廿四道·城外》个人自玩 Demo · 版本 20260925w · 16:9 横屏舞台 1280×720。立绘部件层、符箓效果图、礼包内容均为占位或暂定。</div></div>
    </div></div>`;
    mount("gp", html, ["gp-main"]);
    $$("[data-set]", scr.page).forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.set;
      if (k === "bal") confirmBox({ title: "恢复演示余额", body: "薪币 124,860 · 道薪 2,350", onOk() { S.xb = D.DEFAULT_SAVE.xb; S.dx = D.DEFAULT_SAVE.dx; save(); renderShuwu(); toast("余额已恢复"); } });
      if (k === "sys") confirmBox({ title: "重置系统存档", body: "货币、行囊和出战立绘都会回到初始。确定吗？", okText: "确定重置", onOk() { localStorage.removeItem(SAVE_KEY); load(); save(); renderShuwu(); toast("系统存档已重置"); } });
      if (k === "story") confirmBox({ title: "重置剧情进度", body: "主线、共处、轻触进度回到开头。确定吗？", okText: "确定重置", onOk() { if (window.CW_SCENE) window.CW_SCENE.resetProgress(); toast("剧情进度已重置"); } });
    }));
  }

  /* ================= 图鉴（占位） ================= */
  function renderTujian() {
    let html = topLeft("图鉴", "卡面与心迹 · 占位", "鉴") + currencyBar(false);
    html += `<div class="lacq main" id="gp-main"><div class="gtabs"><button class="cw cw-d cw-tab is-selected" aria-selected="true"><span class="cw-label">男主</span></button><button class="cw cw-d cw-tab" disabled><span class="cw-label">卡面</span></button><button class="cw cw-d cw-tab" disabled><span class="cw-label">心迹</span></button><span class="note">立绘在天市「许愿」</span></div><div class="gbody scroll"><div class="gal-grid">` +
      ROSTER.map((r) => `<div class="gal-card">${r[1] ? `<img src="images/sprites/gu_idle.png" alt="">` : `<div class="lk">${V4.lockIco(44)}</div>`}<div class="gn">${r[0]}<span class="gs">${r[1] ? "第一章 · 渡气" : "待解锁"}</span></div></div>`).join("") +
      `</div><div class="tip" style="margin-top:18px">卡面与心迹将在后续章节解锁。</div></div></div>`;
    mount("gp", html, ["gp-main"]);
  }

  window.CW = { show, goHub, openPage, toast, setDockSel, guEmo, state: () => S, confirmBox };
  goHub();
  show("hub");
})();
