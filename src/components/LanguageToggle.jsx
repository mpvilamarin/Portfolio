'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Toggle creativo de idioma ES / EN.
 * Estilo: pastilla con texto que "rueda" en eje X (efecto slot machine)
 * al cambiar de idioma. Rosa cuando EN está activo.
 */
const LanguageToggle = () => {
  const { lang, toggle } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ width: 38, height: 22 }} />;

  const isEN = lang === 'en';

  return (
    <button
      onClick={toggle}
      aria-label={isEN ? 'Cambiar a español' : 'Switch to English'}
      className="relative flex items-center justify-center select-none overflow-hidden rounded"
      style={{ width: 38, height: 22 }}
    >
      {/* Marco exterior */}
      <motion.span
        animate={{ borderColor: isEN ? 'rgba(244,63,94,0.75)' : 'rgba(244,63,94,0.28)' }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded border pointer-events-none"
        style={{ borderColor: 'rgba(244,63,94,0.28)' }}
      />

      {/* Fondo suave cuando EN está activo */}
      <motion.span
        animate={{ opacity: isEN ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded bg-accent/10 pointer-events-none"
      />

      {/* Texto con animación slot-machine (rota en eje X) */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={lang}
          initial={{ rotateX: -70, opacity: 0, y: 4 }}
          animate={{ rotateX: 0,   opacity: 1, y: 0 }}
          exit={{    rotateX:  70, opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative z-10 font-mono text-[9px] tracking-[2px]"
          style={{
            color: isEN ? '#F43F5E' : 'rgba(157,139,142,0.9)',
            display: 'block',
          }}
        >
          {lang.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default LanguageToggle;
