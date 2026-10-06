import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Screen, PlayerColor, PieceType, GameStatus } from './types';
import {
  BoardThemeId,
  PieceSetId,
  AccentColorId,
  BOARD_THEMES,
  ACCENT_COLORS,
} from './themes';
import { BrandLogo } from './components/BrandLogo';
import { MainMenu } from './components/MainMenu';
import { ChessBoard } from './components/ChessBoard';
import { GameHUD, GameHUDBottom } from './components/GameHUD';
import { GameOverModal } from './components/GameOverModal';
import { ThemeModal } from './components/ThemeModal';
import { setSoundEnabled, isSoundEnabled, playMoveSound } from './utils/audio';

// Initial full piece count for calculating captured pieces
const INITIAL_PIECES: Record<PieceType, number> = {
  p: 8,
  r: 2,
  n: 2,
  b: 2,
  q: 1,
  k: 1,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('MENU');
  const [game, setGame] = useState<Chess>(() => new Chess());
  const [boardVersion, setBoardVersion] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());

  // Appearance & Themes state with local persistence (default: Cyber Navy 'tech')
  const [currentThemeId, setCurrentThemeId] = useState<BoardThemeId>(() => {
    try {
      const saved = localStorage.getItem('chess_theme');
      return saved && saved in BOARD_THEMES ? (saved as BoardThemeId) : 'tech';
    } catch {
      return 'tech';
    }
  });

  const [currentPieceSetId, setCurrentPieceSetId] = useState<PieceSetId>(() => {
    try {
      const saved = localStorage.getItem('chess_piece_set');
      return saved === 'cburnett' || saved === 'neo' || saved === 'silhouette'
        ? (saved as PieceSetId)
        : 'cburnett';
    } catch {
      return 'cburnett';
    }
  });

  // User-configurable Signature Accent Color (cyan, amber, emerald, purple, rose, crimson)
  const [currentAccentId, setCurrentAccentId] = useState<AccentColorId>(() => {
    try {
      const saved = localStorage.getItem('chess_accent');
      return saved && saved in ACCENT_COLORS ? (saved as AccentColorId) : 'cyan';
    } catch {
      return 'cyan';
    }
  });

  const [showCoordinates, setShowCoordinates] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('chess_coords');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Save preferences
  useEffect(() => {
    try {
      localStorage.setItem('chess_theme', currentThemeId);
      localStorage.setItem('chess_piece_set', currentPieceSetId);
      localStorage.setItem('chess_accent', currentAccentId);
      localStorage.setItem('chess_coords', String(showCoordinates));
    } catch {
      // Local storage not available
    }
  }, [currentThemeId, currentPieceSetId, currentAccentId, showCoordinates]);

  const currentTheme = BOARD_THEMES[currentThemeId] || BOARD_THEMES.tech;
  const currentAccent = ACCENT_COLORS[currentAccentId] || ACCENT_COLORS.cyan;

  // Force re-render helper when game instance updates
  const refreshGame = useCallback(() => {
    setBoardVersion((v) => v + 1);
  }, []);

  // Compute captured pieces by counting what is currently missing on the board
  const { whiteCaptured, blackCaptured } = useMemo(() => {
    void boardVersion;
    const currentCounts: { w: Record<PieceType, number>; b: Record<PieceType, number> } = {
      w: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 },
      b: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 },
    };

    const board = game.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          currentCounts[piece.color as PlayerColor][piece.type as PieceType]++;
        }
      }
    }

    const whiteCapturesList: PieceType[] = [];
    (Object.keys(INITIAL_PIECES) as PieceType[]).forEach((type) => {
      const missing = Math.max(0, INITIAL_PIECES[type] - currentCounts.b[type]);
      for (let i = 0; i < missing; i++) {
        whiteCapturesList.push(type);
      }
    });

    const blackCapturesList: PieceType[] = [];
    (Object.keys(INITIAL_PIECES) as PieceType[]).forEach((type) => {
      const missing = Math.max(0, INITIAL_PIECES[type] - currentCounts.w[type]);
      for (let i = 0; i < missing; i++) {
        blackCapturesList.push(type);
      }
    });

    return {
      whiteCaptured: whiteCapturesList,
      blackCaptured: blackCapturesList,
    };
  }, [game, boardVersion]);

  // History in Standard Algebraic Notation (SAN)
  const moveHistorySan = useMemo(() => {
    void boardVersion;
    return game.history();
  }, [game, boardVersion]);

  // Game status assessment (check, checkmate, stalemate, draws)
  const gameStatus: GameStatus = useMemo(() => {
    void boardVersion;
    const isCheck = game.inCheck();
    const isCheckmate = game.isCheckmate();
    const isStalemate = game.isStalemate();
    const isThreefold = game.isThreefoldRepetition();
    const isInsufficient = game.isInsufficientMaterial();
    const isGameOver = game.isGameOver();

    if (isCheckmate) {
      const winner: PlayerColor = game.turn() === 'w' ? 'b' : 'w';
      return {
        isOver: true,
        isCheck: true,
        winner,
        reason: 'checkmate',
        message: `Checkmate! ${winner === 'w' ? 'White' : 'Black'} wins!`,
      };
    }

    if (isStalemate) {
      return {
        isOver: true,
        isCheck: false,
        winner: 'draw',
        reason: 'stalemate',
        message: 'Draw by Stalemate',
      };
    }

    if (isInsufficient) {
      return {
        isOver: true,
        isCheck: false,
        winner: 'draw',
        reason: 'insufficient_material',
        message: 'Draw by Insufficient Material',
      };
    }

    if (isThreefold) {
      return {
        isOver: true,
        isCheck: false,
        winner: 'draw',
        reason: 'threefold_repetition',
        message: 'Draw by Threefold Repetition',
      };
    }

    if (isGameOver) {
      return {
        isOver: true,
        isCheck: false,
        winner: 'draw',
        reason: 'draw',
        message: 'Draw',
      };
    }

    return {
      isOver: false,
      isCheck,
      winner: null,
      reason: null,
      message: '',
    };
  }, [game, boardVersion]);

  // Actions
  const handleStartPlay = () => {
    const newGameInstance = new Chess();
    setGame(newGameInstance);
    setFlipped(false);
    setScreen('PLAYING');
    refreshGame();
  };

  const handleNewGame = () => {
    const newGameInstance = new Chess();
    setGame(newGameInstance);
    refreshGame();
  };

  const handleUndoMove = () => {
    const undone = game.undo();
    if (undone) {
      playMoveSound();
      refreshGame();
    }
  };

  const handleMainMenu = () => {
    setScreen('MENU');
  };

  const handleToggleFlip = () => {
    setFlipped((f) => !f);
  };

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
  };

  const handleToggleCoordinates = () => {
    setShowCoordinates((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full bg-[#060A13] text-slate-100 flex flex-col justify-center select-none relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glow in Signature Accent Color */}
      <div
        className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] opacity-15 transition-all duration-700 -z-10"
        style={{ backgroundColor: currentAccent.glow }}
      />

      {/* Top App Header: ONLY shown when chessboard is playing */}
      {screen === 'PLAYING' && (
        <header className="relative z-10 w-full border-b border-slate-800/90 px-4 py-2.5 flex items-center justify-between backdrop-blur-md bg-[#060A13]/85 animate-in fade-in duration-150">
          <BrandLogo size="compact" accentColor={currentAccent} />

          <div className="flex items-center gap-2">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: currentAccent.hex }}
              />
              <span>PASS & PLAY</span>
            </div>

            {/* Theme options in upper right corner - Clean without unnecessary dot */}
            <button
              type="button"
              onClick={() => setIsThemeModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer shadow-xs"
            >
              <span>{currentTheme.name}</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 flex-1 flex flex-col items-center justify-center w-full ${screen === 'MENU' ? 'p-0' : 'p-2 sm:p-4 max-w-4xl mx-auto'}`}>
        {screen === 'MENU' ? (
          <MainMenu
            accentColor={currentAccent}
            onPlay={handleStartPlay}
            onOpenSettings={() => setIsThemeModalOpen(true)}
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            {/* Top HUD with fixed-height moves bar so board NEVER shifts */}
            <GameHUD
              currentTurn={game.turn() as PlayerColor}
              isCheck={gameStatus.isCheck}
              flipped={flipped}
              soundOn={soundOn}
              theme={currentTheme}
              pieceSet={currentPieceSetId}
              accentColor={currentAccent}
              whiteCaptured={whiteCaptured}
              blackCaptured={blackCaptured}
              canUndo={game.history().length > 0}
              moveHistorySan={moveHistorySan}
              onToggleFlip={handleToggleFlip}
              onToggleSound={handleToggleSound}
              onOpenSettings={() => setIsThemeModalOpen(true)}
              onUndoMove={handleUndoMove}
              onNewGame={handleNewGame}
              onMainMenu={handleMainMenu}
            />

            {/* Chess Board with fluid Framer Motion slide animations & dynamic accent color */}
            <ChessBoard
              game={game}
              theme={currentTheme}
              pieceSet={currentPieceSetId}
              accentColor={currentAccent}
              showCoordinates={showCoordinates}
              flipped={flipped}
              onMoveComplete={refreshGame}
            />

            {/* Bottom HUD Player status */}
            <GameHUDBottom
              currentTurn={game.turn() as PlayerColor}
              isCheck={gameStatus.isCheck}
              flipped={flipped}
              theme={currentTheme}
              pieceSet={currentPieceSetId}
              accentColor={currentAccent}
              whiteCaptured={whiteCaptured}
              blackCaptured={blackCaptured}
            />

            {/* Game Over Modal */}
            {gameStatus.isOver && (
              <GameOverModal
                status={gameStatus}
                accentColor={currentAccent}
                onNewGame={handleNewGame}
                onMainMenu={handleMainMenu}
              />
            )}
          </div>
        )}
      </main>

      {/* Settings Modal (Theme, Accent Color, Piece Style, Coordinates, Sound) */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        currentTheme={currentThemeId}
        currentPieceSet={currentPieceSetId}
        currentAccent={currentAccentId}
        accentColor={currentAccent}
        showCoordinates={showCoordinates}
        soundOn={soundOn}
        onSelectTheme={(id) => setCurrentThemeId(id)}
        onSelectPieceSet={(id) => setCurrentPieceSetId(id)}
        onSelectAccent={(id) => setCurrentAccentId(id)}
        onToggleCoordinates={handleToggleCoordinates}
        onToggleSound={handleToggleSound}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </div>
  );
}
