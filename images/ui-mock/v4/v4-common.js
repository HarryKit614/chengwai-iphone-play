// 《廿四道·城外》UI 线框 v4 · 共用 SVG 构件（云纹角花、牌匾、货币条、朱漆按钮、图标）
const V4 = (() => {
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
