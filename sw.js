const C = 'logisun-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); }
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match('./')))
  );
});
