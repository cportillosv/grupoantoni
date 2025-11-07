/**
 * Mobile Image Optimizer
 * Optimizes image loading for mobile devices without affecting desktop
 */

export class MobileImageOptimizer {
  constructor() {
    this.isMobile = window.innerWidth <= 767.98;
    this.imageObserver = null;
    this.optimizedImages = new Set();
  }

  /**
   * Initialize mobile image optimization
   */
  init() {
    if (!this.isMobile) {
      return; // Only optimize on mobile
    }

    // Load all images immediately on mobile (no lazy loading)
    this.loadAllImagesImmediately();

    this.handleResize();
  }

  /**
   * Load images intelligently on mobile: critical first, then progressive
   * AGGRESSIVE: Only load images when user scrolls to them
   */
  loadAllImagesImmediately() {
    // CRITICAL: Load ONLY hero and logo images first - nothing else!
    const criticalImages = document.querySelectorAll(
      '.hero-slide.active img, .hero-slide:first-child img, .logo-img, .nav-logo img'
    );

    criticalImages.forEach(img => {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      this.optimizedImages.add(img);
    });

    // AGGRESSIVE LAZY LOADING: Force ALL other images to lazy load
    // Only load when user scrolls close to them (50px margin, not 200px)
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;

              // Only load when actually visible or very close
              img.setAttribute('loading', 'lazy');

              // Keep fetchpriority low for non-critical images
              if (
                !img.hasAttribute('fetchpriority') ||
                img.getAttribute('fetchpriority') !== 'high'
              ) {
                img.setAttribute('fetchpriority', 'low');
              }

              // Mark image as loading
              img.classList.add('loading');

              // If image has data-src, load it
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('lazy-loaded');
              } else if (img.dataset.originalSrc) {
                // Restore original src if it was stored
                img.src = img.dataset.originalSrc;
                img.removeAttribute('data-original-src');
                img.classList.add('lazy-loaded');
              } else if (img.src && !img.complete) {
                // Image has src but hasn't loaded yet - trigger load
                img.classList.add('lazy-loaded');
              } else if (img.complete) {
                // Image already loaded
                img.classList.add('lazy-loaded');
              }

              // Ensure image is visible when loaded
              img.onload = () => {
                img.style.opacity = '1';
                img.classList.remove('loading');
                img.classList.add('lazy-loaded');
              };

              img.onerror = () => {
                img.style.opacity = '1';
                img.classList.remove('loading');
              };

              // If already loaded, show immediately
              if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
                img.classList.remove('loading');
              } else {
                img.style.opacity = '0';
              }

              this.optimizedImages.add(img);
              imageObserver.unobserve(img);
            }
          });
        },
        {
          // VERY AGGRESSIVE: Only load when image is 20px away
          // This prevents loading images that are far from viewport
          rootMargin: '20px 0px',
          threshold: 0.2 // Need 20% visibility - more strict
        }
      );

      // Force ALL non-critical images to lazy loading
      const allImages = document.querySelectorAll('img');
      allImages.forEach(img => {
        // Skip already processed critical images
        if (!this.optimizedImages.has(img)) {
          // Force lazy loading on all non-critical images
          img.setAttribute('loading', 'lazy');
          img.setAttribute('fetchpriority', 'low');

          // Store original src in data attribute if not already stored
          if (img.src && !img.dataset.originalSrc && !img.dataset.src) {
            img.dataset.originalSrc = img.src;
          }

          // Observe the image - it will load when it enters viewport
          imageObserver.observe(img);
        }
      });

      this.imageObserver = imageObserver;
    } else {
      // Fallback: load all images if IntersectionObserver not supported
      const allImages = document.querySelectorAll('img');
      allImages.forEach(img => {
        if (!this.optimizedImages.has(img)) {
          img.setAttribute('loading', 'lazy');
          img.setAttribute('fetchpriority', 'low');
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          this.optimizedImages.add(img);
        }
      });
    }
  }

  /**
   * Handle window resize to re-check mobile status
   */
  handleResize() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 767.98;

        // If switching from desktop to mobile, re-initialize
        if (!wasMobile && this.isMobile) {
          this.loadAllImagesImmediately();
        }
      }, 250);
    });
  }

  /**
   * Preload critical images only
   */
  preloadCriticalImages() {
    if (!this.isMobile) {
      return;
    }

    // All hero images should be eager on mobile
    const heroImages = document.querySelectorAll('.hero-slide img');
    heroImages.forEach(img => {
      img.setAttribute('loading', 'eager');
      img.removeAttribute('fetchpriority');
    });
  }

  /**
   * Destroy optimizer and clean up
   */
  destroy() {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
      this.imageObserver = null;
    }
    this.optimizedImages.clear();
  }
}
