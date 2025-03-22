import React from 'react'
import Head from 'next/head';
import Layout from '../layout';
import Link from 'next/link';
import { FormContact } from '@/components/formContact';

export const metadata = {
    title: 'Contacto | Paula Villamarín',
    description: 'Ponte en contacto con Paula, desarrolladora frontend y diseñadora gráfica. Estoy disponible para colaborar en proyectos y discutir ideas innovadoras en diseño y desarrollo web.',
  };

  function Contact() {
    return (
      <Layout>
        <main className="flex flex-col lg:flex-row min-h-screen items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-16 pb-8 gap-6">
          {/* Descripción */}
          <section className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="font-montserrat text-4xl sm:text-5xl md:text-6xl font-bold text-whiteCream">
              ESCRÍBEME
            </h1>
            <p className="font-robotoMono text-xs sm:text-sm md:text-base mt-4 text-whiteCream">
              ¿Tienes una idea, un proyecto o simplemente quieres hablar de diseño y desarrollo?
              <br />¡Escríbeme! Estoy abierta a nuevas colaboraciones, desafíos interesantes y conversaciones sobre cómo mejorar la experiencia digital.
            </p>
  
            <Link href="https://wa.me/5491164117527" target="_blank" rel="noopener noreferrer">
              <button className="mt-6 bg-green text-blackLight rounded-md px-6 py-2 text-sm sm:text-base font-robotoMono font-semibold hover:translate-y-1 transition">
                ¡Conectemos!
              </button>
            </Link>
          </section>
  
          {/* Formulario */}
          <section className="w-full lg:w-1/2">
            <FormContact />
          </section>
        </main>
      </Layout>
    );
  }
  
  export default Contact;  