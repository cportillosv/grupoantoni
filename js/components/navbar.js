/* ========================================
   NAVBAR COMPONENT
   ======================================== */

export class Navbar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');

    this.isMenuOpen = false;
    this.scrollThreshold = 100;

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveLink();
    this.handleScroll();
  }

  bindEvents() {
    // Toggle mobile menu
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }

    // Handle dropdown menus (Projects and Brand)
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    const isMobile = () => window.innerWidth <= 991.98;

    dropdownItems.forEach(dropdownItem => {
      const dropdownLink = dropdownItem.querySelector('.nav-link');
      if (dropdownLink) {
        // Use touchstart for mobile to avoid double-tap issue, click for desktop
        const handleDropdownToggle = e => {
          // On mobile, prevent default to show dropdown
          if (isMobile()) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling to click outside handler

            const dropdownMenu = dropdownItem.querySelector('.dropdown-menu');
            if (dropdownMenu) {
              const isActive = dropdownMenu.classList.contains('active');

              // Close other dropdowns first
              dropdownItems.forEach(item => {
                if (item !== dropdownItem) {
                  const otherMenu = item.querySelector('.dropdown-menu');
                  if (otherMenu) {
                    otherMenu.classList.remove('active');
                  }
                  const otherLink = item.querySelector('.nav-link');
                  if (otherLink) {
                    otherLink.setAttribute('aria-expanded', 'false');
                  }
                }
              });

              // Toggle current dropdown
              dropdownMenu.classList.toggle('active', !isActive);
              dropdownLink.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
            }
          }
        };

        // Add both touchstart and click handlers for better mobile support
        if (isMobile()) {
          dropdownLink.addEventListener('touchstart', handleDropdownToggle, { passive: false });
        }
        dropdownLink.addEventListener('click', handleDropdownToggle);
      }
    });

    // Close menu when clicking on links (except dropdown parent)
    this.navLinks.forEach(link => {
      if (!link.closest('.nav-item-dropdown')) {
        link.addEventListener('click', () => this.closeMenu());
      }
    });

    // Close dropdowns when clicking outside (with delay to avoid conflicts)
    let closeTimeout;
    document.addEventListener('click', e => {
      // Clear any pending close
      clearTimeout(closeTimeout);

      // Small delay to allow dropdown toggle to complete first
      closeTimeout = setTimeout(() => {
        dropdownItems.forEach(dropdownItem => {
          if (!dropdownItem.contains(e.target)) {
            const dropdownMenu = dropdownItem.querySelector('.dropdown-menu');
            const dropdownLink = dropdownItem.querySelector('.nav-link');
            if (dropdownMenu && dropdownMenu.classList.contains('active')) {
              dropdownMenu.classList.remove('active');
              if (dropdownLink) {
                dropdownLink.setAttribute('aria-expanded', 'false');
              }
            }
          }
        });
      }, 50); // Small delay to prevent immediate closing
    });

    // Close menu when clicking outside
    document.addEventListener('click', e => {
      if (this.isMenuOpen && !this.navbar.contains(e.target)) {
        this.closeMenu();
      }
    });

    // MOBILE-FIRST: Optimized scroll handler with throttle
    this.scrollHandler = this.throttle(() => this.handleScroll(), 16); // ~60fps
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    // MOBILE-FIRST: Optimized resize handler with debounce
    this.resizeHandler = this.debounce(() => this.handleResize(), 250);
    window.addEventListener('resize', this.resizeHandler);

    // Handle keyboard navigation
    this.navLinks.forEach(link => {
      link.addEventListener('keydown', e => this.handleKeydown(e));
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', this.isMenuOpen);
    }

    if (this.navMenu) {
      this.navMenu.classList.toggle('active', this.isMenuOpen);
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';

    // Focus management
    if (this.isMenuOpen) {
      this.navLinks[0]?.focus();
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;

      if (this.navToggle) {
        this.navToggle.setAttribute('aria-expanded', 'false');
      }

      if (this.navMenu) {
        this.navMenu.classList.remove('active');
      }

      document.body.style.overflow = '';
    }
  }

  handleScroll() {
    const { scrollY } = window;

    // Add/remove scrolled class
    if (this.navbar) {
      this.navbar.classList.toggle('scrolled', scrollY > this.scrollThreshold);
    }

    // Update active link
    this.updateActiveLink();
  }

  updateActiveLink() {
    const { scrollY } = window;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to current link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  handleResize() {
    // Close menu on resize to desktop
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  handleKeydown(e) {
    // Handle arrow key navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const currentIndex = Array.from(this.navLinks).indexOf(e.target);
      let nextIndex;

      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % this.navLinks.length;
      } else {
        nextIndex = currentIndex === 0 ? this.navLinks.length - 1 : currentIndex - 1;
      }

      this.navLinks[nextIndex]?.focus();
    }

    // Close menu on Escape
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.closeMenu();
      this.navToggle?.focus();
    }
  }

  /**
   * Smooth scroll to section
   */
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Update navbar appearance based on scroll position
   */
  updateAppearance() {
    const { scrollY } = window;

    if (this.navbar) {
      if (scrollY > this.scrollThreshold) {
        this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        this.navbar.style.backdropFilter = 'blur(20px)';
        this.navbar.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
      } else {
        this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        this.navbar.style.backdropFilter = 'blur(10px)';
        this.navbar.style.boxShadow = 'none';
      }
    }
  }

  /**
   * MOBILE-FIRST: Throttle utility for scroll events
   */
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

  /**
   * MOBILE-FIRST: Debounce utility for resize events
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

  destroy() {
    // Remove event listeners
    if (this.navToggle) {
      this.navToggle.removeEventListener('click', this.toggleMenu);
    }

    this.navLinks.forEach(link => {
      link.removeEventListener('click', this.closeMenu);
      link.removeEventListener('keydown', this.handleKeydown);
    });

    // MOBILE-FIRST: Remove optimized handlers
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    document.removeEventListener('click', this.closeMenu);

    // Reset body overflow
    document.body.style.overflow = '';
  }
}
