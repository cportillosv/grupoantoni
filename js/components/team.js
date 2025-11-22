/* ========================================
   TEAM COMPONENT - 3 Items per Slide
   ======================================== */

export class Team {
  constructor() {
    this.team = document.getElementById('team');
    this.carouselContainer = document.querySelector('.team-carousel-container');
    this.carousel = document.querySelector('.team-carousel');
    this.teamMembers = document.querySelectorAll('.team-member');
    this.prevButton = document.querySelector('.carousel-nav.prev');
    this.nextButton = document.querySelector('.carousel-nav.next');
    this.meetRestButton = document.querySelector('.meet-rest-btn');

    this.currentIndex = 0;
    this.isAnimating = false;
    this.totalMembers = this.teamMembers.length;
    this.membersPerSlide = 3; // Show 3 members per slide
    this.totalSlides = Math.ceil(this.totalMembers / this.membersPerSlide);

    this.init();
  }

  init() {
    // Ensure all team members are visible immediately
    this.teamMembers.forEach(member => {
      member.style.opacity = '1';
      member.style.visibility = 'visible';
      const images = member.querySelectorAll('img');
      images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
      });
    });
    this.setupTeamLayout();
    this.bindEvents();
    this.initAnimations();
  }

  setupTeamLayout() {
    if (!this.carousel) {
      return;
    }

    // Create slides with 3 members each
    this.createSlides();
    this.updateCarousel();
    this.updateButtonStates();
  }

  createSlides() {
    // Clear existing content
    this.carousel.innerHTML = '';

    // Create slides
    for (let slideIndex = 0; slideIndex < this.totalSlides; slideIndex++) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.style.display = 'flex';
      slide.style.gap = '2rem';
      slide.style.justifyContent = 'center';
      slide.style.alignItems = 'flex-start';

      // Add members to this slide
      const startIndex = slideIndex * this.membersPerSlide;
      const endIndex = Math.min(startIndex + this.membersPerSlide, this.totalMembers);

      for (let memberIndex = startIndex; memberIndex < endIndex; memberIndex++) {
        const member = this.teamMembers[memberIndex];
        if (member) {
          // Clone the member and add to slide
          const clonedMember = member.cloneNode(true);
          clonedMember.style.display = 'block';
          clonedMember.style.flex = '1';
          clonedMember.style.maxWidth = '300px';
          clonedMember.style.opacity = '1';
          clonedMember.style.visibility = 'visible';
          // Ensure images in cloned member are visible
          const clonedImages = clonedMember.querySelectorAll('img');
          clonedImages.forEach(img => {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
          });
          slide.appendChild(clonedMember);
        }
      }

      this.carousel.appendChild(slide);
    }

    // Update references
    this.carouselSlides = document.querySelectorAll('.carousel-slide');
  }

  bindEvents() {
    // Navigation buttons
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.previousSlide());
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.nextSlide());
    }

    // Meet the rest button
    if (this.meetRestButton) {
      this.meetRestButton.addEventListener('click', () => this.showAllMembers());
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => this.handleKeydown(e));
  }

  initAnimations() {
    if (!this.team) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateTeamMembers();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(this.team);
  }

  animateTeamMembers() {
    const visibleMembers =
      this.carouselSlides[this.currentIndex]?.querySelectorAll('.team-member') || [];
    visibleMembers.forEach((member, index) => {
      // Ensure member is visible immediately
      member.style.opacity = '1';
      member.style.visibility = 'visible';
      member.style.transform = 'translateY(0)';
      // Ensure images are visible
      const images = member.querySelectorAll('img');
      images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
      });
      setTimeout(() => {
        member.classList.add('animate');
      }, index * 100);
    });
  }

  nextSlide() {
    if (this.isAnimating) {
      return;
    }

    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }

  previousSlide() {
    if (this.isAnimating) {
      return;
    }

    this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) {
      return;
    }

    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    if (!this.carousel) {
      return;
    }

    this.isAnimating = true;

    const translateX = -(this.currentIndex * 100);
    this.carousel.style.transform = `translateX(${translateX}%)`;

    // Update button states
    this.updateButtonStates();

    // Animate current slide members
    this.animateTeamMembers();

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  updateButtonStates() {
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
      this.prevButton.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
    }

    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex === this.totalSlides - 1;
      this.nextButton.style.opacity = this.currentIndex === this.totalSlides - 1 ? '0.5' : '1';
    }
  }

  showAllMembers() {
    // Show all members in a grid layout
    this.teamMembers.forEach(member => {
      member.style.display = 'block';
    });

    // Hide navigation buttons
    if (this.prevButton) {
      this.prevButton.style.display = 'none';
    }
    if (this.nextButton) {
      this.nextButton.style.display = 'none';
    }
    if (this.meetRestButton) {
      this.meetRestButton.style.display = 'none';
    }

    // Update grid layout for all members
    if (this.carousel) {
      this.carousel.style.display = 'grid';
      this.carousel.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
      this.carousel.style.gap = '2rem';
      this.carousel.style.transform = 'none';
    }
  }

  handleKeydown(e) {
    if (e.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (e.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  destroy() {
    // Remove event listeners
    if (this.prevButton) {
      this.prevButton.removeEventListener('click', this.previousSlide);
    }

    if (this.nextButton) {
      this.nextButton.removeEventListener('click', this.nextSlide);
    }

    if (this.meetRestButton) {
      this.meetRestButton.removeEventListener('click', this.showAllMembers);
    }

    document.removeEventListener('keydown', this.handleKeydown);

    // Reset styles
    if (this.carousel) {
      this.carousel.style.transform = '';
      this.carousel.style.display = '';
      this.carousel.style.gridTemplateColumns = '';
      this.carousel.style.gap = '';
    }
  }
}
