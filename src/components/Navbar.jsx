'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LightbulbToggle from './LightbulbToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

const navLinksBase = [
  { href: '/#about',      key: 'about',    num: '01' },
  { href: '/#projects',   key: 'projects', num: '02' },
  { href: '/contactform', key: 'contact',  num: '03' },
];

const cvLinks = [
  { href: 'https://drive.google.com/file/d/10llwvk38XZ80RsRpwt7MFKNmIVhVUPJp/view?usp=sharing', label: 'English' },
  { href: 'https://drive.google.com/file/d/1PtBtuDM-FsxTmfI0F50EyOC8PuIPTXZZ/view?usp=sharing', label: 'Español' },
];

const Navbar = () => {
  const [openMenu, setOpenMenu]     = useState(false);
  const [cvDropdown, setCvDropdown] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { lang } = useLanguage();
  const tx = tr[lang].nav;
  const navLinks = navLinksBase.map((l) => ({ ...l, label: tx[l.key] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop nav (lg+) ───────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 hidden lg:flex items-center justify-between
          px-12 xl:px-20 py-5 transition-all duration-500
          ${scrolled ? 'bg-base/80 backdrop-blur-xl border-b border-line' : ''}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-xs text-muted hover:text-accent transition-colors duration-300 tracking-[4px]"
        >
          PV<span className="text-accent">.</span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-10 font-mono text-[11px] tracking-[3px]">
          {navLinks.map(({ href, label, num }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative group flex items-center gap-1.5 text-muted hover:text-white transition-colors duration-300"
              >
                <span className="text-accent text-[9px]">{num}/</span>
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}

          {/* CV dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1.5 text-muted hover:text-white transition-colors duration-300 text-[11px] tracking-[3px]">
              <span className="text-accent text-[9px]">04/</span>
              CV
              <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 top-full mt-3 w-28 opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto
              transition-all duration-300 bg-surface border border-line rounded overflow-hidden">
              {cvLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 font-mono text-[11px] text-muted hover:text-accent hover:bg-elevated transition-colors border-b border-line last:border-0"
                >
                  {label}
                </Link>
              ))}
            </div>
          </li>

          {/* Language toggle */}
          <li className="flex items-center">
            <LanguageToggle />
          </li>

          {/* Bombilla toggle */}
          <li className="flex items-center">
            <LightbulbToggle />
          </li>
        </ul>
      </nav>

      {/* ── Mobile nav (< lg) ───────────────────────────── */}
      <div className="lg:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Language toggle en mobile */}
        <LanguageToggle />
        {/* Bombilla toggle en mobile */}
        <LightbulbToggle />

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="w-9 h-9 flex items-center justify-center border border-line rounded text-muted
            hover:text-accent hover:border-accent/50 transition-colors duration-300"
        >
          {openMenu ? <FaTimes size={13} /> : <FaBars size={13} />}
        </button>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0,  y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute right-0 mt-2 w-48 bg-surface border border-line rounded shadow-2xl overflow-hidden"
            >
              <ul className="flex flex-col font-mono text-[11px] tracking-[2px]">
                {navLinks.map(({ href, label, num }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpenMenu(false)}
                      className="flex items-center gap-2 px-4 py-3 text-muted hover:text-white hover:bg-elevated transition-colors border-b border-line"
                    >
                      <span className="text-accent text-[9px]">{num}/</span>
                      {label}
                    </Link>
                  </li>
                ))}

                {/* CV dropdown mobile */}
                <li>
                  <button
                    onClick={() => setCvDropdown(!cvDropdown)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-muted hover:text-white hover:bg-elevated transition-colors"
                  >
                    <span className="text-accent text-[9px]">04/</span>
                    CV
                    <motion.span
                      animate={{ rotate: cvDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-auto"
                    >
                      <FaChevronDown className="text-[9px]" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {cvDropdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-elevated"
                      >
                        {cvLinks.map(({ href, label }) => (
                          <Link
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-8 py-2.5 font-mono text-[11px] text-muted hover:text-accent transition-colors"
                            onClick={() => { setOpenMenu(false); setCvDropdown(false); }}
                          >
                            {label}
                          </Link>
                        ))}
                      </motion.div>
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
