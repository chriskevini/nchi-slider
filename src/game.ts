type Cell = {
  key: string;
  content: string;
};
type Cells = Array<Cell | undefined>;
type Row = Array<Cells>;
type Board = Array<Row>;
enum DIRECTIONS {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

function generateEmptyBoard(boardLength: number): Board {
  return Array(boardLength)
    .fill(null)
    .map((row) =>
      Array(boardLength)
        .fill(null)
        .map((cells) => [])
    );
}

function getRandomLetter(): string {
  const weights: {[key: string]: number} = {
    ん: 0.27,
    ち: 0.22,
    お: 0.17,
    こ: 0.17,
    う: 0.12,
    ま: 0.05,
  };

  const target = Math.random();
  let sum = 0;
  for (let item in weights) {
    sum += weights[item];
    if (sum >= target) return item;
  }
  return Object.keys(weights)[0];
}

function spawn(board: Board) {
  const randomizedRange = (n: number) =>
    [...Array(n).keys()].sort(function () {
      return Math.random() - 0.5;
    });
  const rangex = randomizedRange(board.length);
  const rangey = randomizedRange(board.length);
  let inserted = false;
  for (const x of rangex) {
    if (inserted === true) break;
    for (const y of rangey) {
      if (board[y][x].length === 0) {
        inserted = true;
        board[y][x].push({
          key: Math.random().toString(),
          content: getRandomLetter(),
          x: x,
          y: y,
        } as Cell);
        break;
      }
    }
  }
}

//return true if there was a change after
function slide(board: Board, direction: DIRECTIONS): boolean {
  const beforeSlide = board.map((row) => row.map((cells) => cells.slice()));
  let rotations: number;
  //rotate whole board depending on direction we want to slide
  switch (direction) {
    case DIRECTIONS.LEFT:
      rotations = 0;
      break;
    case DIRECTIONS.UP:
      rotations = rotate(board, 1);
      break;
    case DIRECTIONS.RIGHT:
      rotations = rotate(board, 2);
      break;
    case DIRECTIONS.DOWN:
      rotations = rotate(board, 3);
      break;

    default:
      return false;
  }
  //then slide
  for (let y = 0; y < board.length; y++) {
    const row = board[y];
    for (let x = 0; x < board.length; x++) {
      const currentCell = row[x];
      if (currentCell.length === 0) {
        for (let i = x + 1; i < board.length; i++) {
          if (row[i][0]) {
            row[x].push({...row[i][0], x: x, y: y} as Cell);
            row[i] = [];
            break;
          }
        }
      }
      if (currentCell.length === 1) {
        for (let i = x + 1; i < board.length; i++) {
          if (row[i][0]) {
            if (combination(row[i][0], currentCell[0]) !== undefined) {
              row[x].push({...row[i][0], x: x, y: y} as Cell);
              row[i] = [];
            }
            break;
          }
        }
      }
    }
  }

  //then continue rotating until we get back to original orientation
  if (rotations > 0) {
    rotate(board, 4 - rotations);
  }

  return JSON.stringify(beforeSlide) !== JSON.stringify(board);
}

function combineOverlappingCells(board: Board) {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (board[y][x][0] && board[y][x][1]) {
        const c = combination(board[y][x][0], board[y][x][1]);
        board[y][x] = [c];
      }
    }
  }
}

function combination(
  cellA: Cell | undefined,
  cellB: Cell | undefined
): Cell | undefined {
  if (!cellA || !cellB) return;
  const [a, b] = [cellA.content, cellB.content];

  const result: Cell = {
    key: Math.random().toString(),
    content: "",
  };

  const combinations = [
    "うんこ",
    "うんち",
    "おちんこ",
    "おまんこ",
    "おちんちん",
  ];

  for (const combo of combinations) {
    if (combo.includes(a + b)) result.content = a + b;
    if (combo.includes(b + a)) result.content = b + a;
  }
  if (result.content === "") return;
  else return result;
}

function rotate(board: Board, rotations: number = 1): number {
  for (let i = 0; i < rotations; i++) {
    const rotatedBoard: Board = [];
    for (let y = board.length - 1; y >= 0; y--) {
      const row: Row = Array(board.length)
        .fill(null)
        .map((_, x) => board[x][y]);
      rotatedBoard.push(row);
    }
    board.forEach((_, row) => (board[row] = rotatedBoard[row].slice()));
  }
  return rotations;
}

export {
  generateEmptyBoard,
  spawn,
  slide,
  DIRECTIONS,
  rotate,
  combineOverlappingCells,
};
export type {Board};
