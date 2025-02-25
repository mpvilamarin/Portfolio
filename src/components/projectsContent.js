  export const projects = [
    {
      slug: "rediseno-web-resistance",
      title: 'Rediseño web',
      subtitle: 'Modernización y optimización para una mejor experiencia',
      description: 'Resistance necesitaba una web más moderna, funcional y alineada con su identidad. Rediseñé la estructura y el diseño para mejorar la accesibilidad, la navegación y la experiencia del usuario. Implementé Next.js y CSS Modules para optimizar el rendimiento, mejorar la organización del contenido y potenciar el posicionamiento SEO. El resultado: un sitio más limpio, rápido y fácil de explorar.',
      image: '/project.jpg',
    },
    {
      slug: "proyecto-2",
      title: 'Proyecto 2',
      subtitle: 'prueba',
      description: 'Descripción del proyecto 2',
      image: '/project.jpg',
    },
    {
      slug: "proyecto-3",
      title: 'Proyecto 3',
      subtitle: 'prueba',
      description: 'Descripción del proyecto 3',
      image: '/project.jpg',
    },
    {
      slug: "proyecto-4",
        title: 'Proyecto 4',
        subtitle: 'prueba',
        description: 'Descripción del proyecto 1',
        image: '/project.jpg',
      },
      {
        slug: "proyecto-5",
        title: 'Proyecto 5',
        subtitle: 'prueba',
        description: 'Descripción del proyecto 2',
        image: '/project.jpg',
      },
      {
        slug: "proyecto-6",
        title: 'Proyecto 6',
        subtitle: 'prueba',
        description: 'Descripción del proyecto 3',
        image: '/project.jpg',
      },
  ];

  export function getAllProjects() {
    return projects;
  }
  
  export function getProjectBySlug(slug) {
    return projects.find((project) => project.slug === slug);
  }