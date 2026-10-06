import React from 'react';
import { motion } from 'motion/react';
import { AccentColor } from '../themes';
import { ChessHeroStage } from './ChessHeroStage';
import { Play, Settings } from 'lucide-react';
import { playMoveSound } from '../utils/audio';

interface MainMenuProps {
  accentColor: AccentColor;
  onPlay: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ accentColor, onPlay, onOpenSettings }) => {
  const handlePlayClick = () => {
    playMoveSound();
    onPlay();
  };

  const handleSettingsClick = () => {
    playMoveSound();
    onOpenSettings();
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center select-none overflow-hidden bg-[#060A13]">
      {/* 1. TOP RIGHT: Settings Icon Button */}
      <button
        type="button"
        onClick={handleSettingsClick}
        aria-label="Settings"
        className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800/90 text-slate-400 hover:text-white transition-all backdrop-blur-md cursor-pointer z-30 shadow-md"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* 2. UPPER CONTENT: Brand Title & Play / Settings Action Stack */}
      <div className="w-full flex-1 flex flex-col items-center justify-center pt-10 sm:pt-14 px-4 z-20 max-w-md mx-auto">
        {/* CHESS OFFLINE BY SOURAV Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-8 sm:mb-10"
        >
          {/* Main Title Row */}
          <div className="relative inline-flex items-baseline justify-center tracking-tight">
            <span
              style={{
                textShadow: `0 0 28px ${accentColor.glow}`,
              }}
              className="font-black italic uppercase text-white text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-none select-none drop-shadow-md"
            >
              CHESS
            </span>
            <span className="ml-2.5 sm:ml-3 font-light italic uppercase text-slate-400 text-3xl sm:text-4xl md:text-5xl tracking-wide opacity-80 leading-none select-none">
              OFFLINE
            </span>
          </div>

          {/* Underneath: Blue Dot + BY SOURAV */}
          <div className="flex items-center justify-center gap-2.5 mt-2.5">
            <span
              className="w-2 h-2 rounded-full inline-block shadow-sm"
              style={{
                backgroundColor: accentColor.hex,
                boxShadow: `0 0 8px ${accentColor.glow}`,
              }}
            />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.42em] text-slate-300 select-none">
              BY SOURAV
            </span>
          </div>
        </motion.div>

        {/* Action Buttons Stack */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="w-full flex flex-col items-center gap-3.5 max-w-[310px] sm:max-w-[330px]"
        >
          {/* Primary PLAY CHESS Button with internal divider [ ▶ | PLAY CHESS ] */}
          <button
            type="button"
            onClick={handlePlayClick}
            style={{
              backgroundColor: accentColor.hex,
              color: accentColor.buttonText,
              boxShadow: `0 8px 30px -4px ${accentColor.glow}`,
            }}
            className="w-full py-4 px-6 rounded-2xl font-black italic uppercase text-base sm:text-lg tracking-wider transition-all flex items-center justify-center gap-4 cursor-pointer hover:brightness-110 active:scale-[0.98] shadow-xl group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            <div className="flex items-center justify-center">
              <Play className="w-5 h-5 fill-current transition-transform group-hover:scale-110" />
            </div>
            <div className="w-[1.5px] h-5 bg-black/25 opacity-70" />
            <span className="tracking-wide">PLAY CHESS</span>
          </button>

          {/* Secondary SETTINGS Button with internal divider [ ⚙ | SETTINGS ] */}
          <button
            type="button"
            onClick={handleSettingsClick}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#0B1322]/85 hover:bg-slate-800/90 active:scale-[0.98] text-slate-300 hover:text-white font-bold uppercase text-xs sm:text-sm tracking-wider border border-slate-700/60 hover:border-slate-600 transition-all flex items-center justify-center gap-4 cursor-pointer shadow-md backdrop-blur-md"
          >
            <div className="flex items-center justify-center text-slate-400">
              <Settings className="w-4 h-4" />
            </div>
            <div className="w-[1.5px] h-4 bg-slate-700/80" />
            <span className="tracking-wider">SETTINGS</span>
          </button>
        </motion.div>
      </div>

      {/* 3. BOTTOM: Cinematic 3D Chessboard Stage with White & Black Pieces */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="w-full mt-auto z-10"
      >
        <ChessHeroStage accentColorHex={accentColor.hex} />
      </motion.div>
    </div>
  );
};
