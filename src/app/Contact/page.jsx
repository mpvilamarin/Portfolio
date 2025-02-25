import React from 'react'
import Head from 'next/head';
import Layout from '../layout';
import Link from 'next/link';
import { FormContact } from '@/components/formContact';

function Contact() {
    return (
        <Layout>
            <Head>
                <meta name="contacto" content="pagina para contactarse con Paula Villamarin" />
                <title>Contacto | </title>
            </Head>
            <main className="flex h-screen items-center px-24 mt-8">
                {/* Sección de descripción */}
                <section className="flex-1">
                    <div className="pr-8">
                        <h1 className="font-montserrat text-6xl font-bold text-whiteCream">ESCRÍBEME</h1>
                        <p className='font-robotoMono mt-4'>
                            ¿Tienes una idea, un proyecto o simplemente quieres hablar de diseño y desarrollo? ¡Escríbeme! Estoy abierta a nuevas colaboraciones, desafíos interesantes y conversaciones sobre cómo mejorar la experiencia digital
                            <br />
                            <br />
                            <Link href={"https://wa.me/5491164117527"}>
                            <button className="border-solid border-green border-2 text-whiteCream rounded-md px-4 py-2 text-md text-[600] font-robotoMono hover:bg-green hover:text-blackLight transition ease-in-out duration-500 mt-4">
                                ¡CONECTEMOS!
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