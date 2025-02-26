import React from 'react';
import SkillItem from './SkillItem';
import { designSkills } from './designSkills';
import { techSkills } from './techSkills';

const AboutMe = () => {

  return (
    <main className="flex space-x-28 items-center">
      {/* Sección de descripción */}
      <section className="flex-1">
        <div className="pr-8">
          <h1 className="font-montserrat text-6xl font-bold text-whiteCream">PAULA</h1>
          <p className='font-robotoMono mt-4'>
            Me adapto a diferentes estilos y necesidades, explorando tendencias
            y buscando formas de hacer la web más intuitiva y atractiva. Mi
            enfoque está en la accesibilidad, la interactividad y la experiencia
            de usuario, siempre con una estructura bien organizada
            <br />
            <br />
            Si quieres hablar de diseño, desarrollo o simplemente debatir sobre
            la mejor forma de animar sin perder la paciencia, hablemos.
          </p>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      {/* Sección de Skills */}
      <section className="flex-1">
        <h2 className="font-montserrat text-4xl font-medium text-whiteCream mt-2">
          SKILLS
        </h2>

        {/* Diseño */}
        <div>
          <h3 className="font-robotoMono text-2xl text-whiteCream mt-6">
            DISEÑO
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {designSkills.map((skill, index) => (
            <div key={index} className="flex">
              {/* Usamos SkillItem con sus colores por defecto */}
              <SkillItem iconSrc={skill.iconSrc} percentage={skill.percentage} />
              <div className="flex flex-col">
                <div className="font-montserrat text-4xl font-thin">
                  {skill.percentage}%
                </div>
                <div className="font-montserrat text-1xl font-bold">
                  {skill.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Front-End */}
        <div>
          <h3 className="font-robotoMono text-2xl text-whiteCream mt-12">
            FRONT-END
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {techSkills.map((skill, index) => (
            <div key={index} className="flex">
              {/* Pasamos colores distintos para las Skills Técnicas */}
              <SkillItem
                iconSrc={skill.iconSrc}
                percentage={skill.percentage}
                trackColor="#909E7B"        // Color de la parte “vacía” 
                progressColor="#C1F774"  // Color de la parte “llena”
              />
              <div className="flex flex-col">
                <div className="font-montserrat text-4xl font-thin">
                  {skill.percentage}%
                </div>
                <div className="font-montserrat text-1xl font-bold">
                  {skill.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutMe;
