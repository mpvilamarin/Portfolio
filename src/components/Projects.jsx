'use client';
import React from 'react';
import ProjectsCarousel from './projectsContainer';
import FadeIn from './FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

export const Projects = () => {
  const { lang } = useLanguage();
  const tx = tr[lang].projects;

  return (
    <div>
      {/* Header de sección */}
      <FadeIn>
        <div className="flex items-center gap-5 mb-3">
          <span className="font-mono text-[10px] text-accent tracking-[4px]">{tx.sectionNum}</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {tx.heading}
          </h2>
          <div className="flex-1 h-px bg-line" />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-mono text-xs sm:text-sm text-muted mb-10 lg:mb-14 max-w-xl leading-relaxed">
          {tx.desc}
        </p>
      </FadeIn>

      <ProjectsCarousel />
    </div>
  );
};
