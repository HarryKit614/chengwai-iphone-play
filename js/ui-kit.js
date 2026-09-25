/* 《廿四道·城外》UI 构件：云纹角花、货币图标、印章、占位图标（移植自 images/ui-mock/v4 与 v6） */
// 《廿四道·城外》UI 线框 v4 · 共用 SVG 构件（云纹角花、牌匾、货币条、朱漆按钮、图标）
window.V4 = (() => {
  let uid = 0;
  const id = p => `${p}${++uid}`;

  // 四角云纹（左上角原型，其余三角镜像）
  function corner(stroke = "#e8c878", dot = "#f5e0a0") {
    return `<svg viewBox="0 0 44 44"><g fill="none" stroke="${stroke}" stroke-width="1.35" stroke-linecap="round">
      <path d="M6,20 C1,12 8,4 16,6 C22,7 22,14 17,15 C12,16 11,10 16,10"/>
      <path d="M16,6 C21,1 31,3 30,11 C29,15 23,14 24,10"/>
      <path d="M6,20 C3,27 7,33 13,31 C17,30 16,25 12,25"/>
      <path d="M30,5 C34,3 38,3 42,5" opacity=".8"/>
      <path d="M5,30 C3,34 3,38 5,42" opacity=".8"/>
      <path d="M22,18 C26,16 28,20 25,22"/>
      <circle cx="11" cy="12" r="1.6" fill="${dot}" stroke="none"/>
      <circle cx="26" cy="9" r="1.1" fill="${dot}" stroke="none"/>
    </g></svg>`;
  }
  function decorate(el, small = false, stroke, dot) {
    ["tl", "tr", "bl", "br"].forEach(k => {
      const d = document.createElement("div");
      d.className = `yc ${k}${small ? " sm" : ""}`;
      d.innerHTML = corner(stroke, dot);
      el.appendChild(d);
    });
  }

  // 象牙纸牌匾背景（同主殿侧栏按钮 path）
  function plaqueBg(active = false) {
    const p = id("pp"), g = id("pg");
    const fill = active
      ? `<stop offset="0%" stop-color="#fff6dc"/><stop offset="45%" stop-color="#f3dca8"/><stop offset="100%" stop-color="#e0bc78"/>`
      : `<stop offset="0%" stop-color="#f7edd4"/><stop offset="45%" stop-color="#ead4a8"/><stop offset="100%" stop-color="#d4b882"/>`;
    return `<div class="pq-bg"><svg viewBox="0 0 168 48" preserveAspectRatio="none">
      <defs><linearGradient id="${p}" x1="0" y1="0" x2="0" y2="1">${fill}</linearGradient>
      <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f0d878"/><stop offset="50%" stop-color="#b8862a"/><stop offset="100%" stop-color="#f0d878"/></linearGradient></defs>
      ${active ? `<path d="M14,4 C8,4 4,8 4,14 L4,34 C4,40 8,44 14,44 L154,44 C160,44 164,40 164,34 L164,14 C164,8 160,4 154,4 Z" fill="none" stroke="#ffd870" stroke-width="5" opacity=".45"/>` : ""}
      <path d="M14,4 C8,4 4,8 4,14 L4,34 C4,40 8,44 14,44 L154,44 C160,44 164,40 164,34 L164,14 C164,8 160,4 154,4 Z" fill="url(#${p})" stroke="url(#${g})" stroke-width="1.8"/>
      <path d="M10,8 L158,8" fill="none" stroke="#f5e8c0" stroke-width="0.7" opacity=".7"/>
      <rect x="8" y="8" width="152" height="32" rx="4" fill="none" stroke="#8a6020" stroke-width="0.6" opacity=".45"/>
      <g fill="none" stroke="#b8862a" stroke-width="1.2" stroke-linecap="round">
        <path d="M12,18 C8,18 8,10 16,10 C22,10 22,16 17,17 C13,18 12,14 16,13"/><path d="M16,10 C20,6 28,8 26,14"/>
        <path d="M156,18 C160,18 160,10 152,10 C146,10 146,16 151,17 C155,18 156,14 152,13"/><path d="M152,10 C148,6 140,8 142,14"/>
        <path d="M12,30 C8,30 8,38 16,38 C22,38 22,32 17,31 C13,30 12,34 16,35"/><path d="M16,38 C20,42 28,40 26,34"/>
        <path d="M156,30 C160,30 160,38 152,38 C146,38 146,32 151,31 C155,30 156,34 152,35"/><path d="M152,38 C148,42 140,40 142,34"/>
      </g>
      <g fill="#c9a045" stroke="#6a4810" stroke-width="0.6"><circle cx="4" cy="24" r="3.2"/><circle cx="164" cy="24" r="3.2"/></g>
    </svg></div>`;
  }

  // 漆面云纹胶囊（主殿货币 chip 原样），可换描边色
  function lacquerPill(fillTop = "#3a2a14", fillMid = "#1e140a", strokeHi = "#e8c878") {
    const f = id("cf"), g = id("cg");
    return `<svg viewBox="0 0 200 40" preserveAspectRatio="none"><defs>
      <linearGradient id="${f}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${fillTop}" stop-opacity=".9"/><stop offset="50%" stop-color="${fillMid}" stop-opacity=".92"/><stop offset="100%" stop-color="${fillTop}" stop-opacity=".9"/></linearGradient>
      <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8a6020"/><stop offset="35%" stop-color="${strokeHi}"/><stop offset="65%" stop-color="#f5e0a0"/><stop offset="100%" stop-color="#8a6020"/></linearGradient></defs>
      <path d="M18,2 C12,2 6,6 4,12 C2,18 2,22 4,28 C6,34 12,38 18,38 L182,38 C188,38 194,34 196,28 C198,22 198,18 196,12 C194,6 188,2 182,2 Z" fill="url(#${f})" stroke="url(#${g})" stroke-width="1.6"/>
      <path d="M20,5 L180,5" fill="none" stroke="#e8c878" stroke-width="0.5" opacity=".45"/>
      <path d="M20,35 L180,35" fill="none" stroke="#8a6020" stroke-width="0.5" opacity=".5"/>
      <g fill="none" stroke="${strokeHi}" stroke-width="1.15" stroke-linecap="round">
        <path d="M10,20 C6,14 12,8 18,10 C22,11 22,16 18,18 C14,20 12,16 16,14"/><path d="M10,20 C6,26 12,32 18,30 C22,29 22,24 18,22"/>
        <path d="M16,12 C20,8 26,10 24,15"/><path d="M16,28 C20,32 26,30 24,25"/><circle cx="14" cy="20" r="1.4" fill="#f5e0a0" stroke="none"/>
        <path d="M190,20 C194,14 188,8 182,10 C178,11 178,16 182,18 C186,20 188,16 184,14"/><path d="M190,20 C194,26 188,32 182,30 C178,29 178,24 182,22"/>
        <path d="M184,12 C180,8 174,10 176,15"/><path d="M184,28 C180,32 174,30 176,25"/><circle cx="186" cy="20" r="1.4" fill="#f5e0a0" stroke="none"/>
      </g>
      <g fill="none" stroke="#c9a045" stroke-width="0.8" opacity=".85">
        <path d="M60,3 C64,1 70,1 74,3"/><path d="M126,3 C130,1 136,1 140,3"/><path d="M60,37 C64,39 70,39 74,37"/><path d="M126,37 C130,39 136,39 140,37"/>
      </g></svg>`;
  }

  const icoXinbi = (s = 22) => { const g = id("sk"); return `<svg class="icon" width="${s}" height="${s}" viewBox="0 0 24 24"><defs><radialGradient id="${g}" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#ffe9a0"/><stop offset="100%" stop-color="#b8862a"/></radialGradient></defs>
    <ellipse cx="12" cy="15" rx="7" ry="6" fill="url(#${g})" stroke="#6a4810" stroke-width="1"/><path d="M8,10 C8,7 10,5 12,5 C14,5 16,7 16,10" fill="none" stroke="#e8c878" stroke-width="1.3"/><path d="M9,10 H15" stroke="#8a6020" stroke-width="1.2"/><circle cx="12" cy="15" r="2" fill="#6a4810" opacity=".35"/></svg>`; };
  const icoDaoxin = (s = 22) => { const g = id("st"); return `<svg class="icon" width="${s}" height="${s}" viewBox="0 0 24 24"><defs><radialGradient id="${g}" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#fff2c0"/><stop offset="100%" stop-color="#c9a045"/></radialGradient></defs>
    <polygon points="12,2 14.2,8.5 21,9 15.8,13.2 17.5,20 12,16.5 6.5,20 8.2,13.2 3,9 9.8,8.5" fill="url(#${g})" stroke="#6a4810" stroke-width="0.9"/><circle cx="12" cy="11.5" r="2.2" fill="#6a4810" opacity=".25"/></svg>`; };

  function currencyBar(xinbi = "124,860", daoxin = "2,350") {
    return `<div class="currency-bar">
      <div class="chip"><div class="chip-bg">${lacquerPill()}</div>${icoXinbi()}<span class="label">薪币</span><span class="value">${xinbi}</span><span class="plus">+</span></div>
      <div class="chip"><div class="chip-bg">${lacquerPill()}</div>${icoDaoxin()}<span class="label">道薪</span><span class="value">${daoxin}</span><span class="plus">+</span></div>
    </div>`;
  }

  function topLeft(title, sub, seal) {
    return `<div class="topleft">
      <div class="back plaque" style="position:relative">${plaqueBg()}
        <div class="orb"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M11,3 L5,9 L11,15" fill="none" stroke="#3a2808" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <span>回主殿</span></div>
      <div class="page-title">${title}<span class="pt-sub">${sub}</span></div>
      <div class="seal-box">${seal}</div>
    </div>`;
  }

  // 朱漆描金按钮
  function vermBg(disabled = false) {
    const f = id("vf"), g = id("vg");
    const c1 = disabled ? "#6a5a44" : "#d8583a", c2 = disabled ? "#3a3024" : "#8c1e14";
    return `<div class="bv-bg"><svg viewBox="0 0 200 48" preserveAspectRatio="none"><defs>
      <linearGradient id="${f}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8a6020"/><stop offset="30%" stop-color="#f0d878"/><stop offset="70%" stop-color="#fff0b8"/><stop offset="100%" stop-color="#8a6020"/></linearGradient></defs>
      <path d="M20,3 C12,3 5,9 4,16 C3,21 3,27 4,32 C5,39 12,45 20,45 L180,45 C188,45 195,39 196,32 C197,27 197,21 196,16 C195,9 188,3 180,3 Z" fill="url(#${f})" stroke="url(#${g})" stroke-width="2"/>
      <path d="M22,7 L178,7" stroke="#ffd8a0" stroke-width="0.8" opacity=".5"/>
      <g fill="none" stroke="#f5e0a0" stroke-width="1.3" stroke-linecap="round">
        <path d="M11,24 C6,17 13,10 20,12 C25,13 25,19 20,21 C16,23 14,18 18,16"/><path d="M11,24 C6,31 13,38 20,36 C25,35 25,29 20,27"/>
        <path d="M189,24 C194,17 187,10 180,12 C175,13 175,19 180,21 C184,23 186,18 182,16"/><path d="M189,24 C194,31 187,38 180,36 C175,35 175,29 180,27"/>
      </g></svg></div>`;
  }

  // 通用小图标
  const lockIco = (s = 22, c = "#e8c878") => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="1.5" fill="rgba(30,20,8,.8)" stroke="${c}" stroke-width="1.5"/><path d="M8,10.5 V8 C8,5.2 9.8,3.5 12,3.5 C14.2,3.5 16,5.2 16,8 V10.5" fill="none" stroke="${c}" stroke-width="1.6"/><circle cx="12" cy="15.2" r="1.6" fill="${c}"/></svg>`;
  const checkSeal = (s = 30) => `<svg width="${s}" height="${s}" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="rgba(140,30,20,.88)" stroke="#f0c060" stroke-width="1.4"/><circle cx="15" cy="15" r="10" fill="none" stroke="#f0c060" stroke-width=".7" opacity=".7"/><path d="M9,15.5 L13.2,19.5 L21,11" fill="none" stroke="#fff0c8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  return { decorate, corner, plaqueBg, lacquerPill, icoXinbi, icoDaoxin, currencyBar, topLeft, vermBg, lockIco, checkSeal, id };
})();

// 占位图标：物件尚无美术，统一用描金剪影（卡面另标「占位」）
window.ICONS = (() => {
  const S = (inner, tint = "#e8c878") =>
    `<svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke="${tint}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
  const T = {
    hair: t => S(`<path d="M18,40 C14,22 22,10 34,10 C46,10 52,20 48,38"/><path d="M22,26 C28,20 38,18 46,24"/><path d="M20,34 L16,48 M48,34 L52,46"/><ellipse cx="33" cy="36" rx="11" ry="13" fill="rgba(232,200,120,.12)"/>`, t),
    hair_bun: t => S(`<circle cx="33" cy="12" r="6"/><path d="M20,40 C16,24 24,16 33,16 C42,16 50,24 46,40"/><path d="M27,12 L22,6 M39,12 L44,6"/><ellipse cx="33" cy="36" rx="11" ry="13" fill="rgba(232,200,120,.12)"/>`, t),
    hair_long: t => S(`<path d="M18,54 C12,30 20,10 33,10 C46,10 54,30 48,54"/><path d="M22,24 C30,18 40,18 46,26"/><ellipse cx="33" cy="34" rx="11" ry="13" fill="rgba(232,200,120,.12)"/>`, t),
    cloth: t => S(`<path d="M22,10 L32,16 L42,10 L54,18 L50,30 L44,28 L46,56 H18 L20,28 L14,30 L10,18 Z" fill="rgba(232,200,120,.10)"/><path d="M32,16 L26,34 M32,16 L38,34"/><path d="M20,38 H44"/>`, t),
    cloak: t => S(`<path d="M24,10 C28,14 36,14 40,10 L52,18 C56,34 54,48 50,56 H14 C10,48 8,34 12,18 Z" fill="rgba(232,200,120,.10)"/><path d="M32,14 V56"/><path d="M28,20 C30,22 34,22 36,20"/>`, t),
    head: t => S(`<path d="M10,40 L54,20"/><circle cx="52" cy="21" r="4" fill="rgba(232,200,120,.2)"/><path d="M40,26 C44,32 50,34 54,32"/><path d="M18,36 L14,32"/>`, t),
    ear: t => S(`<path d="M26,16 C18,16 16,28 22,34 C26,38 28,44 26,48"/><circle cx="36" cy="40" r="7"/><path d="M36,26 V33"/>`, t),
    neck: t => S(`<path d="M14,12 C18,30 46,30 50,12"/><path d="M32,28 V34"/><path d="M26,34 H38 L35,52 H29 Z" fill="rgba(232,200,120,.14)"/><path d="M29,40 H35"/>`, t),
    hand: t => S(`<path d="M20,16 H44 L46,48 H18 Z" fill="rgba(232,200,120,.10)"/><path d="M19,24 H45 M19,32 H45 M18,40 H46"/><circle cx="26" cy="20" r="1.5"/>`, t),
    ring: t => S(`<ellipse cx="32" cy="38" rx="14" ry="10"/><ellipse cx="32" cy="38" rx="9" ry="6"/><path d="M26,26 L32,18 L38,26"/>`, t),
    waist: t => S(`<path d="M16,20 L48,44"/><path d="M40,38 L50,46 L46,50 L36,42 Z" fill="rgba(232,200,120,.14)"/><path d="M14,18 L20,14 L22,22 Z"/><path d="M28,24 L22,32"/>`, t),
    pouch: t => S(`<path d="M22,24 C14,34 16,52 32,52 C48,52 50,34 42,24 Z" fill="rgba(232,200,120,.12)"/><path d="M22,24 C26,20 38,20 42,24"/><path d="M26,18 C28,14 36,14 38,18"/><path d="M32,32 V42"/>`, t),
    back: t => S(`<path d="M20,8 C44,18 44,46 20,56"/><path d="M20,8 V56"/><path d="M34,14 L50,50"/><path d="M48,46 L50,50 L46,50"/>`, t),
    emo: t => S(`<ellipse cx="32" cy="32" rx="18" ry="22" fill="rgba(232,200,120,.10)"/><path d="M22,28 C24,26 28,26 30,28 M34,28 C36,26 40,26 42,28"/><path d="M27,42 C30,44 34,44 37,42"/>`, t),
    pose: t => S(`<circle cx="30" cy="12" r="6"/><path d="M30,18 L28,38 L18,44 M28,38 L40,46 L40,56"/><path d="M29,24 L42,30 M29,24 L18,30"/><path d="M12,56 H52"/>`, t),
    fu_paper: t => S(`<path d="M22,8 H42 L44,56 H20 Z" fill="rgba(240,200,90,.22)"/><path d="M32,14 V50 M26,20 H38 M27,30 H37 M26,40 H38"/>`, t),
    fu_bronze: t => S(`<path d="M20,12 H44 L48,20 V48 L32,58 L16,48 V20 Z" fill="rgba(200,140,70,.22)"/><circle cx="32" cy="34" r="9"/><path d="M32,8 V12"/><path d="M28,32 L32,26 L36,32 L32,40 Z"/>`, t),
    fu_light: t => S(`<path d="M32,6 C22,22 42,30 32,44 C26,52 32,58 32,58"/><path d="M24,14 C18,26 30,34 24,46" opacity=".6"/><path d="M40,14 C46,26 34,34 40,46" opacity=".6"/><circle cx="32" cy="30" r="3" fill="${t}"/>`, t),
    fu_bone: t => S(`<path d="M20,14 C16,10 12,16 16,18 L44,48 C44,52 50,54 50,48 C54,48 52,42 48,44 L20,16"/><path d="M26,30 L30,26 M34,38 L38,34"/>`, t),
    fu_flame: t => S(`<path d="M22,12 H42 L44,56 H20 Z" fill="rgba(240,160,70,.22)"/><path d="M32,20 C26,28 28,36 32,38 C36,36 38,28 32,20 Z" fill="rgba(255,200,90,.5)"/><path d="M26,46 H38"/>`, t),
    bundle: t => S(`<path d="M12,24 H52 V54 H12 Z" fill="rgba(232,200,120,.10)"/><path d="M10,16 H54 V24 H10 Z"/><path d="M32,16 V54"/><path d="M32,16 C26,6 18,10 24,16 M32,16 C38,6 46,10 40,16"/>`, t),
    hide: t => S(`<path d="M18,12 C24,16 40,16 46,12 L50,24 C56,34 52,46 48,52 L42,48 C38,54 26,54 22,48 L16,52 C12,46 8,34 14,24 Z" fill="rgba(200,150,90,.18)"/><path d="M26,28 C30,32 34,32 38,28"/>`, t),
    leaf: t => S(`<path d="M32,56 C32,40 32,24 44,10 C54,26 48,44 32,56 C16,44 12,26 22,12 C28,20 32,30 32,40" fill="rgba(140,180,110,.16)"/><path d="M28,14 H36 V24"/>`, t),
    none: t => S(`<circle cx="32" cy="32" r="16" stroke-dasharray="4 4"/><path d="M22,42 L42,22"/>`, t),
  };
  return (k, tint) => (T[k] || T.none)(tint);
})();


// 主殿侧栏 / 底栏图标（取自 v3 hub-overlay-preview，改为适配 D 镂空窗棂暗底的描金线）
window.HUB_ICONS = {
  xingzhi: `<svg viewBox="0 0 28 28"><rect x="6" y="4" width="16" height="20" rx="1.5" fill="rgba(245,232,192,.16)" stroke="#e8c878" stroke-width="1.3"/><path d="M9,9 H19 M9,13 H17 M9,17 H18" stroke="#f5e0a0" stroke-width="1.1" stroke-linecap="round"/><path d="M6,7 Q3,14 6,21" fill="none" stroke="#c9a045" stroke-width="1.3"/></svg>`,
  yiguan: `<svg viewBox="0 0 28 28"><path d="M8,8 L14,5 L20,8 L22,12 L20,24 H8 L6,12 Z" fill="rgba(245,232,192,.16)" stroke="#e8c878" stroke-width="1.2"/><path d="M14,5 V12" stroke="#f5e0a0" stroke-width="1"/><path d="M10,12 H18" stroke="#f5e0a0" stroke-width="1.2"/></svg>`,
  xingnang: `<svg viewBox="0 0 28 28"><ellipse cx="14" cy="16" rx="8" ry="7" fill="rgba(245,232,192,.16)" stroke="#e8c878" stroke-width="1.2"/><path d="M10,10 C10,7 12,5 14,5 C16,5 18,7 18,10" fill="none" stroke="#f5e0a0" stroke-width="1.3"/><path d="M10,10 H18" stroke="#e8c878" stroke-width="1.2"/><circle cx="14" cy="16" r="2" fill="#e8c878" opacity=".55"/></svg>`,
  tianshi: `<svg viewBox="0 0 28 28"><path d="M6,22 H22" stroke="#e8c878" stroke-width="1.3"/><path d="M8,22 V14 L14,9 L20,14 V22" fill="rgba(245,232,192,.16)" stroke="#e8c878" stroke-width="1.2"/><path d="M10,14 H18" stroke="#f5e0a0" stroke-width="1"/><path d="M11,9 L14,6 L17,9" fill="#c9a045" stroke="#f5e0a0" stroke-width="0.9"/></svg>`,
  shuwu: `<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="9" fill="rgba(245,232,192,.16)" stroke="#e8c878" stroke-width="1.2"/><circle cx="14" cy="14" r="5.5" fill="none" stroke="#f5e0a0" stroke-width="1"/><path d="M11,12 Q14,9 17,12 Q14,16 11,12" fill="#e8c878" opacity=".7"/><circle cx="14" cy="17" r="1.5" fill="#f5e0a0"/></svg>`,
  presence: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="rgba(30,20,8,.35)" stroke="#c9a045" stroke-width="1.2"/><g fill="none" stroke="#ffe9a0" stroke-width="1.6" stroke-linecap="round"><path d="M20,10 C28,12 30,22 24,26 C18,30 12,24 16,18 C20,12 26,16 22,20"/></g><circle cx="20" cy="20" r="2.2" fill="#f5e0a0" stroke="#8a6020" stroke-width="0.7"/></svg>`,
  story: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="rgba(30,20,8,.35)" stroke="#c9a045" stroke-width="1.2"/><path d="M20,10 C22,14 26,16 24,22 C23,26 20,30 20,30 C20,30 17,26 16,22 C14,16 18,14 20,10 Z" fill="#e07040" stroke="#e8c878" stroke-width="0.9"/><path d="M20,14 C21,17 23,18 22,22" fill="none" stroke="#ffe9a0" stroke-width="1.2"/></svg>`,
  homelife: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="rgba(30,20,8,.35)" stroke="#c9a045" stroke-width="1.2"/><path d="M20,28 C14,24 10,20 10,16 C10,12 13,10 16,10 C18,10 19.5,11 20,13 C20.5,11 22,10 24,10 C27,10 30,12 30,16 C30,20 26,24 20,28 Z" fill="none" stroke="#f0d890" stroke-width="1.6"/><path d="M16,16 C18,14 20,16 20,18 C20,16 22,14 24,16" fill="none" stroke="#e8c878" stroke-width="1"/></svg>`,
  gallery: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="rgba(30,20,8,.35)" stroke="#c9a045" stroke-width="1.2"/><path d="M12,12 H19 V28 H12 Q10,28 10,26 V14 Q10,12 12,12 Z" fill="#e8d4a8" stroke="#6a4810" stroke-width="0.9"/><path d="M21,12 H28 Q30,12 30,14 V26 Q30,28 28,28 H21 Z" fill="#d4b882" stroke="#6a4810" stroke-width="0.9"/><path d="M20,12 V28" stroke="#b8862a" stroke-width="1.2"/><path d="M14,16 H17 M14,20 H17 M23,16 H27 M23,20 H26" stroke="#8a6020" stroke-width="0.9"/></svg>`,
  tassel: `<svg viewBox="0 0 18 56"><circle cx="9" cy="6" r="3.5" fill="#e8c878" stroke="#6a4810" stroke-width="0.8"/><path d="M9,9.5 C9,9.5 5,14 7,18 C9,22 9,22 9,22 C9,22 9,22 11,18 C13,14 9,9.5 9,9.5" fill="#c9a045" stroke="#6a4810" stroke-width="0.6"/><path d="M7,20 Q9,24 7,30 Q9,36 6,44" fill="none" stroke="#c04030" stroke-width="1.6" stroke-linecap="round"/><path d="M9,20 Q11,26 9,34 Q10,40 9,48" fill="none" stroke="#a02818" stroke-width="1.8" stroke-linecap="round"/><path d="M11,20 Q13,25 12,32 Q14,38 12,46" fill="none" stroke="#c04030" stroke-width="1.5" stroke-linecap="round"/></svg>`
};
