'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Toggle creativo de tema claro/oscuro.
 * Estilo: bombilla Edison con cuerdita que se jala.
 * — Oscuro: bombilla apagada, outline rosa
 * — Claro:  bombilla encendida, resplandor cálido amarillo
 */
const LightbulbToggle = () => {
  const [isLight,  setIsLight]  = useState(false);
  const [pulling,  setPulling]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

  // Solo renderiza en el cliente (evita mismatch de hydration)
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const handleToggle = () => {
    if (pulling) return;

    // Animación de jalar la cuerda
    setPulling(true);
    setTimeout(() => setPulling(false), 550);

    const next = !isLight;
    setIsLight(next);

    if (next) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (!mounted) return <div className="w-8 h-8" />;

  /* ── Colores según modo ───────────────────── */
  /* Claro: rosa intenso / Oscuro: rose original */
  const bulbFill    = isLight ? 'rgba(251,191,210,0.75)' : 'transparent';
  const bulbStroke  = isLight ? '#D42060'                : 'rgba(244,63,94,0.55)';
  const filament    = isLight ? '#A80F42'                : 'rgba(244,63,94,0.28)';
  const baseCol     = isLight ? '#D42060'                : 'rgba(244,63,94,0.45)';
  const cordCol     = isLight ? '#C01850'                : 'rgba(244,63,94,0.45)';
  const knobCol     = isLight ? '#E03070'                : 'rgba(244,63,94,0.55)';

  return (
    <button
      onClick={handleToggle}
      aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      className="relative flex items-start justify-center w-8 select-none"
      style={{ height: 36 }}
    >
      {/* ── Resplandor de fondo cuando está encendida — rosa ── */}
      {isLight && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,32,96,0.07) 0%, transparent 70%)',
          }}
        />
      )}

      <svg
        width="18"
        height="36"
        viewBox="0 0 18 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* ── Aura exterior (encendida) — rosa ── */}
        {isLight && (
          <motion.circle
            cx="9" cy="8.5"
            r="8"
            fill="rgba(212,32,96,0.05)"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        )}

        {/* ── Vidrio del bulbo ── */}
        <motion.path
          d="M9 1 C5.1 1 2 4.1 2 8.5 C2 11.3 3.5 13.8 5.8 15.1 L5.8 17.5 L12.2 17.5 L12.2 15.1 C14.5 13.8 16 11.3 16 8.5 C16 4.1 12.9 1 9 1 Z"
          stroke={bulbStroke}
          strokeWidth="0.9"
          animate={{ fill: bulbFill }}
          transition={{ duration: 0.35 }}
        />

        {/* ── Filamento ── */}
        <motion.path
          d="M6.2 11 C7 9.2 7.8 10.4 9 8.2 C10.2 10.4 11 9.2 11.8 11"
          stroke={filament}
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          animate={{ stroke: filament, opacity: isLight ? 1 : 0.55 }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Base (3 rayitas) ── */}
        {[
          { x: 5.8, w: 6.4, op: 1   },
          { x: 6.3, w: 5.4, op: 0.8 },
          { x: 6.9, w: 4.2, op: 0.6 },
        ].map(({ x, w, op }, i) => (
          <rect
            key={i}
            x={x} y={17.5 + i * 1.15}
            width={w} height="0.95"
            rx="0.35"
            fill={baseCol}
            opacity={op}
          />
        ))}

        {/* ── Cuerda + nudo ── */}
        <motion.g
          animate={pulling
            ? { y: [0, 7, -1.5, 0] }
            : { y: 0 }
          }
          transition={{ duration: 0.52, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Hilo */}
          <line
            x1="9" y1="20.8"
            x2="9" y2="28.5"
            stroke={cordCol}
            strokeWidth="0.8"
            strokeDasharray="2 1.8"
          />
          {/* Nudo pequeño (para jalar) */}
          <circle cx="9" cy="29.8" r="1.6" fill={knobCol} />
          {/* Brillo en el nudo */}
          {isLight && (
            <circle cx="8.3" cy="29.2" r="0.5" fill="rgba(255,220,235,0.7)" />
          )}
        </motion.g>
      </svg>
    </button>
  );
};

export default LightbulbToggle;
