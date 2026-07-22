/* ========================================
   CONTACT COMPONENT
   ======================================== */

export class Contact {
  constructor() {
    this.contact = document.getElementById('contact');
    this.contactForm = document.getElementById('contactForm');
    this.formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    this.submitButton = document.querySelector('.contact-form button[type="submit"]');
    this.whatsappButton = document.querySelector('.btn-whatsapp');
    this.toast = document.getElementById('toast');

    this.init();
  }

  init() {
    this.bindEvents();
    this.initFormValidation();
    this.initPhoneMask();
  }

  bindEvents() {
    // Form submission
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', e => this.handleFormSubmit(e));
    }

    // Real-time validation
    this.formInputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // WhatsApp button
    if (this.whatsappButton) {
      this.whatsappButton.addEventListener('click', e => this.handleWhatsAppClick(e));
    }

    // Toast close
    const toastClose = document.querySelector('.toast-close');
    if (toastClose) {
      toastClose.addEventListener('click', () => this.hideToast());
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', e => this.handleKeydown(e));
  }

  initFormValidation() {
    // Set up form validation attributes
    this.formInputs.forEach(input => {
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
      }
    });
  }

  initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) {
      return;
    }

    phoneInput.addEventListener('input', e => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length >= 10) {
        value = value.substring(0, 10);
        value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
      } else if (value.length >= 6) {
        value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
      } else if (value.length >= 3) {
        value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.focusFirstError();
      return;
    }

    const formData = this.getFormData();
    this.sendContact(formData);
  }

  validateForm() {
    let isValid = true;

    this.formInputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    const isRequired = input.hasAttribute('required');

    // Clear previous errors
    this.clearFieldError(input);

    // Required field validation
    if (isRequired && !value) {
      this.showFieldError(input, `${this.getFieldLabel(input)} is required`);
      return false;
    }

    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(input, 'Please enter a valid email address');
        return false;
      }
    }

    // Phone validation
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        this.showFieldError(input, 'Please enter a valid phone number');
        return false;
      }
    }

    // Description validation — solo máximo, sin mínimo
    if (fieldName === 'description' && value) {
      const maxLength = parseInt(input.getAttribute('maxlength')) || 1000;

      if (value.length > maxLength) {
        this.showFieldError(input, `Description must be no more than ${maxLength} characters`);
        return false;
      }
    }

    return true;
  }

  showFieldError(input, message) {
    input.setAttribute('aria-invalid', 'true');

    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  clearFieldError(input) {
    input.setAttribute('aria-invalid', 'false');

    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
  }

  getFieldLabel(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : input.name;
  }

  focusFirstError() {
    const firstError = document.querySelector('[aria-invalid="true"]');
    if (firstError) {
      firstError.focus();
    }
  }

  getFormData() {
    const formData = new FormData(this.contactForm);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    return data;
  }

  async sendContact(payload) {
    try {
      // Show loading state
      this.setLoadingState(true);

      // Create mailto URL
      const mailtoUrl = this.createMailtoUrl(payload);

      // Open email client
      window.location.href = mailtoUrl;

      // Show success message
      this.showToast('Your email app will open to send the request.');

      // Reset form
      this.contactForm.reset();
    } catch (error) {
      console.error('Error sending contact:', error);
      this.showToast('There was an error sending your message. Please try again.');
    } finally {
      this.setLoadingState(false);
    }
  }

  createMailtoUrl(data) {
    const subject = 'New project inquiry — Antoni';
    const body = `
Project Inquiry Details:

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Description:
${data.description}

---
This message was sent from the Antoni website contact form.
    `.trim();

    const params = new URLSearchParams({
      subject,
      body
    });

    return `mailto:info@grupoantoni.com?${params.toString()}`;
  }

  setLoadingState(isLoading) {
    if (this.submitButton) {
      this.submitButton.disabled = isLoading;
      this.submitButton.textContent = isLoading ? 'Sending...' : 'Send Message';
    }

    this.formInputs.forEach(input => {
      input.disabled = isLoading;
    });
  }

  showToast(message) {
    if (!this.toast) {
      return;
    }

    const messageElement = this.toast.querySelector('.toast-message');
    if (messageElement) {
      messageElement.textContent = message;
    }

    this.toast.classList.add('show');

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    if (this.toast) {
      this.toast.classList.remove('show');
    }
  }

  handleWhatsAppClick(_e) {
    // Track WhatsApp click
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'contact',
        event_label: 'whatsapp'
      });
    }
  }

  handleKeydown(e) {
    // Handle form keyboard navigation
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      this.handleFormSubmit(e);
    }
  }

  /**
   * Update form field value
   */
  updateField(fieldName, value) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.value = value;
      this.validateField(field);
    }
  }

  /**
   * Clear all form fields
   */
  clearForm() {
    this.contactForm.reset();
    this.formInputs.forEach(input => {
      this.clearFieldError(input);
    });
  }

  /**
   * Set form data
   */
  setFormData(data) {
    Object.keys(data).forEach(key => {
      this.updateField(key, data[key]);
    });
  }

  /**
   * Get form validation state
   */
  getValidationState() {
    const state = {};
    this.formInputs.forEach(input => {
      state[input.name] = {
        isValid: input.getAttribute('aria-invalid') !== 'true',
        value: input.value.trim(),
        hasError: input.getAttribute('aria-invalid') === 'true'
      };
    });
    return state;
  }

  destroy() {
    // Remove event listeners
    if (this.contactForm) {
      this.contactForm.removeEventListener('submit', this.handleFormSubmit);
    }

    this.formInputs.forEach(input => {
      input.removeEventListener('blur', this.validateField);
      input.removeEventListener('input', this.clearFieldError);
    });

    if (this.whatsappButton) {
      this.whatsappButton.removeEventListener('click', this.handleWhatsAppClick);
    }

    const toastClose = document.querySelector('.toast-close');
    if (toastClose) {
      toastClose.removeEventListener('click', this.hideToast);
    }

    document.removeEventListener('keydown', this.handleKeydown);

    // Reset form
    this.clearForm();
  }
}
