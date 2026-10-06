import React from 'react';
import { PieceType, PlayerColor } from '../types';
import { PieceSetId } from '../themes';
import { ChessPiece } from './ChessPieces';

interface CapturedPiecesProps {
  color: PlayerColor;
  pieces: PieceType[];
  pieceSet?: PieceSetId;
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({
  color,
  pieces,
  pieceSet = 'cburnett',
}) => {
  if (pieces.length === 0) {
    return <div className="h-6" />;
  }

  // Value order: Queen, Rook, Bishop, Knight, Pawn
  const order: PieceType[] = ['q', 'r', 'b', 'n', 'p'];
  const sorted = [...pieces].sort((a, b) => order.indexOf(a) - order.indexOf(b));

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 min-h-[24px] overflow-x-auto py-0.5 max-w-full">
      {sorted.map((type, idx) => (
        <div key={`${type}-${idx}`} className="w-5 h-5 shrink-0 opacity-90 hover:opacity-100 transition-opacity">
          <ChessPiece type={type} color={color} pieceSet={pieceSet} />
        </div>
      ))}
    </div>
  );
};
