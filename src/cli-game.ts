import {keyIn} from "readline-sync";
import {
  newGame,
  spawn,
  slide,
  Directions,
  rotate,
  combineOverlappingCells,
} from "./game.js";
import type {Board} from "./game.js";

const BOARD_LENGTH = 4;
const myBoard: Board = newGame(BOARD_LENGTH);
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
      isLegalMove = slide(myBoard, Directions.UP);
      break;
    case "a":
      isLegalMove = slide(myBoard, Directions.LEFT);
      break;
    case "s":
      isLegalMove = slide(myBoard, Directions.DOWN);
      break;
    case "d":
      isLegalMove = slide(myBoard, Directions.RIGHT);
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
