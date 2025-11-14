/* ========================================
   ANTONI - MAIN JAVASCRIPT
   ======================================== */

/* ========================================
   MOBILE-FIRST OPTIMIZATION AUDIT:
   - Removed Services component (not used in HTML)
   - Lazy loading all non-critical components
   - CSS loaded via Vite (code splitting enabled)
   - Analytics deferred until after user interaction
   ======================================== */

// Import CSS - Vite will handle this automatically with code splitting
import '../css/main.css';

// CRITICAL: Import only essential modules for initial render
import { Navbar } from './components/navbar.js';
import { Hero } from './components/hero.js';
import { Footer } from './components/footer.js';
import { i18n } from './utils/i18n.js';
import { LazyLoader } from './utils/lazy-loader.js';

// NON-CRITICAL: Will be lazy loaded when sections enter viewport
// import { About } from './components/about.js';
// import { Services } from './components/services.js'; // REMOVED: Not used in HTML
// import { Projects } from './components/projects.js';
// import { Brand } from './components/brand.js';
// import { Team } from './components/team.js';
// import { Contact } from './components/contact.js';
// import { ScrollAnimations } from './utils/scroll-animations.js';
// import { Analytics } from './utils/analytics.js';
// import { MobileImageOptimizer } from './utils/mobile-image-optimizer.js';
// import { registerServiceWorker } from './utils/service-worker.js';

// ========================================
// MAIN APPLICATION CLASS
// ========================================
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  async initializeApp() {
    try {
      const isMobile = window.innerWidth <= 767.98;

      // CRITICAL: Initialize only essential components for first render
      this.navbar = new Navbar();
      this.hero = new Hero();
      this.footer = new Footer();

      // Initialize i18n (internationalization) - needed for content
      i18n.init();
      this.setupLanguageSwitch();

      // Initialize advanced lazy loading
      this.lazyLoader = new LazyLoader();

      // Initialize legacy lazy loading (mobile-optimized)
      this.initLazyLoading();

      // Initialize global event listeners
      this.initGlobalEventListeners();

      // Initialize social media popup
      this.initSocialMediaPopup();

      // MOBILE-FIRST: Lazy load components when sections enter viewport
      this.initLazyComponentLoading();

      // Defer service worker registration (non-critical)
      if ('serviceWorker' in navigator) {
        // Load service worker after page is interactive
        if (document.readyState === 'complete') {
          this.loadServiceWorker();
        } else {
          window.addEventListener('load', () => this.loadServiceWorker());
        }
      }

      // Defer mobile image optimizer (non-critical)
      if (isMobile) {
        // Load after first paint
        requestAnimationFrame(() => {
          this.loadMobileImageOptimizer();
        });
      }

      // Defer analytics until after user interaction (mobile-first)
      this.initDeferredAnalytics();

      // Defer logo color extraction (very heavy, only on desktop)
      if (!isMobile) {
        // Load after page is fully interactive
        if (document.readyState === 'complete') {
          this.extractLogoAccentColor().catch(() => {});
        } else {
          window.addEventListener('load', () => {
            this.extractLogoAccentColor().catch(() => {});
          });
        }
      }

      console.log('Antoni app initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  /**
   * MOBILE-FIRST: Lazy load components when sections enter viewport
   * Uses IntersectionObserver for optimal performance
   */
  initLazyComponentLoading() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all components after delay
      setTimeout(() => this.loadAllComponents(), 1000);
      return;
    }

    // Lazy load About section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const aboutObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            this.loadAboutComponent();
            aboutObserver.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      aboutObserver.observe(aboutSection);
    }

    // Lazy load Projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const projectsObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            this.loadProjectsComponent();
            projectsObserver.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      projectsObserver.observe(projectsSection);
    }

    // Lazy load Brand section
    const brandSection = document.getElementById('brand');
    if (brandSection) {
      const brandObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            this.loadBrandComponent();
            brandObserver.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      brandObserver.observe(brandSection);
    }

    // Lazy load Team section
    const teamSection = document.getElementById('team');
    if (teamSection) {
      const teamObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            this.loadTeamComponent();
            teamObserver.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      teamObserver.observe(teamSection);
    }

    // Lazy load Contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const contactObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            this.loadContactComponent();
            contactObserver.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      contactObserver.observe(contactSection);
    }

    // Lazy load Scroll Animations (only when needed)
    const scrollAnimationsObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this.loadScrollAnimations();
          scrollAnimationsObserver.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    // Observe first section that might need animations
    const firstAnimatedSection = document.querySelector('[data-animate]');
    if (firstAnimatedSection) {
      scrollAnimationsObserver.observe(firstAnimatedSection);
    }
  }

  /**
   * Dynamic imports for lazy loading components
   */
  async loadAboutComponent() {
    if (this.about) return;
    try {
      const { About } = await import('./components/about.js');
      this.about = new About();
    } catch (error) {
      console.warn('Failed to load About component:', error);
    }
  }

  async loadProjectsComponent() {
    if (this.projects) return;
    try {
      const { Projects } = await import('./components/projects.js');
      this.projects = new Projects();
    } catch (error) {
      console.warn('Failed to load Projects component:', error);
    }
  }

  async loadBrandComponent() {
    if (this.brand) return;
    try {
      const { Brand } = await import('./components/brand.js');
      this.brand = new Brand();
    } catch (error) {
      console.warn('Failed to load Brand component:', error);
    }
  }

  async loadTeamComponent() {
    if (this.team) return;
    try {
      const { Team } = await import('./components/team.js');
      this.team = new Team();
    } catch (error) {
      console.warn('Failed to load Team component:', error);
    }
  }

  async loadContactComponent() {
    if (this.contact) return;
    try {
      const { Contact } = await import('./components/contact.js');
      this.contact = new Contact();
    } catch (error) {
      console.warn('Failed to load Contact component:', error);
    }
  }

  async loadScrollAnimations() {
    if (this.scrollAnimations) return;
    try {
      const { ScrollAnimations } = await import('./utils/scroll-animations.js');
      this.scrollAnimations = new ScrollAnimations();
    } catch (error) {
      console.warn('Failed to load ScrollAnimations:', error);
    }
  }

  async loadServiceWorker() {
    try {
      const { registerServiceWorker } = await import('./utils/service-worker.js');
      registerServiceWorker();
    } catch (error) {
      console.warn('Failed to load service worker:', error);
    }
  }

  async loadMobileImageOptimizer() {
    if (this.mobileImageOptimizer) return;
    try {
      const { MobileImageOptimizer } = await import('./utils/mobile-image-optimizer.js');
      this.mobileImageOptimizer = new MobileImageOptimizer();
      this.mobileImageOptimizer.init();
      this.mobileImageOptimizer.preloadCriticalImages();
    } catch (error) {
      console.warn('Failed to load MobileImageOptimizer:', error);
    }
  }

  /**
   * MOBILE-FIRST: Load analytics only after user interaction
   */
  initDeferredAnalytics() {
    const loadAnalytics = async () => {
      try {
        const { Analytics } = await import('./utils/analytics.js');
        Analytics.init();
      } catch (error) {
        console.warn('Failed to load Analytics:', error);
      }
    };

    // Load analytics after first user interaction (click, scroll, touch)
    const events = ['click', 'scroll', 'touchstart', 'keydown'];
    const loadOnce = () => {
      loadAnalytics();
      events.forEach(event => {
        document.removeEventListener(event, loadOnce, { once: true });
      });
    };

    events.forEach(event => {
      document.addEventListener(event, loadOnce, { once: true, passive: true });
    });

    // Fallback: load after 3 seconds if no interaction
    setTimeout(() => {
      if (!window.__ANALYTICS_LOADED__) {
        loadAnalytics();
      }
    }, 3000);
  }

  /**
   * Fallback: Load all components if IntersectionObserver not available
   */
  async loadAllComponents() {
    await Promise.all([
      this.loadAboutComponent(),
      this.loadProjectsComponent(),
      this.loadBrandComponent(),
      this.loadTeamComponent(),
      this.loadContactComponent(),
      this.loadScrollAnimations()
    ]);
  }

  /**
   * Extract dominant color from logo and set CSS variables
   * Optimized: Uses requestIdleCallback on mobile to avoid blocking
   */
  async extractLogoAccentColor() {
    try {
      const logoUrl = '/img/ANTONI.png';

      // On mobile, use a lighter approach or skip entirely
      const isMobile = window.innerWidth <= 767.98;
      if (isMobile) {
        // On mobile, use fallback colors immediately to avoid blocking
        // Color extraction can happen later if needed
        return;
      }

      const color = await this.getImageDominantColor(logoUrl);

      if (color) {
        document.documentElement.style.setProperty('--accent', color.hex);
        document.documentElement.style.setProperty('--accent-contrast', color.contrast);
        console.log('Logo color extracted:', color);
      } else {
        console.log('Using fallback colors');
      }
    } catch (error) {
      console.warn('Could not extract logo color, using fallback:', error);
    }
  }

  /**
   * Get dominant color from image
   */
  getImageDominantColor(imageUrl) {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const { data } = imageData;

          // Sample colors from the image
          const colors = [];
          const step = Math.floor(data.length / 4 / 100); // Sample 100 pixels

          for (let i = 0; i < data.length; i += step * 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a > 128) {
              // Only consider non-transparent pixels
              colors.push({ r, g, b });
            }
          }

          if (colors.length === 0) {
            resolve(null);
            return;
          }

          // Calculate average color
          const avgR = Math.round(colors.reduce((sum, c) => sum + c.r, 0) / colors.length);
          const avgG = Math.round(colors.reduce((sum, c) => sum + c.g, 0) / colors.length);
          const avgB = Math.round(colors.reduce((sum, c) => sum + c.b, 0) / colors.length);

          const hex = this.rgbToHex(avgR, avgG, avgB);
          const contrast = this.getContrastColor(avgR, avgG, avgB);

          resolve({ hex, contrast });
        } catch (error) {
          console.warn('Error processing image:', error);
          resolve(null);
        }
      };

      img.onerror = () => {
        console.warn('Could not load logo image');
        resolve(null);
      };

      img.src = imageUrl;
    });
  }

  /**
   * Convert RGB to hex
   */
  rgbToHex(r, g, b) {
    return `#${[r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join('')}`;
  }

  /**
   * Get contrast color (black or white)
   */
  getContrastColor(r, g, b) {
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  /**
   * MOBILE-FIRST: Initialize global event listeners
   * Optimized with passive listeners and debounce/throttle
   */
  initGlobalEventListeners() {
    // Handle reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', this.handleReducedMotion);

    // MOBILE-FIRST: Optimized resize handler with debounce
    this.resizeHandler = this.debounce(() => {
      this.handleResize();
    }, 250);
    window.addEventListener('resize', this.resizeHandler);

    // Handle page visibility change
    this.visibilityHandler = () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);

    // Handle keyboard navigation
    this.keyboardHandler = e => {
      this.handleKeyboardNavigation(e);
    };
    document.addEventListener('keydown', this.keyboardHandler);
  }

  /**
   * MOBILE-FIRST: Debounce utility
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Initialize social media popup
   */
  initSocialMediaPopup() {
    const socialLinks = document.querySelectorAll('.social-link');
    const popup = document.getElementById('socialPopup');
    const popupOverlay = popup?.querySelector('.social-popup-overlay');
    const popupClose = popup?.querySelector('.social-popup-close');

    if (!popup) {
      console.warn('Social popup element not found');
      return;
    }

    // Show popup function
    const showPopup = e => {
      e.preventDefault();
      e.stopPropagation();

      if (popup) {
        popup.setAttribute('aria-hidden', 'false');
        // Focus trap: focus on close button
        if (popupClose) {
          setTimeout(() => popupClose.focus(), 100);
        }
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      }
    };

    // Hide popup function
    const hidePopup = () => {
      if (popup) {
        popup.setAttribute('aria-hidden', 'true');
        // Restore body scroll
        document.body.style.overflow = '';
      }
    };

    // Attach click handlers to all social links
    socialLinks.forEach(link => {
      link.addEventListener('click', showPopup);
    });

    // Close popup when clicking overlay
    if (popupOverlay) {
      popupOverlay.addEventListener('click', hidePopup);
    }

    // Close popup when clicking close button
    if (popupClose) {
      popupClose.addEventListener('click', hidePopup);
    }

    // Close popup on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && popup.getAttribute('aria-hidden') === 'false') {
        hidePopup();
      }
    });
  }

  /**
   * Handle reduced motion preference
   */
  handleReducedMotion(mediaQuery) {
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
    } else {
      document.documentElement.style.setProperty('--transition-fast', '150ms ease-in-out');
      document.documentElement.style.setProperty('--transition-normal', '300ms ease-in-out');
      document.documentElement.style.setProperty('--transition-slow', '500ms ease-in-out');
    }
  }

  /**
   * MOBILE-FIRST: Handle window resize with debounce
   * Optimized to prevent excessive calls on mobile
   */
  handleResize() {
    // Notify components about resize (only if loaded)
    if (this.team?.handleResize) {
      this.team.handleResize();
    }
    if (this.projects?.handleResize) {
      this.projects.handleResize();
    }
    if (this.brand?.handleResize) {
      this.brand.handleResize();
    }
  }

  /**
   * Handle page hidden
   */
  handlePageHidden() {
    // Pause animations or videos if any
    if (this.team && this.team.pause) {
      this.team.pause();
    }
  }

  /**
   * Handle page visible
   */
  handlePageVisible() {
    // Resume animations or videos if any
    if (this.team && this.team.resume) {
      this.team.resume();
    }
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation(e) {
    // Handle escape key for modals
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal-overlay.active');
      if (modal) {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
          closeBtn.click();
        }
      }
    }

    // Handle arrow keys for carousels
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const activeCarousel = document.querySelector('.slider-container:focus-within');
      if (activeCarousel) {
        e.preventDefault();
        if (e.key === 'ArrowLeft') {
          const prevBtn = activeCarousel.querySelector('.slider-btn.prev');
          if (prevBtn) {
            prevBtn.click();
          }
        } else {
          const nextBtn = activeCarousel.querySelector('.slider-btn.next');
          if (nextBtn) {
            nextBtn.click();
          }
        }
      }
    }
  }

  /**
   * Initialize lazy loading for images (optimized for mobile)
   */
  initLazyLoading() {
    const isMobile = window.innerWidth <= 767.98;

    // On mobile, MobileImageOptimizer handles image loading
    // This function only handles desktop lazy loading
    if (isMobile) {
      return; // MobileImageOptimizer handles this
    }

    // Desktop: use lazy loading with IntersectionObserver
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Setup language switch button
   */
  setupLanguageSwitch() {
    const langSwitch = document.getElementById('langSwitch');
    const langSwitchMobile = document.getElementById('langSwitchMobile');

    const updateLanguageSwitch = (button, newLang) => {
      if (button) {
        const langCodes = button.querySelectorAll('[data-i18n-lang]');
        langCodes.forEach(code => {
          if (code.getAttribute('data-i18n-lang') === newLang) {
            code.classList.add('active');
          } else {
            code.classList.remove('active');
          }
        });
      }
    };

    const handleLanguageSwitch = button => {
      if (button) {
        button.addEventListener('click', () => {
          const newLang = i18n.toggleLanguage();
          // Update both switches if they exist
          updateLanguageSwitch(langSwitch, newLang);
          updateLanguageSwitch(langSwitchMobile, newLang);
        });
      }
    };

    handleLanguageSwitch(langSwitch);
    handleLanguageSwitch(langSwitchMobile);

    // Subscribe to language changes to update both switches
    i18n.subscribe(lang => {
      updateLanguageSwitch(langSwitch, lang);
      updateLanguageSwitch(langSwitchMobile, lang);
    });
  }

  /**
   * Destroy app and clean up
   * MOBILE-FIRST: Cleanup optimized to prevent memory leaks
   */
  destroy() {
    // Clean up components (lazy loaded components may not exist)
    if (this.navbar?.destroy) this.navbar.destroy();
    if (this.hero?.destroy) this.hero.destroy();
    if (this.about?.destroy) this.about.destroy();
    // Services component removed (not used)
    if (this.projects?.destroy) this.projects.destroy();
    if (this.brand?.destroy) this.brand.destroy();
    if (this.team?.destroy) this.team.destroy();
    if (this.contact?.destroy) this.contact.destroy();
    if (this.footer?.destroy) this.footer.destroy();
    if (this.scrollAnimations?.destroy) this.scrollAnimations.destroy();
    if (this.lazyLoader?.destroy) this.lazyLoader.destroy();
    if (this.mobileImageOptimizer?.destroy) this.mobileImageOptimizer.destroy();

    // MOBILE-FIRST: Clean up optimized event handlers
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
    }
  }
}

// ========================================
// INITIALIZE APP
// ========================================
const app = new App();

// Export for debugging
window.AntoniApp = app;
