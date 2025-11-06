/**
 * Internationalization (i18n) System
 * Handles language switching between English and Spanish
 */

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      projects: 'PROJECTS',
      team: 'TEAM',
      brand: 'OUR BRAND',
      contact: 'CONTACT',
      residential: 'Residential',
      commercial: 'Commercial',
      tourism: 'Tourism',
      urban: 'Urban'
    },
    // Hero Section
    hero: {
      title: 'Spaces with purpose,<br>designed to inspire.',
      ctaText: 'Ready to take the first step?',
      ctaButton: 'Get Started'
    },
    // About Section
    about: {
      title: 'What <span class="about-title-highlight">defines</span> us.',
      subtitle: 'A firm mission, a clear vision, solid values.',
      mission: {
        title: 'Mission',
        text: "We are a company specialized in design and construction, committed to delivering innovative, bespoke solutions that combine creativity, functionality, and efficiency. We focus on understanding our clients' needs to ensure high-quality results and excellence in every project."
      },
      vision: {
        title: 'Vision',
        text: 'We aim to become a benchmark in our industry, driving national development with innovative and viable solutions in the regional, urban, and architectural fields, while upholding high standards of professionalism, respecting the environment, and fostering the continuous growth of our team members.'
      },
      values: {
        title: 'Values',
        items: [
          'Integrity',
          'Excellence',
          'Flexibility',
          'Growth',
          'Perseverance',
          'Financial Viability',
          'Social Responsibility'
        ]
      }
    },
    // Quote Section
    quote: {
      text: '"Architecture should speak of its time and place,<br />yet strive for timelessness."',
      author: '— Frank Gehry'
    },
    // Projects Section
    projects: {
      title: 'Our <span class="projects-title-highlight">projects.</span>',
      subtitle: 'A selection of works that reflect our experience and commitment.',
      romanaCondos: {
        name: 'Romana Condos',
        location: 'Location — La Romana, Dominican Republic',
        description:
          'Residential development in La Romana featuring three modern buildings ranging from 70 m² to 95 m², with one- and two-bedroom apartments (four per floor), surrounded by gardens, a central park, swimming pool, walking paths, and recreational areas.',
        link: 'Learn more →'
      },
      mountainBungalows: {
        name: 'Mountain Bungalows',
        location: 'Location — San José de Ocoa, Dominican Republic',
        description:
          'A set of villas for AirBnb in the Tatón mountains with spectacular views of the San José de Ocoa Valley — a private client project.',
        link: 'Learn more →'
      }
    },
    // Team Section
    team: {
      title: 'Our team, <span class="highlight">strength.</span>',
      tagline:
        'We have highly trained professionals committed to delivering efficient solutions and excellent results in every project.',
      prevButton: 'Previous team member',
      nextButton: 'Next team member',
      members: {
        miguel: {
          name: 'Miguel Saviñón Antoni,',
          title: 'CEO, Intl Assoc. AIA, Senior Architect',
          bio: '40 years of professional experience in projects of diverse typologies, including educational, healthcare, residential, commercial, and recreational. Currently pursuing an MBA in International Relations & Diplomacy in the United Kingdom.'
        },
        rafael: {
          name: 'Rafael Martinez Solimán,',
          title: 'MS, Construction Manager',
          bio: '25 years of professional experience in heavy construction (roads, ports, dams) and mid- to high-rise buildings (6 to 20 floors), with expertise in design, budgeting, planning, and construction.'
        },
        zoraida: {
          name: 'Zoraida Álvarez de la Cruz,',
          title: 'MS, Senior Architect',
          bio: 'Senior architect with extensive experience in design and project management, ensuring seamless execution and delivery of complex construction projects with attention to detail and quality.'
        },
        frankelys: {
          name: 'Frankelys Pérez de los Santos,',
          title: 'CPA, Head of Accounting',
          bio: 'Financial specialist ensuring accurate accounting practices and financial management for all construction projects and company operations.'
        },
        edwin: {
          name: 'Edwin Cadena Barranco,',
          title: 'MS, Structural Engineer',
          bio: 'Structural engineer with extensive experience in building design and construction, ensuring safety and structural integrity in all projects.'
        },
        christopher: {
          name: 'Christopher Sánchez Báez,',
          title: 'Project Architect',
          bio: 'Licensed architect with 5 years of experience in the design and supervision of projects of a variety of building types. Currently pursuing a MS in Construction Administration.'
        }
      }
    },
    // Brand Section
    brand: {
      title: 'Our <span class="brand-title-highlight">brands.</span>'
    },
    // Contact Section
    contact: {
      title: 'Ready to take <span class="contact-title-highlight">the first step?</span>',
      subtitle:
        'Fill out the form and our team will get in touch to guide you through your project. You can also schedule a direct consultation or contact us via WhatsApp.',
      form: {
        fullName: 'Full name',
        email: 'Email',
        phone: 'Phone number (optional)',
        phonePlaceholder: '+_ (___) ___-____',
        phoneHelp: "Optional - We'll use this to contact you directly",
        description: 'Brief description',
        descriptionPlaceholder: 'Add a more detailed description or comments...',
        descriptionHelp: '280-1000 characters',
        submit: 'Send Message',
        whatsapp: 'Chat on WhatsApp'
      }
    },
    // Footer
    footer: {
      readyToMeet: 'Ready to Meet?',
      phone: 'Phone:',
      email: 'Email:',
      hours: 'Hours:',
      hoursValue: 'Monday to Friday, 9:00am – 6:00pm',
      address: 'Address',
      navigation: 'Navigation',
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      copyright: '© 2025 Antoni Group – All rights reserved',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      quote: '"Architecture should speak of its time and place, but yearn for timelessness."',
      quoteAuthor: '— Frank Gehry'
    },
    // Social Media
    social: {
      comingSoon: "We're working on this!",
      stayTuned: 'Stay tuned for updates.'
    }
  },
  es: {
    // Navigation
    nav: {
      home: 'INICIO',
      about: 'NOSOTROS',
      projects: 'PROYECTOS',
      team: 'EQUIPO',
      brand: 'NUESTRA MARCA',
      contact: 'CONTACTO',
      residential: 'Residencial',
      commercial: 'Comercial',
      tourism: 'Turismo',
      urban: 'Urbano'
    },
    // Hero Section
    hero: {
      title: 'Espacios con propósito,<br>diseñados para inspirar.',
      ctaText: '¿Listo para dar el primer paso?',
      ctaButton: 'Comenzar'
    },
    // About Section
    about: {
      title: 'Lo que nos <span class="about-title-highlight">define</span>.',
      subtitle: 'Una misión firme, una visión clara, valores sólidos.',
      mission: {
        title: 'Misión',
        text: 'Somos una empresa especializada en diseño y construcción, comprometida con entregar soluciones innovadoras y personalizadas que combinan creatividad, funcionalidad y eficiencia. Nos enfocamos en entender las necesidades de nuestros clientes para garantizar resultados de alta calidad y excelencia en cada proyecto.'
      },
      vision: {
        title: 'Visión',
        text: 'Buscamos convertirnos en un referente en nuestra industria, impulsando el desarrollo nacional con soluciones innovadoras y viables en los campos regional, urbano y arquitectónico, manteniendo altos estándares de profesionalismo, respetando el medio ambiente y fomentando el crecimiento continuo de los miembros de nuestro equipo.'
      },
      values: {
        title: 'Valores',
        items: [
          'Integridad',
          'Excelencia',
          'Flexibilidad',
          'Crecimiento',
          'Perseverancia',
          'Viabilidad Financiera',
          'Responsabilidad Social'
        ]
      }
    },
    // Quote Section
    quote: {
      text: '"La arquitectura debe hablar de su tiempo y lugar,<br />pero anhelar la atemporalidad."',
      author: '— Frank Gehry'
    },
    // Projects Section
    projects: {
      title: 'Nuestros <span class="projects-title-highlight">proyectos.</span>',
      subtitle: 'Una selección de obras que reflejan nuestra experiencia y compromiso.',
      romanaCondos: {
        name: 'Condominios Romana',
        location: 'Ubicación — La Romana, República Dominicana',
        description:
          'Desarrollo residencial en La Romana con tres edificios modernos que van desde 70 m² hasta 95 m², con apartamentos de uno y dos dormitorios (cuatro por piso), rodeados de jardines, un parque central, piscina, senderos peatonales y áreas recreativas.',
        link: 'Saber más →'
      },
      mountainBungalows: {
        name: 'Bungalows de Montaña',
        location: 'Ubicación — San José de Ocoa, República Dominicana',
        description:
          'Un conjunto de villas para AirBnb en las montañas de Tatón con vistas espectaculares del Valle de San José de Ocoa — un proyecto de cliente privado.',
        link: 'Saber más →'
      }
    },
    // Team Section
    team: {
      title: 'Nuestro equipo, <span class="highlight">fortaleza.</span>',
      tagline:
        'Contamos con profesionales altamente capacitados comprometidos con entregar soluciones eficientes y resultados excelentes en cada proyecto.',
      prevButton: 'Miembro anterior del equipo',
      nextButton: 'Siguiente miembro del equipo',
      members: {
        miguel: {
          name: 'Miguel Saviñón Antoni,',
          title: 'CEO, Intl Assoc. AIA, Arquitecto Senior',
          bio: '40 años de experiencia profesional en proyectos de diversas tipologías, incluyendo educativos, de salud, residenciales, comerciales y recreativos. Actualmente cursando un MBA en Relaciones Internacionales y Diplomacia en el Reino Unido.'
        },
        rafael: {
          name: 'Rafael Martínez Solimán,',
          title: 'MS, Gerente de Construcción',
          bio: '25 años de experiencia profesional en construcción pesada (carreteras, puertos, presas) y edificios de mediana a gran altura (6 a 20 pisos), con experiencia en diseño, presupuesto, planificación y construcción.'
        },
        zoraida: {
          name: 'Zoraida Álvarez de la Cruz,',
          title: 'MS, Arquitecta Senior',
          bio: 'Arquitecta senior con amplia experiencia en diseño y gestión de proyectos, asegurando la ejecución y entrega sin problemas de proyectos de construcción complejos con atención al detalle y la calidad.'
        },
        frankelys: {
          name: 'Frankelys Pérez de los Santos,',
          title: 'CPA, Jefe de Contabilidad',
          bio: 'Especialista financiero que asegura prácticas contables precisas y gestión financiera para todos los proyectos de construcción y operaciones de la empresa.'
        },
        edwin: {
          name: 'Edwin Cadena Barranco,',
          title: 'MS, Ingeniero Estructural',
          bio: 'Ingeniero estructural con amplia experiencia en diseño y construcción de edificios, asegurando la seguridad y la integridad estructural en todos los proyectos.'
        },
        christopher: {
          name: 'Christopher Sánchez Báez,',
          title: 'Arquitecto de Proyectos',
          bio: 'Arquitecto licenciado con 5 años de experiencia en el diseño y supervisión de proyectos de diversos tipos de edificaciones. Actualmente cursando una Maestría en Administración de Construcción.'
        }
      }
    },
    // Brand Section
    brand: {
      title: 'Nuestras <span class="brand-title-highlight">marcas.</span>'
    },
    // Contact Section
    contact: {
      title: '¿Listo para dar <span class="contact-title-highlight">el primer paso?</span>',
      subtitle:
        'Complete el formulario y nuestro equipo se pondrá en contacto para guiarlo en su proyecto. También puede programar una consulta directa o contactarnos vía WhatsApp.',
      form: {
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Número de teléfono (opcional)',
        phonePlaceholder: '+_ (___) ___-____',
        phoneHelp: 'Opcional - Lo usaremos para contactarlo directamente',
        description: 'Breve descripción',
        descriptionPlaceholder: 'Agregue una descripción más detallada o comentarios...',
        descriptionHelp: '280-1000 caracteres',
        submit: 'Enviar Mensaje',
        whatsapp: 'Chatear por WhatsApp'
      }
    },
    // Footer
    footer: {
      readyToMeet: '¿Listo para conocernos?',
      phone: 'Teléfono:',
      email: 'Correo:',
      hours: 'Horario:',
      hoursValue: 'Lunes a viernes, 9:00am – 6:00pm',
      address: 'Dirección',
      navigation: 'Navegación',
      home: 'Inicio',
      about: 'Nosotros',
      projects: 'Proyectos',
      contact: 'Contacto',
      copyright: '© 2025 Grupo Antoni – Todos los derechos reservados',
      terms: 'Términos de Servicio',
      privacy: 'Política de Privacidad',
      quote: '"La arquitectura debe hablar de su tiempo y lugar, pero anhelar la atemporalidad."',
      quoteAuthor: '— Frank Gehry'
    },
    // Social Media
    social: {
      comingSoon: '¡Estamos trabajando en esto!',
      stayTuned: 'Mantente al tanto de las actualizaciones.'
    }
  }
};

export class I18n {
  constructor() {
    this.currentLang = this.getStoredLanguage() || this.detectLanguage();
    this.translations = translations;
    this.observers = [];
  }

  /**
   * Initialize i18n system
   */
  init() {
    this.setLanguage(this.currentLang);
    this.updateDocumentLanguage();
  }

  /**
   * Detect user's preferred language
   */
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    return 'en';
  }

  /**
   * Get stored language from localStorage
   */
  getStoredLanguage() {
    return localStorage.getItem('preferred-language');
  }

  /**
   * Store language preference
   */
  storeLanguage(lang) {
    localStorage.setItem('preferred-language', lang);
  }

  /**
   * Set current language
   */
  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language ${lang} not available, falling back to English`);
      lang = 'en';
    }
    this.currentLang = lang;
    this.storeLanguage(lang);
    this.updateDocumentLanguage();
    this.translatePage();
    this.notifyObservers();
  }

  /**
   * Update HTML lang attribute
   */
  updateDocumentLanguage() {
    document.documentElement.lang = this.currentLang;
  }

  /**
   * Get translation for a key path
   */
  t(keyPath) {
    const keys = keyPath.split('.');
    let value = this.translations[this.currentLang];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key "${keyPath}" not found for language "${this.currentLang}"`);
        return keyPath;
      }
    }

    return typeof value === 'string' ? value : keyPath;
  }

  /**
   * Translate the entire page
   */
  translatePage() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.type === 'submit' || element.type === 'button') {
          element.value = translation;
        } else {
          element.placeholder = translation;
        }
      } else {
        element.textContent = translation;
      }
    });

    // Translate placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      element.placeholder = translation;
    });

    // Translate elements with data-i18n-html attribute (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = this.t(key);
      element.innerHTML = translation;
    });

    // Translate elements with data-i18n-values attribute (for arrays)
    document.querySelectorAll('[data-i18n-values]').forEach(element => {
      const key = element.getAttribute('data-i18n-values');
      const values = this.t(key);
      if (Array.isArray(values)) {
        const items = element.querySelectorAll('.value-item');
        items.forEach((item, index) => {
          if (values[index]) {
            item.textContent = values[index];
          }
        });
      }
    });

    // Update language switch active state
    document.querySelectorAll('[data-i18n-lang]').forEach(element => {
      const lang = element.getAttribute('data-i18n-lang');
      if (lang === this.currentLang) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  /**
   * Subscribe to language change events
   */
  subscribe(callback) {
    this.observers.push(callback);
  }

  /**
   * Notify all observers of language change
   */
  notifyObservers() {
    this.observers.forEach(callback => callback(this.currentLang));
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLang;
  }

  /**
   * Toggle between languages
   */
  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
    return newLang;
  }
}

// Export singleton instance
export const i18n = new I18n();
