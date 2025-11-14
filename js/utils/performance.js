/* ========================================
   PERFORMANCE UTILITY
   ======================================== */
/* eslint-disable indent */

export class Performance {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }

  static init() {
    const performance = new Performance();
    return performance;
  }

  init() {
    this.measurePageLoad();
    this.measureCoreWebVitals();
    this.setupPerformanceObserver();
    this.trackUserInteractions();
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      // Navigation Timing API
      const navigation = performance.getEntriesByType('navigation')[0];

      this.metrics.pageLoad = {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      };

      // Resource Timing
      const resources = performance.getEntriesByType('resource');
      this.metrics.resources = resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: this.getResourceType(resource)
      }));

      console.log('Performance Metrics:', this.metrics);
    });
  }

  measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();

    // First Input Delay (FID)
    this.observeFID();

    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.trackResourcePerformance(entry);
        });
      });

      observer.observe({ entryTypes: ['resource', 'navigation', 'paint'] });
      this.observers.push(observer);
    }
  }

  trackResourcePerformance(entry) {
    if (entry.entryType === 'resource') {
      const resource = {
        name: entry.name,
        duration: entry.duration,
        size: entry.transferSize,
        type: this.getResourceType(entry),
        startTime: entry.startTime
      };

      // Log slow resources
      if (resource.duration > 1000) {
        console.warn('Slow resource detected:', resource);
      }
    }
  }

  trackUserInteractions() {
    // Track click events
    document.addEventListener('click', e => {
      this.trackInteraction('click', e.target);
    });

    // Track scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackInteraction('scroll', null);
      }, 100);
    });

    // Track form interactions
    document.addEventListener('submit', e => {
      this.trackInteraction('form_submit', e.target);
    });
  }

  trackInteraction(type, element) {
    // MOBILE-FIRST: Initialize interactions array if not exists
    if (!this.interactions) {
      this.interactions = [];
    }

    // Track interaction for analytics
    const interaction = {
      type,
      timestamp: Date.now(),
      element: element ? element.tagName : null,
      id: element ? element.id : null,
      className: element ? element.className : null
    };

    // Store interaction data
    this.interactions.push(interaction);

    // Store interaction for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', type, {
        event_category: 'User Interaction',
        event_label: element ? `${element.tagName}.${element.className}` : 'unknown'
      });
    }
  }

  getResourceType(entry) {
    if (entry.name.includes('.css')) {
      return 'stylesheet';
    }
    if (entry.name.includes('.js')) {
      return 'script';
    }
    if (entry.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
      return 'image';
    }
    if (entry.name.match(/\.(woff|woff2|ttf|otf)$/)) {
      return 'font';
    }
    return 'other';
  }

  // Performance optimization methods
  optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      if (this.isElementInViewport(img)) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      }
    });
  }

  preloadCriticalResources() {
    const criticalResources = ['/css/main.css', '/js/main.js'];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  // Get performance report
  getReport() {
    return {
      metrics: this.metrics,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      connection: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
          }
        : null
    };
  }
}
