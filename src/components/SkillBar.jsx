'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillBar = ({ name, percentage }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-muted group-hover:text-primary transition-colors duration-300 tracking-widest uppercase">
          {name}
        </span>
        <span className="font-mono text-xs text-accent">{percentage}%</span>
      </div>
      {/* Track */}
      <div className="relative h-px w-full bg-line overflow-hidden">
        {/* Progress */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-accent"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Glow dot al final */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent shadow-[0_0_6px_2px_rgba(244,63,94,0.6)]"
          initial={{ left: 0, opacity: 0 }}
          animate={inView ? { left: `${percentage}%`, opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
