'use client';
import React from 'react';
import { FormContact } from '@/components/formContact';
import FadeIn from '@/components/FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';
import { EMAIL, SOCIALS } from '@/lib/site';
import { socialIcons } from '@/lib/socialIcons';
import { trackEvent } from '@/lib/analytics';

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
          <p className="font-mono text-xs sm:text-sm text-muted tracking-[3px] mb-6">
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
          <p className="font-montserrat text-[1rem]/6 sm:text-lg text-muted leading-relaxed max-w-xl">
            {tx.desc}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8">
            <p className="font-mono text-xs text-muted tracking-[2px] uppercase mb-2">{tx.emailLabel}</p>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => trackEvent('email_click', { from: 'contact' })}
              className="group inline-flex items-center gap-2 font-montserrat font-bold text-white text-xl sm:text-2xl
                hover:text-accent transition-colors duration-300 break-all
                border-b-2 border-accent/60 hover:border-accent pb-1"
            >
              {EMAIL}
              <span aria-hidden className="text-accent group-hover:translate-x-1 transition-transform">↗</span>
            </a>
          </div>
        </FadeIn>

        {/* Social icons */}
        <FadeIn delay={0.25}>
          <div className="flex items-center gap-5 mt-10 pt-10 border-t border-line">
            {SOCIALS.map(({ key, name, href }) => {
              const Icon = socialIcons[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  onClick={() => trackEvent('social_click', { network: key, from: 'contact' })}
                  className="text-muted hover:text-accent transition-colors duration-300 p-1"
                >
                  <Icon size={18} />
                </a>
              );
            })}
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
