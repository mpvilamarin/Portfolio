'use client';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Wrapper que anima sus hijos con un fade+slide corto al entrar en viewport.
 * El HTML del servidor se renderiza visible: lo que ya está en pantalla al cargar
 * se muestra de inmediato y solo se anima lo que aparece al hacer scroll.
 * Se desactiva si el usuario prefiere movimiento reducido.
 * @param {number}  delay     — delay en segundos (default 0)
 * @param {'up'|'down'|'left'|'right'} direction — dirección del slide
 * @param {string}  className — clases adicionales
 * @param {boolean} once      — animar solo la primera vez (default true)
 */
const OFFSETS = {
  up:    { y: 12,  x: 0 },
  down:  { y: -12, x: 0 },
  left:  { y: 0,   x: 12 },
  right: { y: 0,   x: -12 },
};

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1, margin: '0px 0px -5% 0px' });
  const reduceMotion = useReducedMotion();
  // 'visible' en SSR; al montar, solo lo que está debajo del viewport pasa a 'hidden'
  const [state, setState] = useState('visible');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setState('hidden');
  }, [reduceMotion]);

  const variants = {
    visible: { opacity: 1, x: 0, y: 0 },
    hidden:  { opacity: 0, ...OFFSETS[direction] },
  };

  return (
    <motion.div
      ref={ref}
      initial={false}
      variants={variants}
      animate={state === 'hidden' && !isInView ? 'hidden' : 'visible'}
      transition={
        state === 'hidden'
          ? { duration: 0.4, delay: Math.min(delay, 0.25), ease: [0.22, 1, 0.36, 1] }
          : { duration: 0 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
