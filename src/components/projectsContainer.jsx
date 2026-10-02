'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from './projectsContent';
import FadeIn from './FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

const FEATURED_SPANS = [
  'col-span-2 row-span-2',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

function SubLabel({ text }) {
  return (
    <div className="flex items-center gap-4 mb-6 lg:mb-8">
      <span className="font-mono text-[10px] text-muted tracking-[4px] uppercase whitespace-nowrap">
        {text}
      </span>
      <div className="flex-1 h-px bg-line" />
    </div>
  );
}

function Placeholder({ letter }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: '#1F1015' }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#F43F5E 1px, transparent 1px), linear-gradient(90deg, #F43F5E 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <span
        className="font-montserrat font-black text-accent/20 select-none"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
      >
        {letter}
      </span>
    </div>
  );
}

export default function ProjectsContainer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoverIndex, setHoverIndex] = useState(0);
  const { lang } = useLanguage();
  const tx = tr[lang].projects;
  const categories = tx.categories;

  const featured = projects.filter((p) => p.frontImage).slice(0, 4);

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const active = filtered[hoverIndex] ?? filtered[0];

  return (
    <div className="w-full">

      {/* ── Destacados: mosaico ──────────────────────── */}
      <FadeIn>
        <SubLabel text={lang === 'en' ? '// featured' : '// destacados'} />
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[130px] sm:auto-rows-[170px]
        gap-2 mb-16 lg:mb-20">
        {featured.map((project, i) => {
          const title = lang === 'en' && project.en ? project.en.title : project.title;
          const span  = FEATURED_SPANS[i % FEATURED_SPANS.length];
          return (
            <FadeIn key={project.slug} delay={Math.min(0.06 * i, 0.2)} className={`${span} h-full`}>
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block w-full h-full overflow-hidden rounded-lg
                  border border-line hover:border-accent/30 transition-colors duration-300"
                style={{ backgroundColor: '#150B0D' }}
              >
                <Image
                  src={project.frontImage}
                  alt={title}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(13,7,9,0.85) 100%)' }}
                />
                <div className="absolute left-0 right-0 bottom-0 p-3 sm:p-4">
                  <span
                    className="font-mono text-[8px] sm:text-[9px] tracking-[3px] uppercase"
                    style={{ color: '#F43F5E' }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="font-montserrat font-bold uppercase leading-tight mt-1
                      text-sm sm:text-base"
                    style={{ color: '#FFFFFF' }}
                  >
                    {title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      {/* ── Índice completo ───────────────────────────── */}
      <FadeIn>
        <SubLabel text={lang === 'en' ? '// index' : '// índice'} />
      </FadeIn>

      {/* Filtros */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setSelectedCategory(value); setHoverIndex(0); }}
              className={`font-mono text-[10px] tracking-[3px] uppercase px-4 py-2 rounded
                transition-all duration-300
                ${selectedCategory === value
                  ? 'bg-accent text-base font-bold'
                  : 'border border-line text-muted hover:border-accent/40 hover:text-white'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Lista + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">

        <div className="flex flex-col border-t border-line">
          {filtered.map((project, i) => {
            const title    = lang === 'en' && project.en ? project.en.title : project.title;
            const isActive = i === hoverIndex;
            return (
              <FadeIn key={project.slug} delay={Math.min(0.04 * i, 0.24)}>
                <Link
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHoverIndex(i)}
                  className="group grid grid-cols-[28px_1fr_24px]
                    sm:grid-cols-[40px_1fr_130px_110px_24px]
                    items-center gap-2 sm:gap-4 py-3 sm:py-3.5 border-b border-line
                    transition-colors duration-300"
                >
                  <span className={`font-mono text-[10px] tracking-widest transition-colors duration-300
                    ${isActive ? 'text-accent' : 'text-muted'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-montserrat font-bold uppercase leading-tight truncate
                    text-[1rem] sm:text-xl transition-colors duration-300
                    ${isActive ? 'text-accent' : 'text-white'}`}>
                    {title}
                  </span>
                  <span className="hidden sm:block font-mono text-xs text-muted truncate pr-2">
                    {project.client}
                  </span>
                  <span className="hidden sm:block font-mono text-[10px] text-muted
                    tracking-widest uppercase text-right pr-2">
                    {project.category}
                  </span>
                  <span className={`text-right text-accent transition-all duration-300
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}>
                    →
                  </span>
                </Link>
              </FadeIn>
            );
          })}

          {filtered.length === 0 && (
            <p className="font-mono text-xs text-muted py-10">
              {lang === 'en' ? 'No projects in this category yet.' : 'Aún no hay proyectos en esta categoría.'}
            </p>
          )}
        </div>

        {/* Preview sticky */}
        {active && (
          <div
            className="hidden lg:block sticky top-28 rounded-lg overflow-hidden
              border border-line aspect-[4/5]"
            style={{ backgroundColor: '#150B0D' }}
          >
            <div className="relative w-full h-full">
              {active.frontImage ? (
                <Image
                  key={active.slug}
                  src={active.frontImage}
                  alt={active.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              ) : (
                <Placeholder letter={active.client?.[0] ?? 'P'} />
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(13,7,9,0.92) 100%)' }}
              />
              <div className="absolute left-0 right-0 bottom-0 p-5">
                <span className="font-mono text-[9px] tracking-[3px] uppercase" style={{ color: '#F43F5E' }}>
                  {lang === 'en' ? 'Preview' : 'Vista previa'}
                </span>
                <h4
                  className="font-montserrat font-black uppercase leading-tight mt-2 text-xl"
                  style={{ color: '#FFFFFF' }}
                >
                  {lang === 'en' && active.en ? active.en.title : active.title}
                </h4>
                <p className="font-mono text-[11px] mt-1" style={{ color: '#9D8B8E' }}>
                  {active.client} · {active.year}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
