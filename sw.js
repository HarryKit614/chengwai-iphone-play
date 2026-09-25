/* 版本号随每次发布更新；页面导航走网络优先，静态资源带 ?v= 版本参数走缓存优先 */
const V = "20260925z";
const CACHE = "chengwai-iphone-" + V;
const q = "?v=" + V;
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest" + q,
  "./css/buttons.css" + q, "./css/game.css" + q, "./css/system.css" + q,
  "./js/story.js" + q, "./js/ui-kit.js" + q, "./js/data.js" + q, "./js/system.js" + q, "./js/game.js" + q,
  "./images/sprites/gu_idle.png", "./images/sprites/gu_cold.png", "./images/sprites/gu_watch.png",
  "./images/ui/hub_bg.jpg" + q, "./images/ui/bg_blur.jpg", "./images/ui/gu_face_thumb.png",
  "./images/ui/thumb_fu_floor.png", "./images/ui/thumb_fu_24dao.png", "./images/fu/fu_floor_baseline.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isNav = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  if (isNav) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
