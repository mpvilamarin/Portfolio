import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 pr-20 pt-8">
      <ul className="flex space-x-14 items-center text-robotoMono text-1xl text-green">
        <li><a href="/#about">Sobre mí</a></li>
        <li><a href="/#projects">Proyectos</a></li>
        <li className="relative group">
          <button className="focus:outline-none">
            CV
          </button>
          <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <li>
              <Link href={'https://drive.google.com/file/d/10llwvk38XZ80RsRpwt7MFKNmIVhVUPJp/view?usp=sharing'} target="_blank" rel="noopener noreferrer">
                <p
                  className="block px-4 py-2 text-green hover:opacity-60 transition-opacity duration-300 text-robotoMono text-1xl"
                >
                  English
                </p>
              </Link>
            </li>
            <li>
              <Link href={'https://drive.google.com/file/d/1PtBtuDM-FsxTmfI0F50EyOC8PuIPTXZZ/view?usp=sharing'} target="_blank" rel="noopener noreferrer">
              <p
                className="block px-4 py-2 text-green hover:opacity-60 transition-opacity duration-300 text-robotoMono text-1xl"
              >
                Español
              </p>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
