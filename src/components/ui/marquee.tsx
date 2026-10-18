import React, { useState } from 'react';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      className={`flex overflow-hidden select-none no-scrollbar p-2 [--gap:1.5rem] [gap:var(--gap)] ${
        vertical ? 'flex-col' : 'flex-row'
      } ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={{
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              vertical
                ? 'animate-marquee-vertical flex-col'
                : 'animate-marquee flex-row'
            } ${reverse ? '[animation-direction:reverse]' : ''}`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
