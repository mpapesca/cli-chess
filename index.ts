// const figlet = require("figlet");
import figlet from "figlet";
import { program } from "commander";
import { input } from '@inquirer/prompts';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { icons, startingBoard, type Board, type Piece } from "./src/pieces.ts";
import chalk from "chalk";

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



const renderBoard = (board: Board, pointerPosition?: [number, number], selectedPiece?: Piece | null) => {
  const capturedPieces: { [key in 1 | 2]: Piece[]} = {
    1: [],
    2: [],
  };
  const border = "\n  +---+---+---+---+---+---+---+---+\n";
  let renderedBoard = border;
  renderedBoard += board.map((row, rowIndex) => {
    const rowString = row.map((piece, columnIndex) => {
      const isPointer = pointerPosition && pointerPosition[0] === 7-rowIndex && pointerPosition[1] === columnIndex;
      const emptyPosition = " ";
      if (!piece) {
        return wrapPieceIcon(emptyPosition, isPointer);
      }
      const isSelected = selectedPiece?.position === piece.position;
      if (!piece.position) {
        capturedPieces[piece.player === 1 ? 2 : 1].push(piece as Piece);
        return wrapPieceIcon(emptyPosition, isPointer);
      }
      const color = getColor(piece.player);
      return color(wrapPieceIcon(`${icons[piece.type]}`, isPointer, isSelected));
    }).join("|")
    return `${8 - (rowIndex)} |${rowString}|`;
  }).join(border);
  renderedBoard += border + "    a   b   c   d   e   f   g   h";

  Object.entries(capturedPieces).forEach(([player, pieces]) => {
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

const getPiece = (board: Board, pointer: [number, number]) => {
  const [row, column] = pointer;
  const piece = board[7 - row][column];
  return piece;
}
const run = async () => {
  let pointer: [number, number] = [0, 0];
  let lastPointer: [number, number] = [0, 0];
  let selectedPiece: Piece | null = null;
  let shouldUpdateBoard = false;
  
  // move cursor with arrow keys
  rl.input.on("keypress", (_string: string, key: { name: string, ctrl: boolean }) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    if (key.name === "up") {
      pointer[0] = Math.min(pointer[0] + 1, 7);
      shouldUpdateBoard = true;
    } else if (key.name === "down") {
      pointer[0] = Math.max(pointer[0] - 1, 0);
      shouldUpdateBoard = true;
    } else if (key.name === "left") {
      pointer[1] = Math.max(pointer[1] - 1, 0);
      shouldUpdateBoard = true;
    } else if (key.name === "right") {
      pointer[1] = Math.min(pointer[1] + 1, 7);
      shouldUpdateBoard = true;
    } else if (key.name === "m") {
      if (selectedPiece) {
        // //move piece
        // const [row, column] = pointer;
        // const newBoard = [...startingBoard];
        // newBoard[7-row][column] = selectedPiece;
        // newBoard[7-selectedPiece.position[0]][selectedPiece.position[1]] = null;
        // startingBoard = newBoard;
        // selectedPiece = null;
      } else {
        //select piece
        const piece = getPiece(startingBoard, pointer);
        if (piece) {
          selectedPiece = piece;
          // console.log(`selected piece: ${ piece.type } at ${ piece.position }`);
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
  
  
  renderBoard(startingBoard, pointer);
  while (true) {
    
    if (shouldUpdateBoard) {
      shouldUpdateBoard = false;
      lastPointer[0] = pointer[0];
      lastPointer[1] = pointer[1];
      resetPosition();
      renderBoard(startingBoard, pointer, selectedPiece);
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