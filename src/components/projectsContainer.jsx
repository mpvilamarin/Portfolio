'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from './projectsContent';
import FadeIn from './FadeIn';

const categories = ['All', 'Website Design', 'Social Media', 'University', 'Branding'];

export default function ProjectsContainer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const INITIAL = 6;

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const displayed = filtered.slice(0, visibleCount);

  return (
    <div className="w-full">
      {/* ── Filtros ──────────────────────────────────── */}
      <FadeIn delay={0.15}>
        <div className="flex flex-wrap gap-2 mb-8 lg:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setVisibleCount(INITIAL); }}
              className={`font-mono text-[10px] tracking-[3px] uppercase px-4 py-2 rounded
                transition-all duration-300
                ${selectedCategory === cat
                  ? 'bg-accent text-base font-bold'
                  : 'border border-line text-muted hover:border-accent/40 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* ── Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
        {displayed.map((project, index) => (
          <ProjectCard
            key={`${project.slug}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* ── Ver más / Ver menos ──────────────────────── */}
      {(filtered.length > visibleCount || visibleCount > INITIAL) && (
        <div className="flex justify-center gap-4 mt-10">
          {filtered.length > visibleCount && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="font-mono text-[10px] tracking-[3px] uppercase
                bg-accent text-base px-7 py-3 rounded hover:bg-accent-light transition-colors duration-300"
            >
              Ver más +
            </button>
          )}
          {visibleCount > INITIAL && (
            <button
              onClick={() => setVisibleCount((prev) => Math.max(prev - 3, INITIAL))}
              className="font-mono text-[10px] tracking-[3px] uppercase
                border border-line text-muted px-7 py-3 rounded
                hover:border-muted hover:text-white transition-colors duration-300"
            >
              Ver menos
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Tarjeta individual ─────────────────────────────── */
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!project.frontImage;

  return (
    <FadeIn delay={Math.min(0.06 * (index % 6), 0.3)}>
      <Link href={`/projects/${project.slug}`}>
        <div
          className="relative overflow-hidden bg-surface group"
          style={{ aspectRatio: '4 / 3' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Imagen o placeholder */}
          {hasImage ? (
            <Image
              src={project.frontImage}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-elevated">
              {/* Grid decorativa */}
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
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}
              >
                {project.client?.[0] ?? 'P'}
              </span>
            </div>
          )}

          {/* Overlay en hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-base/88 backdrop-blur-[2px]"
              />
            )}
          </AnimatePresence>

          {/* Contenido del overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{ y: 14,  opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6"
              >
                <span className="font-mono text-[9px] text-accent tracking-[4px] uppercase mb-1.5">
                  {project.category}
                </span>
                <h3 className="font-montserrat font-black text-white text-sm lg:text-base leading-tight mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] text-muted italic mb-3">
                  {project.client}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-accent tracking-widest">Ver proyecto</span>
                  <span className="text-accent text-xs">→</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge de categoría (siempre visible) */}
          <AnimatePresence>
            {!hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 bg-base/70 px-3 py-2 flex justify-between items-center"
              >
                <span className="font-montserrat font-bold text-xs text-white truncate">
                  {project.title}
                </span>
                <span className="font-mono text-[9px] text-muted italic shrink-0 ml-2">
                  {project.category}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </FadeIn>
  );
}
