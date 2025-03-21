"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [cvDropdown, setCvDropdown] = useState(false);

  return (
    <>
      {/* Navbar Desktop */}
      <nav className="fixed top-0 left-0 w-full z-50 hidden md:flex justify-end pr-10 py-4">
        <ul className="flex space-x-10 items-center text-robotoMono text-sm text-green">
          <li>
            <Link href="/#about" className="hover:text-purple transition">Sobre mí</Link>
          </li>
          <li>
            <Link href="/#projects" className="hover:text-purple transition">Proyectos</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-purple transition">Contacto</Link>
          </li>
          <li className="relative group">
            <button className="flex items-center gap-1 focus:outline-none">
              CV <FaChevronDown className="text-green text-xs mt-0.5" />
            </button>
            <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white">
              <li>
                <Link
                  href="https://drive.google.com/file/d/10llwvk38XZ80RsRpwt7MFKNmIVhVUPJp/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-green hover:opacity-60 transition text-sm"
                >
                  English
                </Link>
              </li>
              <li>
                <Link
                  href="https://drive.google.com/file/d/1PtBtuDM-FsxTmfI0F50EyOC8PuIPTXZZ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-green hover:opacity-60 transition text-sm"
                >
                  Español
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Navbar Mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className={`text-xl focus:outline-none ${openMenu ? "text-purple" : "text-green"
            }`}
        >
          {openMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mini menú desplegable al lado del botón */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-32 bg-blackLight border-2 border-purple rounded-md shadow-lg z-40"
            >
              <ul className="flex flex-col text-purple text-sm font-robotoMono py-2">
                <li className="px-4 hover:bg-green hover:text-blackLight transition">
                  <Link href="/#about" onClick={() => setOpenMenu(false)}>Sobre mí</Link>
                </li>
                <li className="px-4 hover:bg-green hover:text-blackLight transition">
                  <Link href="/#projects" onClick={() => setOpenMenu(false)}>Proyectos</Link>
                </li>
                <li className="px-4 hover:bg-green hover:text-blackLight transition">
                  <Link href="/contact" onClick={() => setOpenMenu(false)}>Contacto</Link>
                </li>

                {/* Dropdown CV */}
                <li className="relative px-4">
                  <button
                    onClick={() => setCvDropdown(!cvDropdown)}
                    className="flex items-center gap-1 w-full focus:outline-none"
                  >
                    CV <FaChevronDown className={`text-xs mt-0.5 transition-transform ${cvDropdown ? "rotate-90" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {cvDropdown && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 rounded shadow-md overflow-hidden"
                      >
                        <li>
                          <Link
                            href="https://drive.google.com/file/d/10llwvk38XZ80RsRpwt7MFKNmIVhVUPJp/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 text-green hover:opacity-60 text-xs"
                            onClick={() => { setOpenMenu(false); setCvDropdown(false); }}
                          >
                            English
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://drive.google.com/file/d/1PtBtuDM-FsxTmfI0F50EyOC8PuIPTXZZ/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 text-green hover:opacity-60 text-xs"
                            onClick={() => { setOpenMenu(false); setCvDropdown(false); }}
                          >
                            Español
                          </Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;