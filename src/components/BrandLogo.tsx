import React from 'react';
import { AccentColor } from '../themes';

interface BrandLogoProps {
  size?: 'large' | 'medium' | 'compact';
  accentColor?: AccentColor;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'medium',
  accentColor,
  className = '',
}) => {
  const accentHex = accentColor?.hex || '#00F0FF';

  if (size === 'compact') {
    return (
      <div className={`flex flex-col select-none ${className}`}>
        <div className="flex items-baseline tracking-tight">
          <span className="font-black italic uppercase text-white text-lg sm:text-xl tracking-tighter">
            CHESS
          </span>
          <span
            style={{ color: accentHex }}
            className="ml-1.5 font-light italic uppercase text-xs sm:text-sm tracking-widest opacity-90"
          >
            OFFLINE
          </span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.32em] text-slate-400 -mt-0.5">
          BY SOURAV
        </span>
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className={`flex flex-col items-center select-none text-center ${className}`}>
        <div className="flex items-baseline tracking-tight">
          <span className="font-black italic uppercase text-white text-3xl sm:text-4xl tracking-tighter">
            CHESS
          </span>
          <span
            style={{ color: accentHex }}
            className="ml-2 font-light italic uppercase text-lg sm:text-xl tracking-widest opacity-90"
          >
            OFFLINE
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.38em] text-slate-400 mt-1">
          BY SOURAV
        </span>
      </div>
    );
  }

  // Large display size for Main Menu - Bigger, bolder, no lines next to heading
  return (
    <div className={`flex flex-col items-center select-none text-center ${className}`}>
      {/* Primary Wordmark Lockup */}
      <div className="relative inline-flex items-baseline justify-center tracking-tight">
        {/* Dominant "CHESS" */}
        <span className="font-black italic uppercase text-white text-6xl sm:text-7xl md:text-8xl tracking-tighter leading-none select-none drop-shadow-md">
          CHESS
        </span>
        {/* Secondary "OFFLINE" */}
        <span
          style={{ color: accentHex }}
          className="ml-3 sm:ml-4 font-light italic uppercase text-3xl sm:text-4xl md:text-5xl tracking-widest leading-none select-none opacity-90"
        >
          OFFLINE
        </span>
      </div>

      {/* Clean "BY SOURAV" without any lines */}
      <div className="mt-2.5 sm:mt-3">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.45em] text-slate-400 select-none block">
          BY SOURAV
        </span>
      </div>
    </div>
  );
};
