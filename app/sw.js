// Whittington Trail offline cache. Bump VERSION whenever any app file changes.
const VERSION = "wt-v5";
const SHELL = ["./", "index.html", "recorder.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "areas.json", "groundplan.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Stop positions: always try the network first so new recordings show up.
  if (url.pathname.endsWith("/stops.json")) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req)));
    return;
  }

  // Fonts and video thumbnails: serve from cache, refresh in the background.
  if (/fonts\.(googleapis|gstatic)\.com|i\.ytimg\.com/.test(url.host)) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // App files: cache first, network fallback.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
  }
});
