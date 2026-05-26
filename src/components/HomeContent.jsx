'use client';
import { FaGithub, FaBehance, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import AboutMe from '@/components/AboutMe';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

const socials = [
  { href: 'https://github.com/mpvilamarin',                             icon: FaGithub,   label: 'GH' },
  { href: 'https://www.behance.net/marapvillama',                       icon: FaBehance,  label: 'BE' },
  { href: 'https://www.linkedin.com/in/maria-paula-villamarin/',        icon: FaLinkedin, label: 'LI' },
  { href: 'https://wa.me/5491164117527',                                icon: FaWhatsapp, label: 'WA' },
];

export default function HomeContent() {
  const { lang } = useLanguage();
  const tx = tr[lang].hero;
  const txFooter = tr[lang].footer;

  return (
    <main>
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden
        px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-16">

        {/* Glow de fondo */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute top-1/3 right-[-10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full
            bg-accent/[0.06] blur-[130px]" />
          <div className="absolute bottom-0 left-[10%] w-[35vw] h-[35vw] max-w-[500px] rounded-full
            bg-accent/[0.04] blur-[100px]" />
        </div>

        {/* Etiqueta superior */}
        <FadeIn delay={0.05}>
          <p className="font-mono text-[11px] text-muted tracking-[5px] mb-8 lg:mb-10">
            <span className="text-accent">// </span>{tx.label.replace('// ', '')}
          </p>
        </FadeIn>

        {/* Nombre — oversized editorial */}
        <div className="relative z-10">
          <div className="overflow-hidden">
            <FadeIn delay={0.15}>
              <h1
                className="font-montserrat leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(3rem, 14vw, 11rem)' }}
              >
                <span className="block font-thin text-white/85">PAULA</span>
                <span className="block font-black text-white">VILLAMARÍN</span>
              </h1>
            </FadeIn>
          </div>

          {/* Divider con rol */}
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-4 mt-6 lg:mt-8">
              <div className="h-px w-16 sm:w-24 bg-accent/50" />
              <p className="font-mono text-[10px] sm:text-xs text-muted tracking-[3px] uppercase">
                {tx.role}
              </p>
            </div>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn delay={0.42}>
            <div className="flex flex-wrap gap-3 mt-10 lg:mt-14">
              <Link href="/#projects">
                <button className="group relative font-mono text-[11px] tracking-[3px] uppercase
                  border border-accent text-white px-7 py-3 rounded overflow-hidden
                  hover:text-base transition-colors duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    {tx.cta1}
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">↗</span>
                  </span>
                  <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0
                    transition-transform duration-300 ease-out" />
                </button>
              </Link>
              <Link href="/contactform">
                <button className="font-mono text-[11px] tracking-[3px] uppercase
                  text-muted px-7 py-3 rounded border border-line
                  hover:text-white hover:border-muted transition-colors duration-300">
                  {tx.cta2}
                </button>
              </Link>
            </div>
          </FadeIn>

          {/* Social links */}
          <FadeIn delay={0.54}>
            <div className="flex items-center gap-6 mt-10 lg:mt-14">
              <span className="font-mono text-xs text-line">—</span>
              {socials.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted hover:text-accent transition-colors duration-300"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-mono text-[10px] tracking-[3px]">{label}</span>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 xl:left-28
          flex items-center gap-3 text-muted">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-line relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-accent
                animate-[scrollDown_1.8s_ease-in-out_infinite]" />
            </div>
          </div>
          <span className="font-mono text-[9px] tracking-[4px] uppercase">{tx.scroll}</span>
        </div>

        <style>{`
          @keyframes scrollDown {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          SERVICIOS
      ═══════════════════════════════════════ */}
      <section id="services" className="px-6 sm:px-12 lg:px-20 xl:px-28 py-24 lg:py-32 border-t border-line">
        <Services />
      </section>

      {/* ═══════════════════════════════════════
          ABOUT ME
      ═══════════════════════════════════════ */}
      <section id="about" className="px-6 sm:px-12 lg:px-20 xl:px-28 py-24 lg:py-32 border-t border-line">
        <AboutMe />
      </section>

      {/* ═══════════════════════════════════════
          PROYECTOS
      ═══════════════════════════════════════ */}
      <section id="projects" className="px-6 sm:px-12 lg:px-20 xl:px-28 py-24 lg:py-32 border-t border-line">
        <Projects />
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="border-t border-line px-6 sm:px-12 lg:px-20 xl:px-28 py-8
        flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-line tracking-widest">
          {txFooter.copy}
        </span>
        <div className="flex items-center gap-5">
          {socials.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-line hover:text-accent transition-colors duration-300">
              <Icon size={13} />
            </Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
