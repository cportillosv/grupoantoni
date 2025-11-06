/* ========================================
   ANTONI - MAIN JAVASCRIPT
   ======================================== */

// Import modules
import { Navbar } from './components/navbar.js';
import { Hero } from './components/hero.js';
import { About } from './components/about.js';
import { Services } from './components/services.js';
import { Projects } from './components/projects.js';
import { Brand } from './components/brand.js';
import { Team } from './components/team.js';
import { Contact } from './components/contact.js';
import { Footer } from './components/footer.js';
import { ScrollAnimations } from './utils/scroll-animations.js';
import { Analytics } from './utils/analytics.js';
import { MobileImageOptimizer } from './utils/mobile-image-optimizer.js';
import { i18n } from './utils/i18n.js';

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
      // Extract logo color and set CSS variables
      await this.extractLogoAccentColor();

      // Initialize analytics
      Analytics.init();

      // Initialize i18n (internationalization)
      i18n.init();
      this.setupLanguageSwitch();

      // Initialize components
      this.navbar = new Navbar();
      this.hero = new Hero();
      this.about = new About();
      this.services = new Services();
      this.projects = new Projects();
      this.brand = new Brand();
      this.team = new Team();
      this.contact = new Contact();
      this.footer = new Footer();

      // Initialize scroll animations
      this.scrollAnimations = new ScrollAnimations();

      // Initialize mobile image optimizer
      this.mobileImageOptimizer = new MobileImageOptimizer();
      this.mobileImageOptimizer.init();
      this.mobileImageOptimizer.preloadCriticalImages();

      // Initialize global event listeners
      this.initGlobalEventListeners();

      // Initialize social media popup
      this.initSocialMediaPopup();

      // Initialize lazy loading
      this.initLazyLoading();

      console.log('Antoni app initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }

  /**
   * Extract dominant color from logo and set CSS variables
   */
  async extractLogoAccentColor() {
    try {
      const logoUrl = '/img/ANTONI.png';
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
   * Initialize global event listeners
   */
  initGlobalEventListeners() {
    // Handle reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.handleReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', this.handleReducedMotion);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', e => {
      this.handleKeyboardNavigation(e);
    });
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
   * Handle window resize
   */
  handleResize() {
    // Notify components about resize
    if (this.team && this.team.handleResize) {
      this.team.handleResize();
    }
    if (this.projects && this.projects.handleResize) {
      this.projects.handleResize();
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
   * Initialize lazy loading for images (desktop only)
   */
  initLazyLoading() {
    // Skip lazy loading on mobile - images load immediately
    const isMobile = window.innerWidth <= 767.98;
    if (isMobile) {
      // Load all images with data-src immediately on mobile
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.setAttribute('loading', 'eager');
      });
      return;
    }

    // Desktop: use lazy loading
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
   */
  destroy() {
    // Clean up components
    if (this.navbar && this.navbar.destroy) {
      this.navbar.destroy();
    }
    if (this.hero && this.hero.destroy) {
      this.hero.destroy();
    }
    if (this.about && this.about.destroy) {
      this.about.destroy();
    }
    if (this.services && this.services.destroy) {
      this.services.destroy();
    }
    if (this.projects && this.projects.destroy) {
      this.projects.destroy();
    }
    if (this.team && this.team.destroy) {
      this.team.destroy();
    }
    if (this.contact && this.contact.destroy) {
      this.contact.destroy();
    }
    if (this.footer && this.footer.destroy) {
      this.footer.destroy();
    }
    if (this.scrollAnimations && this.scrollAnimations.destroy) {
      this.scrollAnimations.destroy();
    }

    // Clean up global listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handlePageHidden);
    document.removeEventListener('visibilitychange', this.handlePageVisible);
    document.removeEventListener('keydown', this.handleKeyboardNavigation);
  }
}

// ========================================
// INITIALIZE APP
// ========================================
const app = new App();

// Export for debugging
window.AntoniApp = app;
