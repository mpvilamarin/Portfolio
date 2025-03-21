// SkillItem.jsx
'use client';
import * as React from 'react';
import { useCountUp } from 'use-count-up';
import CircularProgress from '@mui/joy/CircularProgress';
import Image from 'next/image';

export default function SkillItem({
  iconSrc,
  percentage,
  trackColor = '#FCFCFC',
  progressColor = '#EA91FF',
}) {
  const [isCounting, setIsCounting] = React.useState(true);

  const { value, reset } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: percentage,
    onComplete: () => setIsCounting(false),
  });

  const handleMouseEnter = () => {
    reset();
    setIsCounting(true);
  };

  return (
    <div
      className="hover:translate-y-1 transition ease-in-out duration-300"
      onMouseEnter={handleMouseEnter}
    >
      <CircularProgress
        determinate
        value={value}
        sx={{
          '--CircularProgress-size': '50px', // Círculo fijo
          '--CircularProgress-trackThickness': '3px',
          '--CircularProgress-progressThickness': '5px',
          '--CircularProgress-trackColor': trackColor,
          '--CircularProgress-progressColor': progressColor,
        }}
      >
        {/* Imagen más grande en md+ */}
        <Image
          src={iconSrc}
          alt="Skill Icon"
          width={24} // Base (mobile)
          height={24}
          className="sm:w-[28px] sm:h-[28px] md:w-[34px] md:h-[34px] lg:w-[40px] lg:h-[40px]"
        />
      </CircularProgress>
    </div>
  );
}