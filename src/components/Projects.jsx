import React from 'react'
import ProjectsCarousel from './projectsContainer'

export const Projects = () => {
  return (
    <main className='pt-20'>
      <h1 className="font-montserrat text-6xl font-bold text-whiteCream text-center">PROYECTOS</h1>
      <p className='text-center font-robotoMono my-4'>
        Aquí están mis proyectos más recientes, tanto profesionales como académicos. Cada uno refleja mi enfoque en diseño, desarrollo e interactividad (y sí, también algunas noches de desvelo y perfeccionismo en acción). Puedes filtrar por categoría y explorar los que más te interesen.
      </p>
      <section>
        <ProjectsCarousel />
      </section>
    </main>
  )
}
