/**
 * Advanced Lazy Loading with IntersectionObserver
 * Optimized for mobile performance
 */

export class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.sectionObserver = null;
    this.loadedImages = new Set();
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupImageObserver();
      this.setupSectionObserver();
    } else {
      // Fallback for old browsers
      this.loadAllImages();
    }
  }

  /**
   * MOBILE-FIRST: Setup IntersectionObserver for images
   * rootMargin aumentado a 300px para mobile - carga imágenes MUY ANTES de que entren al viewport
   * Esto elimina completamente la sensación de "imágenes que tardan en aparecer"
   */
  setupImageObserver() {
    const isMobile = window.innerWidth <= 767.98;
    const options = {
      root: null,
      // MOBILE-FIRST: 300px en mobile para pre-cargar mucho antes, 100px en desktop
      rootMargin: isMobile ? '300px 0px' : '100px 0px',
      threshold: 0.01
    };

    this.imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      });
    }, options);

    // MOBILE-FIRST: Observar solo imágenes lazy, excluyendo las eager marcadas
    // Cambiar selector para excluir explícitamente data-no-lazy="true"
    document
      .querySelectorAll(
        'img[data-src]:not([data-no-lazy="true"]), img[loading="lazy"]:not([data-no-lazy="true"])'
      )
      .forEach(img => {
        // También excluir imágenes que ya tienen loading="eager" explícitamente
        if (img.getAttribute('loading') !== 'eager') {
          this.imageObserver.observe(img);
        }
      });
  }

  /**
   * Setup IntersectionObserver for sections (defer non-critical content)
   */
  setupSectionObserver() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    this.sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadSection(entry.target);
          this.sectionObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Observe sections marked for lazy loading
    document.querySelectorAll('[data-lazy-section]').forEach(section => {
      this.sectionObserver.observe(section);
    });
  }

  /**
   * Load image from data-src or convert lazy to eager
   * MOBILE-FIRST: Optimizado para evitar repaints innecesarios
   * Fade-in SOLO para imágenes lazy, nunca para eager
   */
  loadImage(img) {
    if (this.loadedImages.has(img)) {
      return;
    }

    // MOBILE-FIRST: No tocar imágenes que ya están totalmente visibles
    // Evitar repaints innecesarios en mobile
    const computedStyle = window.getComputedStyle(img);
    if (computedStyle.opacity === '1' && !img.classList.contains('lazy-loaded')) {
      img.classList.add('lazy-loaded');
      this.loadedImages.add(img);
      return;
    }

    // Verificar si es imagen eager - nunca aplicar fade-in a eager
    const isEager = img.getAttribute('loading') === 'eager' || img.hasAttribute('data-no-lazy');
    const isLazy = img.getAttribute('loading') === 'lazy' || img.hasAttribute('data-src');

    // If data-src exists, load it
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    // If picture element, load sources
    const picture = img.closest('picture');
    if (picture) {
      const sources = picture.querySelectorAll('source[data-srcset]');
      sources.forEach(source => {
        source.srcset = source.dataset.srcset;
        source.removeAttribute('data-srcset');
      });
    }

    // Mark as loaded
    img.classList.add('lazy-loaded');
    this.loadedImages.add(img);

    // MOBILE-FIRST: Fade-in suave SOLO para imágenes lazy
    // NUNCA aplicar fade-in a imágenes eager (causan flashing)
    if (isLazy && !isEager) {
      // Usar requestAnimationFrame para no bloquear el render
      requestAnimationFrame(() => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        // Forzar reflow para que la transición funcione
        // eslint-disable-next-line no-void
        void img.offsetWidth;
        requestAnimationFrame(() => {
          img.style.opacity = '1';
        });
      });
    } else {
      // Imágenes eager: mostrar inmediatamente sin transición
      img.style.opacity = '1';
    }

    // Handle load error
    img.addEventListener('error', () => {
      img.classList.add('lazy-error');
      img.style.opacity = '1'; // Mostrar imagen aunque haya error
      console.warn('Failed to load image:', img.src || img.dataset.src);
    });
  }

  /**
   * Load section content (defer heavy operations)
   */
  loadSection(section) {
    section.classList.add('section-loaded');

    // Trigger any deferred animations or content
    const event = new CustomEvent('sectionVisible', { detail: { section } });
    document.dispatchEvent(event);
  }

  /**
   * Fallback: load all images immediately
   */
  loadAllImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.loadImage(img);
    });
  }

  /**
   * Preload critical images
   */
  preloadCritical(images) {
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }

  /**
   * Destroy observers
   */
  destroy() {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }
  }
}
