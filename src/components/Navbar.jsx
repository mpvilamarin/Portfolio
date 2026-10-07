'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LightbulbToggle from './LightbulbToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';
import { CV_LINKS } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

const navLinksBase = [
  { href: '/#about',      key: 'about',    num: '01' },
  { href: '/#projects',   key: 'projects', num: '02' },
  { href: '/contactform', key: 'contact',  num: '03' },
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
          className="font-mono text-sm text-muted hover:text-accent transition-colors duration-300 tracking-[3px]"
        >
          PV<span className="text-accent">.</span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-10 font-mono text-xs tracking-[2px]">
          {navLinks.map(({ href, label, num }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative group flex items-center gap-1.5 text-muted hover:text-white transition-colors duration-300"
              >
                <span className="text-accent text-xs">{num}/</span>
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}

          {/* CV dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1.5 text-muted hover:text-white transition-colors duration-300 text-xs tracking-[2px]"
              aria-haspopup="true">
              <span className="text-accent text-xs">04/</span>
              CV
              <FaChevronDown className="text-[10px] transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute right-0 top-full mt-3 w-28 opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto
              group-focus-within:opacity-100 group-focus-within:pointer-events-auto
              transition-all duration-300 bg-surface border border-line rounded overflow-hidden">
              {CV_LINKS.map(({ href, label, lang: cvLang }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('cv_open', { lang: cvLang, from: 'navbar' })}
                  className="block px-4 py-3 font-mono text-xs text-muted hover:text-accent hover:bg-elevated transition-colors border-b border-line last:border-0"
                >
                  {label}
                </a>
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
      <header
        className={`lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between
          px-4 sm:px-6 py-3 transition-colors duration-300 border-b
          ${scrolled || openMenu
            ? 'bg-base/80 backdrop-blur-xl border-line'
            : 'bg-base/60 backdrop-blur-md border-transparent'}`}
      >
        <Link
          href="/"
          onClick={() => setOpenMenu(false)}
          className="font-mono text-sm text-muted hover:text-accent transition-colors duration-300 tracking-[3px]"
        >
          PV<span className="text-accent">.</span>
        </Link>

        <div className="relative flex items-center gap-2">
          <LanguageToggle />
          <LightbulbToggle />

          <button
            onClick={() => setOpenMenu(!openMenu)}
            aria-label={openMenu ? (lang === 'en' ? 'Close menu' : 'Cerrar menú') : (lang === 'en' ? 'Open menu' : 'Abrir menú')}
            aria-expanded={openMenu}
            aria-controls="mobile-menu"
            className="w-10 h-10 flex items-center justify-center border border-line rounded text-muted
              hover:text-accent hover:border-accent/50 transition-colors duration-300"
          >
            {openMenu ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>

          <AnimatePresence>
            {openMenu && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{ opacity: 0,  y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute right-0 top-full mt-3 w-56 bg-surface border border-line rounded shadow-2xl overflow-hidden"
              >
                <ul className="flex flex-col font-mono text-sm tracking-[2px]">
                  {navLinks.map(({ href, label, num }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setOpenMenu(false)}
                        className="flex items-center gap-2 px-4 py-3.5 text-muted hover:text-white hover:bg-elevated transition-colors border-b border-line"
                      >
                        <span className="text-accent text-xs">{num}/</span>
                        {label}
                      </Link>
                    </li>
                  ))}

                  {/* CV dropdown mobile */}
                  <li>
                    <button
                      onClick={() => setCvDropdown(!cvDropdown)}
                      aria-expanded={cvDropdown}
                      className="w-full flex items-center gap-2 px-4 py-3.5 text-muted hover:text-white hover:bg-elevated transition-colors"
                    >
                      <span className="text-accent text-xs">04/</span>
                      CV
                      <motion.span
                        animate={{ rotate: cvDropdown ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-auto"
                      >
                        <FaChevronDown className="text-[10px]" />
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
                          {CV_LINKS.map(({ href, label, lang: cvLang }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-8 py-3 font-mono text-sm text-muted hover:text-accent transition-colors"
                              onClick={() => {
                                trackEvent('cv_open', { lang: cvLang, from: 'navbar-mobile' });
                                setOpenMenu(false);
                                setCvDropdown(false);
                              }}
                            >
                              {label}
                            </a>
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
      </header>
    </>
  );
};

export default Navbar;
