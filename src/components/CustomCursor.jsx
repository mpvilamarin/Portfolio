'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor personalizado — punto + anillo.
 * El punto sigue el mouse exactamente.
 * El anillo sigue con un pequeño lag (spring).
 * Al hacer hover en links/buttons el anillo crece.
 */
const CustomCursor = () => {
  const [isHovering,    setIsHovering]    = useState(false);
  const [isVisible,     setIsVisible]     = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Punto — sin lag
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  // Anillo — con spring lag
  const rx = useMotionValue(-200);
  const ry = useMotionValue(-200);
  const ringX = useSpring(rx, { damping: 30, stiffness: 200 });
  const ringY = useSpring(ry, { damping: 30, stiffness: 200 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);

    const onMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rx.set(e.clientX);
      ry.set(e.clientY);
      setIsVisible(true);
    };
    const onOver  = (e) => { if (e.target.closest('a, button, [data-hover]')) setIsHovering(true); };
    const onOut   = (e) => { if (e.target.closest('a, button, [data-hover]')) setIsHovering(false); };
    const onLeave = ()  => setIsVisible(false);
    const onEnter = ()  => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [dotX, dotY, rx, ry]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* ── Punto central ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          backgroundColor: '#F43F5E',
        }}
      />

      {/* ── Anillo exterior ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid #F43F5E',
        }}
        animate={{
          width:   isHovering ? 38 : 22,
          height:  isHovering ? 38 : 22,
          opacity: isHovering ? 0.6 : 0.45,
        }}
        initial={{ width: 22, height: 22, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
