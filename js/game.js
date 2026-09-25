(function () {
  const $ = (s) => document.querySelector(s);
  const state = {
    screen: "home",
    nodeId: null,
    touchIdx: {},
    home: { fire: 1, rain: 2, door: 0, water: 0, mat: 0, rear: 0, guPresent: true }
  };
  const HOME_ACTIONS = {
    firewood: {
      label: "添柴",
      run(h) {
        h.fire = Math.min(3, (h.fire || 0) + 1);
        return "我来。你离远一点，别燎着袖子。";
      }
    },
    water: {
      label: "盛水",
      run(h) {
        h.water = 1;
        return "喝吧。刚刚煨过，不烫嘴。";
      }
    },
    door: {
      label: "关门避雨",
      run(h) {
        h.door = 1;
        h.rain = Math.max(0, (h.rain || 0) - 1);
        return "关严了。外头风大，你坐里头。";
      }
    },
    mat: {
      label: "整理榻席",
      run(h) {
        h.mat = Math.min(2, (h.mat || 0) + 1);
        return "我来理。你坐凳子上就行，别弯腰，头还晕着。";
      }
    },
    rear: {
      label: "看看后门",
      run(h) {
        h.rear = 1;
        return "外头脚印淡了。今晚大概安静。你别自己出去。";
      }
    }
  };
  function homeStatusLines(h) {
    const fire = ["将尽", "尚可", "正旺", "很暖"][Math.max(0, Math.min(3, h.fire|0))];
    const rain = ["几乎干了", "还潮", "雨湿重"][Math.max(0, Math.min(2, h.rain|0))];
    const door = h.door ? "门已关" : "门还开着";
    const water = h.water ? "灶上有温水" : "灶上还没盛水";
    const mat = ["榻席还乱", "榻席理过了", "榻席干爽"][Math.max(0, Math.min(2, h.mat|0))];
    const rear = h.rear ? "后门看过了" : "后门还没看";
    const gu = h.guPresent !== false ? "顾山在" : "顾山不在";
    return `烟火${fire} · ${rain} · ${door} · ${water} · ${mat} · ${rear} · ${gu}`;
  }
  const el = {
    boot: $("#boot"),
    enter: $("#btn-enter"),
    dialog: $("#dialog"),
    name: $("#nameplate"),
    text: $("#text"),
    choices: $("#choices"),
    toast: $("#toast"),
    hotspots: $("#hotspots"),
    spriteImg: $("#sprite-img"),
    panel: $("#panel"),
    topTitle: $("#top-title"),
    dock: [...document.querySelectorAll(".dock-btn")]
  };

  function save() {
    localStorage.setItem("chengwai-iphone-v4-home", JSON.stringify({
      nodeId: state.nodeId,
      touchIdx: state.touchIdx,
      home: state.home
    }));
  }
  function load() {
    try {
      const data = JSON.parse(localStorage.getItem("chengwai-iphone-v4-home") || "null");
      if (!data) return;
      state.nodeId = data.nodeId || null;
      state.touchIdx = data.touchIdx || {};
      if (data.home && typeof data.home === "object") {
        state.home = Object.assign(state.home, data.home);
      }
    } catch (_) {}
  }
  function setDock(id) {
    if (window.CW) window.CW.setDockSel(id);
    else el.dock.forEach((b) => b.classList.toggle("on", b.dataset.tab === id));
  }
  function toScene() {
    if (window.CW) window.CW.show("scene");
  }
  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.toast.classList.remove("show"), 1600);
  }

  const CLOSE_BTN = '<button class="close cw cw-d cw-chip" type="button" id="panel-close"><span class="cw-label">关闭</span></button>';
  function closePanel() {
    el.panel.classList.remove("show");
    if (window.CW) window.CW.goHub(); else goHome();
  }
  const SPRITES = {
    idle: "images/sprites/gu_idle.png",
    cold: "images/sprites/gu_cold.png",
    watch: "images/sprites/gu_watch.png"
  };
  function resolveEmotion(node) {
    if (!node) return "idle";
    const raw = String(node.emotion || node.mood || "").toLowerCase();
    if (!raw) return "idle";
    if (/cold|怒|拒|冷/.test(raw)) return "cold";
    if (/watch|看|渡|守|望/.test(raw)) return "watch";
    if (raw === "idle" || /idle|静|默/.test(raw)) return "idle";
    return "idle";
  }
  function setSprite(key) {
    const k = SPRITES[key] ? key : "idle";
    if (!el.spriteImg) return;
    const src = SPRITES[k];
    if (el.spriteImg.getAttribute("src") !== src) el.spriteImg.src = src;
    el.spriteImg.dataset.emotion = k;
  }

  function buildHotspots() {
    el.hotspots.innerHTML = "";
    (window.HOME_TOUCH || []).forEach((h) => {
      const d = document.createElement("button");
      d.className = "hotspot";
      d.type = "button";
      d.style.left = h.x;
      d.style.top = h.y;
      d.style.width = h.w;
      d.style.height = h.h;
      d.setAttribute("aria-label", h.label);
      d.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const i = state.touchIdx[h.id] || 0;
        showToast(h.lines[i % h.lines.length]);
        state.touchIdx[h.id] = i + 1;
        save();
      });
      el.hotspots.appendChild(d);
    });
  }
  function goHome() {
    toScene();
    state.screen = "home";
    el.dialog.classList.remove("show");
    el.choices.classList.remove("show");
    el.panel.classList.remove("show");
    el.hotspots.classList.add("active");
    setSprite(window.CW ? window.CW.guEmo() : "idle");
    el.topTitle.textContent = "破祠 · 顾山在";
    setDock("home");
  }
  function renderNode(id) {
    const node = window.STORY.nodes[id];
    if (!node) return;
    toScene();
    state.screen = "story";
    state.nodeId = id;
    el.hotspots.classList.remove("active");
    el.panel.classList.remove("show");
    setSprite(resolveEmotion(node));
    el.dialog.classList.add("show");
    el.name.textContent = node.name || "";
    el.text.textContent = node.text;
    el.topTitle.textContent = window.STORY.meta.chapter;
    setDock("story");
    save();
    el.choices.classList.remove("show");
    el.choices.innerHTML = "";
    if (node.choices) {
      el.choices.classList.add("show");
      node.choices.forEach((c) => {
        const b = document.createElement("button");
        b.className = "choice";
        b.type = "button";
        b.textContent = c.text;
        b.addEventListener("click", (ev) => {
          ev.stopPropagation();
          renderNode(c.next);
        });
        el.choices.appendChild(b);
      });
    }
  }
  function advance() {
    if (state.screen !== "story") return;
    const node = window.STORY.nodes[state.nodeId];
    if (!node || node.choices) return;
    if (node.end) {
      goHome();
      showToast("第一章完 · 已回到破祠");
      return;
    }
    if (node.next) renderNode(node.next);
  }
  function openPanel(kind) {
    toScene();
    state.screen = "panel";
    el.dialog.classList.remove("show");
    el.choices.classList.remove("show");
    el.hotspots.classList.remove("active");
    el.panel.classList.add("show");
    setDock(kind);
    if (kind === "home-life") {
      renderHomeLife();
      return;
    } else if (kind === "gallery") {
      el.panel.innerHTML = CLOSE_BTN + '<h2>图鉴</h2><p>卡面与心迹将在后续解锁。本地自玩，不做抽卡。</p><ul><li>顾山 · 待解锁</li></ul>';
    } else {
      el.panel.innerHTML = CLOSE_BTN + '<h2>说明</h2><p>横屏 16:9。进度存在本机 Safari。仅供你自己玩。</p>';
    }
    $("#panel-close").addEventListener("click", closePanel);
  }

  function renderHomeLife() {
    const h = state.home;
    const stages = (window.REL_STAGES || []).map((s) =>
      '<li><strong>' + s.title + '</strong> — ' + s.known + '</li>'
    ).join('');
    const actions = Object.keys(HOME_ACTIONS).map((id) => {
      const a = HOME_ACTIONS[id];
      return '<button type="button" class="home-act cw cw-d cw-secondary" data-act="' + id + '"><span class="cw-label">' + a.label + '</span></button>';
    }).join('');
    el.panel.innerHTML =
      CLOSE_BTN +
      '<h2>共处 · 破祠</h2>' +
      '<p id="home-status" class="home-status-card">' + homeStatusLines(h) + '</p>' +
      '<p class="home-hint">他坐在一步之外。做一件小事，他会跟着操心。</p>' +
      '<div class="home-actions">' + actions + '</div>' +
      '<p id="home-line" class="home-line">顾山：「火还行。你想做什么，说一声。」</p>' +
      '<h2 class="home-sub">关系怎么长</h2><ul>' + stages + '</ul>';
    $("#panel-close").addEventListener("click", closePanel);
    el.panel.querySelectorAll(".home-act").forEach((btn) => {
      btn.addEventListener("click", () => {
        const act = HOME_ACTIONS[btn.dataset.act];
        if (!act) return;
        const line = act.run(state.home);
        save();
        const status = $("#home-status");
        const lineEl = $("#home-line");
        if (status) status.textContent = homeStatusLines(state.home);
        if (lineEl) lineEl.textContent = '顾山：「' + line + '」';
        setSprite("watch");
        showToast(line);
      });
    });
  }

  el.enter.addEventListener("click", () => {
    el.boot.style.display = "none";
    if (window.CW) window.CW.goHub(); else goHome();
  });
  function openStory() {
    const id = state.nodeId && window.STORY.nodes[state.nodeId] && !window.STORY.nodes[state.nodeId].end
      ? state.nodeId
      : window.STORY.start;
    renderNode(id);
  }
  function resetProgress() {
    state.nodeId = null;
    state.touchIdx = {};
    state.home = { fire: 1, rain: 2, door: 0, water: 0, mat: 0, rear: 0, guPresent: true };
    save();
  }
  const sceneBack = $("#scene-back");
  if (sceneBack) sceneBack.addEventListener("click", (ev) => {
    ev.stopPropagation();
    el.dialog.classList.remove("show");
    el.choices.classList.remove("show");
    el.panel.classList.remove("show");
    if (window.CW) window.CW.goHub();
  });
  el.dialog.addEventListener("click", advance);
  el.dock.forEach((b) => {
    b.addEventListener("click", () => {
      const tab = b.dataset.tab;
      if (tab === "home") goHome();
      else if (tab === "story") openStory();
      else if (tab === "home-life") openPanel("home-life");
      else if (tab === "gallery") { if (window.CW) window.CW.openPage("tujian"); else openPanel("gallery"); }
    });
  });

  load();
  buildHotspots();
  el.topTitle.textContent = "城外 · 本地自玩";
  window.CW_SCENE = { goPresence: goHome, openStory, openPanel, setSprite, resetProgress };
})();
