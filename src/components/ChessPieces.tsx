import React from 'react';
import { PieceType, PlayerColor } from '../types';
import { PieceSetId } from '../themes';
import { CBURNETT_PIECES } from './pieceSets/cburnett';
import { NEO_PIECES } from './pieceSets/neo';

interface PieceProps {
  type: PieceType;
  color: PlayerColor;
  pieceSet?: PieceSetId;
  className?: string;
}

export const ChessPiece: React.FC<PieceProps> = ({
  type,
  color,
  pieceSet = 'cburnett',
  className = 'w-full h-full',
}) => {
  const pieceKey = `${color}${type}`;

  // 1. Cburnett (Classic Tournament set)
  if (pieceSet === 'cburnett') {
    const Component = CBURNETT_PIECES[pieceKey];
    if (Component) {
      return (
        <div className={`relative flex items-center justify-center ${className} drop-shadow-sm`}>
          <Component />
        </div>
      );
    }
  }

  // 2. Neo (Modern geometric set)
  if (pieceSet === 'neo') {
    const Component = NEO_PIECES[pieceKey];
    if (Component) {
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <Component />
        </div>
      );
    }
  }

  // 3. Fallback / Silhouette
  const isWhite = color === 'w';
  const fillColor = isWhite ? '#FFFFFF' : '#1E293B';
  const strokeColor = isWhite ? '#0F172A' : '#E2E8F0';
  const accentColor = isWhite ? '#94A3B8' : '#64748B';

  switch (type) {
    case 'p':
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: isWhite ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M12 39h21c1.5 0 2 1 2 2H10c0-1 .5-2 2-2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M14 36c1-2 2-3 4-4h9c2 1 3 2 4 4z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M19 28c0 2-1 4-1 4h9s-1-2-1-4c0-3 2-6 2-10h-8c0 4 2 7 2 10z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M17 18h11" stroke={accentColor} strokeWidth="1.75" strokeLinecap="round" />
            <circle cx="22.5" cy="12.5" r="5.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" />
          </g>
        </svg>
      );

    case 'r':
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: isWhite ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M11 39h23c1.5 0 2 1 2 2H9c0-1 .5-2 2-2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M14 36c1-1.5 2-2 3-2h11c1 0 2 .5 3 2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M16 34l1-17h16l1 17z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M14 17h17" stroke={accentColor} strokeWidth="1.75" strokeLinecap="round" />
            <path d="M13 17v-6h4v3h4v-3h4v3h4v-3h3v6z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
          </g>
        </svg>
      );

    case 'n':
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: isWhite ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M11 39h23c1.5 0 2 1 2 2H9c0-1 .5-2 2-2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M13 39c0-4 1-6 3-8 1-1 3-3 3-5 0-3-2-5-2-8 0-4 3-8 7-9 2-1 5 0 6 2 1 2 0 5-1 6 3 0 6 2 7 5 1 3 0 6-2 9 0 3 2 6 2 9z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M13 25c1 1 3 2 5 2 2 0 4-2 3-5-2-4-7-3-8 3z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="19.5" cy="16.5" r="1.25" fill={strokeColor} />
            <path d="M24 13c1 3 2 7 3 12" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'b':
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: isWhite ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M12 39h21c1.5 0 2 1 2 2H10c0-1 .5-2 2-2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M14 36c1-2 2-3 4-4h9c2 1 3 2 4 4z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M18 32c-1-3-2-7-1-11 1-5 4-8 5.5-12 1.5 4 4.5 7 5.5 12 1 4 0 8-1 11z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <circle cx="22.5" cy="7.5" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M20 16l5 5m0-5l-5 5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'q':
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: isWhite ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M10 39h25c1.5 0 2 1 2 2H8c0-1 .5-2 2-2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M13 36c1-2 2-3 4-3h11c2 0 3 1 4 3z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M15 33l-3-15 7 6 3.5-10 3.5 10 7-6-3 15z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <circle cx="12" cy="17" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.25" />
            <circle cx="19" cy="23" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.25" />
            <circle cx="22.5" cy="13" r="2.2" fill={fillColor} stroke={strokeColor} strokeWidth="1.25" />
            <circle cx="26" cy="23" r="1.5" fill={fillColor} stroke={strokeColor} strokeWidth="1.25" />
            <circle cx="33" cy="17" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.25" />
            <path d="M15 31h15" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'k':
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style={{ filter: isWhite ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
            <path d="M10 39h25c1.5 0 2 1 2 2H8c0-1 .5-2 2-2z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M13 36c1-2 2-3 4-3h11c2 0 3 1 4 3z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M16 33c-2-3-4-8-3-14 3 2 7 2 9.5 0 2.5 2 6.5 2 9.5 0 1 6-1 11-3 14z" fill={fillColor} stroke={strokeColor} strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M17 19c1-3 3-5 5.5-5s4.5 2 5.5 5z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M22.5 7v6m-3-3.5h6" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M17 31h11" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
