'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import AboutMe from '@/components/AboutMe';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';
import { getFeaturedProjects, loc, toMedia, coverSrc } from '@/components/projectsContent';
import CoverMockup from '@/components/project/CoverMockup';
import { EMAIL, SOCIALS } from '@/lib/site';
import { socialIcons } from '@/lib/socialIcons';
import { trackEvent } from '@/lib/analytics';

const SECTION_PAD = 'px-6 sm:px-12 lg:px-20 xl:px-28 py-16 lg:py-24 border-t border-line';

function SocialLinks({ from, iconSize = 18, showLabel = false, className = '' }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {SOCIALS.map(({ key, name, href, label }) => {
        const Icon = socialIcons[key];
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            onClick={() => trackEvent('social_click', { network: key, from })}
            className="group flex items-center gap-2 text-muted hover:text-accent transition-colors duration-300 p-1"
          >
            <Icon size={iconSize} className="group-hover:scale-110 transition-transform duration-300" />
            {showLabel && <span className="font-mono text-xs tracking-[2px]">{label}</span>}
          </a>
        );
      })}
    </div>
  );
}

function HeroCollage({ lang, heading }) {
  const [main, ...rest] = getFeaturedProjects(4);
  const catLabels = tr[lang].categoryLabels;
  if (!main) return null;

  const mainTitle = loc(main.title, lang);
  const onClick = (slug) => () => trackEvent('project_click', { slug, from: 'hero' });

  return (
    <div>
      <h2 className="sr-only">{heading}</h2>

      {/* Tarjeta principal: portada con dos capturas superpuestas */}
      <Link href={`/projects/${main.slug}`} onClick={onClick(main.slug)} className="group block">
        <CoverMockup
          main={toMedia(main.cover.main, lang, mainTitle)}
          secondary={toMedia(main.cover.secondary, lang, mainTitle)}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="transition-transform duration-500 group-hover:-translate-y-1"
        />
        <div className="flex items-end justify-between gap-4 mt-4">
          <div className="min-w-0">
            <p className="font-mono text-xs text-accent tracking-[2px] uppercase">
              {catLabels[main.category] ?? main.category} · {loc(main.meta.client, lang)}
            </p>
            <p className="font-montserrat font-black uppercase leading-tight text-xl lg:text-2xl text-white mt-1
              group-hover:text-accent transition-colors duration-300">
              {mainTitle}
            </p>
          </div>
          <span aria-hidden className="shrink-0 text-2xl text-accent
            group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
            ↗
          </span>
        </div>
      </Link>

      {/* Otros destacados */}
      {rest.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
          {rest.map((project) => {
            const title = loc(project.title, lang);
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                onClick={onClick(project.slug)}
                className="group relative block overflow-hidden rounded-lg border border-line aspect-square
                  hover:border-accent/40 transition-colors duration-300"
                style={{ backgroundColor: '#150B0D' }}
              >
                <Image
                  src={coverSrc(project)}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 15vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(13,7,9,0.92) 100%)' }}
                />
                <p
                  className="absolute left-0 right-0 bottom-0 p-2.5 sm:p-3 font-montserrat font-bold uppercase
                    leading-tight text-xs sm:text-sm"
                  style={{ color: '#FFFFFF' }}
                >
                  {title}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ClosingCTA({ lang }) {
  const tx = tr[lang].closing;
  return (
    <section id="contact" className={`relative overflow-hidden ${SECTION_PAD}`}>
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] max-w-[600px] rounded-full
          bg-accent/[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <FadeIn>
          <p className="font-mono text-xs text-muted tracking-[3px] mb-6">
            <span className="text-accent">// </span>{tx.label.replace('// ', '')}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2
            className="font-montserrat font-black text-white leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            {tx.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-montserrat text-[1rem]/6 sm:text-lg text-muted leading-relaxed mt-6 max-w-xl">
            {tx.desc}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => trackEvent('email_click', { from: 'home-closing' })}
            className="group inline-flex items-center gap-3 mt-10 font-montserrat font-bold text-white
              hover:text-accent transition-colors duration-300 break-all
              border-b-2 border-accent/60 hover:border-accent pb-1"
            style={{ fontSize: 'clamp(1.25rem, 3.4vw, 2.25rem)' }}
          >
            {EMAIL}
            <span aria-hidden className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
          </a>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
            <Link
              href="/contactform"
              className="font-mono text-xs tracking-[2px] uppercase text-muted px-6 py-3 rounded border border-line
                hover:text-white hover:border-muted transition-colors duration-300"
            >
              {tx.form}
            </Link>
            <SocialLinks from="home-closing" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HomeContent() {
  const { lang } = useLanguage();
  const tx       = tr[lang].hero;
  const txAbout  = tr[lang].about;
  const txFooter = tr[lang].footer;
  const heroStats = [txAbout.stats[0], txAbout.stats[1], txAbout.stats[3]];

  return (
    <main>
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden
        px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-16">

        {/* Glow de fondo */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute top-1/3 right-[-10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full
            bg-accent/[0.06] blur-[130px]" />
          <div className="absolute bottom-0 left-[10%] w-[35vw] h-[35vw] max-w-[500px] rounded-full
            bg-accent/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]
          gap-12 lg:gap-16 items-center w-full">

          {/* ── Columna izquierda: texto ── */}
          <div>
            <FadeIn>
              <p className="font-mono text-xs sm:text-sm text-muted tracking-[3px] mb-6 lg:mb-8">
                <span className="text-accent">// </span>{tx.label.replace('// ', '')}
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1
                className="font-montserrat leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(2.6rem, 8.5vw, 8rem)' }}
              >
                <span className="block font-thin text-white/85">PAULA</span>
                <span className="block font-black text-white">VILLAMARÍN</span>
              </h1>
            </FadeIn>

            {/* Divider con rol */}
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 mt-6 lg:mt-8">
                <div className="h-px w-12 sm:w-20 bg-accent/50 shrink-0" />
                <p className="font-montserrat font-semibold text-[1rem]/6 sm:text-lg text-primary/85">
                  {tx.role}
                </p>
              </div>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-3 mt-10">
                <Link
                  href="/#projects"
                  className="group relative font-mono text-xs tracking-[2px] uppercase
                    border border-accent text-white px-7 py-3.5 rounded overflow-hidden
                    hover:text-base transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {tx.cta1}
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">↗</span>
                  </span>
                  <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0
                    transition-transform duration-300 ease-out" />
                </Link>
                <Link
                  href="/#contact"
                  className="font-mono text-xs tracking-[2px] uppercase
                    text-muted px-7 py-3.5 rounded border border-line
                    hover:text-white hover:border-muted transition-colors duration-300"
                >
                  {tx.cta2}
                </Link>
              </div>
            </FadeIn>

            {/* Social links */}
            <FadeIn delay={0.2}>
              <SocialLinks from="hero" showLabel className="mt-8 gap-6" />
            </FadeIn>

            {/* Datos rápidos */}
            <FadeIn delay={0.25}>
              <div className="flex gap-8 sm:gap-10 mt-10 pt-8 border-t border-line">
                {heroStats.map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-montserrat font-black text-white text-2xl sm:text-3xl leading-none">
                      {value}
                    </p>
                    <p className="font-mono text-xs text-muted tracking-[1px] uppercase mt-2">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Columna derecha: collage de proyectos ── */}
          <FadeIn delay={0.1} direction="left">
            <HeroCollage lang={lang} heading={tr[lang].featured} />
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROYECTOS
      ═══════════════════════════════════════ */}
      <section id="projects" className={`scroll-mt-16 ${SECTION_PAD}`}>
        <Projects />
      </section>

      {/* ═══════════════════════════════════════
          ABOUT ME
      ═══════════════════════════════════════ */}
      <section id="about" className={`scroll-mt-16 ${SECTION_PAD}`}>
        <AboutMe />
      </section>

      {/* ═══════════════════════════════════════
          SERVICIOS
      ═══════════════════════════════════════ */}
      <section id="services" className={`scroll-mt-16 ${SECTION_PAD}`}>
        <Services />
      </section>

      {/* ═══════════════════════════════════════
          CIERRE
      ═══════════════════════════════════════ */}
      <ClosingCTA lang={lang} />

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="border-t border-line px-6 sm:px-12 lg:px-20 xl:px-28 py-8
        flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted tracking-[1px]">
          © {new Date().getFullYear()} {txFooter.copy}
        </span>
        <SocialLinks from="footer" iconSize={16} />
      </footer>
    </main>
  );
}
