import {keyIn} from "readline-sync";
import {
  generateEmptyBoard,
  spawn,
  slide,
  DIRECTIONS,
  rotate,
  combineOverlappingCells,
} from "./game.js";
import type {Board} from "./game.js";

const BOARD_LENGTH = 4;
const myBoard: Board = generateEmptyBoard(BOARD_LENGTH);
spawn(myBoard);
spawn(myBoard);
printBoard(myBoard);
console.log("Start");

const gameOver = false;
while (!gameOver) {
  const input = keyIn("[wasdnr]: ");
  let isLegalMove = false;
  switch (input) {
    case "n":
      spawn(myBoard);
      break;
    case "w":
      isLegalMove = slide(myBoard, DIRECTIONS.UP);
      break;
    case "a":
      isLegalMove = slide(myBoard, DIRECTIONS.LEFT);
      break;
    case "s":
      isLegalMove = slide(myBoard, DIRECTIONS.DOWN);
      break;
    case "d":
      isLegalMove = slide(myBoard, DIRECTIONS.RIGHT);
      break;
    case "r":
      rotate(myBoard);
      break;
    default:
      process.exit();
  }
  if (isLegalMove) {
    combineOverlappingCells(myBoard);
    spawn(myBoard);
  }
  printBoard(myBoard);
}

function printBoard(board: Board) {
  for (let y of board) {
    const line = y.map((e) => e[0]?.content || "　").join("\t");
    console.log(line);
  }
}
