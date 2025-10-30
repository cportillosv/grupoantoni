/* ========================================
   MOBILE ENHANCEMENTS
   ======================================== */

class MobileEnhancements {
  constructor() {
    this.isMobile = this.detectMobile();
    this.touchStartY = 0;
    this.touchEndY = 0;

    this.init();
  }

  detectMobile() {
    return (
      window.innerWidth <= 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }

  init() {
    if (this.isMobile) {
      this.enhanceMobileExperience();
    }

    this.bindEvents();
  }

  enhanceMobileExperience() {
    // Add mobile class to body
    document.body.classList.add('mobile-device');

    // Improve touch interactions
    this.enhanceTouchInteractions();

    // Optimize scrolling
    this.optimizeScrolling();

    // Improve form interactions
    this.enhanceFormInteractions();

    // Add mobile-specific animations
    this.addMobileAnimations();
  }

  enhanceTouchInteractions() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .nav-link, .carousel-nav, .social-link');

    buttons.forEach(button => {
      button.addEventListener('touchstart', _e => {
        button.classList.add('touch-active');
      });

      button.addEventListener('touchend', _e => {
        setTimeout(() => {
          button.classList.remove('touch-active');
        }, 150);
      });

      button.addEventListener('touchcancel', _e => {
        button.classList.remove('touch-active');
      });
    });
  }

  optimizeScrolling() {
    // Smooth scrolling for mobile
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed header

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  enhanceFormInteractions() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach(input => {
        // Add focus states
        input.addEventListener('focus', () => {
          input.closest('.form-group')?.classList.add('focused');
        });

        input.addEventListener('blur', () => {
          input.closest('.form-group')?.classList.remove('focused');
        });

        // Improve input validation feedback
        input.addEventListener('input', () => {
          this.validateInput(input);
        });
      });
    });
  }

  validateInput(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');

    if (!formGroup || !errorElement) return;

    // Clear previous errors
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    input.classList.remove('error');

    // Basic validation
    if (input.hasAttribute('required') && !input.value.trim()) {
      this.showError(input, 'This field is required');
      return;
    }

    if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
      this.showError(input, 'Please enter a valid email address');
      return;
    }

    if (input.type === 'tel' && input.value && !this.isValidPhone(input.value)) {
      this.showError(input, 'Please enter a valid phone number');
    }
  }

  showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
      input.classList.add('error');
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  addMobileAnimations() {
    // Add intersection observer for mobile animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      '.about-card, .project-item, .team-member, .brand-logo'
    );

    animatedElements.forEach(el => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }

  bindEvents() {
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });

    // Handle resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Handle touch gestures
    document.addEventListener('touchstart', e => {
      this.touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', e => {
      this.touchEndY = e.changedTouches[0].clientY;
      this.handleSwipe();
    });
  }

  handleOrientationChange() {
    // Recalculate heights and positions
    const hero = document.querySelector('.hero');
    const quote = document.querySelector('.quote-section');

    if (hero) {
      hero.style.height = '100vh';
    }

    if (quote) {
      quote.style.height = '100vh';
    }

    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = this.detectMobile();

    if (wasMobile !== this.isMobile) {
      if (this.isMobile) {
        this.enhanceMobileExperience();
      } else {
        document.body.classList.remove('mobile-device');
      }
    }
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartY - this.touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe up
        this.handleSwipeUp();
      } else {
        // Swipe down
        this.handleSwipeDown();
      }
    }
  }

  handleSwipeUp() {
    // Close mobile menu on swipe up
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  handleSwipeDown() {
    // Could be used for other mobile interactions
  }
}

// Initialize mobile enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new MobileEnhancements();
});

// Export for use in other modules
export { MobileEnhancements };
