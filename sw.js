/* eslint-disable */
/**
 * Service Worker for Grupo Antoni
 * Caches static assets for offline support and faster loading
 */

const CACHE_NAME = 'grupo-antoni-v1';
const STATIC_CACHE = 'grupo-antoni-static-v1';
const IMAGE_CACHE = 'grupo-antoni-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = ['/', '/index.html', '/css/main.css', '/js/main.js', '/img/ANTONI.png'];

// Install event - Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Service Worker: Some assets failed to cache', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith('grupo-antoni-') &&
              cacheName !== STATIC_CACHE &&
              cacheName !== IMAGE_CACHE
            );
          })
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy: Cache First for static assets, Network First for HTML
  if (request.destination === 'image') {
    // Images: Cache First with Network Fallback
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(response => {
          // Cache successful image responses
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      })
    );
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.match(/\.(woff|woff2|ttf|otf)$/)
  ) {
    // CSS/JS/Fonts: Cache First
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        return (
          cachedResponse ||
          fetch(request).then(response => {
            if (response.status === 200) {
              const responseToCache = response.clone();
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          })
        );
      })
    );
  } else {
    // HTML: Network First with Cache Fallback
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful HTML responses
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
  }
});
