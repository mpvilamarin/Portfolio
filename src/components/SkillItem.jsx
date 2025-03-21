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
  size = "normal", // Nueva prop
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

  const handleMouseEnter = () => {
    reset();
    setIsCounting(true);
  };

  const progressSize = size === "small" ? "35px" : "45px";
  const iconSize = size === "small" ? 28 : 38;

  return (
    <div
      className="inline-block m-1 hover:translate-y-1 transition ease-in-out duration-300"
      onMouseEnter={handleMouseEnter}
    >
      <CircularProgress
        determinate
        value={value}
        sx={{
          '--CircularProgress-size': progressSize,
          '--CircularProgress-trackThickness': '2px',
          '--CircularProgress-progressThickness': '4px',
          '--CircularProgress-trackColor': trackColor,
          '--CircularProgress-progressColor': progressColor,
        }}
      >
        <Image src={iconSrc} height={iconSize} width={iconSize} alt="Skill Icon" />
      </CircularProgress>
    </div>
  );
}