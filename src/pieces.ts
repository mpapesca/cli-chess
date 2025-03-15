
// starting positions for all chess pieces for player 1

export const icons = {
  pawn: "♙",
  knight: "♘",
  bishop: "♗",
  rook: "♖",
  queen: "♕",
  king: "♔",
} as const;

export type PieceIcon = typeof icons[keyof typeof icons];
export type Player = 1 | 2;

export type PieceType = keyof typeof icons;

export type Vertex = [number, number];

export type Position =
| 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1'
| 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2'
| 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3'
| 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4'
| 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5'
| 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6'
| 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7'
| 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8';

export interface Piece {
  player: Player;
  type: PieceType;
  position?: Position;
}

export const startingPositions: {
  [key :string]: Piece;
} = {
  ra1: {
    player: 1,
    type: "rook",
    position: "a1",
  },
  nb1: {
    player: 1,
    type: "knight",
    position: "b1",
  },
  bc1: {
    player: 1,
    type: "bishop",
    position: "c1",
  },
  kd1: {
    player: 1,
    type: "king",
    position: "d1",
  },
  qe1: {
    player: 1,
    type: "queen",
    position: "e1",
  },
  bf1: {
    player: 1,
    type: "bishop",
    position: "f1",
  },
  ng1: {
    player: 1,
    type: "knight",
    position: "g1",
  },
  rh1: {
    player: 1,
    type: "rook",
    position: "h1",
  },
  pa2: {
    player: 1,
    type: "pawn",
    position: "a2",
  },
  pb2: {
    player: 1,
    type: "pawn",
    position: "b2",
  },
  pc2: {
    player: 1,
    type: "pawn",
    position: "c2",
  },
  pd2: {
    player: 1,
    type: "pawn",
    position: "d2",
  },
  pe2: {
    player: 1,
    type: "pawn",
    position: "e2",
  },
  pf2: {
    player: 1,
    type: "pawn",
    position: "f2",
  },
  pg2: {
    player: 1,
    type: "pawn",
    position: "g2",
  },
  ph2: {
    player: 1,
    type: "pawn",
    position: "h2",
  },
  ra8: {
    player: 2,
    type: "rook",
    position: "a8",
  },
  nb8: {
    player: 2,
    type: "knight",
    position: "b8",
  },
  bc8: {
    player: 2,
    type: "bishop",
    position: "c8",
  },
  kd8: {
    player: 2,
    type: "king",
    position: "d8",
  },
  qe8: {
    player: 2,
    type: "queen",
    position: "e8",
  },
  bf8: {
    player: 2,
    type: "bishop",
    position: "f8",
  },
  ng8: {
    player: 2,
    type: "knight",
    position: "g8",
  },
  rh8: {
    player: 2,
    type: "rook",
    position: "h8",
  },
  pa7: {
    player: 2,
    type: "pawn",
    position: "a7",
  },
  pb7: {
    player: 2,
    type: "pawn",
    position: "b7",
  },
  pc7: {
    player: 2,
    type: "pawn",
    position: "c7",
  },
  pd7: {
    player: 2,
    type: "pawn",
    position: "d7",
  },
  pe7: {
    player: 2,
    type: "pawn",
    position: "e7",
  },
  pf7: {
    player: 2,
    type: "pawn",
    position: "f7",
  },
  pg7: {
    player: 2,
    type: "pawn",
    position: "g7",
  },
  ph7: {
    player: 2,
    type: "pawn",
    position: "h7",
  },
};
export type BoardPosition = Piece | null;
export type BoardRow = [BoardPosition , BoardPosition, BoardPosition, BoardPosition, BoardPosition, BoardPosition, BoardPosition, BoardPosition];
export type Board = [BoardRow, BoardRow, BoardRow, BoardRow, BoardRow, BoardRow, BoardRow, BoardRow];

export const startingBoard: Board = [
  [
    startingPositions.ra8,
    startingPositions.nb8,
    startingPositions.bc8,
    startingPositions.kd8,
    startingPositions.qe8,
    startingPositions.bf8,
    startingPositions.ng8,
    startingPositions.rh8,
  ],
  [
    startingPositions.pa7,
    startingPositions.pb7,
    startingPositions.pc7,
    startingPositions.pd7,
    startingPositions.pe7,
    startingPositions.pf7,
    startingPositions.pg7,
    startingPositions.ph7,
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    startingPositions.pa2,
    startingPositions.pb2,
    startingPositions.pc2,
    startingPositions.pd2,
    startingPositions.pe2,
    startingPositions.pf2,
    startingPositions.pg2,
    startingPositions.ph2,
  ],
  [
    startingPositions.ra1,
    startingPositions.nb1,
    startingPositions.bc1,
    startingPositions.kd1,
    startingPositions.qe1,
    startingPositions.bf1,
    startingPositions.ng1,
    startingPositions.rh1,
  ],
];

const allPlayerPieces = {
  1: [
    startingPositions.ra1,
    startingPositions.nb1,
    startingPositions.bc1,
    startingPositions.kd1,
    startingPositions.qe1,
    startingPositions.bf1,
    startingPositions.ng1,
    startingPositions.rh1,
    startingPositions.pa2,
    startingPositions.pb2,
    startingPositions.pc2,
    startingPositions.pd2,
    startingPositions.pe2,
    startingPositions.pf2,
    startingPositions.pg2,
    startingPositions.ph2,
  ],
  2: [
    startingPositions.ra8,
    startingPositions.nb8,
    startingPositions.bc8,
    startingPositions.kd8,
    startingPositions.qe8,
    startingPositions.bf8,
    startingPositions.ng8,
    startingPositions.rh8,
    startingPositions.pa7,
    startingPositions.pb7,
    startingPositions.pc7,
    startingPositions.pd7,
    startingPositions.pe7,
    startingPositions.pf7,
    startingPositions.pg7,
    startingPositions.ph7,
  ],
} as const;

export const blankBoard = `
  +---+---+---+---+---+---+---+---+
8 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
7 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
6 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
5 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
4 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
3 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
2 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
1 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
    A   B   C   D   E   F   G   H  `

export type BoardState = typeof startingPositions;
