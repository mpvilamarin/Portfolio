export const projects = [
  {
    slug: 'rediseno-web-resistance',
    title: 'Rediseño web',
    subtitle: 'Modernización y optimización para una mejor experiencia',
    client: 'Resistance',
    description:
      'Resistance necesitaba una web más moderna, funcional y alineada con su identidad. Rediseñé la estructura y el diseño para mejorar la accesibilidad, la navegación y la experiencia del usuario. Implementé Next.js y CSS Modules para optimizar el rendimiento, mejorar la organización del contenido y potenciar el posicionamiento SEO. El resultado: un sitio más limpio, rápido y fácil de explorar.',
    en: {
      title:    'Web Redesign',
      subtitle: 'Modernization and optimization for a better experience',
      description:
        'Resistance needed a more modern, functional website aligned with their identity. I redesigned the structure and layout to improve accessibility, navigation and user experience. I implemented Next.js and CSS Modules to optimize performance, improve content organization and enhance SEO positioning. The result: a cleaner, faster and easier-to-navigate site.',
    },
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
    description:
      'Desarrollé contenido visual y estratégico para las redes sociales de Resistance, alineando su identidad con mensajes claros y atractivos. Desde publicaciones informativas hasta material promocional, creé piezas que fortalecieron su imagen y mejoraron el engagement con la audiencia, destacando su experiencia en ciberseguridad.',
    en: {
      title:    'Social Media Content',
      subtitle: 'Building digital presence with impact',
      description:
        'I developed visual and strategic content for Resistance\'s social media channels, aligning their identity with clear and attractive messages. From informative posts to promotional material, I created pieces that strengthened their image and improved audience engagement, highlighting their expertise in cybersecurity.',
    },
    frontImage: null,
    image:      '/project.jpg',
    url:        '',
    category:   'Social Media',
  },
  {
    slug: 'branding-pequena-venecia',
    title: 'Identidad visual',
    subtitle: 'Un diseño que refleja su esencia',
    client: 'La Pequeña Venecia Bodegón',
    description:
      'Creé el manual de identidad y branding para La Pequeña Venecia, definiendo la paleta de colores, tipografías y elementos gráficos que transmiten su autenticidad. El resultado es una identidad visual coherente y versátil, diseñada para fortalecer su presencia en distintos medios.',
    en: {
      title:    'Visual Identity',
      subtitle: 'A design that reflects its essence',
      description:
        'I created the identity manual and branding for La Pequeña Venecia, defining the color palette, typography and graphic elements that convey its authenticity. The result is a coherent and versatile visual identity, designed to strengthen its presence across different media.',
    },
    frontImage: null,
    image:      '/project.jpg',
    url:        '',
    category:   'Branding',
  },
  {
    slug: 'web-vulnmaster',
    title: 'Diseño y frontend',
    subtitle: 'Un sitio funcional y optimizado para expertos en seguridad',
    client: 'Vulnmaster',
    description:
      'Diseñé y maqueté la web de Vulnmaster, enfocándome en una estructura clara y accesible. Implementé Next.js y Tailwind CSS para garantizar un diseño moderno, optimizado y responsive, asegurando una navegación intuitiva y una experiencia de usuario fluida.',
    en: {
      title:    'Design & Frontend',
      subtitle: 'A functional and optimized site for security experts',
      description:
        'I designed and built the Vulnmaster website, focusing on a clear and accessible structure. I implemented Next.js and Tailwind CSS to ensure a modern, optimized and responsive design, providing intuitive navigation and a smooth user experience.',
    },
    frontImage: null,
    image:      '/project.jpg',
    url:        'https://vulnmaster.us',
    category:   'Website Design',
  },
  {
    slug: 'dashboard-vulnmaster',
    title: 'Dashboard interactivo',
    subtitle: 'Visualización de datos con diseño intuitivo',
    client: 'Vulnmaster',
    description:
      'Desarrollé el diseño y la maquetación del dashboard de Vulnmaster, creando una interfaz clara y funcional para la gestión de datos de seguridad. Implementé una estructura modular y un sistema visual intuitivo para facilitar el acceso a información clave, asegurando una experiencia fluida y eficiente.',
    en: {
      title:    'Interactive Dashboard',
      subtitle: 'Data visualization with intuitive design',
      description:
        'I developed the design and layout of the Vulnmaster dashboard, creating a clear and functional interface for security data management. I implemented a modular structure and an intuitive visual system to facilitate access to key information, ensuring a smooth and efficient experience.',
    },
    frontImage: null,
    image:      '/project.jpg',
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
