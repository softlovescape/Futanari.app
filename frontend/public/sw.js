const CACHE_NAME = 'futanari-app-v1';
const urlsToCache = [
  '/',
  '/download-app',
  '/app-icon.png',
  '/manifest.json',
  '/screenshot1.jpg',
  '/screenshot2.jpg',
  '/screenshot3.jpg',
  '/screenshot4.jpg',
  '/screenshot5.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});