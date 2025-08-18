const CACHE_NAME = 'futanari-app-v4';
const urlsToCache = [
  '/',
  '/download-app',
  '/app-icon.png',
  '/manifest.json',
  '/screenshot1.png',
  '/screenshot2.png',
  '/screenshot3.png',
  '/screenshot4.png',
  '/screenshot5.png'
];

// Install event - cache resources immediately
self.addEventListener('install', function(event) {
  console.log('Service worker installing for app...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Caching app resources for installation');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('All resources cached, app ready for installation');
        // Force immediate activation
        return self.skipWaiting();
      })
  );
});

// Activate event - take control immediately
self.addEventListener('activate', function(event) {
  console.log('Service worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ]).then(function() {
      console.log('Service worker ready - app installable');
      
      // Try to trigger install prompt
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_READY_FOR_INSTALL'
          });
        });
      });
    })
  );
});

// Fetch event - serve cached content
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(function(response) {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cache successful responses
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch(function() {
        // Return cached offline page or default response
        return caches.match('/');
      })
  );
});

// Message handler for communication with main app
self.addEventListener('message', function(event) {
  console.log('Service worker received message:', event.data);
  
  if (event.data.type === 'TRIGGER_INSTALL') {
    // Try to trigger installation
    console.log('Attempting to trigger app installation...');
    
    // Send back ready status
    event.ports[0].postMessage({
      type: 'INSTALL_READY'
    });
  }
});