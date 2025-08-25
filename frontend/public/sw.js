const CACHE_NAME = 'futanari-app-v17';
const urlsToCache = [
  '/',
  '/download-app',
  '/pwa-app.html',
  '/app-icon.png',
  '/manifest.json'
];

// Install - cache essential resources and force update
self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing v17...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching files with force update');
        return cache.addAll(urlsToCache.map(url => url + '?v=17'));
      })
      .then(function() {
        console.log('Service Worker: Install complete - forcing immediate activation');
        return self.skipWaiting();
      })
  );
});

// Activate - clean ALL old caches immediately
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activating v17...');
  event.waitUntil(
    Promise.all([
      // Delete ALL existing caches
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            console.log('Service Worker: Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }),
      // Recreate cache with new content
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache.map(url => url + '?v=17'));
      }),
      // Take control immediately
      self.clients.claim()
    ]).then(function() {
      console.log('Service Worker: All caches cleared, new content loaded');
      
      // Force reload all clients
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          console.log('Service Worker: Reloading client');
          client.navigate(client.url);
        });
      });
    })
  );
});

// Fetch - always fetch fresh content, no caching
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request.url + '?v=17&t=' + Date.now())
      .then(function(response) {
        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});