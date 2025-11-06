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
   * Load all images immediately on mobile (no lazy loading)
   */
  loadAllImagesImmediately() {
    // Get all images in the document
    const allImages = document.querySelectorAll('img');

    allImages.forEach(img => {
      // Remove lazy loading attribute and set to eager
      if (img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy') {
        img.setAttribute('loading', 'eager');
      } else if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'eager');
      }

      // Remove fetchpriority to allow normal priority
      img.removeAttribute('fetchpriority');

      // If image has data-src, load it immediately
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }

      // If image was prepared for lazy loading, restore original src
      if (img.dataset.originalSrc) {
        img.src = img.dataset.originalSrc;
        img.removeAttribute('data-original-src');
        img.classList.add('lazy-loaded');
        img.style.backgroundColor = '';
        img.style.minHeight = '';
        img.style.opacity = '1';
      }

      // Ensure image is visible and remove any lazy loading styles
      img.style.opacity = '1';
      img.style.transition = '';
      img.style.backgroundColor = '';
      img.style.minHeight = '';

      this.optimizedImages.add(img);
    });
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
