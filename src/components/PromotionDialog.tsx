import React from 'react';
import { motion } from 'motion/react';
import { PieceType, PlayerColor } from '../types';
import { PieceSetId } from '../themes';
import { ChessPiece } from './ChessPieces';

interface PromotionDialogProps {
  color: PlayerColor;
  pieceSet?: PieceSetId;
  onSelect: (piece: PieceType) => void;
}

const PROMOTION_OPTIONS: { type: PieceType; label: string }[] = [
  { type: 'q', label: 'Queen' },
  { type: 'r', label: 'Rook' },
  { type: 'b', label: 'Bishop' },
  { type: 'n', label: 'Knight' },
];

export const PromotionDialog: React.FC<PromotionDialogProps> = ({
  color,
  pieceSet = 'cburnett',
  onSelect,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promotion-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 8 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-center"
      >
        <h3 id="promotion-title" className="text-lg font-bold text-white mb-1">
          Promote Pawn
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Select a piece to promote your pawn ({color === 'w' ? 'White' : 'Black'})
        </p>

        <div className="grid grid-cols-4 gap-3">
          {PROMOTION_OPTIONS.map(({ type, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-amber-400/70 active:scale-95 transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <div className="w-12 h-12 mb-2 flex items-center justify-center transition-transform group-hover:scale-110">
                <ChessPiece type={type} color={color} pieceSet={pieceSet} />
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-amber-400">
                {label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
