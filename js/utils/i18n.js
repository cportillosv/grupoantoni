/**
 * Internationalization (i18n) System
 * Handles language switching between English and Spanish
 */

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'HOME',
      about: 'ABOUT US',
      projects: 'PROJECTS',
      team: 'TEAM',
      brand: 'OUR BRAND',
      contact: 'CONTACT',
      residential: 'Residencial',
      vivienda: 'Vivienda',
      tourism: 'Turismo',
      hospitalario: 'Hospitalario',
      maharishiVastu: 'Maharishi Vastu'
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
      about: 'About Us',
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
    },
    // Project Pages
    projectPages: {
      residential: {
        title:
          'Residential <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Creating homes that reflect lifestyle, comfort, and modern architectural excellence. Our residential projects combine innovative design with functional living spaces.',
        backToProjects: 'Back to Projects →'
      },
      commercial: {
        title:
          'Commercial <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Designing and constructing commercial spaces that drive business success. Our commercial projects combine functionality, aesthetics, and efficiency to create environments that inspire productivity and growth.',
        comingSoon:
          'We are currently developing new commercial projects. Our expertise includes office buildings, retail spaces, and mixed-use developments.',
        backToProjects: 'Back to Projects →'
      },
      tourism: {
        title:
          'Tourism <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Creating exceptional tourism experiences through innovative architecture. Our tourism projects blend natural beauty with sustainable design to create memorable destinations.',
        backToProjects: 'Back to Projects →'
      },
      urban: {
        title:
          'Urban <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Shaping cities through innovative urban planning and architecture. Our urban projects focus on sustainable development, community integration, and creating vibrant, livable spaces.',
        comingSoon:
          'We are currently developing new urban projects. Our expertise includes urban planning, infrastructure development, and sustainable city design.',
        backToProjects: 'Back to Projects →'
      },
      vivienda: {
        title:
          'Vivienda <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Designing private homes that reflect personal style and lifestyle. Our residential projects combine functionality, comfort, and architectural excellence.',
        backToProjects: 'Back to Projects →',
        projects: {
          casaElvira: {
            name: 'Casa Elvira Santos',
            location: 'San José de Ocoa, Dominican Republic',
            area: '335.88 m²',
            description:
              'This project is a two-level home with 335.88 m², designed to offer functionality and flow. On the first level, the living room and dining room integrate with a contemporary kitchen. The second level features four bedrooms, balconies, and terraces for connection with the environment. Additionally, it includes a covered marquee, strategic bathrooms, and other elements that guarantee comfort and aesthetics.'
          },
          antoniVilla: {
            name: 'Antoni Villa San Juan',
            location: 'Rio San Juan, Dominican Republic',
            area: '222.0 m²',
            description:
              'Modern two-level villa with contemporary tropical architectural design. Its first level presents an open plan that integrates living room, dining room, and kitchen with large windows that connect to the exterior and bedrooms with shared bathroom. The second level features a master suite and large exterior terrace with BBQ area. It combines warm materials such as wood and stone, with clean lines and open terraces that maximize natural light and the interior-exterior relationship.'
          },
          villaLaCosta: {
            name: 'Villa La Costa',
            location: 'Rio San Juan, Dominican Republic',
            area: '568.0 m²',
            description:
              'Private villa located in Río San Juan, with impressive sea views and a contemporary design with clean lines and overlapping volumes. Its architecture combines concrete, wood, and glass, generating a fluid connection between interior and exterior. The large windows and panoramic terraces maximize natural light and the coastal landscape, offering an environment of luxury, comfort, and harmony with nature.'
          }
        }
      },
      hospitalario: {
        title:
          'Hospitalario <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Healthcare architecture focused on functionality, patient comfort, and medical efficiency. Our hospital projects integrate modern design with specialized healthcare needs.',
        backToProjects: 'Back to Projects →',
        projects: {
          centroCirugia: {
            name: 'Centro de Cirugía EGS - Facade Remodelation',
            location: 'Gazcue, Santo Domingo, Dominican Republic',
            area: 'N/A',
            description:
              'This remodeling consists of the revitalization of the facade of this surgery center in order to give it a more contemporary image that matches the prestige that this center has acquired over time.'
          }
        }
      },
      maharishiVastu: {
        title:
          'Maharishi Vastu <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Projects</span>',
        subtitle:
          'Architecture inspired by Vastu Shastra principles, seeking balance between energy, nature, and well-being. Our Vastu projects integrate ancient wisdom with modern comfort.',
        backToProjects: 'Back to Projects →',
        projects: {
          vastuShastra: {
            name: 'Vastu Shastra',
            location: 'N/A',
            area: 'N/A',
            description:
              'Vastu is inspired by the principles of Vastu Shastra architecture, seeking balance between energy, nature, and well-being. Its orientation takes advantage of sunlight and cross ventilation, promoting interior harmony. The symmetrical design and elevated ceiling symbolize spiritual connection and positive circulation of prana. Natural materials and integration with the tropical environment reinforce its essence: a home that unites modern comfort with ancestral wisdom.'
          }
        }
      }
    },
    // Individual Projects
    projectDetails: {
      residential: {
        antoniResidences: {
          name: 'Antoni Residences',
          location: 'La Romana, Dominican Republic',
          area: '540 m²',
          description:
            'This residential complex presents a contemporary design with materials such as wood, concrete, and glass. It is an apartment complex, integrated into the natural environment, offering privacy, natural light, and cross ventilation. Each apartment features spacious areas, balconies, and exterior areas, creating an exclusive and welcoming environment, ideal for those seeking comfort. Includes recreational spaces for all types of families and a common social area with pool.'
        },
        remodelacionFachada: {
          name: 'Private Residential Facade Remodelation',
          location: 'Samaná, Dominican Republic',
          area: 'N/A',
          description:
            'This project features contemporary tropical design that integrates natural materials such as bamboo, wood, and coral stone. It stands out for its pergolas, terraces, and large windows that connect interior and exterior. Tropical gardens and palm trees surround the home, providing freshness and harmony. Its modern and sustainable style creates an elegant environment, ideal for enjoying the Caribbean climate with comfort and connection with nature.'
        },
        luzDelTropico: {
          name: 'Residencial Vertical "Luz del Trópico"',
          location: 'Boca Chica, Dominican Republic',
          area: '350 m²',
          description:
            'Located in an urban area with warm climate, the Luz del Trópico residence combines modern elegance and spatial efficiency. Its vertical three-level volumetry is distinguished by clean lines, large windows, and lattices that regulate natural light. The facade mixes neutral tones with contemporary textures, highlighting the balance between aesthetics and functionality. Gardens and green parking reinforce its sustainable approach, integrating harmoniously with the tropical environment.'
        },
        torreSelvaUrbana1: {
          name: 'Torre Selva Urbana',
          location: 'N/A',
          area: 'N/A',
          description:
            'Torre Selva Urbana is a contemporary residential building that fuses elegance and sustainability. Its glass and concrete facade is balanced with vertical green walls that integrate nature into the urban environment. The large windows allow natural lighting and panoramic views, while noble materials and tropical landscaping create a modern, ecological, and sophisticated atmosphere.'
        },
        torreSelvaUrbana2: {
          name: 'Torre Selva Urbana',
          location: 'Rio San Juan, Dominican Republic',
          area: 'N/A',
          description:
            'They fuse the warmth of natural materials with the modern elegance of glass and concrete. Their open and tropical design prioritizes connection with the environment, integrating large terraces, panoramic windows, and elevated gardens. Wood provides texture and harmony, while glass frames the natural views, creating a contemporary and luminous environment.'
        },
        loftsAntoni: {
          name: 'Lofts Antoni',
          location: 'Juan Dolio, Dominican Republic',
          area: '54-120 m²',
          description:
            "Set of two-level lofts in a private complex, designed for families seeking a second home near the city. They feature modern architecture, with clean lines, large windows, and terraces that favor interior-exterior integration. The project is located in a prestigious area with nearby beaches and offers common social areas with pool, BBQ, and children's area."
        }
      },
      tourism: {
        bungalowMontana: {
          name: 'Mountain Bungalow',
          location: 'San José de Ocoa, Dominican Republic',
          area: '64-150 m²',
          description:
            'Accommodations in the San José de Ocoa valley with 3 types of bungalows (64-150 m²). They include living room, kitchen, dining room, balcony with jacuzzi, bedrooms, laundry area, private parking, and elevated water tank. Also features an administrative unit. Designed with two-slope roofs and materials that integrate with nature, they offer beautiful views of the valley landscape. The project also includes an administrative unit for its management and maintenance.'
        }
      }
    }
  },
  es: {
    // Navigation
    nav: {
      home: 'INICIO',
      about: 'NOSOTROS',
      projects: 'PROYECTOS',
      team: 'EQUIPO',
      brand: 'NUESTRAS MARCAS',
      contact: 'CONTACTO',
      residential: 'Residencial',
      vivienda: 'Vivienda',
      tourism: 'Turismo',
      hospitalario: 'Hospitalario',
      maharishiVastu: 'Maharishi Vastu'
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
    },
    // Project Pages
    projectPages: {
      residential: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Residenciales</span>',
        subtitle:
          'Creando hogares que reflejan estilo de vida, comodidad y excelencia arquitectónica moderna. Nuestros proyectos residenciales combinan diseño innovador con espacios de vida funcionales.',
        backToProjects: 'Volver a Proyectos →'
      },
      commercial: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Comerciales</span>',
        subtitle:
          'Diseñando y construyendo espacios comerciales que impulsan el éxito empresarial. Nuestros proyectos comerciales combinan funcionalidad, estética y eficiencia para crear entornos que inspiran productividad y crecimiento.',
        comingSoon:
          'Actualmente estamos desarrollando nuevos proyectos comerciales. Nuestra experiencia incluye edificios de oficinas, espacios comerciales y desarrollos de uso mixto.',
        backToProjects: 'Volver a Proyectos →'
      },
      tourism: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Turísticos</span>',
        subtitle:
          'Creando experiencias turísticas excepcionales a través de arquitectura innovadora. Nuestros proyectos turísticos combinan belleza natural con diseño sostenible para crear destinos memorables.',
        backToProjects: 'Volver a Proyectos →'
      },
      urban: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Urbanos</span>',
        subtitle:
          'Moldeando ciudades a través de planificación urbana e innovación arquitectónica. Nuestros proyectos urbanos se enfocan en desarrollo sostenible, integración comunitaria y creación de espacios vibrantes y habitables.',
        comingSoon:
          'Actualmente estamos desarrollando nuevos proyectos urbanos. Nuestra experiencia incluye planificación urbana, desarrollo de infraestructura y diseño de ciudades sostenibles.',
        backToProjects: 'Volver a Proyectos →'
      },
      vivienda: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Vivienda</span>',
        subtitle:
          'Diseñando hogares privados que reflejan estilo personal y estilo de vida. Nuestros proyectos de vivienda combinan funcionalidad, comodidad y excelencia arquitectónica.',
        backToProjects: 'Volver a Proyectos →',
        projects: {
          casaElvira: {
            name: 'Casa Elvira Santos',
            location: 'San José de Ocoa, República Dominicana',
            area: '335.88 m²',
            description:
              'Este proyecto es una vivienda de dos niveles con 335.88 m², diseñada para ofrecer funcionalidad y fluidez. En el primer nivel, la sala y el comedor se integran con una cocina contemporánea. El segundo nivel cuenta con cuatro dormitorios, balcones y terrazas para conexión con el entorno. Además, incluye marquesina techada, baños estratégicos y otros elementos que garantizan comodidad y estética.'
          },
          antoniVilla: {
            name: 'Antoni Villa San Juan',
            location: 'Rio San Juan, República Dominicana',
            area: '222.0 m²',
            description:
              'Villa moderna de dos niveles con diseño arquitectónico tropical contemporáneo. Su primer nivel presenta una planta libre que integra sala, comedor y cocina con amplios ventanales que conectan al exterior y dormitorios con baño compartido. El segundo nivel cuenta con una master suite y terraza exterior amplia con área de bbq. Combina materiales cálidos como madera y piedra, con líneas limpias y terrazas abiertas que maximizan la luz natural y la relación interior-exterior.'
          },
          villaLaCosta: {
            name: 'Villa La Costa',
            location: 'Rio San Juan, República Dominicana',
            area: '568.0 m²',
            description:
              'Villa privada ubicada en Río San Juan, con impresionantes vistas al mar y un diseño contemporáneo de líneas limpias y volúmenes superpuestos. Su arquitectura combina concreto, madera y vidrio, generando una conexión fluida entre interior y exterior. Los amplios ventanales y terrazas panorámicas aprovechan al máximo la luz natural y el paisaje costero, ofreciendo un ambiente de lujo, confort y armonía con la naturaleza.'
          }
        }
      },
      hospitalario: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Hospitalarios</span>',
        subtitle:
          'Arquitectura de salud enfocada en funcionalidad, comodidad del paciente y eficiencia médica. Nuestros proyectos hospitalarios integran diseño moderno con necesidades especializadas de atención médica.',
        backToProjects: 'Volver a Proyectos →',
        projects: {
          centroCirugia: {
            name: 'Centro de Cirugía EGS - Remodelación de Fachada',
            location: 'Gazcue, Santo Domingo, República Dominicana',
            area: 'N/A',
            description:
              'Esta remodelación consiste en la revitalización de la fachada de este centro de cirugía con el fin de brindarle una imagen más contemporánea que vaya acorde al prestigio que este centro ha adquirido con el paso del tiempo.'
          }
        }
      },
      maharishiVastu: {
        title:
          'Proyectos <span style="color: #4f8ce3; font-style: italic; font-weight: 600;">Maharishi Vastu</span>',
        subtitle:
          'Arquitectura inspirada en los principios de Vastu Shastra, buscando equilibrio entre energía, naturaleza y bienestar. Nuestros proyectos Vastu integran sabiduría ancestral con confort moderno.',
        backToProjects: 'Volver a Proyectos →',
        projects: {
          vastuShastra: {
            name: 'Vastu Shastra',
            location: 'N/A',
            area: 'N/A',
            description:
              'Vastu se inspira en los principios de la arquitectura Vastu Shastra, buscando equilibrio entre energía, naturaleza y bienestar. Su orientación aprovecha la luz solar y la ventilación cruzada, promoviendo armonía interior. El diseño simétrico y el techo elevado simbolizan conexión espiritual y circulación positiva del prana. Los materiales naturales y la integración con el entorno tropical refuerzan su esencia: una vivienda que une confort moderno con sabiduría ancestral.'
          }
        }
      }
    },
    // Proyectos Individuales
    projectDetails: {
      residential: {
        antoniResidences: {
          name: 'Antoni Residences',
          location: 'La Romana, República Dominicana',
          area: '540 m²',
          description:
            'Este conjunto residencial presenta un diseño contemporáneo con materiales como madera, concreto y vidrio. Es un complejo de apartamentos, integradas al entorno natural, ofrecen privacidad, luz natural y ventilación cruzada. Cada apartamento cuenta con espacios amplios, balcones y áreas exteriores, creando un ambiente exclusivo y acogedor, ideal para quienes buscan confort. Incluye espacios recreativos para todo tipo de familia y área social común con piscina.'
        },
        remodelacionFachada: {
          name: 'Remodelación de Fachada Residencial Privado',
          location: 'Samaná, República Dominicana',
          area: 'N/A',
          description:
            'Este proyecto de diseño tropical contemporáneo que integra materiales naturales como bambú, madera y piedra coralina. Destacan sus pérgolas, terrazas y amplias ventanas que conectan interior y exterior. Los jardines tropicales y palmeras rodean la vivienda, aportando frescura y armonía. Su estilo moderno y sostenible crea un ambiente elegante, ideal para disfrutar del clima caribeño con confort y conexión con la naturaleza.'
        },
        luzDelTropico: {
          name: 'Residencial Vertical "Luz del Trópico"',
          location: 'Boca Chica, República Dominicana',
          area: '350 m²',
          description:
            'Ubicada en una zona urbana de clima cálido, la residencia Luz del Trópico combina elegancia moderna y eficiencia espacial. Su volumetría vertical de tres niveles se distingue por líneas limpias, grandes ventanales y celosías que regulan la luz natural. La fachada mezcla tonos neutros con texturas contemporáneas, resaltando el equilibrio entre estética y funcionalidad. Los jardines y parqueos verdes refuerzan su enfoque sostenible, integrándose armoniosamente con el entorno tropical.'
        },
        torreSelvaUrbana1: {
          name: 'Torre Selva Urbana',
          location: 'N/A',
          area: 'N/A',
          description:
            'La Torre Selva Urbana es un edificio residencial de diseño contemporáneo que fusiona elegancia y sostenibilidad. Su fachada de vidrio y concreto se equilibra con muros verdes verticales que integran la naturaleza al entorno urbano. Los amplios ventanales permiten iluminación natural y vistas panorámicas, mientras los materiales nobles y el paisajismo tropical crean una atmósfera moderna, ecológica y sofisticada.'
        },
        torreSelvaUrbana2: {
          name: 'Torre Selva Urbana',
          location: 'Rio San Juan, República Dominicana',
          area: 'N/A',
          description:
            'Fusionan la calidez de los materiales naturales con la elegancia moderna del vidrio y el concreto. Su diseño abierto y tropical prioriza la conexión con el entorno, integrando amplias terrazas, ventanales panorámicos y jardines elevados. La madera aporta textura y armonía, mientras el cristal enmarca las vistas naturales, creando un ambiente contemporáneo y luminoso.'
        },
        loftsAntoni: {
          name: 'Lofts Antoni',
          location: 'Juan Dolio, República Dominicana',
          area: '54-120 m²',
          description:
            'Conjunto de lofts de dos niveles en complejo privado, diseñado para familias que buscan una segunda vivienda cerca de la ciudad. Presentan arquitectura moderna, con líneas limpias, amplios ventanales y terrazas que favorecen la integración interior-exterior. El proyecto se ubica en una zona prestigiosa con playas cercanas y ofrece áreas sociales comunes con piscina, BBQ y zona infantil.'
        }
      },
      tourism: {
        bungalowMontana: {
          name: 'Bungaló de Montaña',
          location: 'San José de Ocoa, República Dominicana',
          area: '64-150 m²',
          description:
            'Alojamientos en el valle de San José de Ocoa con 3 tipos de bungalós (64-150 m²). Incluyen sala, cocina, comedor, balcón con picuzzi, dormitorios, área de lavado, parqueo privado y tanque elevado para agua. También cuenta con unidad administrativa. Diseñados con techos inclinados a dos aguas y materiales que se integran con la naturaleza, ofrecen hermosas vistas al paisaje del valle. El proyecto cuenta además con una unidad administrativa para su gestión y mantenimiento.'
        }
      }
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
