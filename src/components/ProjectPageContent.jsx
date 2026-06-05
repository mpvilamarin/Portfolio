'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';
import { getAllProjects } from '@/components/projectsContent';
import FadeIn from '@/components/FadeIn';
import SkillBar from '@/components/SkillBar';

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-4 mb-6 lg:mb-8">
      <span className="font-mono text-[10px] text-muted tracking-[4px] uppercase whitespace-nowrap">
        {text}
      </span>
      <div className="flex-1 h-px bg-line" />
    </div>
  );
}

export default function ProjectPageContent({ project }) {
  const { lang } = useLanguage();
  const tx = tr[lang].projectPage;

  const content =
    lang === 'en' && project.en
      ? { title: project.en.title, subtitle: project.en.subtitle, description: project.en.description }
      : { title: project.title,    subtitle: project.subtitle,    description: project.description  };

  const role    = lang === 'en' && project.en?.role    ? project.en.role    : project.role;
  const process = lang === 'en' && project.en?.process ? project.en.process : project.process;
  const results = lang === 'en' && project.en?.results ? project.en.results : project.results;

  const allProjects = getAllProjects();
  const idx         = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = idx > 0                      ? allProjects[idx - 1] : null;
  const nextProject = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;
  const projectNum  = String(idx + 1).padStart(2, '0');

  const hasUrl   = project.url && project.url.trim() !== '';
  const siteUrl  = hasUrl
    ? project.url.startsWith('http') ? project.url : `https://${project.url}`
    : null;
  const siteLabel = hasUrl ? project.url.replace(/^https?:\/\//, '') : null;
  const gallery  = project.gallery?.filter(Boolean) ?? [];
  const hasImage = gallery.length > 0;
  const hasTags  = project.tags?.length > 0;

  const prevTitle = prevProject
    ? (lang === 'en' && prevProject.en ? prevProject.en.title : prevProject.title) : null;
  const nextTitle = nextProject
    ? (lang === 'en' && nextProject.en ? nextProject.en.title : nextProject.title) : null;

  return (
    <main className="min-h-screen bg-base text-white">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden
        px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-20">

        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute top-1/3 right-[-10%] w-[50vw] h-[50vw] max-w-[700px]
            rounded-full bg-accent/[0.06] blur-[130px]" />
          <div className="absolute bottom-0 left-[10%] w-[35vw] h-[35vw] max-w-[500px]
            rounded-full bg-accent/[0.04] blur-[100px]" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none select-none opacity-[0.03]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(#F43F5E 1px, transparent 1px), linear-gradient(90deg, #F43F5E 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-montserrat font-black
            text-white/[0.03] select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(10rem, 35vw, 28rem)' }}
          aria-hidden
        >
          {projectNum}
        </span>

        <div className="absolute top-20 left-6 sm:left-12 lg:left-20 xl:left-28 z-10">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 font-mono text-[11px] text-muted
              hover:text-accent transition-colors duration-300 tracking-widest"
          >
            <FaArrowLeft size={10}
              className="group-hover:-translate-x-1 transition-transform duration-300" />
            {tx.back}
          </Link>
        </div>

        <div className="relative z-10">
          <FadeIn delay={0.05}>
            <span className="inline-block font-mono text-[10px] tracking-[4px] uppercase
              text-accent border border-accent/50 px-3 py-1 rounded-sm mb-8 lg:mb-10">
              {project.category}
            </span>
          </FadeIn>

          <div className="overflow-hidden">
            <FadeIn delay={0.15}>
              <h1
                className="font-montserrat leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 8.5rem)' }}
              >
                <span className="block font-thin text-white/70 uppercase">{project.client}</span>
                <span className="block font-black text-white uppercase">{content.title}</span>
              </h1>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="flex items-center gap-4 mt-6 lg:mt-8">
              <div className="h-px w-16 sm:w-24 bg-accent/50" />
              <p className="font-mono text-[10px] sm:text-xs text-muted tracking-[3px] uppercase">
                {role}
              </p>
            </div>
          </FadeIn>

          {hasUrl && (
            <FadeIn delay={0.42}>
              <div className="mt-10 lg:mt-14">
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative font-mono text-[11px] tracking-[3px] uppercase
                    border border-accent text-white px-7 py-3 rounded overflow-hidden
                    inline-flex hover:text-base transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {tx.viewSite}
                    <FaExternalLinkAlt size={10}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-accent translate-x-[-101%]
                    group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </a>
              </div>
            </FadeIn>
          )}
        </div>

        <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 xl:left-28
          flex items-center gap-3 text-muted">
          <div className="w-px h-8 bg-line relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent
              animate-[scrollDown_1.8s_ease-in-out_infinite]" />
          </div>
          <span className="font-mono text-[9px] tracking-[4px] uppercase">scroll</span>
        </div>

        <style>{`
          @keyframes scrollDown {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          METADATA STRIP
      ══════════════════════════════════════════ */}
      <div className="border-y border-line bg-surface">
        <div className="px-6 sm:px-12 lg:px-20 xl:px-28
          grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-line">

          {/* Cliente */}
          <div className="py-5 px-6 first:pl-0">
            <p className="font-mono text-[9px] text-muted tracking-[3px] uppercase mb-2">
              {lang === 'en' ? 'Client' : 'Cliente'}
            </p>
            <p className="font-montserrat font-semibold text-white text-sm">
              {project.client}
            </p>
          </div>

          {/* Año */}
          <div className="py-5 px-6">
            <p className="font-mono text-[9px] text-muted tracking-[3px] uppercase mb-2">
              {lang === 'en' ? 'Year' : 'Año'}
            </p>
            <p className="font-montserrat font-semibold text-white text-sm">
              {project.year ?? '—'}
            </p>
          </div>

          {/* Rol */}
          <div className="py-5 px-6">
            <p className="font-mono text-[9px] text-muted tracking-[3px] uppercase mb-2">
              {lang === 'en' ? 'Role' : 'Rol'}
            </p>
            <p className="font-montserrat font-semibold text-white text-sm">{role}</p>
          </div>

          {/* URL */}
          <div className="py-5 px-6 lg:pr-0">
            <p className="font-mono text-[9px] text-muted tracking-[3px] uppercase mb-2">
              {lang === 'en' ? 'View site' : 'Ver sitio'}
            </p>
            {hasUrl ? (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-montserrat font-semibold
                  text-accent hover:text-accent-light transition-colors text-sm"
              >
                {siteLabel}
                <FaExternalLinkAlt size={9} />
              </a>
            ) : (
              <p className="font-montserrat font-semibold text-muted text-sm">—</p>
            )}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="px-6 sm:px-12 lg:px-20 xl:px-28 py-12 lg:py-16 border-b border-line">
        <SectionLabel text="// overview" />
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="font-montserrat font-semibold text-white text-xl lg:text-2xl
              leading-snug mb-6">
              {content.subtitle}
            </p>
            <p className="font-mono text-sm text-muted leading-[2.2] mb-8">
              {content.description}
            </p>
            {hasUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[3px]
                  uppercase border border-line text-muted px-6 py-3 rounded
                  hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {tx.viewSite}
                <FaExternalLinkAlt size={9}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>

          {hasTags && (
            <div>
              <SectionLabel text="// stack" />
              <div className="flex flex-col gap-5">
                {project.tags.map((tag) => (
                  <SkillBar key={tag.name} name={tag.name} percentage={tag.percentage} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESO
      ══════════════════════════════════════════ */}
      {process?.length > 0 && (
        <section className="px-6 sm:px-12 lg:px-20 xl:px-28 py-12 lg:py-16 border-b border-line">
          <SectionLabel text={lang === 'en' ? '// process' : '// proceso'} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {process.map((step) => (
              <div
                key={step.num}
                className="border border-line rounded p-6 hover:border-accent/30
                  transition-colors duration-300"
              >
                <p className="font-mono text-[10px] text-accent tracking-[3px] mb-4">
                  {step.num} —
                </p>
                <p className="font-montserrat font-semibold text-white text-sm mb-3">
                  {step.title}
                </p>
                <p className="font-mono text-[11px] text-muted leading-[1.8]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          RESULTADOS
      ══════════════════════════════════════════ */}
      {results?.length > 0 && (
        <section className="px-6 sm:px-12 lg:px-20 xl:px-28 py-12 lg:py-16 border-b border-line">
          <SectionLabel text={lang === 'en' ? '// results' : '// resultados'} />
          <div className="grid grid-cols-3 border border-line rounded overflow-hidden divide-x divide-line">
            {results.map((item) => (
              <div key={item.label} className="py-10 px-6 text-center">
                <p
                  className="font-montserrat font-black text-white leading-none mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
                >
                  {item.value}
                </p>
                <p className="font-mono text-[9px] text-muted tracking-[3px] uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          GALERÍA
      ══════════════════════════════════════════ */}
      {hasImage && (
        <section className="px-6 sm:px-12 lg:px-20 xl:px-28 py-12 lg:py-16 border-b border-line">
          <SectionLabel text={lang === 'en' ? '// gallery' : '// galería'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`border border-line rounded overflow-hidden${i === 0 ? ' sm:col-span-2' : ''}`}
              >
                <Image
                  src={src}
                  alt={`${content.title} — ${i + 1}`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          NAV ANTERIOR / SIGUIENTE
      ══════════════════════════════════════════ */}
      <div className="border-t border-line grid grid-cols-2 divide-x divide-line">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group px-6 sm:px-12 lg:px-20 xl:px-28 py-7 flex items-center gap-4
              hover:bg-surface transition-colors duration-300"
          >
            <FaArrowLeft size={12} className="text-muted flex-shrink-0
              group-hover:-translate-x-1 group-hover:text-accent transition-all duration-300" />
            <span>
              <span className="block font-mono text-[9px] text-line tracking-[3px] uppercase mb-1">
                {lang === 'en' ? 'Previous' : 'Anterior'}
              </span>
              <span className="font-montserrat font-semibold text-white text-sm sm:text-base
                group-hover:text-accent transition-colors duration-300">
                {prevTitle}
              </span>
            </span>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group px-6 sm:px-12 lg:px-20 xl:px-28 py-7 flex items-center
              justify-end gap-4 text-right hover:bg-surface transition-colors duration-300"
          >
            <span>
              <span className="block font-mono text-[9px] text-line tracking-[3px] uppercase mb-1">
                {lang === 'en' ? 'Next' : 'Siguiente'}
              </span>
              <span className="font-montserrat font-semibold text-white text-sm sm:text-base
                group-hover:text-accent transition-colors duration-300">
                {nextTitle}
              </span>
            </span>
            <FaArrowRight size={12} className="text-muted flex-shrink-0
              group-hover:translate-x-1 group-hover:text-accent transition-all duration-300" />
          </Link>
        ) : <div />}
      </div>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <div className="border-t border-line px-6 sm:px-12 lg:px-20 xl:px-28 py-8
        flex items-center justify-between gap-4">
        <Link href="/#projects"
          className="font-mono text-[11px] text-muted hover:text-accent
            transition-colors tracking-widest">
          {tx.allProjects}
        </Link>
        <Link href="/contactform"
          className="font-mono text-[11px] text-muted hover:text-accent
            transition-colors tracking-widest">
          {tx.workTogether}
        </Link>
      </div>

    </main>
  );
}
