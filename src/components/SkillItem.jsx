// SkillItem.jsx
'use client';
import * as React from 'react';
import { useCountUp } from 'use-count-up';
import CircularProgress from '@mui/joy/CircularProgress';
import Image from 'next/image';

export default function SkillItem({
  iconSrc,
  percentage,
  trackColor = '#EA91FF',
  progressColor = '#D058EC',
}) {
  const [isCounting, setIsCounting] = React.useState(true);

  const { value, reset } = useCountUp({
    isCounting,
    duration: 1,
    start: 0,
    end: percentage,
    onComplete: () => {
      setIsCounting(false);
    },
  });

  // Al hacer hover, reinicia la animación
  const handleMouseEnter = () => {
    reset();
    setIsCounting(true);
  };

  return (
    <div
      className="inline-block m-2 hover:translate-y-1 transition ease-in-out duration-500"
      onMouseEnter={handleMouseEnter}
    >
      <CircularProgress
        determinate
        value={value}
        sx={{
          '--CircularProgress-size': '50px',
          '--CircularProgress-trackThickness': '5px',
          '--CircularProgress-progressThickness': '5px',
          '--CircularProgress-trackColor': trackColor,
          '--CircularProgress-progressColor': progressColor,
        }}
      >
        <Image src={iconSrc} height={40} width={40} alt="Skill Icon" />
      </CircularProgress>
    </div>
  );
}
