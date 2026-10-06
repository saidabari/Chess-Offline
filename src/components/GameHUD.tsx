import React from 'react';
import { PlayerColor, PieceType } from '../types';
import { BoardTheme, PieceSetId, AccentColor } from '../themes';
import { CapturedPieces } from './CapturedPieces';
import {
  RotateCcw,
  Home,
  Volume2,
  VolumeX,
  ArrowUpDown,
  Settings2,
  Undo2,
  AlertTriangle,
} from 'lucide-react';

interface GameHUDProps {
  currentTurn: PlayerColor;
  isCheck: boolean;
  flipped: boolean;
  soundOn: boolean;
  theme: BoardTheme;
  pieceSet: PieceSetId;
  accentColor: AccentColor;
  whiteCaptured: PieceType[];
  blackCaptured: PieceType[];
  canUndo: boolean;
  moveHistorySan: string[];
  onToggleFlip: () => void;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onUndoMove: () => void;
  onNewGame: () => void;
  onMainMenu: () => void;
}

const PIECE_VALUES: Record<PieceType, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

export const GameHUD: React.FC<GameHUDProps> = ({
  currentTurn,
  isCheck,
  flipped,
  soundOn,
  pieceSet,
  accentColor,
  whiteCaptured,
  blackCaptured,
  canUndo,
  moveHistorySan,
  onToggleFlip,
  onToggleSound,
  onOpenSettings,
  onUndoMove,
  onNewGame,
  onMainMenu,
}) => {
  const isWhiteTurn = currentTurn === 'w';

  // Material evaluation
  const whiteScore = whiteCaptured.reduce((sum, p) => sum + PIECE_VALUES[p], 0);
  const blackScore = blackCaptured.reduce((sum, p) => sum + PIECE_VALUES[p], 0);
  const whiteAdvantage = whiteScore - blackScore;
  const blackAdvantage = blackScore - whiteScore;

  // Determine top and bottom player based on board flipped state
  const topColor: PlayerColor = flipped ? 'w' : 'b';
  const bottomColor: PlayerColor = flipped ? 'b' : 'w';

  const topCaptured = topColor === 'w' ? whiteCaptured : blackCaptured;
  const topAdvantage = topColor === 'w' ? whiteAdvantage : blackAdvantage;

  const recentMovesText = moveHistorySan.slice(-4).join(' ');

  return (
    <div className="w-full max-w-[min(94vw,calc(100vh-230px),540px)] flex flex-col gap-1.5 mb-2 select-none">
      {/* Top Header Controls Bar - Clean rounded panel with compact controls */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0C1322] border border-slate-800/90 rounded-2xl shadow-xs">
        {/* Left: Main Menu, New Game & Undo */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onMainMenu}
            aria-label="Main Menu"
            title="Main Menu"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MENU</span>
          </button>

          <button
            type="button"
            onClick={onNewGame}
            aria-label="New Game"
            title="New Game"
            style={{
              backgroundColor: accentColor.hex,
              color: accentColor.buttonText,
              boxShadow: `0 2px 10px ${accentColor.glow}`,
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-black italic uppercase tracking-wider transition-all cursor-pointer hover:brightness-110 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>NEW GAME</span>
          </button>

          {canUndo && (
            <button
              type="button"
              onClick={onUndoMove}
              aria-label="Undo Move"
              title="Undo last move"
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-800 transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">UNDO</span>
            </button>
          )}
        </div>

        {/* Right: Settings, Flip & Sound */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            title="Appearance & Board Settings"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleFlip}
            aria-label="Flip Board"
            title="Flip Board"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundOn ? 'Mute Sound' : 'Enable Sound'}
            title={soundOn ? 'Mute Sound' : 'Enable Sound'}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4" style={{ color: accentColor.hex }} />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Move History Strip - Fixed height container so the chessboard NEVER shifts or moves */}
      <div className="flex items-center justify-between px-3 h-7 bg-[#090E1A] border border-slate-800/80 rounded-xl text-[10px] sm:text-[11px] font-mono shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="text-slate-500 font-bold uppercase tracking-widest shrink-0">MOVES:</span>
          <span className="text-slate-300 font-medium truncate max-w-[240px] sm:max-w-md">
            {moveHistorySan.length > 0 ? recentMovesText : 'WHITE TO MOVE · GAME READY'}
          </span>
        </div>

        {/* Inline Check indicator when in check - does not expand height or shift the board */}
        {isCheck && (
          <span className="flex items-center gap-1 text-[10px] font-black uppercase text-rose-400 bg-rose-500/15 border border-rose-500/50 px-2 py-0.5 rounded-md animate-pulse shrink-0">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>CHECK</span>
          </span>
        )}
      </div>

      {/* Top Player Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0C1322] border border-slate-800/90 rounded-2xl">
        <div className="flex items-center gap-2">
          <div
            className={`w-3.5 h-3.5 rounded-full border shadow-xs ${
              topColor === 'w' ? 'bg-white border-slate-300' : 'bg-slate-950 border-slate-700'
            }`}
          />
          <span className="text-xs font-black italic tracking-wide uppercase text-slate-200">
            {topColor === 'w' ? 'WHITE' : 'BLACK'}
          </span>
          {topAdvantage > 0 && (
            <span
              style={{ color: accentColor.hex }}
              className="text-[10px] font-bold font-mono"
            >
              +{topAdvantage}
            </span>
          )}
          {currentTurn === topColor && (
            <span
              style={{
                color: accentColor.hex,
                borderColor: `${accentColor.hex}44`,
                backgroundColor: `${accentColor.hex}18`,
              }}
              className="text-[10px] font-black italic tracking-widest uppercase px-2 py-0.5 rounded-md border animate-pulse ml-1"
            >
              TURN
            </span>
          )}
          {isCheck && currentTurn === topColor && (
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/50 animate-pulse">
              IN CHECK
            </span>
          )}
        </div>
        <CapturedPieces color={topColor === 'w' ? 'b' : 'w'} pieces={topCaptured} pieceSet={pieceSet} />
      </div>
    </div>
  );
};

export const GameHUDBottom: React.FC<{
  currentTurn: PlayerColor;
  isCheck: boolean;
  flipped: boolean;
  theme: BoardTheme;
  pieceSet: PieceSetId;
  accentColor: AccentColor;
  whiteCaptured: PieceType[];
  blackCaptured: PieceType[];
}> = ({ currentTurn, isCheck, flipped, pieceSet, accentColor, whiteCaptured, blackCaptured }) => {
  const bottomColor: PlayerColor = flipped ? 'b' : 'w';
  const bottomCaptured = bottomColor === 'w' ? whiteCaptured : blackCaptured;

  const whiteScore = whiteCaptured.reduce((sum, p) => sum + PIECE_VALUES[p], 0);
  const blackScore = blackCaptured.reduce((sum, p) => sum + PIECE_VALUES[p], 0);
  const bottomAdvantage = bottomColor === 'w' ? whiteScore - blackScore : blackScore - whiteScore;

  return (
    <div className="w-full max-w-[min(94vw,calc(100vh-230px),540px)] flex items-center justify-between px-3 py-1.5 mt-2 bg-[#0C1322] border border-slate-800/90 rounded-2xl select-none">
      <div className="flex items-center gap-2">
        <div
          className={`w-3.5 h-3.5 rounded-full border shadow-xs ${
            bottomColor === 'w' ? 'bg-white border-slate-300' : 'bg-slate-950 border-slate-700'
          }`}
        />
        <span className="text-xs font-black italic tracking-wide uppercase text-slate-200">
          {bottomColor === 'w' ? 'WHITE' : 'BLACK'}
        </span>
        {bottomAdvantage > 0 && (
          <span
            style={{ color: accentColor.hex }}
            className="text-[10px] font-bold font-mono"
          >
            +{bottomAdvantage}
          </span>
        )}
        {currentTurn === bottomColor && (
          <span
            style={{
              color: accentColor.hex,
              borderColor: `${accentColor.hex}44`,
              backgroundColor: `${accentColor.hex}18`,
            }}
            className="text-[10px] font-black italic tracking-widest uppercase px-2 py-0.5 rounded-md border animate-pulse ml-1"
          >
            TURN
          </span>
        )}
        {isCheck && currentTurn === bottomColor && (
          <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/50 animate-pulse">
            IN CHECK
          </span>
        )}
      </div>
      <CapturedPieces color={bottomColor === 'w' ? 'b' : 'w'} pieces={bottomCaptured} pieceSet={pieceSet} />
    </div>
  );
};
