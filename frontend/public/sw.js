const CACHE_NAME = 'futanari-app-v12';
const urlsToCache = [
  '/',
  '/download-app',
  '/pwa-app.html',
  '/app-icon.png',
  '/manifest.json'
];

// Install - cache essential resources
self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('Service Worker: Install complete');
        return self.skipWaiting();
      })
  );
});

// Activate - clean old caches and take control
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    Promise.all([
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ]).then(function() {
      console.log('Service Worker: Ready for PWA installation');
    })
  );
});

// Fetch - serve cached content
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(function() {
        return caches.match('/');
      })
  );
});