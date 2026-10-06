import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BoardThemeId,
  PieceSetId,
  AccentColorId,
  AccentColor,
  BOARD_THEMES,
  PIECE_SETS,
  ACCENT_COLORS,
} from '../themes';
import { ChessPiece } from './ChessPieces';
import { X, Check, Settings2, Volume2, VolumeX, Eye } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  currentTheme: BoardThemeId;
  currentPieceSet: PieceSetId;
  currentAccent: AccentColorId;
  accentColor: AccentColor;
  showCoordinates: boolean;
  soundOn: boolean;
  onSelectTheme: (themeId: BoardThemeId) => void;
  onSelectPieceSet: (pieceSetId: PieceSetId) => void;
  onSelectAccent: (accentId: AccentColorId) => void;
  onToggleCoordinates: () => void;
  onToggleSound: () => void;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  currentTheme,
  currentPieceSet,
  currentAccent,
  accentColor,
  showCoordinates,
  soundOn,
  onSelectTheme,
  onSelectPieceSet,
  onSelectAccent,
  onToggleCoordinates,
  onToggleSound,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="w-full max-w-lg bg-[#0C1322] border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <Settings2 className="w-5 h-5" style={{ color: accentColor.hex }} />
                <div>
                  <h2 className="text-base font-black italic uppercase tracking-wider text-white">
                    SETTINGS
                  </h2>
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 block">
                    CHESS OFFLINE · CUSTOMIZE
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Accent Color Section */}
            <div className="py-4 border-b border-slate-800/80">
              <span
                style={{ color: accentColor.hex }}
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block"
              >
                SIGNATURE ACCENT COLOR
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(Object.keys(ACCENT_COLORS) as AccentColorId[]).map((accentId) => {
                  const a = ACCENT_COLORS[accentId];
                  const isSelected = currentAccent === accentId;

                  return (
                    <button
                      key={accentId}
                      type="button"
                      onClick={() => onSelectAccent(accentId)}
                      className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-white ring-2 ring-white/20'
                          : 'border-slate-800 bg-[#090E1A] hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full mb-1.5 shadow-md flex items-center justify-center transition-transform hover:scale-105"
                        style={{
                          backgroundColor: a.hex,
                          boxShadow: `0 0 12px ${a.glow}`,
                        }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-slate-950 font-bold stroke-[3]" />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tight text-slate-300">
                        {a.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Board Themes Section */}
            <div className="py-4 border-b border-slate-800/80">
              <span
                style={{ color: accentColor.hex }}
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block"
              >
                BOARD PALETTE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(BOARD_THEMES) as BoardThemeId[]).map((themeId) => {
                  const t = BOARD_THEMES[themeId];
                  const isSelected = currentTheme === themeId;

                  return (
                    <button
                      key={themeId}
                      type="button"
                      onClick={() => onSelectTheme(themeId)}
                      className={`relative flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-white bg-slate-900/90 ring-1 ring-white/30'
                          : 'border-slate-800 bg-[#090E1A] hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      {/* Mini 2x2 board swatch */}
                      <div
                        className="w-full h-10 rounded-lg grid grid-cols-2 grid-rows-2 overflow-hidden mb-2 border shadow-xs"
                        style={{ borderColor: t.borderColor }}
                      >
                        <div style={{ backgroundColor: t.lightSquare }} />
                        <div style={{ backgroundColor: t.darkSquare }} />
                        <div style={{ backgroundColor: t.darkSquare }} />
                        <div style={{ backgroundColor: t.lightSquare }} />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold uppercase tracking-tight text-slate-200 truncate">
                          {t.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor.hex }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Piece Sets Section */}
            <div className="py-4 border-b border-slate-800/80">
              <span
                style={{ color: accentColor.hex }}
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block"
              >
                PIECE STYLE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PIECE_SETS.map((set) => {
                  const isSelected = currentPieceSet === set.id;

                  return (
                    <button
                      key={set.id}
                      type="button"
                      onClick={() => onSelectPieceSet(set.id)}
                      className={`relative flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-white bg-slate-900/90 ring-1 ring-white/30'
                          : 'border-slate-800 bg-[#090E1A] hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3 h-11 mb-2 bg-[#060A14] rounded-lg p-1 border border-slate-800/60">
                        <div className="w-7 h-7">
                          <ChessPiece type="k" color="w" pieceSet={set.id} />
                        </div>
                        <div className="w-7 h-7">
                          <ChessPiece type="n" color="b" pieceSet={set.id} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <span className="text-xs font-black italic uppercase tracking-tight text-slate-200">
                          {set.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor.hex }} />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{set.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General Toggles */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onToggleCoordinates}
                className="flex-1 flex items-center justify-between p-3 rounded-xl bg-[#090E1A] hover:bg-slate-850 border border-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" style={{ color: accentColor.hex }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    COORDINATES
                  </span>
                </div>
                <span
                  style={{ color: showCoordinates ? accentColor.hex : undefined }}
                  className={`text-xs font-black tracking-wider ${!showCoordinates ? 'text-slate-500' : ''}`}
                >
                  {showCoordinates ? 'SHOWN' : 'HIDDEN'}
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleSound}
                className="flex-1 flex items-center justify-between p-3 rounded-xl bg-[#090E1A] hover:bg-slate-850 border border-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {soundOn ? (
                    <Volume2 className="w-4 h-4" style={{ color: accentColor.hex }} />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    SOUND EFFECTS
                  </span>
                </div>
                <span
                  style={{ color: soundOn ? accentColor.hex : undefined }}
                  className={`text-xs font-black tracking-wider ${!soundOn ? 'text-slate-500' : ''}`}
                >
                  {soundOn ? 'ENABLED' : 'MUTED'}
                </span>
              </button>
            </div>

            {/* Bottom Done button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: accentColor.hex,
                  color: accentColor.buttonText,
                  boxShadow: `0 4px 14px ${accentColor.glow}`,
                }}
                className="w-full py-3 rounded-xl font-black italic uppercase text-xs sm:text-sm tracking-wider transition-all cursor-pointer hover:brightness-110"
              >
                APPLY & CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
