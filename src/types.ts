export type Screen = 'MENU' | 'PLAYING';

export type PlayerColor = 'w' | 'b';

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface PieceInfo {
  type: PieceType;
  color: PlayerColor;
}

export interface MoveOption {
  from: string;
  to: string;
  promotion?: string;
  captured?: PieceType;
  san: string;
  flags: string;
}

export type GameEndReason =
  | 'checkmate'
  | 'stalemate'
  | 'insufficient_material'
  | 'threefold_repetition'
  | 'fifty_moves'
  | 'draw';

export interface GameStatus {
  isOver: boolean;
  isCheck: boolean;
  winner: PlayerColor | 'draw' | null;
  reason: GameEndReason | null;
  message: string;
}
