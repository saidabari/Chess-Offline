import React from 'react';

export const NEO_PIECES: Record<string, React.FC<{ className?: string }>> = {
  // White King
  wk: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neo-shadow-w" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#neo-shadow-w)">
        {/* Crown Cross */}
        <path d="M 50 12 L 50 24 M 44 17 L 56 17" stroke="#222" strokeWidth="4.5" strokeLinecap="round" />
        {/* Head Dome */}
        <path d="M 36 28 C 36 22 64 22 64 28 C 64 34 36 34 36 28 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" />
        {/* Robe / Crown */}
        <path d="M 30 36 C 26 50 34 76 26 84 L 74 84 C 66 76 74 50 70 36 C 60 41 40 41 30 36 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Center Jewel / Accent */}
        <path d="M 45 42 L 55 42 M 42 54 L 58 54 M 40 66 L 60 66" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        {/* Base */}
        <path d="M 22 84 L 78 84 C 80 84 81 87 79 89 L 21 89 C 19 87 20 84 22 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // White Queen
  wq: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neo-shadow-wq" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#neo-shadow-wq)">
        {/* Crown Spheres */}
        <circle cx="26" cy="24" r="4.5" fill="#FFFFFF" stroke="#222" strokeWidth="3" />
        <circle cx="38" cy="19" r="4.5" fill="#FFFFFF" stroke="#222" strokeWidth="3" />
        <circle cx="50" cy="16" r="5" fill="#FFFFFF" stroke="#222" strokeWidth="3" />
        <circle cx="62" cy="19" r="4.5" fill="#FFFFFF" stroke="#222" strokeWidth="3" />
        <circle cx="74" cy="24" r="4.5" fill="#FFFFFF" stroke="#222" strokeWidth="3" />
        {/* Crown Body */}
        <path d="M 28 28 L 35 48 L 50 24 L 65 48 L 72 28 C 76 56 68 76 72 84 L 28 84 C 32 76 24 56 28 28 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Belt detail */}
        <path d="M 33 60 C 42 63 58 63 67 60 M 34 72 C 43 75 57 75 66 72" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        {/* Base */}
        <path d="M 22 84 L 78 84 C 80 84 81 87 79 89 L 21 89 C 19 87 20 84 22 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // White Rook
  wr: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neo-shadow-wr" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#neo-shadow-wr)">
        {/* Battlements */}
        <path d="M 26 24 L 26 36 L 33 36 L 33 30 L 44 30 L 44 36 L 56 36 L 56 30 L 67 30 L 67 36 L 74 36 L 74 24 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Castle Tower */}
        <path d="M 31 36 L 33 76 L 67 76 L 69 36 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Tower groove */}
        <path d="M 34 50 L 66 50 M 35 64 L 65 64" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        {/* Base Tier */}
        <path d="M 24 76 L 76 76 L 78 84 L 22 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 20 84 L 80 84 C 82 84 83 87 81 89 L 19 89 C 17 87 18 84 20 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // White Bishop
  wb: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neo-shadow-wb" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#neo-shadow-wb)">
        {/* Pommel */}
        <circle cx="50" cy="18" r="4.5" fill="#FFFFFF" stroke="#222" strokeWidth="3.5" />
        {/* Bishop Mitre */}
        <path d="M 50 24 C 34 32 30 52 36 68 L 64 68 C 70 52 66 32 50 24 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Mitre Slash */}
        <path d="M 44 38 L 56 46 M 52 38 L 46 44" stroke="#222" strokeWidth="3.5" strokeLinecap="round" />
        {/* Collar */}
        <path d="M 33 68 C 33 72 38 76 50 76 C 62 76 67 72 67 68 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" />
        {/* Base */}
        <path d="M 24 84 L 76 84 C 78 84 79 87 77 89 L 23 89 C 21 87 22 84 24 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 28 76 L 72 76 L 74 84 L 26 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // White Knight
  wn: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neo-shadow-wn" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#neo-shadow-wn)">
        {/* Horse Head & Mane */}
        <path d="M 30 84 C 28 66 22 52 32 40 C 34 34 33 26 38 20 C 44 14 50 18 52 24 C 56 22 62 25 64 30 C 66 36 64 44 68 50 C 72 56 74 68 72 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Snout & Jaw */}
        <path d="M 32 40 L 22 48 C 20 54 26 58 32 54 L 38 62" stroke="#222" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Eye */}
        <circle cx="42" cy="34" r="3.5" fill="#222" />
        {/* Mane Lines */}
        <path d="M 52 32 C 58 38 58 48 56 56 M 58 42 C 64 50 64 62 62 70" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        {/* Base */}
        <path d="M 24 84 L 76 84 C 78 84 79 87 77 89 L 23 89 C 21 87 22 84 24 84 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // White Pawn
  wp: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neo-shadow-wp" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#neo-shadow-wp)">
        {/* Head */}
        <circle cx="50" cy="30" r="14" fill="#FFFFFF" stroke="#222" strokeWidth="4" />
        {/* Body Stem */}
        <path d="M 42 45 C 38 56 34 72 30 82 L 70 82 C 66 72 62 56 58 45 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
        {/* Collar Ring */}
        <path d="M 38 48 C 42 46 58 46 62 48" stroke="#222" strokeWidth="4" strokeLinecap="round" />
        {/* Base */}
        <path d="M 26 82 L 74 82 C 76 82 77 85 75 88 L 25 88 C 23 85 24 82 26 82 Z" fill="#FFFFFF" stroke="#222" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // Black King
  bk: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 50 12 L 50 24 M 44 17 L 56 17" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 36 28 C 36 22 64 22 64 28 C 64 34 36 34 36 28 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        <path d="M 30 36 C 26 50 34 76 26 84 L 74 84 C 66 76 74 50 70 36 C 60 41 40 41 30 36 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        {/* Silver inner outline highlights */}
        <path d="M 36 42 C 34 54 39 74 34 80 L 66 80 C 61 74 66 54 64 42" stroke="#94A3B8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 45 52 L 55 52 M 42 64 L 58 64" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 22 84 L 78 84 C 80 84 81 87 79 89 L 21 89 C 19 87 20 84 22 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // Black Queen
  bq: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="26" cy="24" r="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="38" cy="19" r="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="50" cy="16" r="5" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="62" cy="19" r="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
        <circle cx="74" cy="24" r="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
        <path d="M 28 28 L 35 48 L 50 24 L 65 48 L 72 28 C 76 56 68 76 72 84 L 28 84 C 32 76 24 56 28 28 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        {/* Silver highlights */}
        <path d="M 34 56 C 42 60 58 60 66 56 M 35 70 C 43 74 57 74 65 70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 22 84 L 78 84 C 80 84 81 87 79 89 L 21 89 C 19 87 20 84 22 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // Black Rook
  br: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 26 24 L 26 36 L 33 36 L 33 30 L 44 30 L 44 36 L 56 36 L 56 30 L 67 30 L 67 36 L 74 36 L 74 24 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 31 36 L 33 76 L 67 76 L 69 36 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        {/* Inner highlight */}
        <path d="M 37 44 L 63 44 M 38 60 L 62 60" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 24 76 L 76 76 L 78 84 L 22 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 20 84 L 80 84 C 82 84 83 87 81 89 L 19 89 C 17 87 18 84 20 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // Black Bishop
  bb: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="50" cy="18" r="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
        <path d="M 50 24 C 34 32 30 52 36 68 L 64 68 C 70 52 66 32 50 24 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 44 38 L 56 46 M 52 38 L 46 44" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <path d="M 33 68 C 33 72 38 76 50 76 C 62 76 67 72 67 68 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        <path d="M 28 76 L 72 76 L 74 84 L 26 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 24 84 L 76 84 C 78 84 79 87 77 89 L 23 89 C 21 87 22 84 24 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // Black Knight
  bn: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 30 84 C 28 66 22 52 32 40 C 34 34 33 26 38 20 C 44 14 50 18 52 24 C 56 22 62 25 64 30 C 66 36 64 44 68 50 C 72 56 74 68 72 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 32 40 L 22 48 C 20 54 26 58 32 54 L 38 62" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="42" cy="34" r="3.5" fill="#E2E8F0" />
        {/* Silver highlight mane */}
        <path d="M 52 32 C 58 38 58 48 56 56 M 58 42 C 64 50 64 62 62 70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 24 84 L 76 84 C 78 84 79 87 77 89 L 23 89 C 21 87 22 84 24 84 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  ),

  // Black Pawn
  bp: ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="50" cy="30" r="14" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        <circle cx="47" cy="27" r="4" fill="#64748B" opacity="0.6" />
        <path d="M 42 45 C 38 56 34 72 30 82 L 70 82 C 66 72 62 56 58 45 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 38 48 C 42 46 58 46 62 48" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 26 82 L 74 82 C 76 82 77 85 75 88 L 25 88 C 23 85 24 82 26 82 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  ),
};
