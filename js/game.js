(function () {
  const $ = (s) => document.querySelector(s);
  const state = { screen: "home", nodeId: null, touchIdx: {} };
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
    localStorage.setItem("chengwai-iphone-v3-warm", JSON.stringify({
      nodeId: state.nodeId,
      touchIdx: state.touchIdx
    }));
  }
  function load() {
    try {
      const data = JSON.parse(localStorage.getItem("chengwai-iphone-v3-warm") || "null");
      if (!data) return;
      state.nodeId = data.nodeId || null;
      state.touchIdx = data.touchIdx || {};
    } catch (_) {}
  }
  function setDock(id) {
    el.dock.forEach((b) => b.classList.toggle("on", b.dataset.tab === id));
  }
  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.toast.classList.remove("show"), 1600);
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
    state.screen = "home";
    el.dialog.classList.remove("show");
    el.choices.classList.remove("show");
    el.panel.classList.remove("show");
    el.hotspots.classList.add("active");
    setSprite("idle");
    el.topTitle.textContent = "破祠 · 顾山在";
    setDock("home");
  }
  function renderNode(id) {
    const node = window.STORY.nodes[id];
    if (!node) return;
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
      showToast("已回到主界面");
      return;
    }
    if (node.next) renderNode(node.next);
  }
  function openPanel(kind) {
    state.screen = "panel";
    el.dialog.classList.remove("show");
    el.choices.classList.remove("show");
    el.hotspots.classList.remove("active");
    el.panel.classList.add("show");
    setDock(kind);
    if (kind === "home-life") {
      const stages = (window.REL_STAGES || []).map((s) =>
        '<li><strong>' + s.title + '</strong> — ' + s.known + '。可：' + s.allow + '。暂不可：' + s.forbid + '</li>'
      ).join('');
      el.panel.innerHTML = '<button class="close" type="button" id="panel-close">关闭</button><h2>共处 · 破祠</h2><p>此刻灶火还在，门可关雨，他坐在一步之外。轻量家园稍后接入。</p><h2 style="margin-top:12px;font-size:0.95rem">关系怎么长</h2><ul>' + stages + '</ul>';
    } else if (kind === "gallery") {
      el.panel.innerHTML = '<button class="close" type="button" id="panel-close">关闭</button><h2>图鉴</h2><p>卡面与心迹将在后续解锁。本地自玩，不做抽卡。</p><ul><li>顾山 · 待解锁</li></ul>';
    } else {
      el.panel.innerHTML = '<button class="close" type="button" id="panel-close">关闭</button><h2>说明</h2><p>横屏 16:9。进度存在本机 Safari。仅供你自己玩。</p>';
    }
    $("#panel-close").addEventListener("click", goHome);
  }

  el.enter.addEventListener("click", () => {
    el.boot.style.display = "none";
    const resume = state.nodeId && window.STORY.nodes[state.nodeId] && !window.STORY.nodes[state.nodeId].end;
    if (resume) renderNode(state.nodeId);
    else goHome();
  });
  el.dialog.addEventListener("click", advance);
  el.dock.forEach((b) => {
    b.addEventListener("click", () => {
      const tab = b.dataset.tab;
      if (tab === "home") goHome();
      else if (tab === "story") {
        const id = state.nodeId && window.STORY.nodes[state.nodeId] && !window.STORY.nodes[state.nodeId].end
          ? state.nodeId
          : window.STORY.start;
        renderNode(id);
      } else if (tab === "home-life") openPanel("home-life");
      else if (tab === "gallery") openPanel("gallery");
    });
  });

  load();
  buildHotspots();
  el.topTitle.textContent = "城外 · 本地自玩";
})();
