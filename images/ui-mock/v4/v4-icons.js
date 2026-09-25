// 占位图标：物件尚无美术，统一用描金剪影（卡面另标「占位」）
const ICONS = (() => {
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
