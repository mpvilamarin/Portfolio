import React from 'react';
import SkillBar from './SkillBar';
import { designSkills } from './designSkills';
import { techSkills } from './techSkills';
import FadeIn from './FadeIn';

const AboutMe = () => {
  return (
    <div>
      {/* Header de sección */}
      <FadeIn>
        <div className="flex items-center gap-5 mb-12 lg:mb-16">
          <span className="font-mono text-[10px] text-accent tracking-[4px]">02 /</span>
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            SOBRE MÍ
          </h2>
          <div className="flex-1 h-px bg-line" />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

        {/* ── Izquierda: texto ─────────────────── */}
        <div>
          <FadeIn delay={0.1}>
            <h3
              className="font-montserrat font-black text-white leading-none mb-6 select-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              PAULA
            </h3>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-mono text-xs sm:text-sm text-muted leading-[1.9]">
              Me adapto a diferentes estilos y necesidades, explorando tendencias
              y buscando formas de hacer la web más intuitiva y atractiva. Mi
              enfoque está en la accesibilidad, la interactividad y la experiencia
              de usuario, siempre con una estructura bien organizada.
            </p>
          </FadeIn>

          <FadeIn delay={0.28}>
            <p className="font-mono text-xs sm:text-sm text-muted leading-[1.9] mt-5">
              Si quieres hablar de diseño, desarrollo o simplemente debatir sobre
              la mejor forma de animar sin perder la paciencia, hablemos.
            </p>
          </FadeIn>

          {/* Datos rápidos */}
          <FadeIn delay={0.36}>
            <div className="grid grid-cols-2 gap-4 mt-10 pt-10 border-t border-line">
              {[
                { label: 'Experiencia',  value: '+3 años' },
                { label: 'Proyectos',    value: '+15'      },
                { label: 'Especialidad', value: 'Frontend' },
                { label: 'Idiomas',      value: 'ES · EN'  },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-1">{label}</p>
                  <p className="font-montserrat font-bold text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Derecha: skills ──────────────────── */}
        <div>
          {/* Diseño */}
          <FadeIn delay={0.15}>
            <div className="mb-10">
              <p className="font-mono text-[10px] text-accent tracking-[5px] uppercase mb-6">
                Diseño
              </p>
              <div className="flex flex-col gap-5">
                {designSkills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Separador */}
          <div className="h-px bg-line mb-10" />

          {/* Front-end */}
          <FadeIn delay={0.25}>
            <div>
              <p className="font-mono text-[10px] text-accent tracking-[5px] uppercase mb-6">
                Front-End
              </p>
              <div className="flex flex-col gap-5">
                {techSkills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
