'use client';
import React from 'react';
import Link from 'next/link';
import { FormContact } from '@/components/formContact';
import FadeIn from '@/components/FadeIn';
import { FaGithub, FaBehance, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

const socials = [
  { href: 'https://github.com/mpvilamarin',                      icon: FaGithub   },
  { href: 'https://www.behance.net/marapvillama',                icon: FaBehance  },
  { href: 'https://www.linkedin.com/in/maria-paula-villamarin/', icon: FaLinkedin },
  { href: 'https://wa.me/5491164117527',                         icon: FaWhatsapp },
];

export default function ContactContent() {
  const { lang } = useLanguage();
  const tx = tr[lang].contact;

  return (
    <main className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden
      px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-16 gap-12 lg:gap-24">

      {/* Glow de fondo */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full
          bg-accent/[0.05] blur-[120px]" />
      </div>

      {/* ── Izquierda: info ────────────────────────── */}
      <section className="relative z-10 flex-1 flex flex-col justify-center">

        <FadeIn delay={0.05}>
          <p className="font-mono text-[11px] text-muted tracking-[5px] mb-6">
            <span className="text-accent">// </span>{tx.label.replace('// ', '')}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1
            className="font-montserrat font-black text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            {tx.heading}
          </h1>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="font-mono text-xs sm:text-sm text-muted leading-[1.9] max-w-[80%]">
            {tx.desc}
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <Link
            href="https://wa.me/5491164117527"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="group relative mt-8 font-mono text-[11px] tracking-[3px] uppercase
              border border-accent text-white px-7 py-3 rounded overflow-hidden
              hover:text-base transition-colors duration-300">
              <span className="relative z-10 flex items-center gap-2">
                {tx.cta} <span className="group-hover:translate-x-1 inline-block transition-transform">↗</span>
              </span>
              <span className="absolute inset-0 bg-accent translate-x-[-101%]
                group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </button>
          </Link>
        </FadeIn>

        {/* Social icons */}
        <FadeIn delay={0.45}>
          <div className="flex items-center gap-5 mt-10 pt-10 border-t border-line">
            {socials.map(({ href, icon: Icon }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors duration-300"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Derecha: formulario ───────────────────── */}
      <section className="relative z-10 flex-1 flex items-center justify-center lg:justify-start">
        <FadeIn delay={0.2} className="w-full">
          <FormContact />
        </FadeIn>
      </section>
    </main>
  );
}
