// Simple service worker for PWA
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
});

self.addEventListener('fetch', (event) => {
  // Basic cache-first strategy for static assets
  if (event.request.destination === 'image' || 
      event.request.destination === 'script' || 
      event.request.destination === 'style') {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});