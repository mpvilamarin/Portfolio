import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AboutMe from '@/components/AboutMe';
import { Projects } from '@/components/Projects';
import Layout from './layout'

export const metadata = {
  title: 'Home | Paula Villamarín',
  description: 'Soy Paula Villamarín, desarrolladora frontend y diseñadora gráfica. Combino código y creatividad para crear interfaces accesibles, interactivas y funcionales. Explora mis proyectos y trabajemos juntos.',
};

function HomePage() {
  return (
    <Layout>
      {/* Contenedor con scroll snapping */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <main className="min-h-screen flex flex-col py-16 px-24">
          {/* Sección Inicial */}
          <section className="h-screen snap-start flex flex-col justify-center">
            <h1 className="font-montserrat text-8xl text-whiteCream mt-16">
              PAULA
              <br />
              <span className="font-extrabold text-whiteCream">VILLAMARIN</span>
            </h1>
            <h2 className="font-robotoMono font-thin text-4xl text-whiteCream tracking-[17px]">
              FRONTEND & DISEÑO
            </h2>
            <div className="flex items-center space-x-20 mt-16">
              <Link href={"/"}>
                <button className="border-solid border-green border-2 text-whiteCream rounded-md px-6 py-2 text-1xl text-[600] font-robotoMono hover:bg-green hover:text-blackLight transition ease-in-out duration-300">
                  Portafolio
                </button>
              </Link>
              <Link href={"/Contact"}>
                <button className="bg-green text-blackLight rounded-md px-6 py-2 text-1xl text-[600] font-robotoMono hover:bg-transparent hover:border-solid hover:border-green hover:border-2 hover:text-whiteCream transition ease-in-out duration-300">
                  Contacto
                </button>
              </Link>
            </div>
            <div className="flex space-x-12 items-center mt-32">
              <Link href={"/"} target="_blank" rel="noopener noreferrer">
                <Image src="/icons/instagram.png" alt="imagen1" width={24} height={24} className="hover:translate-y-1 transition ease-out duration-500" />
              </Link>
              <Link href={"https://www.behance.net/marapvillama"} target="_blank" rel="noopener noreferrer">
                <Image src="/icons/behance.png" alt="imagen1" width={27} height={27} className="hover:translate-y-1 transition ease-out duration-500" />
              </Link>
              <Link href={"https://www.linkedin.com/in/maria-paula-villamarin/"} target="_blank" rel="noopener noreferrer">
                <Image src="/icons/linkedin.png" alt="imagen1" width={24} height={24} className="hover:translate-y-1 transition ease-out duration-500" />
              </Link>
              <Link href={"https://wa.me/5491164117527"} target="_blank" rel="noopener noreferrer">
                <Image src="/icons/whatsapp.png" alt="imagen1" width={24} height={24} className="hover:translate-y-1 transition ease-out duration-500" />
              </Link>
            </div>
          </section>

          {/* Sección About Me */}
          <section id="about" className="h-screen snap-start flex items-center justify-center">
            <AboutMe />
          </section>

          {/* Sección Projects */}
          <section id="projects" className="h-screen snap-start flex items-center justify-center">
            <Projects />
          </section>
        </main>
      </div>
    </Layout>
  );
}

export default HomePage;
