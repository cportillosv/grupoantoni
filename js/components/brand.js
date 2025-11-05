/* ========================================
   BRAND CAROUSEL COMPONENT
   ======================================== */

export class Brand {
  constructor() {
    this.carousel = document.querySelector('.brand-carousel');
    this.container = document.querySelector('.brand-carousel-container');
    this.logos = document.querySelectorAll('.brand-logo');

    // Drag functionality
    this.isDragging = false;
    this.startX = 0;
    this.dragOffset = 0;
    this.isPaused = false;

    if (this.carousel && this.logos.length > 0) {
      this.init();
    }
  }

  init() {
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 767.98;

    if (!isMobile) {
      this.setupCarousel();
      this.setupDragHandlers();
    }
    this.setupClickHandlers();
  }

  setupCarousel() {
    // Asegurar que el carrusel tenga el ancho correcto
    const logoWidth = this.logos[0].offsetWidth;
    const gap = 32; // var(--spacing-xxl)
    const totalWidth = (logoWidth + gap) * this.logos.length;

    this.carousel.style.width = `${totalWidth}px`;
  }

  setupDragHandlers() {
    // Mouse events
    this.container.addEventListener('mousedown', this.startDrag.bind(this));
    this.container.addEventListener('mousemove', this.drag.bind(this));
    this.container.addEventListener('mouseup', this.endDrag.bind(this));
    this.container.addEventListener('mouseleave', this.endDrag.bind(this));

    // Touch events for mobile
    this.container.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
    this.container.addEventListener('touchmove', this.drag.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.endDrag.bind(this));

    // Pause animation on hover
    this.container.addEventListener('mouseenter', () => {
      this.pauseAnimation();
    });

    this.container.addEventListener('mouseleave', () => {
      this.resumeAnimation();
    });
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    this.dragOffset = 0;

    // Pause the CSS animation
    this.pauseAnimation();

    // Prevent default to avoid text selection
    e.preventDefault();
  }

  drag(e) {
    if (!this.isDragging) {
      return;
    }

    const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    this.dragOffset = currentX - this.startX;

    // Apply the drag offset to the carousel
    this.carousel.style.transform = `translateX(${this.dragOffset}px)`;

    // Prevent default to avoid scrolling
    e.preventDefault();
  }

  endDrag(_e) {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;

    // Reset the transform and resume animation
    this.carousel.style.transform = 'translateX(0)';
    this.resumeAnimation();
  }

  pauseAnimation() {
    if (!this.isPaused) {
      this.carousel.style.animationPlayState = 'paused';
      this.isPaused = true;
    }
  }

  resumeAnimation() {
    if (this.isPaused) {
      this.carousel.style.animationPlayState = 'running';
      this.isPaused = false;
    }
  }

  setupClickHandlers() {
    this.logos.forEach(logo => {
      const link = logo.querySelector('.brand-link');
      const brand = logo.getAttribute('data-brand');

      if (link) {
        link.addEventListener('click', e => {
          // Solo permitir clic si no estamos arrastrando
          if (!this.isDragging) {
            // Log para debugging
            console.log(`Clicked on brand: ${brand}`);
          } else {
            // Si estamos arrastrando, prevenir el clic
            e.preventDefault();
          }
        });
      }
    });
  }

  // Método para limpiar event listeners
  destroy() {
    // Clean up if needed
  }
}
