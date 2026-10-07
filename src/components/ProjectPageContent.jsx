'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes,
} from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';
import { getAllProjects, loc, toMedia, blockImages, heroMedia, heroCard } from '@/components/projectsContent';
import ProjectHero from '@/components/project/ProjectHero';
import {
  ProjectBlock, SectionLabel, BLOCK_GROUPS, ALTERNATING, COUNTER_KEY,
} from '@/components/project/blocks';
import { trackEvent } from '@/lib/analytics';

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
const PANEL_KEY = 'pv_project_panel_collapsed';

function Lightbox({ items, index, onClose, onPrev, onNext, labels }) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 p-2 text-white/70 hover:text-white transition-colors duration-300"
      >
        <FaTimes size={22} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label={labels.prevImage}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-accent transition-colors duration-300"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label={labels.nextImage}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-accent transition-colors duration-300"
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
            key={item.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="max-w-full max-h-full flex items-center justify-center"
          >
            {isVideo(item.src) ? (
              <video src={item.src} controls autoPlay loop className="max-w-full max-h-[85vh] rounded" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={item.alt} className="max-w-full max-h-[85vh] object-contain rounded" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm tracking-[2px] text-white/70">
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
  const clean = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const known = SITE_LABELS.find(([re]) => re.test(clean));
  return known ? known[1] : clean;
}

export default function ProjectPageContent({ project }) {
  const { lang } = useLanguage();
  const tx = tr[lang].projectPage;

  const title    = loc(project.title, lang);
  const tagline  = loc(project.tagline, lang);
  const meta     = project.meta ?? {};
  const client   = loc(meta.client, lang);
  const role     = loc(meta.role, lang);
  const stack    = (meta.stack ?? []).map((tag) => loc(tag, lang));
  const categoryLabel = tr[lang].categoryLabels[project.category] ?? project.category;

  const link = project.link?.href
    ? { href: project.link.href, label: loc(project.link.label, lang) ?? tx.viewSite }
    : null;
  const siteUrl   = link?.href ?? null;
  const siteLabel = siteUrl ? getSiteLabel(siteUrl) : null;

  // "UX/UI · FRONTEND · 2025": el rol separado por "+" y el año
  // roleShort (opcional) es una versión corta del rol para esta línea; la franja muestra el completo
  const roleShort = loc(meta.roleShort, lang) ?? role;
  const metaLine = [...(roleShort ? roleShort.split('+').map((r) => r.trim()) : []), meta.year]
    .filter(Boolean)
    .join(' · ');

  // Franja de datos del hero (solo los que existen).
  // Los trabajos académicos muestran cátedra, materia y tipo en vez de cliente y rol.
  const subject  = loc(meta.subject, lang);
  const academic = Boolean(meta.chair || subject);
  const facts = (academic
    ? [
        meta.chair && { label: tx.chair,   value: meta.chair },
        subject    && { label: tx.subject, value: subject },
        meta.year  && { label: tx.year,    value: meta.year },
        role       && { label: tx.type,    value: role },
      ]
    : [
        client    && { label: tx.client, value: client },
        meta.year && { label: tx.year,   value: meta.year },
        role      && { label: tx.role,   value: role },
      ]
  ).concat(siteUrl ? [{ label: tx.viewSite, value: siteLabel, href: siteUrl }] : [])
    .filter(Boolean);

  const allProjects = getAllProjects();
  const idx         = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = idx > 0                      ? allProjects[idx - 1] : null;
  const nextProject = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;
  const projectNum  = String(idx + 1).padStart(2, '0');

  /* Bloques: id, grupo del índice, número dentro de su tipo (Decisión 02…) y
     posición en la alternancia texto/imagen (la primera con la imagen a la derecha) */
  const blocks = useMemo(() => {
    let group = null;
    let run = -1;      // tramo del índice: bloques seguidos del mismo grupo
    let alt = 0;
    const counts = {};
    return (project.blocks ?? []).map((block, i) => {
      // `group` en los datos permite reasignar un bloque (ej. un spec que es una decisión)
      const own = block.group ?? BLOCK_GROUPS[block.type];
      if (own && own !== group) run += 1;
      group = own ?? group;
      const counter = COUNTER_KEY[block.type] ?? block.type;
      const index = counts[counter] ?? 0;
      counts[counter] = index + 1;
      const side = ALTERNATING.has(block.type) ? alt++ : 0;
      return { block, id: `block-${i}`, group, run: String(Math.max(run, 0)), index, alt: side, indexed: Boolean(own) };
    });
  }, [project.blocks]);

  /* Índice lateral: un ítem por grupo, en el orden en que aparece */
  const groupLabels = {
    overview:   tx.overview,
    features:   tx.features,
    flow:       tx.flow,
    decisions:  tx.decisions,
    system:     tx.system,
    compare:    tx.compare,
    research:   tx.research,
    highlights: tx.highlights,
    gallery:    tx.gallery,
  };
  // Una entrada por tramo: si un grupo vuelve a aparecer más abajo, suma otra entrada
  // en vez de hacer saltar el índice hacia atrás.
  const sections = [];
  blocks.forEach(({ id, group, run, indexed }) => {
    if (indexed && !sections.some((s) => s.run === run)) {
      sections.push({ run, group, id, label: groupLabels[group] });
    }
  });

  const [activeGroup, setActiveGroup] = useState(sections[0]?.run ?? null);
  const blockIdsKey = blocks.map((b) => b.id).join(',');

  /* Sección activa según el scroll: el último bloque cuyo inicio pasó el 35% del
     viewport. Al llegar al final de la página se marca el último bloque, aunque
     sea corto y nunca alcance esa línea. */
  useEffect(() => {
    const els = blockIdsKey.split(',').filter(Boolean)
      .map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = els[0];
      if (atBottom) {
        current = els[els.length - 1];
      } else {
        els.forEach((el) => {
          if (el.getBoundingClientRect().top <= line) current = el;
        });
      }
      setActiveGroup(current.dataset.run);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [blockIdsKey]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* Panel lateral plegable (solo desktop); la preferencia se recuerda en este navegador */
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    try { setCollapsed(localStorage.getItem(PANEL_KEY) === '1'); } catch {}
  }, []);
  const togglePanel = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem(PANEL_KEY, next ? '1' : '0'); } catch {}
      return next;
    });
  };

  /* Lightbox: todas las imágenes de los bloques, en orden y sin repetir */
  const lightboxItems = useMemo(() => {
    const seen = new Set();
    const items = [];
    (project.blocks ?? []).forEach((block) => {
      blockImages(block).forEach((img) => {
        const media = toMedia(img, lang, title);
        if (media?.src && !seen.has(media.src)) {
          seen.add(media.src);
          items.push(media);
        }
      });
    });
    return items;
  }, [project.blocks, lang, title]);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox  = (src) => setLightboxIndex(Math.max(0, lightboxItems.findIndex((m) => m.src === src)));
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);
  const showNext = () => setLightboxIndex((i) => (i + 1) % lightboxItems.length);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const count = lightboxItems.length;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + count) % count);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % count);
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, lightboxItems.length]);

  const ctx = { lang, tx, openLightbox, isWeb: ['Website Design', 'E-learning'].includes(project.category) };
  const prevTitle = prevProject ? loc(prevProject.title, lang) : null;
  const nextTitle = nextProject ? loc(nextProject.title, lang) : null;

  return (
    <main className="min-h-screen bg-base text-white">

      <ProjectHero
        slug={project.slug}
        title={title}
        tagline={tagline}
        categoryLabel={categoryLabel}
        metaLine={metaLine}
        projectNum={projectNum}
        sector={loc(project.sector, lang)}
        image={heroMedia(project, lang)}
        card={heroCard(project, lang)}
        link={link}
        facts={facts}
        labels={tx}
      />

      {/* ══════════════════════════════════════════
          CASO DE ESTUDIO — sidebar + bloques
      ══════════════════════════════════════════ */}
      <div className="border-t border-line px-6 sm:px-12 lg:px-20 xl:px-28 py-16 lg:py-24">
        <div className={`flex flex-col lg:flex-row gap-14 ${collapsed ? 'lg:gap-10' : 'lg:gap-12 xl:gap-16'}`}>

          {/* ── Sidebar (plegable en desktop) ── */}
          <aside
            className={`lg:sticky lg:top-24 lg:self-start flex-shrink-0 transition-[width] duration-300
              ${collapsed ? 'lg:w-[170px]' : 'lg:w-[200px] xl:w-[210px]'}`}
          >
            <button
              type="button"
              onClick={togglePanel}
              aria-expanded={!collapsed}
              aria-controls="project-panel"
              aria-label={collapsed ? tx.showPanel : tx.hidePanel}
              title={collapsed ? tx.showPanel : tx.hidePanel}
              className="hidden lg:flex items-center justify-center w-10 h-10 mb-6 rounded border border-line
                text-muted hover:text-accent hover:border-accent/50 transition-colors duration-300"
            >
              {collapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
            </button>

            {/* Plegado: solo el índice (número y nombre), sin los datos del proyecto */}
            {collapsed && sections.length > 1 && (
              <nav className="hidden lg:flex flex-col gap-0.5" aria-label={tx.sections}>
                {sections.map((s, i) => {
                  const isActive = activeGroup === s.run;
                  return (
                    <button
                      key={s.run}
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group flex items-center gap-2.5 py-1.5 text-left font-mono text-xs
                        transition-colors duration-300
                        ${isActive ? 'text-accent' : 'text-primary/70 hover:text-primary'}`}
                    >
                      <span className="tracking-[1px]">{String(i + 1).padStart(2, '0')}</span>
                      <span aria-hidden className={`h-px w-4 shrink-0 ${isActive ? 'bg-accent' : 'bg-line'}`} />
                      <span className="tracking-[1px] uppercase truncate">{s.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}

            <div id="project-panel" className={collapsed ? 'lg:hidden' : ''}>
              <div className="flex items-baseline gap-3 mb-8 pb-6 border-b border-line">
                <span className="font-montserrat font-black text-accent leading-none text-3xl">{projectNum}</span>
                <span className="font-mono text-xs text-muted tracking-[2px] uppercase">
                  {tx.of} {String(allProjects.length).padStart(2, '0')}
                </span>
              </div>

              {stack.length > 0 && (
                <div className="mb-8">
                  <SectionLabel text="// stack" />
                  <ul className="flex flex-wrap gap-1.5">
                    {stack.map((tag) => (
                      <li key={tag} className="font-mono text-xs text-primary/85 border border-line rounded px-2.5 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {sections.length > 1 && (
                <nav className="hidden lg:flex flex-col gap-0.5" aria-label={tx.sections}>
                  {sections.map((s, i) => {
                    const isActive = activeGroup === s.run;
                    return (
                      <button
                        key={s.run}
                        type="button"
                        onClick={() => scrollToSection(s.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className="group flex items-center gap-2.5 py-1.5 text-left"
                      >
                        <span className={`font-mono text-xs tracking-[1px] transition-colors duration-300
                          ${isActive ? 'text-accent' : 'text-primary/70'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`h-px w-4 shrink-0 transition-colors duration-300 ${isActive ? 'bg-accent' : 'bg-line'}`} />
                        <span className={`font-mono text-xs tracking-[1px] uppercase truncate transition-colors duration-300
                          ${isActive ? 'text-accent' : 'text-primary/70 group-hover:text-primary'}`}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          </aside>

          {/* ── Bloques ── */}
          {/* Espacio fijo entre bloques: 96px en móvil, 160px en desktop */}
          <div className="flex-1 min-w-0 max-w-[1200px] flex flex-col gap-24 lg:gap-40">
            {blocks.map(({ block, id, run, index, alt }) => (
              <section key={id} id={id} data-run={run} className="scroll-mt-24">
                <ProjectBlock block={block} ctx={ctx} index={index} alt={alt} title={title} />
              </section>
            ))}
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
            onClick={() => trackEvent('project_click', { slug: prevProject.slug, from: 'prev' })}
            className="group px-6 sm:px-12 lg:px-20 xl:px-28 py-7 flex items-center gap-4
              hover:bg-surface transition-colors duration-300"
          >
            <FaArrowLeft size={12} className="text-muted flex-shrink-0
              group-hover:-translate-x-1 group-hover:text-accent transition-all duration-300" />
            <span>
              <span className="block font-mono text-xs text-muted tracking-[2px] uppercase mb-1">{tx.previous}</span>
              <span className="font-montserrat font-semibold text-white text-[1rem]/6 sm:text-lg
                group-hover:text-accent transition-colors duration-300">
                {prevTitle}
              </span>
            </span>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            onClick={() => trackEvent('project_click', { slug: nextProject.slug, from: 'next' })}
            className="group px-6 sm:px-12 lg:px-20 xl:px-28 py-7 flex items-center
              justify-end gap-4 text-right hover:bg-surface transition-colors duration-300"
          >
            <span>
              <span className="block font-mono text-xs text-muted tracking-[2px] uppercase mb-1">{tx.next}</span>
              <span className="font-montserrat font-semibold text-white text-[1rem]/6 sm:text-lg
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
      <div className="border-t border-line px-6 sm:px-12 lg:px-20 xl:px-28 py-8 flex items-center justify-between gap-4">
        <Link href="/#projects" className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-[2px]">
          {tx.allProjects}
        </Link>
        <Link href="/#contact" className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-[2px]">
          {tx.workTogether}
        </Link>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={lightboxItems}
            index={lightboxIndex}
            labels={tx}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
