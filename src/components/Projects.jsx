import React from 'react';
import ProjectsCarousel from './projectsContainer';
import FadeIn from './FadeIn';

export const Projects = () => {
  return (
    <div>
      {/* Header de sección */}
      <FadeIn>
        <div className="flex items-center gap-5 mb-3">
          <span className="font-mono text-[10px] text-accent tracking-[4px]">03 /</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            PROYECTOS
          </h2>
          <div className="flex-1 h-px bg-line" />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-mono text-xs sm:text-sm text-muted mb-10 lg:mb-14 max-w-xl leading-relaxed">
          Proyectos recientes, profesionales y académicos. Diseño, desarrollo e interactividad.
          Filtra por categoría y explora los que más te interesen.
        </p>
      </FadeIn>

      <ProjectsCarousel />
    </div>
  );
};
