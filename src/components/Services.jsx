import Link from 'next/link';
import React from 'react';
import { FaDraftingCompass, FaCode, FaBullhorn, FaPaintBrush } from 'react-icons/fa';
import FadeIn from './FadeIn';

const services = [
  {
    num: '01',
    Icon: FaDraftingCompass,
    title: 'Diseño UX/UI',
    desc: 'Interfaces intuitivas y atractivas que mejoran la experiencia del usuario desde la primera interacción.',
  },
  {
    num: '02',
    Icon: FaCode,
    title: 'Desarrollo Web',
    desc: 'Sitios funcionales, responsivos y optimizados con tecnologías modernas como Next.js y Tailwind.',
  },
  {
    num: '03',
    Icon: FaBullhorn,
    title: 'Marketing',
    desc: 'Estrategias online para aumentar la visibilidad de la marca y conectar con la audiencia objetivo.',
  },
  {
    num: '04',
    Icon: FaPaintBrush,
    title: 'Diseño Digital',
    desc: 'Contenido visual atractivo y optimizado para plataformas digitales, redes sociales y branding.',
  },
];

export const Services = () => {
  return (
    <div>
      {/* Header de sección */}
      <FadeIn>
        <div className="flex items-center gap-5 mb-3">
          <span className="font-mono text-[10px] text-accent tracking-[4px]">01 /</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            SERVICIOS
          </h2>
          <div className="flex-1 h-px bg-line" />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="font-mono text-xs text-muted mb-12 lg:mb-16">
          ¿Listo para darle vida a tus ideas?{' '}
          <Link href="/contactform" className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors">
            ¡Hablemos!
          </Link>
        </p>
      </FadeIn>

      {/* Grid de servicios — separados por líneas de 1px */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-line border border-line">
        {services.map(({ num, Icon, title, desc }, i) => (
          <FadeIn key={num} delay={0.08 * (i + 1)}>
            <div className="group p-6 lg:p-8 bg-base hover:bg-surface transition-colors duration-500 h-full flex flex-col">
              {/* Icono y número */}
              <div className="flex items-start justify-between mb-8">
                <Icon
                  size={18}
                  className="text-accent/70 group-hover:text-accent transition-colors duration-300 group-hover:scale-110 transform"
                />
                <span className="font-mono text-[10px] text-line group-hover:text-muted transition-colors duration-300 tracking-widest">
                  {num}
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
        ))}
      </div>
    </div>
  );
};
