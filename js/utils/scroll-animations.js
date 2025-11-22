/* ========================================
   SCROLL ANIMATIONS UTILITY
   ======================================== */

/**
 * MOBILE-FIRST: Scroll Animations optimizado
 * En mobile, simplifica o desactiva animaciones para mejor performance
 */
export class ScrollAnimations {
  constructor() {
    this.isMobile = window.innerWidth <= 767.98;

    // MOBILE-FIRST: Patrón defensivo - retornar temprano en mobile
    // Garantiza que, incluso si se instancia por error, no habrá trabajo extra
    if (this.isMobile) {
      return;
    }

    this.animatedElements = document.querySelectorAll('[data-animate]');
    this.observers = new Map();

    // Si el usuario prefiere menos movimiento, no inicializar
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.init();
  }

  init() {
    // MOBILE-FIRST: En mobile, no inicializar nada (ya retornamos en constructor)
    // Esta función solo se ejecuta en desktop
    this.createIntersectionObserver();
    this.observeElements();
    this.bindEvents();
  }

  /**
   * MOBILE-FIRST: Animaciones simplificadas para mobile
   * Solo fade-in básico, sin transformaciones pesadas
   */
  initSimpleAnimations() {
    this.animatedElements.forEach(element => {
      // Aplicar clase animate directamente sin observer complejo
      // Usar un pequeño delay para no bloquear
      requestAnimationFrame(() => {
        element.classList.add('animate');
      });
    });
  }

  createIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  observeElements() {
    this.animatedElements.forEach(element => {
      // MOBILE-FIRST: Excluir elementos del hero (ya tienen su propia animación)
      // Asegurar que ninguna animación toca hero en mobile o desktop
      if (element.closest('.hero') || element.closest('#home')) {
        return;
      }
      this.observer.observe(element);
    });
  }

  animateElement(element) {
    const animationType = element.getAttribute('data-animate');
    const delay = element.getAttribute('data-delay') || 0;

    setTimeout(() => {
      element.classList.add('animate');
      this.triggerAnimationEvent(element, animationType);
    }, parseInt(delay));
  }

  triggerAnimationEvent(element, animationType) {
    const event = new CustomEvent('animationComplete', {
      detail: {
        element,
        animationType
      }
    });

    element.dispatchEvent(event);
  }

  bindEvents() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.handleResize(), 250);
    });

    // Handle scroll for additional effects
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => this.handleScroll(), 10);
    });
  }

  handleResize() {
    // Reset animations on resize
    this.animatedElements.forEach(element => {
      if (!element.classList.contains('animate')) {
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(element);
      }
    });
  }

  handleScroll() {
    // Add scroll-based effects
    this.animatedElements.forEach(element => {
      if (element.classList.contains('animate')) {
        this.updateScrollEffects(element);
      }
    });
  }

  getInitialTransform(element) {
    const animationType = element.getAttribute('data-animate');

    switch (animationType) {
      case 'fade-up':
        return 'translateY(20px)';
      case 'fade-down':
        return 'translateY(-20px)';
      case 'fade-left':
        return 'translateX(-20px)';
      case 'fade-right':
        return 'translateX(20px)';
      case 'fade-in':
        return 'none';
      case 'scale-up':
        return 'scale(0.9)';
      case 'scale-down':
        return 'scale(1.1)';
      default:
        return 'translateY(20px)';
    }
  }

  updateScrollEffects(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate scroll progress
    const scrollProgress = Math.max(
      0,
      Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
    );

    // Apply scroll-based effects
    this.applyScrollEffect(element, scrollProgress);
  }

  applyScrollEffect(element, progress) {
    const animationType = element.getAttribute('data-animate');

    switch (animationType) {
      case 'fade-up':
        element.style.transform = `translateY(${20 * (1 - progress)}px)`;
        break;
      case 'fade-down':
        element.style.transform = `translateY(${-20 * (1 - progress)}px)`;
        break;
      case 'fade-left':
        element.style.transform = `translateX(${-20 * (1 - progress)}px)`;
        break;
      case 'fade-right':
        element.style.transform = `translateX(${20 * (1 - progress)}px)`;
        break;
      case 'scale-up':
        element.style.transform = `scale(${0.9 + 0.1 * progress})`;
        break;
      case 'scale-down':
        element.style.transform = `scale(${1.1 - 0.1 * progress})`;
        break;
    }
  }

  /**
   * Add animation to element
   */
  addAnimation(element, animationType = 'fade-up', delay = 0) {
    if (!element) {
      return;
    }

    element.setAttribute('data-animate', animationType);
    if (delay > 0) {
      element.setAttribute('data-delay', delay);
    }

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(element);
    element.style.transition = 'all 0.6s ease-out';

    // Add to observer
    this.observer.observe(element);
    this.animatedElements = document.querySelectorAll('[data-animate]');
  }

  /**
   * Remove animation from element
   */
  removeAnimation(element) {
    if (!element) {
      return;
    }

    element.removeAttribute('data-animate');
    element.removeAttribute('data-delay');
    element.style.opacity = '';
    element.style.transform = '';
    element.style.transition = '';

    this.observer.unobserve(element);
    this.animatedElements = document.querySelectorAll('[data-animate]');
  }

  /**
   * Animate element immediately
   */
  animateNow(element) {
    if (!element) {
      return;
    }

    const animationType = element.getAttribute('data-animate') || 'fade-up';
    element.classList.add('animate');
    this.triggerAnimationEvent(element, animationType);
  }

  /**
   * Reset element animation
   */
  resetAnimation(element) {
    if (!element) {
      return;
    }

    element.classList.remove('animate');
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(element);

    // Re-observe if it has data-animate attribute
    if (element.hasAttribute('data-animate')) {
      this.observer.observe(element);
    }
  }

  /**
   * Reset all animations
   */
  resetAllAnimations() {
    this.animatedElements.forEach(element => {
      this.resetAnimation(element);
    });
  }

  /**
   * Get animation progress for element
   */
  getAnimationProgress(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    return Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
  }

  /**
   * Check if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }

  /**
   * Create staggered animation for multiple elements
   */
  staggerAnimation(elements, animationType = 'fade-up', staggerDelay = 100) {
    elements.forEach((element, index) => {
      this.addAnimation(element, animationType, index * staggerDelay);
    });
  }

  /**
   * Create sequence animation for multiple elements
   */
  sequenceAnimation(elements, _animationType = 'fade-up', sequenceDelay = 200) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.animateNow(element);
      }, index * sequenceDelay);
    });
  }

  destroy() {
    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);

    // Reset all elements
    this.animatedElements.forEach(element => {
      element.style.opacity = '';
      element.style.transform = '';
      element.style.transition = '';
    });
  }
}
