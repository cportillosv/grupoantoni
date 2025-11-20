/**
 * Service Worker Registration
 * Registers SW for offline support and asset caching
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('[SW] Service Worker registered:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch(error => {
          console.warn('[SW] Service Worker registration failed:', error);
        });
    });
  }
}
