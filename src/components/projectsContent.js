export const projects = [
  {
    slug: 'rediseno-web-resistance',
    title: 'Rediseño web',
    subtitle: 'Modernización y optimización para una mejor experiencia',
    client: 'Resistance',
    role: 'Diseño + Dev',
    description:
      'Resistance necesitaba una web más moderna, funcional y alineada con su identidad. Rediseñé la estructura y el diseño para mejorar la accesibilidad, la navegación y la experiencia del usuario. Implementé Next.js y CSS Modules para optimizar el rendimiento, mejorar la organización del contenido y potenciar el posicionamiento SEO. El resultado: un sitio más limpio, rápido y fácil de explorar.',
    en: {
      title:       'Web Redesign',
      subtitle:    'Modernization and optimization for a better experience',
      role:        'Design + Dev',
      description: 'Resistance needed a more modern, functional website aligned with their identity. I redesigned the structure and layout to improve accessibility, navigation and user experience. I implemented Next.js and CSS Modules to optimize performance, improve content organization and enhance SEO positioning. The result: a cleaner, faster and easier-to-navigate site.',
      process: [
        { num: '01', title: 'Research',    desc: 'Analysis of the existing site, competitor benchmarking and user pain point definition.' },
        { num: '02', title: 'UX/UI Design', desc: 'Wireframes, Figma prototyping and information architecture validation with the client.' },
        { num: '03', title: 'Development', desc: 'Implementation with Next.js, performance optimization and deployment on Vercel with CI/CD.' },
      ],
      results: [
        { value: '+40%', label: 'Load speed'         },
        { value: '100',  label: 'Lighthouse score'   },
        { value: 'A11y', label: 'Improved accessibility' },
      ],
    },
    year:    '2024',
    tags:    ['Next.js', 'CSS Modules', 'Figma', 'Vercel', 'SEO'],
    process: [
      { num: '01', title: 'Investigación',  desc: 'Análisis del sitio existente, benchmarking de competidores y definición de pain points del usuario.' },
      { num: '02', title: 'Diseño UX/UI',   desc: 'Wireframes, prototipado en Figma y validación de la arquitectura de información con el cliente.' },
      { num: '03', title: 'Desarrollo',     desc: 'Implementación con Next.js, optimización de performance y deploy en Vercel con CI/CD.' },
    ],
    results: [
      { value: '+40%', label: 'Velocidad de carga'       },
      { value: '100',  label: 'Score en Lighthouse'      },
      { value: 'A11y', label: 'Accesibilidad mejorada'   },
    ],
    frontImage: '/projects/Resistance - rediseño.png',
    image:      '/projects/Resistance - Web.png',
    url:        'https://resistance.com.co',
    category:   'Website Design',
  },
  {
    slug: 'contenido-redes-resistance',
    title: 'Contenido RRSS',
    subtitle: 'Construyendo presencia digital con impacto',
    client: 'Resistance',
    role: 'Diseño Digital',
    description:
      'Desarrollé contenido visual y estratégico para las redes sociales de Resistance, alineando su identidad con mensajes claros y atractivos. Desde publicaciones informativas hasta material promocional, creé piezas que fortalecieron su imagen y mejoraron el engagement con la audiencia, destacando su experiencia en ciberseguridad.',
    en: {
      title:       'Social Media Content',
      subtitle:    'Building digital presence with impact',
      role:        'Digital Design',
      description: 'I developed visual and strategic content for Resistance\'s social media channels, aligning their identity with clear and attractive messages. From informative posts to promotional material, I created pieces that strengthened their image and improved audience engagement, highlighting their expertise in cybersecurity.',
      process: [
        { num: '01', title: 'Strategy',       desc: 'Audience analysis, brand voice definition and content calendar planning.' },
        { num: '02', title: 'Visual Design',  desc: 'Creation of templates, graphic pieces and promotional material aligned with brand identity.' },
        { num: '03', title: 'Publishing',     desc: 'Scheduling, publication and performance monitoring across social platforms.' },
      ],
      results: [
        { value: '+3x',  label: 'Content output'   },
        { value: '100%', label: 'Brand consistency' },
        { value: '↑ER',  label: 'Engagement rate'  },
      ],
    },
    year:    '2024',
    tags:    ['Illustrator', 'Photoshop', 'Canva', 'Meta Ads'],
    process: [
      { num: '01', title: 'Estrategia',       desc: 'Análisis de audiencia, definición de voz de marca y planificación del calendario de contenidos.' },
      { num: '02', title: 'Diseño visual',    desc: 'Creación de plantillas, piezas gráficas y material promocional alineado con la identidad de marca.' },
      { num: '03', title: 'Publicación',      desc: 'Programación, publicación y seguimiento del rendimiento en cada plataforma.' },
    ],
    results: [
      { value: '+3x',  label: 'Volumen de contenido' },
      { value: '100%', label: 'Coherencia de marca'  },
      { value: '↑ER',  label: 'Engagement rate'      },
    ],
    frontImage: null,
    image:      null,
    url:        '',
    category:   'Social Media',
  },
  {
    slug: 'branding-pequena-venecia',
    title: 'Identidad visual',
    subtitle: 'Un diseño que refleja su esencia',
    client: 'La Pequeña Venecia Bodegón',
    role: 'Diseño Gráfico',
    description:
      'Creé el manual de identidad y branding para La Pequeña Venecia, definiendo la paleta de colores, tipografías y elementos gráficos que transmiten su autenticidad. El resultado es una identidad visual coherente y versátil, diseñada para fortalecer su presencia en distintos medios.',
    en: {
      title:       'Visual Identity',
      subtitle:    'A design that reflects its essence',
      role:        'Graphic Design',
      description: 'I created the identity manual and branding for La Pequeña Venecia, defining the color palette, typography and graphic elements that convey its authenticity. The result is a coherent and versatile visual identity, designed to strengthen its presence across different media.',
      process: [
        { num: '01', title: 'Research',    desc: 'Brand values analysis, competitor research and moodboard creation to define the visual direction.' },
        { num: '02', title: 'Concept',     desc: 'Logo proposals, color palette and typography system aligned with the brand\'s personality.' },
        { num: '03', title: 'Brand Guide', desc: 'Full identity manual with usage rules, variations and application examples across media.' },
      ],
      results: [
        { value: '1',     label: 'Cohesive identity'  },
        { value: '360°',  label: 'Multi-media system' },
        { value: 'v1.0',  label: 'Brand guide'        },
      ],
    },
    year:    '2024',
    tags:    ['Illustrator', 'Figma', 'Branding', 'Manual de marca'],
    process: [
      { num: '01', title: 'Investigación', desc: 'Análisis de valores de marca, investigación de competidores y moodboard para definir la dirección visual.' },
      { num: '02', title: 'Concepto',      desc: 'Propuestas de logotipo, paleta de color y sistema tipográfico alineados con la personalidad de la marca.' },
      { num: '03', title: 'Manual',        desc: 'Manual de identidad completo con reglas de uso, variaciones y ejemplos de aplicación en distintos medios.' },
    ],
    results: [
      { value: '1',    label: 'Identidad cohesiva'   },
      { value: '360°', label: 'Sistema multisoporte' },
      { value: 'v1.0', label: 'Brand guide'          },
    ],
    frontImage: null,
    image:      null,
    url:        '',
    category:   'Branding',
  },
  {
    slug: 'web-vulnmaster',
    title: 'Diseño y frontend',
    subtitle: 'Un sitio funcional y optimizado para expertos en seguridad',
    client: 'Vulnmaster',
    role: 'Diseño + Dev',
    description:
      'Diseñé y maqueté la web de Vulnmaster, enfocándome en una estructura clara y accesible. Implementé Next.js y Tailwind CSS para garantizar un diseño moderno, optimizado y responsive, asegurando una navegación intuitiva y una experiencia de usuario fluida.',
    en: {
      title:       'Design & Frontend',
      subtitle:    'A functional and optimized site for security experts',
      role:        'Design + Dev',
      description: 'I designed and built the Vulnmaster website, focusing on a clear and accessible structure. I implemented Next.js and Tailwind CSS to ensure a modern, optimized and responsive design, providing intuitive navigation and a smooth user experience.',
      process: [
        { num: '01', title: 'UX Design',    desc: 'User flow mapping, wireframes and Figma prototyping based on the target audience needs.' },
        { num: '02', title: 'UI & Layout',  desc: 'Visual system design and component-based layout with Tailwind CSS for consistent styling.' },
        { num: '03', title: 'Development',  desc: 'Next.js implementation, responsive optimization and deployment on Vercel.' },
      ],
      results: [
        { value: '100%', label: 'Responsive'       },
        { value: 'A+',   label: 'Performance'      },
        { value: 'Live',  label: 'vulnmaster.us'   },
      ],
    },
    year:    '2024',
    tags:    ['Next.js', 'Tailwind CSS', 'Figma', 'Vercel'],
    process: [
      { num: '01', title: 'Diseño UX',    desc: 'Mapeo de flujos de usuario, wireframes y prototipado en Figma según las necesidades del público objetivo.' },
      { num: '02', title: 'UI y layout',  desc: 'Diseño del sistema visual y maquetación por componentes con Tailwind CSS para consistencia de estilos.' },
      { num: '03', title: 'Desarrollo',   desc: 'Implementación en Next.js, optimización responsive y deploy en Vercel.' },
    ],
    results: [
      { value: '100%', label: 'Responsive'     },
      { value: 'A+',   label: 'Performance'    },
      { value: 'Live', label: 'vulnmaster.us'  },
    ],
    frontImage: null,
    image:      null,
    url:        'https://vulnmaster.us',
    category:   'Website Design',
  },
  {
    slug: 'dashboard-vulnmaster',
    title: 'Dashboard interactivo',
    subtitle: 'Visualización de datos con diseño intuitivo',
    client: 'Vulnmaster',
    role: 'Diseño + Dev',
    description:
      'Desarrollé el diseño y la maquetación del dashboard de Vulnmaster, creando una interfaz clara y funcional para la gestión de datos de seguridad. Implementé una estructura modular y un sistema visual intuitivo para facilitar el acceso a información clave, asegurando una experiencia fluida y eficiente.',
    en: {
      title:       'Interactive Dashboard',
      subtitle:    'Data visualization with intuitive design',
      role:        'Design + Dev',
      description: 'I developed the design and layout of the Vulnmaster dashboard, creating a clear and functional interface for security data management. I implemented a modular structure and an intuitive visual system to facilitate access to key information, ensuring a smooth and efficient experience.',
      process: [
        { num: '01', title: 'Data Analysis', desc: 'Study of the security data to be displayed and definition of hierarchy and information grouping.' },
        { num: '02', title: 'UI Design',     desc: 'Component design, visual system and interactive prototyping in Figma.' },
        { num: '03', title: 'Development',   desc: 'Modular implementation in Next.js with dynamic charts and real-time data integration.' },
      ],
      results: [
        { value: 'RTD',  label: 'Real-time data'      },
        { value: '↓75%', label: 'Time to insight'     },
        { value: 'UX',   label: 'Intuitive interface'  },
      ],
    },
    year:    '2025',
    tags:    ['Next.js', 'Tailwind CSS', 'Figma', 'Chart.js'],
    process: [
      { num: '01', title: 'Análisis de datos', desc: 'Estudio de los datos de seguridad a mostrar y definición de la jerarquía y agrupación de la información.' },
      { num: '02', title: 'Diseño UI',         desc: 'Diseño de componentes, sistema visual y prototipado interactivo en Figma.' },
      { num: '03', title: 'Desarrollo',        desc: 'Implementación modular en Next.js con gráficos dinámicos e integración de datos en tiempo real.' },
    ],
    results: [
      { value: 'RTD',  label: 'Datos en tiempo real'  },
      { value: '↓75%', label: 'Time to insight'       },
      { value: 'UX',   label: 'Interfaz intuitiva'    },
    ],
    frontImage: null,
    image:      null,
    url:        '',
    category:   'Website Design',
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
