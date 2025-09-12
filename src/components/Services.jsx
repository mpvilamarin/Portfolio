import Link from 'next/link'
import React from 'react'
import {
    FaDraftingCompass, // UX/UI
    FaCode,            // Web Development
    FaBullhorn,        // Marketing
    FaPaintBrush       // Diseño Digital
} from 'react-icons/fa';


export const Services = () => {
    return (
        <main className='md:px-6'>
            <h1 className="font-montserrat text-5xl font-bold text-whiteCream text-center lg:text-6xl">SERVICIOS</h1>
            <p className='text-center font-robotoMono mt-2 text-xs md:text-sm lg:text-base px-16'>
                ¿Listo para darle vida a tus ideas? <Link href={"/contact"}>¡Hablemos!</Link>
            </p>
            <section>
                <div className='flex gap-4 mt-12'>
                    <div className='flex flex-col items-center border-2 border-green rounded-lg px-2 py-6 text-center'>
                        <FaDraftingCompass size={35} />
                        <h2 className='text-lg font-bold mt-6'>Diseño UX/UI</h2>
                        <p>Creación de interfaces intuitivas y atractivas que mejoran la experiencia del usuario</p>
                    </div>
                    <div className='flex flex-col items-center border-2 border-green rounded-lg px-2 py-6 text-center'>
                        <FaCode size={35} />
                        <h2 className='text-lg font-bold mt-6'>Desarrollo web</h2>
                        <p>Programación y construcción de sitios web funcionales y responsivos</p>
                    </div>
                    <div className='flex flex-col items-center border-2 border-green rounded-lg px-2 py-6 text-center'>
                        <FaBullhorn size={35} />
                        <h2 className='text-lg font-bold mt-6'>Marketing</h2>
                        <p>Estrategias online para aumentar la visibilidad de la marca y conectar con la audiencia</p>
                    </div>
                    <div className='flex flex-col items-center border-2 border-green rounded-lg px-2 py-6 text-center'>
                        <FaPaintBrush size={35} />
                        <h2 className='text-lg font-bold mt-6'>Diseño digital</h2>
                        <p>Elaboración de contenido visual atractivo optimizado para plataformas sociales</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
