const cacheName = 'calc';
const staticAssets = [
    './',
]
self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim(); 
});

self.addEventListener('fetch', async e => {
    e.respondWith(networkAndCache(e.request));
});

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}