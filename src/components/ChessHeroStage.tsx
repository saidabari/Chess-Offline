import React from 'react';

interface ChessHeroStageProps {
  accentColorHex?: string;
  className?: string;
}

export const ChessHeroStage: React.FC<ChessHeroStageProps> = ({
  accentColorHex = '#1D68FF',
  className = '',
}) => {
  return (
    <div className={`relative w-full h-[320px] sm:h-[380px] md:h-[420px] pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Background radial blue glow behind pieces */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full blur-[120px] opacity-40 transition-colors duration-500"
        style={{ backgroundColor: accentColorHex }}
      />

      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full object-cover object-bottom"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for floor perspective */}
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050811" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#0A1122" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#020409" stopOpacity="1" />
          </linearGradient>

          {/* White piece material gradient */}
          <linearGradient id="whitePieceGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="whiteHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.4" />
          </linearGradient>

          {/* Black piece material gradient (glossy black with blue rim light) */}
          <linearGradient id="blackPieceGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="30%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#090D16" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="blackRimLight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="20%" stopColor="#0F172A" stopOpacity="0" />
            <stop offset="80%" stopColor="#0F172A" stopOpacity="0" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
          </linearGradient>

          {/* Floor reflection mask */}
          <linearGradient id="reflectionFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="reflectMask">
            <rect x="0" y="440" width="1000" height="160" fill="url(#reflectionFade)" />
          </mask>
        </defs>

        {/* 1. PERSPECTIVE CHESSBOARD FLOOR */}
        <path
          d="M 120 440 L 880 440 L 1050 600 L -50 600 Z"
          fill="url(#floorGrad)"
        />

        {/* Perspective grid lines & alternating marble squares */}
        <g opacity="0.65">
          {/* Horizontal rank lines */}
          <line x1="80" y1="455" x2="920" y2="455" stroke="#1E2C48" strokeWidth="1.2" />
          <line x1="40" y1="475" x2="960" y2="475" stroke="#1E2C48" strokeWidth="1.5" />
          <line x1="-5" y1="505" x2="1005" y2="505" stroke="#253555" strokeWidth="1.8" />
          <line x1="-30" y1="545" x2="1030" y2="545" stroke="#2F446C" strokeWidth="2.2" />

          {/* Perspective file lines converging to center vanishing point */}
          <line x1="500" y1="430" x2="500" y2="600" stroke="#1E2C48" strokeWidth="1.8" />
          <line x1="440" y1="430" x2="330" y2="600" stroke="#1E2C48" strokeWidth="1.6" />
          <line x1="380" y1="430" x2="150" y2="600" stroke="#1E2C48" strokeWidth="1.6" />
          <line x1="320" y1="430" x2="-30" y2="600" stroke="#1E2C48" strokeWidth="1.6" />
          <line x1="560" y1="430" x2="670" y2="600" stroke="#1E2C48" strokeWidth="1.6" />
          <line x1="620" y1="430" x2="850" y2="600" stroke="#1E2C48" strokeWidth="1.6" />
          <line x1="680" y1="430" x2="1030" y2="600" stroke="#1E2C48" strokeWidth="1.6" />

          {/* Selected reflective light squares with glossy sheen */}
          <polygon points="440,430 500,430 500,455 425,455" fill="#3B5278" opacity="0.3" />
          <polygon points="500,455 580,455 600,475 500,475" fill="#3B5278" opacity="0.25" />
          <polygon points="350,475 425,475 405,505 315,505" fill="#4B6A99" opacity="0.25" />
          <polygon points="500,475 600,475 625,505 500,505" fill="#3B5278" opacity="0.3" />
          <polygon points="405,505 500,505 500,545 375,545" fill="#4B6A99" opacity="0.35" />
          <polygon points="500,505 625,505 660,545 500,545" fill="#2E4366" opacity="0.3" />
          <polygon points="215,545 375,545 330,600 150,600" fill="#4B6A99" opacity="0.35" />
          <polygon points="500,545 660,545 710,600 500,600" fill="#3B5278" opacity="0.3" />
        </g>

        {/* 2. CHESS PIECES (LOW-ANGLE DRAMATIC BOKEH) */}

        {/* --- LEFT SIDE: WHITE PIECES --- */}

        {/* White Pawn (Foreground Left) */}
        <g id="whitePawnFg">
          {/* Base */}
          <ellipse cx="60" cy="510" rx="42" ry="12" fill="#94A3B8" />
          <path d="M 28 506 C 35 480 44 445 44 425 C 44 400 76 400 76 425 C 76 445 85 480 92 506 Z" fill="url(#whitePieceGrad)" />
          {/* Collar */}
          <ellipse cx="60" cy="420" rx="20" ry="6" fill="#F1F5F9" />
          {/* Head sphere */}
          <circle cx="60" cy="385" r="24" fill="url(#whitePieceGrad)" />
          <ellipse cx="54" cy="378" rx="8" ry="12" fill="#FFFFFF" opacity="0.75" />
        </g>

        {/* White King (Prominent Left with Cross) */}
        <g id="whiteKing">
          {/* Floor shadow */}
          <ellipse cx="120" cy="465" rx="55" ry="14" fill="#030712" opacity="0.8" />
          {/* Pedestal Base tiers */}
          <ellipse cx="120" cy="460" rx="52" ry="12" fill="#94A3B8" />
          <path d="M 72 458 L 78 440 L 162 440 L 168 458 Z" fill="url(#whitePieceGrad)" />
          <ellipse cx="120" cy="440" rx="42" ry="9" fill="#E2E8F0" />
          {/* Body stem */}
          <path d="M 86 438 C 96 370 94 330 84 275 L 156 275 C 146 330 144 370 154 438 Z" fill="url(#whitePieceGrad)" />
          {/* Mid collar ring */}
          <ellipse cx="120" cy="275" rx="38" ry="8" fill="#F8FAFC" />
          <ellipse cx="120" cy="265" rx="36" ry="8" fill="#CBD5E1" />
          {/* Crown capital dome */}
          <path d="M 88 263 C 78 220 162 220 152 263 Z" fill="url(#whitePieceGrad)" />
          <ellipse cx="120" cy="225" rx="26" ry="6" fill="#F8FAFC" />
          {/* Finial Cross on King */}
          <rect x="115" y="180" width="10" height="38" rx="2" fill="url(#whitePieceGrad)" />
          <rect x="104" y="190" width="32" height="9" rx="2" fill="url(#whitePieceGrad)" />
          {/* Specular highlights */}
          <path d="M 94 280 C 102 335 102 385 92 435" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
          <ellipse cx="112" cy="235" rx="8" ry="14" fill="#FFFFFF" opacity="0.65" />
        </g>

        {/* White Knight (Left Center with sleek arched neck) */}
        <g id="whiteKnight">
          {/* Base */}
          <ellipse cx="230" cy="460" rx="46" ry="11" fill="#030712" opacity="0.75" />
          <ellipse cx="230" cy="455" rx="44" ry="10" fill="#94A3B8" />
          <path d="M 190 454 L 198 438 L 262 438 L 270 454 Z" fill="url(#whitePieceGrad)" />
          {/* Horse head & mane profile */}
          <path
            d="M 200 438 C 195 385 185 365 205 330 C 210 320 205 300 215 285 C 228 268 245 272 250 288 C 260 285 275 292 280 305 C 285 320 280 345 288 360 C 294 375 298 405 292 438 Z"
            fill="url(#whitePieceGrad)"
          />
          {/* Snout & jaw */}
          <path d="M 205 330 L 175 348 C 168 362 182 375 198 365 L 215 385" stroke="#94A3B8" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="225" cy="320" r="4.5" fill="#334155" />
          <circle cx="226" cy="319" r="1.5" fill="#FFFFFF" />
          {/* Mane detail */}
          <path d="M 252 295 C 265 315 265 345 260 375" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M 268 325 C 278 350 278 380 272 410" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>

        {/* White Bishop & Pawn (Background Left) */}
        <g id="whiteBishopBg" opacity="0.75">
          <ellipse cx="340" cy="448" rx="28" ry="7" fill="#64748B" />
          <path d="M 320 445 C 326 390 328 360 320 330 L 360 330 C 352 360 354 390 360 445 Z" fill="url(#whitePieceGrad)" />
          {/* Mitre head */}
          <path d="M 324 330 C 320 290 340 275 340 275 C 340 275 360 290 356 330 Z" fill="url(#whitePieceGrad)" />
          <circle cx="340" cy="272" r="5" fill="#F8FAFC" />
        </g>
        <g id="whitePawnBg" opacity="0.6">
          <ellipse cx="295" cy="450" rx="18" ry="5" fill="#64748B" />
          <path d="M 282 448 C 286 425 290 405 290 395 C 290 380 300 380 300 395 C 300 405 304 425 308 448 Z" fill="url(#whitePieceGrad)" />
          <circle cx="295" cy="380" r="11" fill="url(#whitePieceGrad)" />
        </g>

        {/* --- RIGHT SIDE: BLACK PIECES (GLOSSY OBSIDIAN WITH BLUE RIM LIGHT) --- */}

        {/* Black Bishop & Pawn (Background Right) */}
        <g id="blackPawnBg" opacity="0.6">
          <ellipse cx="660" cy="450" rx="18" ry="5" fill="#020617" />
          <path d="M 648 448 C 652 425 656 405 656 395 C 656 380 664 380 664 395 C 664 405 668 425 672 448 Z" fill="url(#blackPieceGrad)" />
          <circle cx="660" cy="380" r="11" fill="url(#blackPieceGrad)" />
          <path d="M 652 390 C 652 410 650 435 649 448" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>

        {/* Black Knight (Right Center) */}
        <g id="blackKnight">
          <ellipse cx="770" cy="460" rx="46" ry="11" fill="#020617" opacity="0.9" />
          <ellipse cx="770" cy="455" rx="44" ry="10" fill="#0F172A" />
          <path d="M 730 454 L 738 438 L 802 438 L 810 454 Z" fill="url(#blackPieceGrad)" />
          {/* Head profile facing left */}
          <path
            d="M 800 438 C 805 385 815 365 795 330 C 790 320 795 300 785 285 C 772 268 755 272 750 288 C 740 285 725 292 720 305 C 715 320 720 345 712 360 C 706 375 702 405 708 438 Z"
            fill="url(#blackPieceGrad)"
          />
          {/* Blue edge rim highlight on dark horse */}
          <path
            d="M 785 285 C 772 268 755 272 750 288 C 740 285 725 292 720 305 C 715 320 720 345 712 360 C 706 375 702 405 708 438"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          {/* Eye */}
          <circle cx="775" cy="320" r="3.5" fill="#60A5FA" />
        </g>

        {/* Black Pawn (Mid Right) */}
        <g id="blackPawnMid">
          <ellipse cx="805" cy="505" rx="32" ry="9" fill="#020617" />
          <path d="M 780 502 C 785 475 792 445 792 430 C 792 410 818 410 818 430 C 818 445 825 475 830 502 Z" fill="url(#blackPieceGrad)" />
          <circle cx="805" cy="400" r="18" fill="url(#blackPieceGrad)" />
          <path d="M 790 415 C 788 445 785 475 782 502" stroke="#38BDF8" strokeWidth="2.5" fill="none" opacity="0.75" />
          <ellipse cx="800" cy="395" rx="5" ry="8" fill="#60A5FA" opacity="0.6" />
        </g>

        {/* Black King (Foreground Right with Cross) */}
        <g id="blackKing">
          {/* Floor Shadow */}
          <ellipse cx="900" cy="495" rx="68" ry="16" fill="#020617" opacity="0.95" />
          {/* Base */}
          <ellipse cx="900" cy="490" rx="64" ry="15" fill="#0F172A" />
          <path d="M 840 488 L 848 465 L 952 465 L 960 488 Z" fill="url(#blackPieceGrad)" />
          <ellipse cx="900" cy="465" rx="52" ry="11" fill="#1E293B" />
          {/* Stem */}
          <path d="M 856 463 C 868 385 866 335 854 275 L 946 275 C 934 335 932 385 944 463 Z" fill="url(#blackPieceGrad)" />
          {/* Collar ring */}
          <ellipse cx="900" cy="275" rx="46" ry="10" fill="#1E293B" />
          <ellipse cx="900" cy="265" rx="44" ry="9" fill="#0F172A" />
          {/* Crown */}
          <path d="M 860 263 C 848 215 952 215 940 263 Z" fill="url(#blackPieceGrad)" />
          <ellipse cx="900" cy="225" rx="32" ry="7" fill="#1E293B" />
          {/* Finial Cross */}
          <rect x="894" y="175" width="12" height="44" rx="2" fill="url(#blackPieceGrad)" />
          <rect x="880" y="186" width="40" height="11" rx="2" fill="url(#blackPieceGrad)" />
          {/* Specular blue rim light strokes on black piece */}
          <path d="M 856 275 C 868 340 868 395 856 460" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M 944 275 C 932 340 932 395 944 460" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <ellipse cx="890" cy="235" rx="9" ry="15" fill="#38BDF8" opacity="0.4" />
        </g>

        {/* 3. SUBTLE FLOATING PARTICLES / DUST MOTES (BOKEH) */}
        <g opacity="0.6">
          <circle cx="280" cy="350" r="1.5" fill="#93C5FD" />
          <circle cx="310" cy="390" r="2" fill="#BAE6FD" opacity="0.8" />
          <circle cx="380" cy="310" r="2.5" fill="#FFFFFF" opacity="0.7" />
          <circle cx="430" cy="360" r="1.5" fill="#93C5FD" />
          <circle cx="480" cy="290" r="2" fill="#BAE6FD" opacity="0.5" />
          <circle cx="520" cy="340" r="1.5" fill="#FFFFFF" />
          <circle cx="570" cy="380" r="2" fill="#93C5FD" opacity="0.7" />
          <circle cx="620" cy="320" r="2.5" fill="#BAE6FD" />
          <circle cx="690" cy="370" r="1.5" fill="#FFFFFF" />
          <circle cx="730" cy="330" r="2" fill="#93C5FD" opacity="0.6" />
        </g>
      </svg>

      {/* Top gradient blend to near-black screen background */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060A13] via-[#060A13]/80 to-transparent pointer-events-none" />
    </div>
  );
};
