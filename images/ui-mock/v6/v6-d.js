// v6 · 顶部返回/页名/货币条改为「镂空窗棂」D 样式
const V6 = {
  topLeft(title, sub, seal) {
    return `<div class="topleft">
      <button class="cw cw-d cw-secondary cw-back"><span class="cw-label"><span class="arr"><svg width="14" height="14" viewBox="0 0 18 18"><path d="M11,3 L5,9 L11,15" fill="none" stroke="#3a2808" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>回主殿</span></button>
      <div class="page-title d">${title}<span class="pt-sub">${sub}</span></div>
      <div class="seal-box">${seal}</div></div>`;
  },
  currencyBar(xinbi = "124,860", daoxin = "2,350") {
    const c = (ico, lb, v) => `<div class="cw cw-d dframe"><span class="cw-label">${ico}<span class="lb">${lb}</span><span class="val">${v}</span><span class="plus">+</span></span></div>`;
    return `<div class="currency-bar">${c(V4.icoXinbi(), "薪币", xinbi)}${c(V4.icoDaoxin(), "道薪", daoxin)}</div>`;
  },
  pill(inner) { return `<div class="cw cw-d dframe pill"><span class="cw-label">${inner}</span></div>`; },
};
