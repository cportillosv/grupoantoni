/* ========================================
   HERO COMPONENT
   ======================================== */

export class Hero {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.heroContent = document.querySelector('.hero-content');
    this.heroBackground = document.querySelector('.hero-background');
    this.ctaButtons = document.querySelectorAll('.hero-actions .btn');
    this.heroSlides = document.querySelectorAll('.hero-slide');
    this.currentSlide = 0;

    this.init();
  }

  init() {
    this.bindEvents();
    this.initParallax();
    this.initTypewriter();
    this.initSlideshow();
  }

  initSlideshow() {
    if (!this.heroSlides || this.heroSlides.length === 0) {
      return;
    }

    // Change slide every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    if (!this.heroSlides || this.heroSlides.length === 0) {
      return;
    }

    // Remove active class from current slide
    this.heroSlides[this.currentSlide].classList.remove('active');

    // Move to next slide
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;

    // Add active class to new slide
    this.heroSlides[this.currentSlide].classList.add('active');
  }

  bindEvents() {
    // Handle CTA button clicks
    this.ctaButtons.forEach(button => {
      button.addEventListener('click', e => this.handleCTAClick(e));
    });

    // Handle scroll for parallax effect
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => this.handleScroll(), 10);
    });

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());

    // Handle keyboard navigation
    this.ctaButtons.forEach(button => {
      button.addEventListener('keydown', e => this.handleKeydown(e));
    });
  }

  handleCTAClick(e) {
    const href = e.currentTarget.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      this.scrollToSection(href.substring(1));
    }
  }

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

  handleKeydown(e) {
    // Handle Enter and Space key activation
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  }

  initParallax() {
    if (!this.heroBackground) {
      return;
    }

    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      if (this.heroBackground) {
        this.heroBackground.style.transform = `translateY(${rate}px)`;
      }
    };

    // Only apply parallax if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', handleParallax);
    }
  }

  initTypewriter() {
    const title = document.querySelector('.hero-title');
    if (!title) {
      return;
    }

    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const heroHeight = this.hero ? this.hero.offsetHeight : 0;

    // Fade out hero content as user scrolls
    if (this.heroContent && scrolled > heroHeight * 0.5) {
      const opacity = Math.max(0, 1 - (scrolled - heroHeight * 0.5) / (heroHeight * 0.5));
      this.heroContent.style.opacity = opacity;
    } else if (this.heroContent) {
      this.heroContent.style.opacity = '1';
    }
  }

  handleResize() {
    // Reset any transform styles on resize
    if (this.heroBackground) {
      this.heroBackground.style.transform = '';
    }
  }

  /**
   * Animate hero elements on scroll
   */
  animateOnScroll() {
    const heroElements = this.hero?.querySelectorAll('[data-animate]');
    if (!heroElements) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    heroElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Update hero background based on scroll position
   */
  updateBackground() {
    if (!this.heroBackground) {
      return;
    }

    const scrolled = window.pageYOffset;
    const heroHeight = this.hero ? this.hero.offsetHeight : 0;

    // Add blur effect as user scrolls
    if (scrolled > heroHeight * 0.3) {
      this.heroBackground.style.filter = `blur(${Math.min(2, (scrolled / heroHeight) * 4)}px)`;
    } else {
      this.heroBackground.style.filter = 'none';
    }
  }

  /**
   * Handle hero video if present
   */
  initVideo() {
    const video = this.hero?.querySelector('video');
    if (!video) {
      return;
    }

    // Play video when it comes into view
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(console.warn);
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    observer.observe(video);
  }

  destroy() {
    // Remove event listeners
    this.ctaButtons.forEach(button => {
      button.removeEventListener('click', this.handleCTAClick);
      button.removeEventListener('keydown', this.handleKeydown);
    });

    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    // Reset styles
    if (this.heroContent) {
      this.heroContent.style.opacity = '1';
    }
    if (this.heroBackground) {
      this.heroBackground.style.transform = '';
      this.heroBackground.style.filter = 'none';
    }
  }
}
