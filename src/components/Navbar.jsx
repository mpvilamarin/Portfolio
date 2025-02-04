import React from 'react'

const Navbar = () => {
  return (
    <navbar className="fixed top-0 right-0 pr-20 pt-8">
        <ul className='flex space-x-14 items-center text-robotoMono text-1xl text-green'>
            <li><a href="#about">Sobre mí</a></li>
            <li><a href="#">Proyectos</a></li>
            <li><a href="#">CV</a></li>
        </ul>
    </navbar>
  )
}

export default Navbar