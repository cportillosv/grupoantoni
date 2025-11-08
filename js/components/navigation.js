/* ========================================
   NAVIGATION COMPONENT
   ======================================== */

export class Navigation {
  constructor() {
    this.header = document.querySelector('.header');
    this.menuToggle = document.querySelector('.header__menu-toggle');
    this.mobileMenu = document.querySelector('.header__mobile-menu');
    this.navLinks = document.querySelectorAll('.header__nav-link, .header__mobile-nav-link');
    this.isMenuOpen = false;
    this.lastScrollY = window.scrollY;
    this.scrollThreshold = 100;

    this.init();
  }

  init() {
    this.bindEvents();
    this.initSmoothScrolling();
    this.initActiveLink();
    this.handleScroll();
  }

  bindEvents() {
    // Menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu when clicking outside
    document.addEventListener('click', e => {
      if (this.isMenuOpen && !this.header.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Handle scroll events
    window.addEventListener('scroll', () => this.handleScroll());

    // Handle resize events
    window.addEventListener('resize', () => this.handleResize());

    // Handle navigation link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', e => this.handleNavClick(e));
    });
  }

  initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.scrollToElement(target);
        }
      });
    });
  }

  initActiveLink() {
    // Update active link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
      const { scrollY } = window;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          this.setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener('scroll', debounce(updateActiveLink, 100));
  }

  setActiveLink(sectionId) {
    // Remove active class from all links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current section link
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  handleNavClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        this.scrollToElement(target);
        this.closeMenu();
      }
    }
  }

  scrollToElement(element) {
    const headerHeight = this.header ? this.header.offsetHeight : 0;
    const targetPosition = element.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.mobileMenu.classList.add('active');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.menuToggle.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus first menu item
    const firstMenuItem = this.mobileMenu.querySelector('.header__mobile-nav-link');
    if (firstMenuItem) {
      firstMenuItem.focus();
    }

    // Announce to screen readers
    if (window.GrupoAntoniApp) {
      window.GrupoAntoniApp.announceToScreenReader('Navigation menu opened');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.mobileMenu.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to menu toggle
    this.menuToggle.focus();

    // Announce to screen readers
    if (window.GrupoAntoniApp) {
      window.GrupoAntoniApp.announceToScreenReader('Navigation menu closed');
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class based on scroll position
    if (currentScrollY > this.scrollThreshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      // Scrolling down
      this.header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      this.header.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 991 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Public methods
  updateActiveSection(sectionId) {
    this.setActiveLink(sectionId);
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      this.scrollToElement(section);
    }
  }

  isMenuOpen() {
    return this.isMenuOpen;
  }
}

// Debounce utility function
function debounce(func, wait) {
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
