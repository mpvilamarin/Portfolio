'use client';
import React from 'react';
import { designSkills } from './designSkills';
import { techSkills } from './techSkills';
import FadeIn from './FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

function SkillGroup({ title, skills }) {
  return (
    <div>
      <h3 className="font-mono text-xs text-accent tracking-[3px] uppercase mb-4">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map(({ name }) => (
          <li
            key={name}
            className="font-mono text-sm text-primary/85 border border-line rounded px-3 py-1.5"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const AboutMe = () => {
  const { lang } = useLanguage();
  const tx = tr[lang].about;

  return (
    <div>
      {/* Header de sección */}
      <FadeIn>
        <div className="flex items-center gap-5 mb-10 lg:mb-14">
          <span className="font-mono text-xs text-accent tracking-[2px]">{tx.sectionNum}</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {tx.heading}
          </h2>
          <div className="flex-1 h-px bg-line" />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

        {/* ── Izquierda: texto ─────────────────── */}
        <div>
          <FadeIn delay={0.05}>
            <p className="font-montserrat text-[1rem]/6 sm:text-lg text-primary/85 leading-relaxed">
              {tx.bio1}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="font-montserrat text-[1rem]/6 sm:text-lg text-muted leading-relaxed mt-5">
              {tx.bio2}
            </p>
          </FadeIn>

          {/* Datos rápidos */}
          <FadeIn delay={0.15}>
            <dl className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-line">
              {tx.stats.map(({ label, value }) => (
                <div key={label}>
                  <dt className="font-mono text-xs text-accent tracking-[2px] uppercase mb-1">{label}</dt>
                  <dd className="font-montserrat font-bold text-white text-lg">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {/* ── Derecha: herramientas ──────────────────── */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <SkillGroup title={tx.design} skills={designSkills} />
            <div className="h-px bg-line" />
            <SkillGroup title={tx.frontend} skills={techSkills} />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default AboutMe;
