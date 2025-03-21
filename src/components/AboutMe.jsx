import React from 'react';
import SkillItem from './SkillItem';
import { designSkills } from './designSkills';
import { techSkills } from './techSkills';

const AboutMe = () => {
  return (
    <main className="flex flex-col lg:flex-row lg:space-x-28 items-center lg:items-start px-6">
      {/* Descripción */}
      <section className="flex-1 text-center lg:text-left">
        <div className="lg:pr-8">
          <h1 className="font-montserrat text-4xl lg:text-6xl font-bold text-whiteCream md:text-6xl">
            PAULA
          </h1>
          <p className="font-robotoMono text-xs sm:text-sm md:text-sm mt-4 text-whiteCream">
            Me adapto a diferentes estilos y necesidades, explorando tendencias
            y buscando formas de hacer la web más intuitiva y atractiva. Mi
            enfoque está en la accesibilidad, la interactividad y la experiencia
            de usuario, siempre con una estructura bien organizada.
            <br />
            <br />
            Si quieres hablar de diseño, desarrollo o simplemente debatir sobre
            la mejor forma de animar sin perder la paciencia, hablemos.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="flex-1 mt-12 w-full max-w-[900px] text-center lg:text-left px-2">
        <h2 className="font-montserrat text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-whiteCream tracking-[6px] sm:tracking-[10px] md:tracking-[14px] lg:tracking-[17px] text-center lg:text-left">
          SKILLS
        </h2>

        {/* Diseño */}
        <h3 className="font-robotoMono text-sm sm:text-base md:text-xl lg:text-2xl text-whiteCream mt-2 text-center lg:text-left md:mt-6">
          DISEÑO
        </h3>
        <div className="grid grid-cols-3 gap-2 mt-2 md:gap-6">
          {designSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <SkillItem
                iconSrc={skill.iconSrc}
                percentage={skill.percentage}
                size="small"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-montserrat text-xs sm:text-sm lg:text-base md:text-2xl text-whiteCream">
                  {skill.percentage}%
                </span>
                <span className="font-montserrat text-[10px] sm:text-xs lg:text-sm md:text-sm font-semibold text-whiteCream">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Front-End */}
        <h3 className="font-robotoMono text-sm sm:text-base md:text-xl lg:text-2xl text-whiteCream mt-6 lg:mt-16 text-center lg:text-left md:mt-12">
          FRONT-END
        </h3>
        <div className="grid grid-cols-3 gap-2 mt-2 md:gap-6">
          {techSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <SkillItem
                iconSrc={skill.iconSrc}
                percentage={skill.percentage}
                trackColor="#FCFCFC"
                progressColor="#C1F774"
                size="small"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-montserrat text-xs sm:text-sm lg:text-base md:text-2xl text-whiteCream">
                  {skill.percentage}%
                </span>
                <span className="font-montserrat text-[10px] sm:text-xs lg:text-sm font-bold md:text-sm text-whiteCream">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutMe;