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

    // Start optimization immediately but prioritize critical content
    // Setup lazy loading first, then optimize existing images
    this.setupLazyLoading();

    // Delay optimization of existing images slightly to let critical content load
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          this.optimizeExistingImages();
        },
        { timeout: 300 } // Reduced from 1000ms for faster startup
      );
    } else {
      setTimeout(() => {
        this.optimizeExistingImages();
      }, 50); // Reduced from 100ms
    }

    this.handleResize();
    this.setupScrollOptimization();
  }

  /**
   * Setup scroll-based optimization
   */
  setupScrollOptimization() {
    let scrollTimeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        // Pause image loading while scrolling to improve scroll performance
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        // Resume image loading after scroll stops
        if (this.imageObserver && this.isMobile) {
          // Process load queue with priority
          this.processLoadQueue();
        }
      }, 100); // Reduced delay for faster image loading after scroll
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Process load queue with priority
   */
  processLoadQueue() {
    const images = document.querySelectorAll(
      '.project-image img, .card-background img, .member-photo img'
    );

    // Sort by distance from viewport
    const sortedImages = Array.from(images)
      .filter(img => !img.classList.contains('lazy-loaded') && !this.optimizedImages.has(img))
      .map(img => ({
        img,
        distance: Math.abs(img.getBoundingClientRect().top - window.innerHeight)
      }))
      .sort((a, b) => a.distance - b.distance);

    // Load closest images first, with minimal delay between each
    sortedImages.forEach((item, index) => {
      // Load first 3 images immediately, then stagger the rest
      const delay = index < 3 ? 0 : (index - 3) * 30; // Reduced from 100ms to 30ms
      setTimeout(() => {
        if (!item.img.classList.contains('lazy-loaded')) {
          this.prepareImage(item.img);
          if (this.imageObserver) {
            this.imageObserver.observe(item.img);
          }
        }
      }, delay);
    });
  }

  /**
   * Setup aggressive lazy loading for mobile
   */
  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    // Aggressive rootMargin for mobile - load when close to viewport
    // Increased from 50px to 100px for better perceived performance
    const rootMargin = '100px 0px'; // Load images 100px before they enter viewport

    this.imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Use priority scheduling for better performance
            this.loadImageWithPriority(entry.target);
            this.imageObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01
      }
    );

    // Observe project images
    document.querySelectorAll('.project-image img').forEach(img => {
      if (!this.optimizedImages.has(img)) {
        this.prepareImage(img);
        this.imageObserver.observe(img);
      }
    });

    // Observe about card images
    document.querySelectorAll('.card-background img').forEach(img => {
      if (!this.optimizedImages.has(img)) {
        this.prepareImage(img);
        this.imageObserver.observe(img);
      }
    });

    // Observe team images
    document.querySelectorAll('.member-photo img').forEach(img => {
      if (!this.optimizedImages.has(img)) {
        this.prepareImage(img);
        this.imageObserver.observe(img);
      }
    });
  }

  /**
   * Prepare image for lazy loading
   */
  prepareImage(img) {
    // Store original src if not already stored
    if (!img.dataset.originalSrc && img.src) {
      img.dataset.originalSrc = img.src;

      // Clear src immediately to prevent loading
      img.removeAttribute('src');
      img.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    }

    // Add loading attributes for mobile optimization
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.setAttribute('fetchpriority', 'low');

    // Add placeholder or low-quality placeholder
    if (img.dataset.originalSrc && !img.classList.contains('lazy-loaded')) {
      // Create a tiny placeholder to reduce layout shift
      img.style.backgroundColor = '#f0f0f0';
      img.style.minHeight = '200px';
      img.style.width = '100%';
      img.style.opacity = '0.3';
    }

    this.optimizedImages.add(img);
  }

  /**
   * Load image when it enters viewport with priority scheduling
   */
  loadImageWithPriority(img) {
    if (img.dataset.originalSrc) {
      // Check if image is in critical viewport area (first screen)
      const rect = img.getBoundingClientRect();
      const isCritical = rect.top < window.innerHeight * 1.5;

      if (isCritical) {
        // Critical images load immediately
        this.loadImage(img);
      } else if ('requestIdleCallback' in window) {
        // Non-critical images use idle callback with shorter timeout
        requestIdleCallback(
          () => {
            this.loadImage(img);
          },
          { timeout: 500 } // Reduced from 2000ms to 500ms for faster loading
        );
      } else {
        setTimeout(() => {
          this.loadImage(img);
        }, 100); // Reduced from 200ms
      }
    }
  }

  /**
   * Load image with optimization
   */
  loadImage(img) {
    if (img.dataset.originalSrc) {
      // Create a new image object to preload
      const imageLoader = new Image();

      imageLoader.onload = () => {
        // Only swap src when image is fully loaded to prevent flickering
        img.src = img.dataset.originalSrc;
        img.classList.add('lazy-loaded');
        img.style.backgroundColor = '';
        img.style.minHeight = '';
        img.style.opacity = '0';

        // Fade in smoothly
        requestAnimationFrame(() => {
          img.style.transition = 'opacity 0.3s ease-in';
          img.style.opacity = '1';
        });
      };

      imageLoader.onerror = () => {
        // Handle error gracefully
        img.style.backgroundColor = '#e0e0e0';
        img.style.minHeight = '';
      };

      // Start loading
      imageLoader.src = img.dataset.originalSrc;
    }
  }

  /**
   * Optimize images that are already in the DOM
   */
  optimizeExistingImages() {
    if (!this.isMobile) {
      return;
    }

    // Add optimization attributes to all images
    const images = document.querySelectorAll(
      '.project-image img, .card-background img, .member-photo img'
    );

    images.forEach((img, index) => {
      // Set fetchpriority to low for non-critical images
      if (!img.closest('.hero')) {
        img.setAttribute('fetchpriority', 'low');
      }

      // Ensure lazy loading is set
      if (!img.hasAttribute('loading') || img.getAttribute('loading') !== 'eager') {
        img.setAttribute('loading', 'lazy');
      }

      // Add async decoding
      img.setAttribute('decoding', 'async');

      // For images below the fold, delay their processing
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;

      if (!isAboveFold && index > 2) {
        // Delay processing of images that are far down the page
        // Process first few images immediately, then stagger the rest
        const delay = index < 5 ? 0 : (index - 5) * 20; // Reduced from 50ms to 20ms
        setTimeout(() => {
          if (!this.optimizedImages.has(img)) {
            this.prepareImage(img);
            if (this.imageObserver) {
              this.imageObserver.observe(img);
            }
          }
        }, delay);
      } else if (isAboveFold) {
        // Images above fold should be processed immediately
        if (!this.optimizedImages.has(img)) {
          this.prepareImage(img);
          if (this.imageObserver) {
            this.imageObserver.observe(img);
          }
        }
      }
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
          this.init();
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

    // Only preload hero images on mobile
    const heroImages = document.querySelectorAll('.hero-slide img');
    heroImages.forEach((img, index) => {
      if (index === 0) {
        // First hero image should be eager
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
      } else {
        // Other hero images can be lazy
        img.setAttribute('loading', 'lazy');
        img.setAttribute('fetchpriority', 'low');
      }
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
