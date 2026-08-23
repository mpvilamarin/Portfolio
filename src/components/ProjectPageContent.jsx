'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaExpand, FaTimes } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';
import { getAllProjects } from '@/components/projectsContent';
import FadeIn from '@/components/FadeIn';
import SkillBar from '@/components/SkillBar';

const GALLERY_SPANS = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-2',
];

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

function MediaTile({ src, alt = '', onClick }) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(src);
  const media = isVideo ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover transition-transform
        duration-500 group-hover:scale-[1.06]"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform
        duration-500 group-hover:scale-[1.06]"
    />
  );

  if (!onClick) return media;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={alt}
      className="group absolute inset-0 w-full h-full overflow-hidden text-left"
    >
      {media}
      <div className="absolute inset-0 bg-base/0 group-hover:bg-base/40
        transition-colors duration-300" />
      <span className="absolute inset-0 flex items-center justify-center opacity-0
        group-hover:opacity-100 transition-opacity duration-300">
        <span className="flex items-center justify-center w-10 h-10 rounded-full
          border border-white/40 bg-base/60 backdrop-blur-sm text-white">
          <FaExpand size={13} />
        </span>
      </span>
    </button>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext, title }) {
  const src = items[index];
  if (!src) return null;
  const isVideo = /\.(mp4|webm|mov)$/i.test(src);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center
        bg-base/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 text-white/70
          hover:text-white transition-colors duration-300"
      >
        <FaTimes size={22} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Anterior"
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3
              text-white/70 hover:text-accent transition-colors duration-300"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Siguiente"
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3
              text-white/70 hover:text-accent transition-colors duration-300"
          >
            <FaArrowRight size={20} />
          </button>
        </>
      )}

      <div
        className="relative w-full h-full flex items-center justify-center p-6 sm:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="max-w-full max-h-full flex items-center justify-center"
          >
            {isVideo ? (
              <video
                src={src}
                controls
                autoPlay
                loop
                className="max-w-full max-h-[85vh] rounded"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={title ?? ''}
                className="max-w-full max-h-[85vh] object-contain rounded"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2
          font-mono text-[11px] tracking-[3px] text-white/60">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>
      )}
    </motion.div>
  );
}

const SITE_LABELS = [
  [/(^|\.)instagram\.com/i, 'Instagram'],
  [/(^|\.)behance\.net/i, 'Behance'],
  [/(^|\.)dribbble\.com/i, 'Dribbble'],
  [/(^|\.)linkedin\.com/i, 'LinkedIn'],
];

function getSiteLabel(url) {
  const clean = url.replace(/^https?:\/\//, '');
  const known = SITE_LABELS.find(([re]) => re.test(clean));
  return known ? known[1] : clean;
}

function FactRow({ label, children }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <p className="font-mono text-[10px] text-muted tracking-[3px] uppercase mb-1.5">
        {label}
      </p>
      <div className="font-montserrat font-semibold text-white text-sm">{children}</div>
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

  const client  = lang === 'en' && project.en?.client  ? project.en.client  : project.client;
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
  const siteLabel = hasUrl ? getSiteLabel(project.url) : null;
  const gallery   = project.gallery?.filter(Boolean) ?? [];
  const hasTags   = project.tags?.length > 0;
  const heroImage = project.image || project.frontImage || gallery[0] || null;

  // Imágenes restantes de la galería (sin repetir la del hero), distribuidas
  // a lo largo del contenido en vez de amontonadas en un único bloque final.
  const galleryAfterHero = gallery.filter((src) => src !== heroImage);
  const overviewImage    = galleryAfterHero[0] ?? null;
  const bannerImage      = galleryAfterHero[1] ?? null;
  const mosaicImages     = galleryAfterHero.slice(2);

  const prevTitle = prevProject
    ? (lang === 'en' && prevProject.en ? prevProject.en.title : prevProject.title) : null;
  const nextTitle = nextProject
    ? (lang === 'en' && nextProject.en ? nextProject.en.title : nextProject.title) : null;

  const sections = [
    { id: 'overview', label: lang === 'en' ? 'Overview' : 'Resumen' },
    ...(process?.length > 0 ? [{ id: 'process', label: lang === 'en' ? 'Process' : 'Proceso' }] : []),
    ...(results?.length > 0 ? [{ id: 'results', label: lang === 'en' ? 'Results' : 'Resultados' }] : []),
    ...(mosaicImages.length > 0 ? [{ id: 'gallery', label: lang === 'en' ? 'Gallery' : 'Galería' }] : []),
  ];
  const sectionIdsKey = sections.map((s) => s.id).join(',');

  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const ids = sectionIdsKey.split(',').filter(Boolean);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIdsKey]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (src) => setLightboxIndex(gallery.indexOf(src));
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const showNext = () => setLightboxIndex((i) => (i + 1) % gallery.length);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, gallery.length]);

  return (
    <main className="min-h-screen bg-base text-white">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden
        px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-20">

        {heroImage && (
          <>
            <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden>
              <Image
                src={heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute inset-0 z-[1] pointer-events-none select-none"
              aria-hidden
              style={{
                background:
                  'linear-gradient(180deg, rgba(13,7,9,0.55) 0%, rgba(13,7,9,0.82) 55%, rgba(13,7,9,0.97) 100%), rgba(13,7,9,0.35)',
              }}
            />
          </>
        )}

        <div className="absolute inset-0 z-[2] pointer-events-none select-none" aria-hidden>
          <div className="absolute top-1/3 right-[-10%] w-[50vw] h-[50vw] max-w-[700px]
            rounded-full bg-accent/[0.06] blur-[130px]" />
          <div className="absolute bottom-0 left-[10%] w-[35vw] h-[35vw] max-w-[500px]
            rounded-full bg-accent/[0.04] blur-[100px]" />
        </div>

        <div
          className="absolute inset-0 z-[2] pointer-events-none select-none opacity-[0.03]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(#F43F5E 1px, transparent 1px), linear-gradient(90deg, #F43F5E 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-montserrat font-black
            text-white/[0.03] select-none pointer-events-none leading-none z-[2]"
          style={{ fontSize: 'clamp(10rem, 35vw, 28rem)' }}
          aria-hidden
        >
          {projectNum}
        </span>

        <div className="absolute top-20 left-6 sm:left-12 lg:left-20 xl:left-28 z-10">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 font-mono text-[11px] hero-muted
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
              hero-accent border hero-border-accent-50 px-3 py-1 rounded-sm mb-8 lg:mb-10">
              {project.category}
            </span>
          </FadeIn>

          <div className="overflow-hidden">
            <FadeIn delay={0.15}>
              <h1
                className="font-montserrat leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 8.5rem)' }}
              >
                <span className="block font-black hero-white uppercase">{content.title}</span>
              </h1>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="flex items-center gap-4 mt-6 lg:mt-8">
              <div className="h-px w-16 sm:w-24 bg-accent/50" />
              <p className="font-mono text-[10px] sm:text-xs hero-muted tracking-[3px] uppercase">
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
                    border hero-border-accent hero-white px-7 py-3 rounded overflow-hidden
                    inline-flex hover:text-base transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {tx.viewSite}
                    <FaExternalLinkAlt size={10}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="absolute inset-0 hero-bg-accent translate-x-[-101%]
                    group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </a>
              </div>
            </FadeIn>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pb-5 flex items-center gap-3 hero-muted">
            <div className="w-px h-8 hero-bg-line relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full hero-bg-accent
                animate-[scrollDown_1.8s_ease-in-out_infinite]" />
            </div>
            <span className="font-mono text-[9px] tracking-[4px] uppercase">scroll</span>
          </div>

          {/* ── Metadata strip ── */}
          <div className="border-t hero-border-line bg-surface/90 backdrop-blur-sm">
            <div className="px-6 sm:px-12 lg:px-20 xl:px-28
              grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 hero-divide-line">

              {/* Cliente */}
              <div className="py-5 px-6 first:pl-0">
                <p className="font-mono text-[11px] hero-muted tracking-[3px] uppercase mb-2">
                  {lang === 'en' ? 'Client' : 'Cliente'}
                </p>
                <p className="font-montserrat font-semibold hero-white text-base">
                  {client}
                </p>
              </div>

              {/* Año */}
              <div className="py-5 px-6">
                <p className="font-mono text-[11px] hero-muted tracking-[3px] uppercase mb-2">
                  {lang === 'en' ? 'Year' : 'Año'}
                </p>
                <p className="font-montserrat font-semibold hero-white text-base">
                  {project.year ?? '—'}
                </p>
              </div>

              {/* Rol */}
              <div className="py-5 px-6">
                <p className="font-mono text-[11px] hero-muted tracking-[3px] uppercase mb-2">
                  {lang === 'en' ? 'Role' : 'Rol'}
                </p>
                <p className="font-montserrat font-semibold hero-white text-base">{role}</p>
              </div>

              {/* URL */}
              <div className="py-5 px-6 lg:pr-0">
                <p className="font-mono text-[11px] hero-muted tracking-[3px] uppercase mb-2">
                  {lang === 'en' ? 'View site' : 'Ver sitio'}
                </p>
                {hasUrl ? (
                  <a
                    href={siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-montserrat font-semibold
                      hero-white hover:text-accent transition-colors text-base"
                  >
                    {siteLabel}
                    <FaExternalLinkAlt size={10} />
                  </a>
                ) : (
                  <p className="font-montserrat font-semibold hero-muted text-base">—</p>
                )}
              </div>

            </div>
          </div>
        </div>

        <style>{`
          @keyframes scrollDown {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          /* El hero siempre va sobre una imagen oscura: estos colores se
             mantienen fijos sin importar el tema claro/oscuro del sitio. */
          .hero-white          { color: #FFFFFF; }
          .hero-muted          { color: #9D8B8E; }
          .hero-accent         { color: #F43F5E; }
          .hero-bg-accent      { background-color: #F43F5E; }
          .hero-bg-line        { background-color: #2D1519; }
          .hero-border-accent      { border-color: #F43F5E; }
          .hero-border-accent-50   { border-color: rgba(244,63,94,0.5); }
          .hero-border-line        { border-color: #2D1519; }
          .hero-divide-line > :not([hidden]) ~ :not([hidden]) { border-color: #2D1519; }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          CASO DE ESTUDIO — sidebar + contenido
      ══════════════════════════════════════════ */}
      <div className="px-6 sm:px-12 lg:px-20 xl:px-28 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-16 xl:gap-24">

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start lg:w-[240px] xl:w-[280px] flex-shrink-0">
            <FadeIn>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-montserrat font-black text-accent leading-none text-4xl">
                  {projectNum}
                </span>
                <span className="font-mono text-[10px] text-muted tracking-[3px] uppercase">
                  {lang === 'en' ? 'of' : 'de'} {String(allProjects.length).padStart(2, '0')}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="flex flex-col divide-y divide-line/60 border-y border-line/60 mb-10">
                <FactRow label={lang === 'en' ? 'Client' : 'Cliente'}>{client}</FactRow>
                <FactRow label={lang === 'en' ? 'Year' : 'Año'}>{project.year ?? '—'}</FactRow>
                <FactRow label={lang === 'en' ? 'Role' : 'Rol'}>{role}</FactRow>
                <FactRow label={lang === 'en' ? 'View site' : 'Ver sitio'}>
                  {hasUrl ? (
                    <a
                      href={siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white
                        hover:text-accent transition-colors"
                    >
                      {siteLabel}
                      <FaExternalLinkAlt size={9} />
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </FactRow>
              </div>
            </FadeIn>

            {hasTags && (
              <FadeIn delay={0.1}>
                <div className="mb-10">
                  <SectionLabel text="// stack" />
                  <div className="flex flex-col gap-5">
                    {project.tags.map((tag) => (
                      <SkillBar key={tag.name} name={tag.name} percentage={tag.percentage} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {sections.length > 1 && (
              <FadeIn delay={0.15}>
                <nav className="flex flex-col gap-1" aria-label={lang === 'en' ? 'Sections' : 'Secciones'}>
                  {sections.map((s, i) => {
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollToSection(s.id)}
                        className="group flex items-center gap-3 py-2 text-left"
                      >
                        <span className={`font-mono text-[10px] tracking-[2px] transition-colors
                          duration-300 ${isActive ? 'text-accent' : 'text-primary/70'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`h-px flex-1 transition-colors duration-300
                          ${isActive ? 'bg-accent' : 'bg-line'}`} />
                        <span className={`font-mono text-[10px] tracking-[3px] uppercase
                          transition-colors duration-300
                          ${isActive ? 'text-accent' : 'text-primary/70 group-hover:text-primary'}`}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </FadeIn>
            )}
          </aside>

          {/* ── Contenido ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-20 lg:gap-28">

            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <SectionLabel text="// overview" />
              <div className={`grid grid-cols-1 items-start ${
                overviewImage ? 'lg:grid-cols-2 gap-10 lg:gap-14' : ''}`}>
                <div className={overviewImage ? '' : 'max-w-[70ch]'}>
                  <p className="font-montserrat font-semibold text-white text-xl lg:text-2xl
                    leading-snug mb-6">
                    {content.subtitle}
                  </p>
                  <p className="font-mono text-sm text-muted leading-[2.2]">
                    {content.description}
                  </p>
                </div>
                {overviewImage && (
                  <div className="relative rounded-lg overflow-hidden border border-line
                    hover:border-accent/30 transition-colors duration-300 aspect-[4/3]">
                    <MediaTile
                      src={overviewImage}
                      alt={`${content.title} — overview`}
                      onClick={() => openLightbox(overviewImage)}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Proceso */}
            {process?.length > 0 && (
              <section id="process" className="scroll-mt-24">
                <SectionLabel text={lang === 'en' ? '// process' : '// proceso'} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {process.map((step) => (
                    <div
                      key={step.num}
                      className="border border-line rounded p-6 hover:border-accent/30
                        transition-colors duration-300"
                    >
                      <p className="font-mono text-xs text-accent tracking-[3px] mb-4">
                        {step.num} —
                      </p>
                      <p className="font-montserrat font-semibold text-white text-base mb-3">
                        {step.title}
                      </p>
                      <p className="font-mono text-sm text-muted leading-[1.8]">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Imagen de banner, integrada entre secciones */}
            {bannerImage && (
              <div className="relative rounded-lg overflow-hidden border border-line
                hover:border-accent/30 transition-colors duration-300
                aspect-[16/9] lg:aspect-[21/9]">
                <MediaTile
                  src={bannerImage}
                  alt={`${content.title} — detalle`}
                  onClick={() => openLightbox(bannerImage)}
                />
              </div>
            )}

            {/* Resultados */}
            {results?.length > 0 && (
              <section id="results" className="scroll-mt-24">
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

            {/* Galería — el resto de las imágenes */}
            {mosaicImages.length > 0 && (
              <section id="gallery" className="scroll-mt-24">
                <SectionLabel text={lang === 'en' ? '// gallery' : '// galería'} />
                <div className="grid grid-cols-4 sm:grid-cols-6 auto-rows-[70px] sm:auto-rows-[90px]
                  [grid-auto-flow:dense] gap-2">
                  {mosaicImages.map((src, i) => {
                    const span = GALLERY_SPANS[i % GALLERY_SPANS.length];
                    return (
                      <div
                        key={src}
                        className={`relative overflow-hidden rounded border border-line
                          hover:border-accent/30 transition-colors duration-300 bg-base ${span}`}
                      >
                        <MediaTile
                          src={src}
                          alt={`${content.title} — ${i + 1}`}
                          onClick={() => openLightbox(src)}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>

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

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={gallery}
            index={lightboxIndex}
            title={content.title}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>

    </main>
  );
}
