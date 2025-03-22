import React from 'react'
import ProjectsCarousel from './projectsContainer'

export const Projects = () => {
  return (
    <main className='pt-20 md:px-6'>
      <h1 className="font-montserrat text-5xl font-bold text-whiteCream text-center lg:text-6xl">PROYECTOS</h1>
      <p className='text-center font-robotoMono mt-2 text-xs md:text-sm lg:text-base'>
        Aquí están mis proyectos más recientes, tanto profesionales como académicos. Cada uno refleja mi enfoque en diseño, desarrollo e interactividad (y sí, también algunas noches de desvelo y perfeccionismo en acción). Puedes filtrar por categoría y explorar los que más te interesen.
      </p>
      <section>
        <ProjectsCarousel />
      </section>
    </main>
  )
}
