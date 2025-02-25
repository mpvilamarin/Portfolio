  export const projects = [
    {
      slug: "rediseno-web-resistance",
      title: 'Rediseño web',
      subtitle: 'Modernización y optimización para una mejor experiencia',
      client: 'Resistance',
      description: 'Resistance necesitaba una web más moderna, funcional y alineada con su identidad. Rediseñé la estructura y el diseño para mejorar la accesibilidad, la navegación y la experiencia del usuario. Implementé Next.js y CSS Modules para optimizar el rendimiento, mejorar la organización del contenido y potenciar el posicionamiento SEO. El resultado: un sitio más limpio, rápido y fácil de explorar.',
      image: '/project.jpg',
      url: 'https://resistance.com.co'
    },
    {
      slug: "contenido-redes-resistance",
      title: 'Estrategia y contenido para RRSS',
      subtitle: 'Construyendo presencia digital con impacto',
      client: 'Resistance',
      description: 'Desarrollé contenido visual y estratégico para las redes sociales de Resistance, alineando su identidad con mensajes claros y atractivos. Desde publicaciones informativas hasta material promocional, creé piezas que fortalecieron su imagen y mejoraron el engagement con la audiencia, destacando su experiencia en ciberseguridad.',
      image: '/project.jpg',
      url: "",
    },
    {
      slug: "branding-pequena-venecia",
      title: 'Identidad visual',
      subtitle: 'Un diseño que refleja su esencia',
      client: 'La Pequeña Venecia Bodegón',
      description: 'Creé el manual de identidad y branding para La Pequeña Venecia, definiendo la paleta de colores, tipografías y elementos gráficos que transmiten su autenticidad. El resultado es una identidad visual coherente y versátil, diseñada para fortalecer su presencia en distintos medios.',
      image: '/project.jpg',
      url: "",
    },
    {
      slug: "web-vulnmaster",
        title: 'Diseño y desarrollo web',
        subtitle: 'Un sitio funcional y optimizado para expertos en seguridad',
        client: 'Vulnmaster',
        description: 'Diseñé y maqueté la web de Vulnmaster, enfocándome en una estructura clara y accesible. Implementé Next.js y Tailwind CSS para garantizar un diseño moderno, optimizado y responsive, asegurando una navegación intuitiva y una experiencia de usuario fluida.',
        image: '/project.jpg',
        url: "vulnmaster.us",
      },
      {
        slug: "dashboard-vulnmaster",
        title: 'Dashboard interactivo',
        subtitle: 'Visualización de datos con diseño intuitivo',
        client: 'Vulnmaster',
        description: 'Desarrollé el diseño y la maquetación del dashboard de Vulnmaster, creando una interfaz clara y funcional para la gestión de datos de seguridad. Implementé una estructura modular y un sistema visual intuitivo para facilitar el acceso a información clave, asegurando una experiencia fluida y eficiente.',
        image: '/project.jpg',
        url: "",
      },
  ];

  export function getAllProjects() {
    return projects;
  }
  
  export function getProjectBySlug(slug) {
    return projects.find((project) => project.slug === slug);
  }