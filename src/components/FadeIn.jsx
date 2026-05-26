'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Wrapper que anima sus hijos con fade+slide al entrar en viewport.
 * @param {number}  delay     — delay en segundos (default 0)
 * @param {'up'|'down'|'left'|'right'} direction — dirección del slide
 * @param {string}  className — clases adicionales
 * @param {boolean} once      — animar solo la primera vez (default true)
 */
const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-40px' });

  const offsets = {
    up:    { y: 28, x: 0 },
    down:  { y: -28, x: 0 },
    left:  { y: 0,  x: 28 },
    right: { y: 0,  x: -28 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
