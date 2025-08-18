const CACHE_NAME = 'futanari-app-v1';
const urlsToCache = [
  '/',
  '/download-app',
  '/app-icon.png',
  '/manifest.json',
  '/Screenshot 2025-08-18 at 8.53.55ΓÇ»AM-Photoroom.png',
  '/Screenshot 2025-08-18 at 8.54.41ΓÇ»AM-Photoroom.png',
  '/Screenshot 2025-08-18 at 8.55.12ΓÇ»AM-Photoroom.png',
  '/Screenshot 2025-08-18 at 8.55.37ΓÇ»AM-Photoroom.png',
  '/Screenshot 2025-08-18 at 8.59.06ΓÇ»AM-Photoroom.png'
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