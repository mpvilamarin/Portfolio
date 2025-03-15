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
            <main className="flex h-screen items-center px-24 mt-8">
                {/* Sección de descripción */}
                <section className="flex-1">
                    <div className="pr-8">
                        <h1 className="font-montserrat text-6xl font-bold text-whiteCream">ESCRÍBEME</h1>
                        <p className='font-robotoMono mt-4 text-whiteCream'>
                            ¿Tienes una idea, un proyecto o simplemente quieres hablar de diseño y desarrollo? <br /> ¡Escríbeme! Estoy abierta a nuevas colaboraciones, desafíos interesantes y conversaciones sobre cómo mejorar la experiencia digital
                            <br />
                            <br />
                            <Link href={"https://wa.me/5491164117527"}>
                            <button className="bg-green text-blackLight rounded-md px-6 py-2 text-1xl text-[600] font-robotoMono hover:translate-y-1 transition ease-in-out duration-300">
                                ¡Conectemos!
                            </button> 
                            </Link>
                        </p>
                    </div>
                </section>

                {/* Sección de Form */}
                <section className='flex-1'>
                    <FormContact />
                </section>
            </main>
        </Layout>
    )
}

export default Contact;