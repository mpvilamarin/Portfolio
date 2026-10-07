'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { captureRef } from '@/lib/analytics';

const LanguageCtx = createContext({ lang: 'es', toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es'); // siempre 'es' en SSR (evita mismatch)

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en') setLang('en');
    captureRef();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return (
    <LanguageCtx.Provider value={{ lang, toggle }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export const useLanguage = () => useContext(LanguageCtx);
