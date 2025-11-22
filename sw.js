/* eslint-disable */
/**
 * Service Worker for Grupo Antoni
 * Caches static assets for offline support and faster loading
 */

// MOBILE-FIRST: Versionar caches para invalidar correctamente en deploys
// Actualizado a v3 para forzar invalidación después de optimizaciones mobile
const CACHE_VERSION = 'v3';
const CACHE_NAME = `grupo-antoni-${CACHE_VERSION}`;
const STATIC_CACHE = `grupo-antoni-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `grupo-antoni-images-${CACHE_VERSION}`;

// Assets to cache immediately
// MOBILE-FIRST: Arquitectura optimizada para mobile
//
// NOTA IMPORTANTE: Vite genera archivos CSS/JS con hash (ej: main-DCA9ggJa.css, chunk-xxx.js)
// Por lo tanto, NO cacheamos rutas estáticas de CSS/JS aquí. El Service Worker
// los cacheará dinámicamente cuando se soliciten usando stale-while-revalidate.
//
// NO precachear imágenes del hero (LCP) - deben cargarse frescas siempre
// Solo cacheamos rutas que sabemos que existen y no dependen de hash
const STATIC_ASSETS = ['/', '/index.html', '/img/optimized/ANTONI-optimized.png'];

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

  // MOBILE-FIRST: Stale-While-Revalidate para imágenes
  // Sirve caché inmediatamente pero actualiza en background
  // EXCEPCIÓN: NO cachear imágenes del hero (LCP) - deben cargarse frescas
  if (request.destination === 'image') {
    // NO cachear imágenes del hero (LCP crítico)
    const isHeroImage =
      url.pathname.includes('au2249316275_Architectural_render') ||
      url.pathname.includes('hero') ||
      url.pathname.match(/\/img\/[12]\.(svg|webp|png)$/);

    if (isHeroImage) {
      // Hero images: Network First (siempre frescas para LCP)
      event.respondWith(
        fetch(request).catch(() => {
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || new Response('Image not available', { status: 404 });
          });
        })
      );
      return;
    }

    // Resto de imágenes: Stale-While-Revalidate
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(cachedResponse => {
          // Fetch actualizado en background (no bloquea)
          const fetchPromise = fetch(request)
            .then(response => {
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // Si falla la red, usar caché si existe
              return cachedResponse || new Response('Image not available', { status: 404 });
            });

          // MOBILE-FIRST: Devolver caché inmediatamente si existe, actualizar en background
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.match(/\.(woff|woff2|ttf|otf)$/)
  ) {
    // CSS/JS/Fonts: Stale-While-Revalidate (porque Vite genera con hash)
    // Sirve caché inmediatamente pero actualiza en background
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache => {
        return cache.match(request).then(cachedResponse => {
          // Fetch actualizado en background (no bloquea)
          const fetchPromise = fetch(request)
            .then(response => {
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // Si falla la red, usar caché si existe
              return cachedResponse;
            });

          // Devolver caché inmediatamente si existe, actualizar en background
          return cachedResponse || fetchPromise;
        });
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
