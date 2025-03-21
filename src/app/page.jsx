import { FaGithub, FaBehance, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import AboutMe from '@/components/AboutMe';
import { Projects } from '@/components/Projects';
import Image from 'next/image';

export const metadata = {
  title: 'Home | Paula Villamarín',
  description: 'Soy Paula Villamarín, desarrolladora frontend y diseñadora gráfica. Combino código y creatividad para crear interfaces accesibles, interactivas y funcionales. Explora mis proyectos y trabajemos juntos.',
};

function HomePage() {
  return (
    <>
      <div className="min-h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <main className="min-h-screen flex flex-col px-6 sm:px-12 md:px-6 lg:px-32">
          {/* Sección Inicial */}
          <section className="flex flex-col lg:flex-row">
            <div className="min-h-screen snap-start flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
              <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-thin text-whiteCream">
                PAULA
                <br />
                <span className="font-extrabold">VILLAMARIN</span>
              </h1>
              <h2 className="font-robotoMono font-thin text-lg sm:text-xl md:text-2xl lg:text-4xl text-whiteCream tracking-[15px] mt-4">
                FRONTEND & DISEÑO
              </h2>

              {/* Botones */}
              <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start mt-8 md:mt-12 lg:mt-16 space-y-4 md:space-y-0 md:space-x-6">
                <Link href={"/"}>
                  <button className="border-green border-2 text-whiteCream rounded-md px-6 py-2 text-sm lg:text-base font-robotoMono hover:bg-green hover:text-blackLight transition">
                    Portafolio
                  </button>
                </Link>
                <Link href={"/Contact"}>
                  <button className="bg-green text-blackLight rounded-md px-6 py-2 text-sm lg:text-base font-robotoMono hover:bg-transparent hover:border-green hover:border-2 hover:text-whiteCream transition">
                    Contacto
                  </button>
                </Link>
              </div>

              {/* Íconos */}
              <div className="flex space-x-6 items-center justify-center lg:justify-start mt-12 md:mt-20 lg:mt-32">
                <Link href="https://github.com/mpvilamarin" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} className="lg:size-6 hover:translate-y-1 transition md:size-7" />
                </Link>
                <Link href="https://www.behance.net/marapvillama" target="_blank" rel="noopener noreferrer">
                  <FaBehance size={20} className="lg:size-6 hover:translate-y-1 transition" />
                </Link>
                <Link href="https://www.linkedin.com/in/maria-paula-villamarin/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={20} className="lg:size-6 hover:translate-y-1 transition md:size-7" />
                </Link>
                <Link href="https://wa.me/5491164117527" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={20} className="lg:size-6 hover:translate-y-1 transition md:size-7" />
                </Link>
              </div>
            </div>

            {/* Imagen visible desde lg */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <Image
                src="/ruta-de-tu-imagen.jpg"
                alt="Imagen principal"
                width={600}
                height={600}
                className="object-contain"
              />
            </div>
          </section>

          {/* Sección About Me */}
          <section id="about" className="min-h-screen snap-start flex items-center justify-center mt-4">
            <AboutMe />
          </section>

          {/* Sección Projects */}
          <section id="projects" className="snap-start flex items-center justify-center mt-4">
            <Projects />
          </section>
        </main>
      </div>
    </>
  );
}

export default HomePage;