// const figlet = require("figlet");
import figlet from "figlet";
import { program } from "commander";
import { input } from '@inquirer/prompts';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { icons, startingBoard, type Board, type Piece, type Position, type Vertex } from "./src/pieces.ts";
import chalk from "chalk";

const DISABLE_LOGS = false;

const log = (str: string) => {
  if (!DISABLE_LOGS) {
    console.log(str);
  }
}

const getColor = (player: 1 | 2) => {
  if (player === 1) {
    return chalk.yellow;
  } else {
    return chalk.green;
  }
}

const wrapPieceIcon = (icon?: string, withPointer = false, isSelected = false) => {
  let formattedIcon = icon !== ' ' ? icon : withPointer ? "X" : " ";

  if (withPointer && isSelected) {
    formattedIcon = chalk.cyan(formattedIcon);
  } else if (withPointer) {
    formattedIcon = chalk.white(formattedIcon);
  } else if (isSelected) {
    formattedIcon = chalk.blue(formattedIcon);
  }

  return ` ${formattedIcon} `;
};



const renderBoard = (board: Board, pointerPosition?: [number, number], selectedPiece?: Piece | null, capturedPieces: Piece[] = []) => {
  const teamCapturedPieces: { [key in 1 | 2]: Piece[] } = {
    1: capturedPieces.filter((piece) => piece.player === 2),
    2: capturedPieces.filter((piece) => piece.player === 1),
  };
  const border = "\n  +---+---+---+---+---+---+---+---+\n";
  let renderedBoard = border;
  renderedBoard += board.map((row, rowIndex) => {
    const rowString = row.map((piece, columnIndex) => {
      const isPointer = pointerPosition && pointerPosition[0] === rowIndex && pointerPosition[1] === columnIndex;
      const emptyPosition = " ";
      if (!piece) {
        return wrapPieceIcon(emptyPosition, isPointer);
      }

      const isSelected = selectedPiece?.position === piece.position;
      const color = getColor(piece.player);
      return color(wrapPieceIcon(`${icons[piece.type]}`, isPointer, isSelected));
    }).join("|")
    return `${8 - (rowIndex)} |${rowString}|`;
  }).join(border);
  renderedBoard += border + "    a   b   c   d   e   f   g   h";

  Object.entries(teamCapturedPieces).forEach(([player, pieces]) => {
    const capturedIcons = pieces.map((piece: Piece) => {
      const pieceColor = getColor(piece.player);
      const icon = icons[piece.type];
      return pieceColor(icon);
    });
    const playerColor = getColor(parseInt(player) as 1 | 2);
    console.log(`${playerColor('P' + player + ' captured:')}  ${capturedIcons.join(" ")}`);
  });

  console.log(renderedBoard);
}

const getPiece = (board: Board, pointer: Vertex) => {
  const [row, column] = pointer;
  const piece = board[row][column];
  return piece;
}

const positionToVertex = (coordinate: Position): Vertex => {
  const [columnLetter, rowNumber] = coordinate.split('');
  const column = columnLetter.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = 8 - parseInt(rowNumber);
  return [row, column];
};

const vertexToPosition = (vertex: Vertex): Position => {
  const [row, column] = vertex;
  const columnLetter = String.fromCharCode('a'.charCodeAt(0) + column);
  const rowNumber = (8 - row).toString();
  return `${columnLetter}${rowNumber}` as Position;
}

const movePiece = ({
  board,
  piece,
  position,
  vertex,
}: { board: Board, piece: Piece, position?: Position, vertex?: Vertex }) => {
  if (!piece.position || (!position && !vertex)) {
    return;
  }
  const newVertex = vertex ?? positionToVertex(position!);
  const newPosition = position ?? vertexToPosition(vertex!);
  const oldVertex = positionToVertex(piece.position!);
  board[newVertex[0]][newVertex[1]] = piece;
  board[oldVertex[0]][oldVertex[1]] = null;
  piece.position = newPosition;
};

const removePiece = ({
  board,
  piece,
}: { board: Board, piece: Piece }) => {
  if (!piece.position) {
    return;
  }
  const oldVertex = positionToVertex(piece.position!);
  board[oldVertex[0]][oldVertex[1]] = null;
  piece.position = undefined;
};


const run = async () => {
  let pointer: [number, number] = [7, 0]; // Bottom left
  let lastPointer: [number, number] = [0, 0];
  let selectedPiece: Piece | null = null;
  let shouldUpdateBoard = false;
  const board = [...startingBoard] as Board;

  const allPieces = board.flat().filter((piece) => piece !== null) as Piece[];
  
  // move cursor with arrow keys
  rl.input.on("keypress", (_string: string, key: { name: string, ctrl: boolean }) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    if (key.name === "up") {
      pointer[0] = Math.max(pointer[0] - 1, 0);
      shouldUpdateBoard = true;
    } else if (key.name === "down") {
      pointer[0] = Math.min(pointer[0] + 1, 7);
      shouldUpdateBoard = true;
    } else if (key.name === "left") {
      pointer[1] = Math.max(pointer[1] - 1, 0);
      shouldUpdateBoard = true;
    } else if (key.name === "right") {
      pointer[1] = Math.min(pointer[1] + 1, 7);
      shouldUpdateBoard = true;
    } else if (key.name === "space") {
      if (selectedPiece?.position) {

        const pieceToRemove = getPiece(board, pointer);
        if (pieceToRemove) {
          removePiece({ board, piece: pieceToRemove });
        }

        movePiece({
          board,
          piece: selectedPiece,
          vertex: pointer,
        });
        selectedPiece = null;
        shouldUpdateBoard = true;
      } else {
        //select piece
        const piece = getPiece(board, pointer);
        if (piece) {
          selectedPiece = piece;
          shouldUpdateBoard = true;
        }
      }
    }
    else if (key.name === "escape") {
      if (selectedPiece) {
        // deselect piece
        selectedPiece = null;
        shouldUpdateBoard = true;
      }
    } 

  });

  const resetPosition = () => {
    process.stdout.moveCursor(0, -21);
    process.stdout.cursorTo(0);
    // Bun.stdout
  }
  
  
  renderBoard(board, pointer);
  while (true) {
    
    if (shouldUpdateBoard) {
      const capturedPieces = allPieces.filter((piece) => !piece.position);
      shouldUpdateBoard = false;
      lastPointer[0] = pointer[0];
      lastPointer[1] = pointer[1];
      resetPosition();
      renderBoard(startingBoard, pointer, selectedPiece, capturedPieces);
      readline.clearLine(process.stdout, 0)
    }
    await new Promise((resolve) => setTimeout(() => {
      // console.log('checking for move');
      resolve(true);
    }, 100));
    // console.log(`Hello again, ${name}!`);
  }
};

run();