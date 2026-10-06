import React, { useState, useMemo } from 'react';
import { Chess, Square } from 'chess.js';
import { motion } from 'motion/react';
import { PlayerColor, PieceType, MoveOption } from '../types';
import { BoardTheme, PieceSetId, AccentColor } from '../themes';
import { ChessPiece } from './ChessPieces';
import { PromotionDialog } from './PromotionDialog';
import {
  playMoveSound,
  playCaptureSound,
  playCastleSound,
  playCheckSound,
  playGameOverSound,
  playPromotionSound,
  playSelectSound,
} from '../utils/audio';

interface ChessBoardProps {
  game: Chess;
  theme: BoardTheme;
  pieceSet: PieceSetId;
  accentColor: AccentColor;
  showCoordinates: boolean;
  flipped: boolean;
  onMoveComplete: () => void;
}

interface SlideAnimation {
  moveId: number;
  primary: { from: Square; to: Square };
  secondary?: { from: Square; to: Square };
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  game,
  theme,
  pieceSet,
  accentColor,
  showCoordinates,
  flipped,
  onMoveComplete,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: Square;
    to: Square;
    color: PlayerColor;
  } | null>(null);

  // Active slide animation state
  const [lastSlide, setLastSlide] = useState<SlideAnimation | null>(null);

  // Files and Ranks setup
  const files = useMemo(() => ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], []);
  const ranks = useMemo(() => ['8', '7', '6', '5', '4', '3', '2', '1'], []);

  const displayFiles = useMemo(() => (flipped ? [...files].reverse() : files), [flipped, files]);
  const displayRanks = useMemo(() => (flipped ? [...ranks].reverse() : ranks), [flipped, ranks]);

  // Extract last move from game history
  const lastMove = useMemo(() => {
    const history = game.history({ verbose: true });
    if (history.length === 0) return null;
    return history[history.length - 1];
  }, [game]);

  // Find King square if in check
  const inCheckKingSquare = useMemo(() => {
    if (!game.inCheck()) return null;
    const currentTurn = game.turn();
    const board = game.board();

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k' && piece.color === currentTurn) {
          const file = files[c];
          const rank = ranks[r];
          return `${file}${rank}` as Square;
        }
      }
    }
    return null;
  }, [game, files, ranks]);

  // Compute legal moves for currently selected square
  const legalMovesForSelected = useMemo(() => {
    if (!selectedSquare) return [];
    try {
      return game.moves({ square: selectedSquare, verbose: true }) as MoveOption[];
    } catch {
      return [];
    }
  }, [game, selectedSquare]);

  const legalDestinationMap = useMemo(() => {
    const map = new Map<Square, MoveOption>();
    for (const move of legalMovesForSelected) {
      map.set(move.to as Square, move);
    }
    return map;
  }, [legalMovesForSelected]);

  // Helper to get visual grid index of any square
  const getVisualCoordinates = (square: Square) => {
    const file = square[0];
    const rank = square[1];
    const col = displayFiles.indexOf(file);
    const row = displayRanks.indexOf(rank);
    return { col, row };
  };

  // Execute a move
  const executeMove = (from: Square, to: Square, promotionPiece?: PieceType) => {
    try {
      const isCapture = Boolean(game.get(to) || (game.get(from)?.type === 'p' && from[0] !== to[0]));
      const move = game.move({
        from,
        to,
        promotion: promotionPiece || undefined,
      });

      if (move) {
        setSelectedSquare(null);
        setPendingPromotion(null);

        // Detect castling secondary rook slide
        let secondary: { from: Square; to: Square } | undefined = undefined;
        if (move.flags && move.flags.includes('k')) {
          secondary = move.color === 'w' ? { from: 'h1', to: 'f1' } : { from: 'h8', to: 'f8' };
        } else if (move.flags && move.flags.includes('q')) {
          secondary = move.color === 'w' ? { from: 'a1', to: 'd1' } : { from: 'a8', to: 'd8' };
        }

        // Trigger slide animation for moving piece(s)
        setLastSlide({
          moveId: Date.now(),
          primary: { from, to },
          secondary,
        });

        // Sound feedback
        if (game.isGameOver()) {
          playGameOverSound();
        } else if (game.inCheck()) {
          playCheckSound();
        } else if (promotionPiece) {
          playPromotionSound();
        } else if (move.flags && (move.flags.includes('k') || move.flags.includes('q'))) {
          playCastleSound();
        } else if (isCapture || move.captured) {
          playCaptureSound();
        } else {
          playMoveSound();
        }

        onMoveComplete();
      }
    } catch {
      setSelectedSquare(null);
      setPendingPromotion(null);
    }
  };

  // Handle square tap/click
  const handleSquareClick = (square: Square) => {
    if (game.isGameOver()) return;

    const pieceOnSquare = game.get(square);
    const currentTurn = game.turn();

    // 1. If clicking on one of the legal destinations
    if (selectedSquare && legalDestinationMap.has(square)) {
      const selectedPiece = game.get(selectedSquare);

      // Check if move is a promotion
      const isWhitePawnPromotion =
        selectedPiece?.type === 'p' && selectedPiece.color === 'w' && square.endsWith('8');
      const isBlackPawnPromotion =
        selectedPiece?.type === 'p' && selectedPiece.color === 'b' && square.endsWith('1');

      if (isWhitePawnPromotion || isBlackPawnPromotion) {
        setPendingPromotion({
          from: selectedSquare,
          to: square,
          color: selectedPiece.color as PlayerColor,
        });
        return;
      }

      // Normal move
      executeMove(selectedSquare, square);
      return;
    }

    // 2. If clicking on own piece, select it
    if (pieceOnSquare && pieceOnSquare.color === currentTurn) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
      } else {
        setSelectedSquare(square);
        playSelectSound();
      }
      return;
    }

    // 3. Otherwise deselect
    setSelectedSquare(null);
  };

  const handlePromotionSelect = (promotionType: PieceType) => {
    if (!pendingPromotion) return;
    executeMove(pendingPromotion.from, pendingPromotion.to, promotionType);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none touch-none">
      {/* Promotion Dialog */}
      {pendingPromotion && (
        <PromotionDialog
          color={pendingPromotion.color}
          pieceSet={pieceSet}
          onSelect={handlePromotionSelect}
        />
      )}

      {/* Main 8x8 Board Container with sleek sports-tech border & accent glow */}
      <div
        className="relative w-full max-w-[min(94vw,calc(100vh-230px),540px)] aspect-square p-2.5 sm:p-3 rounded-2xl transition-all duration-300 shadow-2xl"
        style={{
          backgroundColor: theme.borderColor,
          boxShadow: `0 24px 48px -12px ${accentColor.glow}, 0 0 0 3px ${theme.borderOuter}`,
        }}
      >
        <div className="w-full h-full grid grid-cols-8 grid-rows-8 rounded-xl overflow-hidden border border-black/40 shadow-inner">
          {displayRanks.map((rank, rankIndex) =>
            displayFiles.map((file, fileIndex) => {
              const square = `${file}${rank}` as Square;
              const isDark = (rankIndex + fileIndex) % 2 === 1;

              const squareBgColor = isDark ? theme.darkSquare : theme.lightSquare;

              const piece = game.get(square);
              const isSelected = selectedSquare === square;
              const isLegalDestination = legalDestinationMap.has(square);
              const isCapture =
                isLegalDestination &&
                (Boolean(piece) ||
                  (game.get(selectedSquare!)?.type === 'p' && selectedSquare![0] !== square[0]));
              const isLastMoveSquare = lastMove && (lastMove.from === square || lastMove.to === square);
              const isKingInCheck = inCheckKingSquare === square;

              // Border coordinate labels
              const showRankLabel = showCoordinates && (flipped ? fileIndex === 7 : fileIndex === 0);
              const showFileLabel = showCoordinates && (flipped ? rankIndex === 0 : rankIndex === 7);

              // Slide animation calculation for piece on this square
              let slideOffsetX = 0;
              let slideOffsetY = 0;
              let isSlidingPiece = false;

              if (lastSlide && piece) {
                if (square === lastSlide.primary.to) {
                  const fromCoord = getVisualCoordinates(lastSlide.primary.from);
                  const toCoord = getVisualCoordinates(lastSlide.primary.to);
                  slideOffsetX = (fromCoord.col - toCoord.col) * 100;
                  slideOffsetY = (fromCoord.row - toCoord.row) * 100;
                  isSlidingPiece = true;
                } else if (lastSlide.secondary && square === lastSlide.secondary.to) {
                  const fromCoord = getVisualCoordinates(lastSlide.secondary.from);
                  const toCoord = getVisualCoordinates(lastSlide.secondary.to);
                  slideOffsetX = (fromCoord.col - toCoord.col) * 100;
                  slideOffsetY = (fromCoord.row - toCoord.row) * 100;
                  isSlidingPiece = true;
                }
              }

              return (
                <button
                  key={square}
                  type="button"
                  onClick={() => handleSquareClick(square)}
                  aria-label={`Square ${square}${piece ? `, ${piece.color === 'w' ? 'White' : 'Black'} ${piece.type}` : ''}`}
                  style={{ backgroundColor: squareBgColor }}
                  className={`
                    relative w-full h-full flex items-center justify-center p-0.5 sm:p-1 cursor-pointer
                    focus-visible:outline-none transition-colors duration-150
                    ${isKingInCheck ? 'after:absolute after:inset-0 after:bg-rose-500/65 after:animate-pulse' : ''}
                  `}
                >
                  {/* Last Move Indicator */}
                  {isLastMoveSquare && !isSelected && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundColor: `${accentColor.hex}28` }}
                    />
                  )}

                  {/* Selected Square Highlight with Accent Color */}
                  {isSelected && (
                    <div
                      className="absolute inset-0 pointer-events-none ring-2 sm:ring-3 inset-ring"
                      style={{
                        backgroundColor: `${accentColor.hex}38`,
                        borderColor: accentColor.hex,
                        outline: `2px solid ${accentColor.hex}`,
                      }}
                    />
                  )}

                  {/* Pieces Rendering with Framer Motion slide physics */}
                  {piece && (
                    <motion.div
                      key={`piece-${square}-${isSlidingPiece ? lastSlide?.moveId : 'idle'}`}
                      initial={
                        isSlidingPiece
                          ? { x: `${slideOffsetX}%`, y: `${slideOffsetY}%`, zIndex: 30 }
                          : false
                      }
                      animate={{ x: '0%', y: '0%', zIndex: 10 }}
                      transition={{
                        type: 'spring',
                        damping: 24,
                        stiffness: 280,
                        mass: 0.8,
                      }}
                      className="relative z-10 w-[88%] h-[88%] flex items-center justify-center pointer-events-none select-none transition-transform active:scale-95"
                    >
                      <ChessPiece type={piece.type} color={piece.color as PlayerColor} pieceSet={pieceSet} />
                    </motion.div>
                  )}

                  {/* Legal Move Indicators in active Accent Color */}
                  {isLegalDestination && !isCapture && (
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      style={{
                        backgroundColor: accentColor.hex,
                        boxShadow: `0 0 8px ${accentColor.glow}`,
                      }}
                      className="absolute z-20 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full pointer-events-none"
                    />
                  )}

                  {isLegalDestination && isCapture && (
                    <motion.div
                      initial={{ scale: 0.75, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      className="absolute z-20 inset-1 rounded-full border-2 sm:border-3 border-rose-400/90 bg-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.5)] pointer-events-none animate-pulse"
                    />
                  )}

                  {/* Rank coordinate indicator (1-8) */}
                  {showRankLabel && (
                    <span
                      style={{ color: isDark ? theme.lightSquare : theme.darkSquare }}
                      className="absolute top-0.5 left-1 text-[10px] sm:text-xs font-black tracking-tighter leading-none pointer-events-none opacity-75 font-mono"
                    >
                      {rank}
                    </span>
                  )}

                  {/* File coordinate indicator (a-h) */}
                  {showFileLabel && (
                    <span
                      style={{ color: isDark ? theme.lightSquare : theme.darkSquare }}
                      className="absolute bottom-0.5 right-1 text-[10px] sm:text-xs font-black tracking-tighter leading-none pointer-events-none opacity-75 font-mono"
                    >
                      {file}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
