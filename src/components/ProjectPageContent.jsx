'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

export default function ProjectPageContent({ project }) {
  const { lang } = useLanguage();
  const tx = tr[lang].projectPage;

  // Contenido en el idioma activo (fallback al español si no hay traducción)
  const content = lang === 'en' && project.en
    ? { title: project.en.title, subtitle: project.en.subtitle, description: project.en.description }
    : { title: project.title,    subtitle: project.subtitle,    description: project.description  };

  const hasUrl   = project.url && project.url.trim() !== '';
  const hasImage = !!project.frontImage;

  return (
    <main className="min-h-screen bg-base text-white">

      {/* ── Hero del proyecto ──────────────────── */}
      <section className="relative min-h-[70vh] lg:min-h-screen flex flex-col justify-end overflow-hidden">

        {/* Imagen / Placeholder de fondo */}
        {hasImage ? (
          <Image
            src={project.frontImage}
            alt={content.title}
            fill
            priority
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-elevated flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(#F43F5E 1px, transparent 1px), linear-gradient(90deg, #F43F5E 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            <span
              className="font-montserrat font-black text-accent/10 select-none"
              style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}
            >
              {project.client?.[0] ?? 'P'}
            </span>
          </div>
        )}

        {/* Gradiente sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-transparent" />

        {/* Botón volver */}
        <div className="absolute top-20 left-6 sm:left-12 lg:left-20 xl:left-28 z-10">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 font-mono text-[11px] text-muted
              hover:text-accent transition-colors duration-300 tracking-widest"
          >
            <FaArrowLeft
              size={10}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            {tx.back}
          </Link>
        </div>

        {/* Info en la parte inferior del hero */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 pb-12 lg:pb-16">
          <span className="font-mono text-[10px] text-accent tracking-[4px] uppercase">
            {project.category}
          </span>
          <h1
            className="font-montserrat font-black text-white leading-none mt-2 mb-3"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            {content.title}
          </h1>
          <p className="font-mono text-sm text-muted italic">{project.client}</p>
        </div>
      </section>

      {/* ── Contenido ──────────────────────────── */}
      <section className="px-6 sm:px-12 lg:px-20 xl:px-28 py-16 lg:py-24
        grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 border-t border-line">

        {/* Columna izquierda: subtítulo + CTA */}
        <div>
          <p className="font-mono text-[10px] text-accent tracking-[4px] uppercase mb-4">
            {tx.label}
          </p>
          <h2 className="font-montserrat font-bold text-white text-xl lg:text-2xl leading-snug mb-8">
            {content.subtitle}
          </h2>

          {hasUrl && (
            <a
              href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase
                border border-accent text-white px-6 py-3 rounded relative overflow-hidden
                hover:text-base transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                {tx.viewSite}
                <FaExternalLinkAlt size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-accent translate-x-[-101%]
                group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </a>
          )}
        </div>

        {/* Columna derecha: descripción */}
        <div>
          <p className="font-mono text-xs sm:text-sm text-muted leading-[2]">
            {content.description}
          </p>
        </div>
      </section>

      {/* ── Imagen completa del proyecto ────────── */}
      {project.image && (
        <section className="px-6 sm:px-12 lg:px-20 xl:px-28 pb-20 lg:pb-32">
          <div className="border border-line rounded overflow-hidden">
            <Image
              src={project.image}
              alt={`${content.title} — ${lang === 'en' ? 'full view' : 'vista completa'}`}
              width={1920}
              height={3500}
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </section>
      )}

      {/* ── Footer del proyecto ─────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 xl:px-28 py-10 border-t border-line
        flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          href="/#projects"
          className="group flex items-center gap-2 font-mono text-[11px] text-muted
            hover:text-accent transition-colors duration-300 tracking-widest"
        >
          <FaArrowLeft
            size={10}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          {tx.allProjects}
        </Link>
        <Link href="/contactform"
          className="font-mono text-[11px] text-muted hover:text-accent transition-colors tracking-widest">
          {tx.workTogether}
        </Link>
      </div>
    </main>
  );
}
