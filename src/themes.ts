export type BoardThemeId =
  | 'tech'
  | 'tournament'
  | 'wood'
  | 'steel'
  | 'obsidian'
  | 'ocean';

export type PieceSetId = 'cburnett' | 'neo' | 'silhouette';

export type AccentColorId = 'cyan' | 'amber' | 'emerald' | 'purple' | 'rose' | 'crimson';

export interface BoardTheme {
  id: BoardThemeId;
  name: string;
  lightSquare: string;
  darkSquare: string;
  borderColor: string;
  borderOuter: string;
}

export interface AccentColor {
  id: AccentColorId;
  name: string;
  hex: string;
  glow: string;
  buttonBg: string;
  buttonText: string;
  textClass: string;
}

export const ACCENT_COLORS: Record<AccentColorId, AccentColor> = {
  cyan: {
    id: 'cyan',
    name: 'Electric Cyan',
    hex: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.35)',
    buttonBg: '#00F0FF',
    buttonText: '#020617',
    textClass: 'text-cyan-400',
  },
  amber: {
    id: 'amber',
    name: 'Vivid Amber',
    hex: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.35)',
    buttonBg: '#F59E0B',
    buttonText: '#020617',
    textClass: 'text-amber-400',
  },
  emerald: {
    id: 'emerald',
    name: 'Neon Volt',
    hex: '#10B981',
    glow: 'rgba(16, 185, 129, 0.35)',
    buttonBg: '#10B981',
    buttonText: '#020617',
    textClass: 'text-emerald-400',
  },
  purple: {
    id: 'purple',
    name: 'Hyper Purple',
    hex: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.35)',
    buttonBg: '#A855F7',
    buttonText: '#020617',
    textClass: 'text-purple-400',
  },
  rose: {
    id: 'rose',
    name: 'Hot Magenta',
    hex: '#F43F5E',
    glow: 'rgba(244, 63, 94, 0.35)',
    buttonBg: '#F43F5E',
    buttonText: '#020617',
    textClass: 'text-rose-400',
  },
  crimson: {
    id: 'crimson',
    name: 'Solar Orange',
    hex: '#FF6B00',
    glow: 'rgba(255, 107, 0, 0.35)',
    buttonBg: '#FF6B00',
    buttonText: '#020617',
    textClass: 'text-orange-400',
  },
};

export const BOARD_THEMES: Record<BoardThemeId, BoardTheme> = {
  tech: {
    id: 'tech',
    name: 'Cyber Navy',
    lightSquare: '#6C819B',
    darkSquare: '#182436',
    borderColor: '#0F1726',
    borderOuter: '#080D17',
  },
  tournament: {
    id: 'tournament',
    name: 'Tournament Green',
    lightSquare: '#EEEED2',
    darkSquare: '#769656',
    borderColor: '#3D5429',
    borderOuter: '#28381A',
  },
  wood: {
    id: 'wood',
    name: 'Classic Walnut',
    lightSquare: '#F0D9B5',
    darkSquare: '#B58863',
    borderColor: '#734E32',
    borderOuter: '#4A301D',
  },
  steel: {
    id: 'steel',
    name: 'Steel & Ice',
    lightSquare: '#D4DCE2',
    darkSquare: '#7E94A4',
    borderColor: '#4A5B69',
    borderOuter: '#2E3942',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Slate',
    lightSquare: '#9CA3AF',
    darkSquare: '#374151',
    borderColor: '#1F2937',
    borderOuter: '#111827',
  },
  ocean: {
    id: 'ocean',
    name: 'Maritime Deep',
    lightSquare: '#D8E5F3',
    darkSquare: '#3B6A94',
    borderColor: '#224666',
    borderOuter: '#142C42',
  },
};

export interface PieceSetOption {
  id: PieceSetId;
  name: string;
  description: string;
}

export const PIECE_SETS: PieceSetOption[] = [
  {
    id: 'cburnett',
    name: 'Classic Standard',
    description: 'The standard FIDE / Lichess tournament vector pieces',
  },
  {
    id: 'neo',
    name: 'Modern Neo',
    description: 'Sleek geometric contemporary chess pieces',
  },
  {
    id: 'silhouette',
    name: 'Flat Silhouette',
    description: 'Minimal high-contrast vector outlines',
  },
];
