'use client';
import Link from 'next/link';
import React from 'react';
import { FaDraftingCompass, FaCode, FaBullhorn, FaPaintBrush } from 'react-icons/fa';
import FadeIn from './FadeIn';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

const icons = [FaDraftingCompass, FaCode, FaBullhorn, FaPaintBrush];
const nums  = ['01', '02', '03', '04'];

export const Services = () => {
  const { lang } = useLanguage();
  const tx = tr[lang].services;

  return (
    <div>
      {/* Header de sección */}
      <FadeIn>
        <div className="flex items-center gap-5 mb-3">
          <span className="font-mono text-[10px] text-accent tracking-[4px]">{tx.sectionNum}</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {tx.heading}
          </h2>
          <div className="flex-1 h-px bg-line" />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-mono text-xs text-muted mb-12 lg:mb-16">
          {tx.cta}{' '}
          <Link href="/contactform" className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors">
            {tx.ctaLink}
          </Link>
        </p>
      </FadeIn>

      {/* Grid de servicios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-line border border-line">
        {tx.items.map(({ title, desc }, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={nums[i]} delay={0.08 * (i + 1)}>
              <div className="group p-6 lg:p-8 bg-base hover:bg-surface transition-colors duration-500 h-full flex flex-col">
                {/* Icono y número */}
                <div className="flex items-start justify-between mb-8">
                  <Icon
                    size={18}
                    className="text-accent/70 group-hover:text-accent transition-colors duration-300 group-hover:scale-110 transform"
                  />
                  <span className="font-mono text-[10px] text-line group-hover:text-muted transition-colors duration-300 tracking-widest">
                    {nums[i]}
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-montserrat font-bold text-white text-sm lg:text-base mb-3 tracking-wide">
                  {title}
                </h3>

                {/* Descripción */}
                <p className="font-mono text-xs text-muted leading-relaxed mt-auto">
                  {desc}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
};
