const CACHE_NAME = 'futanari-app-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

const IMAGE_CACHE_URLS = [
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/vfys931a_image%20-%202025-07-16T123653.921.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/sn8rhnxm_image%20-%202025-07-16T151724.850.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/2l1lz0wx_image%20-%202025-07-16T151740.640.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/6x2kqi0l_image%20-%202025-07-16T151841.279.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/56lbxky0_image%20-%202025-07-16T163558.321.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/2jr9wipe_image%20-%202025-07-16T163950.540.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/huxr201i_image%20-%202025-07-16T164027.510.png',
  'https://customer-assets.emergentagent.com/job_86210f7e-097f-4a1d-b538-652380944388/artifacts/ay48fyg4_image%20-%202025-07-16T164837.790.png'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.warn('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests
  if (request.destination === 'image' || IMAGE_CACHE_URLS.includes(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return a fallback image if network fails
            return new Response('', { status: 404 });
          });
        });
      })
    );
    return;
  }

  // Handle CSS and JS requests
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/');
      })
    );
    return;
  }

  // Default: try cache first, then network
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});