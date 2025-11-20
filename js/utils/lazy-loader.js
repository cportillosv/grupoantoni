/**
 * Advanced Lazy Loading with IntersectionObserver
 * Optimized for mobile performance
 */

export class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.sectionObserver = null;
    this.loadedImages = new Set();
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupImageObserver();
      this.setupSectionObserver();
    } else {
      // Fallback for old browsers
      this.loadAllImages();
    }
  }

  /**
   * Setup IntersectionObserver for images
   */
  setupImageObserver() {
    const options = {
      root: null,
      rootMargin: '50px', // Start loading 50px before image enters viewport
      threshold: 0.01
    };

    this.imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all images with data-src or loading="lazy"
    document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
      this.imageObserver.observe(img);
    });
  }

  /**
   * Setup IntersectionObserver for sections (defer non-critical content)
   */
  setupSectionObserver() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    this.sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadSection(entry.target);
          this.sectionObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Observe sections marked for lazy loading
    document.querySelectorAll('[data-lazy-section]').forEach(section => {
      this.sectionObserver.observe(section);
    });
  }

  /**
   * Load image from data-src or convert lazy to eager
   */
  loadImage(img) {
    if (this.loadedImages.has(img)) {
      return;
    }

    // If data-src exists, load it
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    // If picture element, load sources
    const picture = img.closest('picture');
    if (picture) {
      const sources = picture.querySelectorAll('source[data-srcset]');
      sources.forEach(source => {
        source.srcset = source.dataset.srcset;
        source.removeAttribute('data-srcset');
      });
    }

    // Mark as loaded
    img.classList.add('lazy-loaded');
    this.loadedImages.add(img);

    // Handle load error
    img.addEventListener('error', () => {
      img.classList.add('lazy-error');
      console.warn('Failed to load image:', img.src || img.dataset.src);
    });
  }

  /**
   * Load section content (defer heavy operations)
   */
  loadSection(section) {
    section.classList.add('section-loaded');

    // Trigger any deferred animations or content
    const event = new CustomEvent('sectionVisible', { detail: { section } });
    document.dispatchEvent(event);
  }

  /**
   * Fallback: load all images immediately
   */
  loadAllImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.loadImage(img);
    });
  }

  /**
   * Preload critical images
   */
  preloadCritical(images) {
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }

  /**
   * Destroy observers
   */
  destroy() {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }
  }
}
