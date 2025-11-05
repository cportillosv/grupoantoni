/* ========================================
   PROJECTS COMPONENT
   ======================================== */

export class Projects {
  constructor() {
    this.projects = document.getElementById('projects');
    this.projectCards = document.querySelectorAll('.project-item');
    this.learnMoreButtons = document.querySelectorAll('.project-learn-more');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modal = document.querySelector('.modal');
    this.modalClose = document.querySelector('.modal-close');
    this.modalImage = document.getElementById('modalImage');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalLocation = document.getElementById('modalLocation');
    this.modalDescription = document.getElementById('modalDescription');

    this.isModalOpen = false;
    this.currentProject = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.initAnimations();
    this.initModal();
  }

  bindEvents() {
    // Handle learn more button clicks
    this.learnMoreButtons.forEach(button => {
      button.addEventListener('click', e => this.handleLearnMoreClick(e));
    });

    // Handle modal close
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    // Handle modal overlay click
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', e => {
        if (e.target === this.modalOverlay) {
          this.closeModal();
        }
      });
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', e => this.handleKeydown(e));

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());

    // Handle scroll for section boundaries
    window.addEventListener('scroll', () => this.handleScroll());
  }

  initAnimations() {
    if (!this.projects) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCards();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(this.projects);
  }

  animateCards() {
    this.projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, index * 150);
    });
  }

  initModal() {
    // Set up modal accessibility
    if (this.modal) {
      this.modal.setAttribute('role', 'dialog');
      this.modal.setAttribute('aria-modal', 'true');
    }
  }

  handleLearnMoreClick(e) {
    e.preventDefault();
    const button = e.currentTarget;
    const projectId = button.getAttribute('data-modal');

    if (projectId) {
      this.openModal(projectId);
    }
  }

  openModal(projectId) {
    const projectData = this.getProjectData(projectId);
    if (!projectData) {
      return;
    }

    this.currentProject = projectData;
    this.isModalOpen = true;

    // Update modal content
    if (this.modalImage) {
      this.modalImage.src = projectData.image;
      this.modalImage.alt = projectData.imageAlt;
    }

    if (this.modalTitle) {
      this.modalTitle.textContent = projectData.title;
    }

    if (this.modalLocation) {
      this.modalLocation.textContent = projectData.location;
    }

    if (this.modalDescription) {
      this.modalDescription.innerHTML = projectData.description;
    }

    // Show modal
    if (this.modalOverlay) {
      this.modalOverlay.classList.add('active');
      this.modalOverlay.setAttribute('aria-hidden', 'false');
    }

    // Focus management
    this.trapFocus();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Announce to screen readers
    this.announceModalOpen(projectData.title);
  }

  closeModal() {
    if (!this.isModalOpen) {
      return;
    }

    this.isModalOpen = false;
    this.currentProject = null;

    // Hide modal
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('active');
      this.modalOverlay.setAttribute('aria-hidden', 'true');
    }

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to trigger button
    const activeButton = document.querySelector('.project-learn-more[data-modal]:focus');
    if (activeButton) {
      activeButton.focus();
    }
  }

  handleKeydown(e) {
    if (!this.isModalOpen) {
      return;
    }

    // Close modal on Escape
    if (e.key === 'Escape') {
      this.closeModal();
    }

    // Trap focus within modal
    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  handleTabKey(e) {
    if (!this.modal) {
      return;
    }

    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  trapFocus() {
    if (!this.modal) {
      return;
    }

    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    if (firstElement) {
      firstElement.focus();
    }
  }

  announceModalOpen(title) {
    // Create announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Modal opened: ${title}`;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  getProjectData(projectId) {
    const projectData = {
      'romana-condos': {
        title: 'Romana Condos',
        location: 'La Romana, Dominican Republic',
        image: '/img/condominio.png',
        imageAlt: 'Romana Condos - Modern residential complex with ocean views',
        description: `
          <p>Luxury residential complex featuring modern amenities and stunning ocean views.
          This project showcases our expertise in high-end residential development with a focus on
          sustainable design and premium finishes.</p>
          <ul>
            <li>50 luxury condominiums</li>
            <li>Oceanfront location with private beach access</li>
            <li>Modern amenities including pool, gym, and concierge services</li>
            <li>Sustainable design with energy-efficient systems</li>
            <li>Premium finishes and smart home technology</li>
          </ul>
        `
      },
      'mountain-bungalows': {
        title: 'Mountain Bungalows',
        location: 'San José de Ocoa, Dominican Republic',
        image: '/img/patioOP.png',
        imageAlt: 'Mountain Bungalows - Sustainable mountain retreat with panoramic views',
        description: `
          <p>Eco-friendly mountain retreat designed for sustainable living and relaxation.
          This project demonstrates our commitment to environmental responsibility while creating
          beautiful, functional spaces.</p>
          <ul>
            <li>12 sustainable bungalows</li>
            <li>Panoramic mountain views</li>
            <li>Solar power and rainwater collection systems</li>
            <li>Natural materials and local craftsmanship</li>
            <li>Minimal environmental impact design</li>
          </ul>
        `
      }
    };

    return projectData[projectId] || null;
  }

  handleScroll() {
    if (!this.projects) {
      return;
    }

    const rect = this.projects.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if section is in viewport
    const isInView = rect.top < windowHeight && rect.bottom > 0;

    if (isInView) {
      // Ensure section doesn't overlap with others
      this.adjustSectionPosition();
    }
  }

  adjustSectionPosition() {
    if (!this.projects) {
      return;
    }

    const rect = this.projects.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // If section is too close to top, add margin
    if (rect.top < 50) {
      this.projects.style.marginTop = '50px';
    } else {
      this.projects.style.marginTop = '';
    }

    // If section is too close to bottom, add margin
    if (rect.bottom > windowHeight - 50) {
      this.projects.style.marginBottom = '50px';
    } else {
      this.projects.style.marginBottom = '';
    }
  }

  handleResize() {
    // Reset any transform styles on resize
    this.projectCards.forEach(card => {
      card.style.transform = '';
    });

    // Recalculate section position
    this.adjustSectionPosition();
  }

  /**
   * Update project card content
   */
  updateProjectCard(cardIndex, newContent) {
    const card = this.projectCards[cardIndex];
    if (!card) {
      return;
    }

    const title = card.querySelector('.project-title');
    const location = card.querySelector('.project-location');
    const description = card.querySelector('.project-description');

    if (title && newContent.title) {
      title.textContent = newContent.title;
    }

    if (location && newContent.location) {
      location.textContent = newContent.location;
    }

    if (description && newContent.description) {
      description.textContent = newContent.description;
    }
  }

  /**
   * Add new project card
   */
  addProjectCard(projectData) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
      return;
    }

    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-image">
        <img src="${projectData.image}" alt="${projectData.imageAlt}"
             loading="lazy" width="400" height="300">
      </div>
      <div class="project-content">
        <h3 class="project-title">${projectData.title}</h3>
        <p class="project-location">${projectData.location}</p>
        <p class="project-description">${projectData.description}</p>
        <button class="btn btn-outline project-learn-more"
                data-modal="${projectData.id}">Learn more →</button>
      </div>
    `;

    // Add event listener for learn more button
    const learnMoreBtn = card.querySelector('.project-learn-more');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', e => this.handleLearnMoreClick(e));
    }

    projectsGrid.appendChild(card);
    this.projectCards = document.querySelectorAll('.project-item');
    this.learnMoreButtons = document.querySelectorAll('.project-learn-more');
  }

  destroy() {
    // Remove event listeners
    this.learnMoreButtons.forEach(button => {
      button.removeEventListener('click', this.handleLearnMoreClick);
    });

    if (this.modalClose) {
      this.modalClose.removeEventListener('click', this.closeModal);
    }

    if (this.modalOverlay) {
      this.modalOverlay.removeEventListener('click', this.closeModal);
    }

    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);

    // Close modal if open
    if (this.isModalOpen) {
      this.closeModal();
    }

    // Reset styles
    this.projectCards.forEach(card => {
      card.style.transform = '';
    });

    // Reset section positioning
    if (this.projects) {
      this.projects.style.marginTop = '';
      this.projects.style.marginBottom = '';
    }
  }
}
