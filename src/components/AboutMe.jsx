import React from 'react';
import SkillItem from './SkillItem';
import { designSkills } from './designSkills';
import { techSkills } from './techSkills';

const AboutMe = () => {
  return (
    <main className="flex flex-col md:flex-row md:space-x-28 items-center md:items-start lg:space-x-16 lg:items-center">
      {/* Descripción */}
      <section className="flex-1 text-center md:text-left">
        <div className="md:pr-8 lg:pr-8">
          <h1 className="font-montserrat text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-whiteCream">
            PAULA
          </h1>
          <p className="font-robotoMono text-xs sm:text-lg mt-4 text-whiteCream lg:text-base">
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
      <section className="flex-1 mt-12 md:mt-0 w-full">
        <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-medium text-whiteCream tracking-[10px] sm:tracking-[14px] md:tracking-[17px] lg:tracking-[17px] md:text-left">
          SKILLS
        </h2>

        {/* Diseño */}
        <h3 className="font-robotoMono text-lg sm:text-xl md:text-2xl lg:text-2xl text-whiteCream mt-2 md:text-left">
          DISEÑO
        </h3>
        <div className="grid grid-cols-3 gap-2 lg:gap-2">
          {designSkills.map((skill, index) => (
            <div key={index} className="flex items-center lg:mt-4">
              <SkillItem
                iconSrc={skill.iconSrc}
                percentage={skill.percentage}
                size="small"
              />
              <div className="flex flex-col">
                <span className="font-montserrat text-lg sm:text-base text-whiteCream lg:text-3xl lg:font-thin">
                  {skill.percentage}%
                </span>
                <span className="font-montserrat text-[11px] sm:text-sm font-semibold text-whiteCream lg:text-md lg:font-bold">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Front-End */}
        <h3 className="font-robotoMono text-lg sm:text-xl md:text-2xl lg:text-2xl text-whiteCream mt-8 md:text-left lg:mt-10">
          FRONT-END
        </h3>
        <div className="grid grid-cols-3 gap-4 mt-2 lg:mt-4">
          {techSkills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2 lg:space-x-2">
              <SkillItem
                iconSrc={skill.iconSrc}
                percentage={skill.percentage}
                trackColor="#FCFCFC"
                progressColor="#C1F774"
                size="small"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-montserrat text-sm sm:text-base text-whiteCream lg:text-3xl lg:font-thin">
                  {skill.percentage}%
                </span>
                <span className="font-montserrat text-xs sm:text-sm font-bold text-whiteCream lg:text-md">
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