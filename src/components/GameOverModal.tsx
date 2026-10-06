import React from 'react';
import { motion } from 'motion/react';
import { GameStatus } from '../types';
import { AccentColor } from '../themes';
import { RotateCcw, Home } from 'lucide-react';
import { playMoveSound } from '../utils/audio';

interface GameOverModalProps {
  status: GameStatus;
  accentColor: AccentColor;
  onNewGame: () => void;
  onMainMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  status,
  accentColor,
  onNewGame,
  onMainMenu,
}) => {
  let primaryHeading = 'GAME OVER';
  let secondaryHeading = '';

  if (status.reason === 'checkmate') {
    primaryHeading = 'CHECKMATE';
    secondaryHeading = status.winner === 'w' ? 'WHITE WINS' : 'BLACK WINS';
  } else if (status.reason === 'stalemate') {
    primaryHeading = 'DRAW';
    secondaryHeading = 'BY STALEMATE';
  } else if (status.reason === 'insufficient_material') {
    primaryHeading = 'DRAW';
    secondaryHeading = 'INSUFFICIENT MATERIAL';
  } else if (status.reason === 'threefold_repetition') {
    primaryHeading = 'DRAW';
    secondaryHeading = 'THREEFOLD REPETITION';
  } else if (status.reason === 'fifty_moves') {
    primaryHeading = 'DRAW';
    secondaryHeading = '50-MOVE RULE';
  } else {
    primaryHeading = 'DRAW';
    secondaryHeading = status.message.toUpperCase() || 'STALEMATE';
  }

  const handleNewGame = () => {
    playMoveSound();
    onNewGame();
  };

  const handleMainMenu = () => {
    playMoveSound();
    onMainMenu();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-sm bg-[#0C1322] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Subtle accent sheen */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1"
          style={{
            background: `linear-gradient(to right, transparent, ${accentColor.hex}, transparent)`,
          }}
        />

        {/* Small subtle branding kicker */}
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500 block mb-3">
          CHESS OFFLINE · RESULT
        </span>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-white leading-none mb-1">
          {primaryHeading}
        </h2>

        {/* Secondary Heading (e.g. WHITE WINS / BLACK WINS) */}
        <p
          style={{ color: accentColor.hex }}
          className="text-xl sm:text-2xl font-black italic tracking-tight uppercase mb-6"
        >
          {secondaryHeading}
        </p>

        {/* Subtitle explanation */}
        <div className="py-2.5 px-3 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {status.reason === 'checkmate'
              ? `${status.winner === 'w' ? 'White' : 'Black'} delivered winning checkmate`
              : status.reason === 'stalemate'
              ? 'King has no legal moves and is not in check'
              : status.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleNewGame}
            style={{
              backgroundColor: accentColor.hex,
              color: accentColor.buttonText,
              boxShadow: `0 4px 15px ${accentColor.glow}`,
            }}
            className="w-full py-3.5 px-4 flex items-center justify-center gap-2 rounded-xl font-black italic uppercase text-sm tracking-tight transition-all cursor-pointer hover:brightness-110 active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            type="button"
            onClick={handleMainMenu}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold uppercase text-xs tracking-wider transition-all border border-slate-800 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>MAIN MENU</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
