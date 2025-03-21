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
      {/* Contenedor con scroll snapping */}
      <div className="min-h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <main className="min-h-screen flex flex-col px-6 sm:px-16 md:px-24 lg:px-32">
          {/* Sección Inicial */}
          <section className="flex flex-col md:flex-row">
            <div className="min-h-screen snap-start flex flex-col justify-center items-center text-center md:items-start md:text-left">
              <h1 className="font-montserrat text-5xl font-thin md:text-8xl text-whiteCream">
                PAULA
                <br />
                <span className="font-extrabold">VILLAMARIN</span>
              </h1>
              <h2 className="font-robotoMono font-thin text-xl sm:text-2xl md:text-4xl text-whiteCream tracking-widest mt-4">
                FRONTEND & DISEÑO
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mt-8 md:mt-16 space-y-4 md:space-y-0 md:space-x-6">
                <Link href={"/"}>
                  <button className="border-green border-2 text-whiteCream rounded-md px-6 py-2 text-xs font-robotoMono hover:bg-green hover:text-blackLight transition ease-in-out duration-300">
                    Portafolio
                  </button>
                </Link>
                <Link href={"/Contact"}>
                  <button className="bg-green text-blackLight rounded-md px-6 py-2 text-xs font-robotoMono hover:bg-transparent hover:border-green hover:border-2 hover:text-whiteCream transition ease-in-out duration-300">
                    Contacto
                  </button>
                </Link>
              </div>
              <div className="flex space-x-6 items-center justify-center md:justify-start mt-14 md:mt-32">
                <Link href={"https://github.com/mpvilamarin"} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="hover:translate-y-1 transition ease-out duration-500" />
                </Link>
                <Link href={"https://www.behance.net/marapvillama"} target="_blank" rel="noopener noreferrer">
                  <FaBehance size={24} className="hover:translate-y-1 transition ease-out duration-500" />
                </Link>
                <Link href={"https://www.linkedin.com/in/maria-paula-villamarin/"} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="hover:translate-y-1 transition ease-out duration-500" />
                </Link>
                <Link href={"https://wa.me/5491164117527"} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={24} className="hover:translate-y-1 transition ease-out duration-500" />
                </Link>
              </div>
            </div>

            {/* Imagen solo visible en md+ */}
            <div className="hidden md:flex flex-1 items-center justify-center">
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