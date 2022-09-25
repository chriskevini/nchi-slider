import {structuredClone} from "./utils";
type Cell = {
  key?: number;
  content: string;
  x: number;
  y: number;
  merged?: boolean;
  spawned?: boolean;
  toBePurged?: boolean;
};
type Cells = Array<Cell>;
type Game = {
  state: "playing" | "over" | "2xBonus";
  cells: Cells;
  boardLength: number;
  points: number[];
};
enum Directions {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

function newGame(boardLength: number): Game {
  const state = "playing";
  const cells: Cells = [];
  cells.push(generateRandomCell(cells, boardLength));
  cells.push(generateRandomCell(cells, boardLength));
  const points: number[] = [];
  return {state, cells, boardLength, points};
}

function generateRandomCell(cells: Cells, boardLength: number): Cell {
  const randomizedRange = (n: number) =>
    [...Array(n).keys()].sort(function () {
      return Math.random() - 0.5;
    });
  const rangex = randomizedRange(boardLength);
  const rangey = randomizedRange(boardLength);
  const occupiedCells = cells.map(
    (cell) => cell && [cell.x, cell.y].toString()
  );
  let openCell = null;
  for (const x of rangex) {
    if (openCell) break;
    for (const y of rangey) {
      if (openCell) break;
      if (!occupiedCells.includes([x, y].toString())) {
        openCell = [x, y];
      }
    }
  }
  if (!openCell) openCell = [999, 999];
  return {
    key: cells.length,
    content: getRandomLetter(),
    x: openCell[0],
    y: openCell[1],
    spawned: true,
  };
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

function slide(game: Game, direction: Directions): Game {
  let cells = structuredClone(game.cells);
  //clean up old cells
  cells = purgeCells(cells);
  //rotate cells depending on direction we want to slide
  const rotations = {
    [Directions.LEFT]: 0,
    [Directions.DOWN]: 1,
    [Directions.RIGHT]: 2,
    [Directions.UP]: 3,
  }[direction];
  cells = rotate(cells, game.boardLength, rotations);
  //then group
  const rows: Array<Cells> = Array(game.boardLength)
    .fill(null)
    .map((n) => []);
  cells.forEach((cell: Cell) => cell && rows[cell.y].push(cell));
  rows.forEach((row) => row.sort((a, b) => a.x - b.x));
  //then slide
  let earnedPoints = 0;
  rows.forEach((row) => {
    let i = 0;
    let previous: Cell | undefined;
    row.forEach((cell) => {
      if (previous === undefined) {
        cell.x = i;
        previous = cell;
      } else if (combination(previous, cell) !== undefined) {
        cells.push({...combination(previous, cell), key: cells.length} as Cell);
        earnedPoints += Math.pow(
          5,
          previous.content.length + cell.content.length
        ); //*bonus
        cell.x = i++;
        previous.toBePurged = true;
        cell.toBePurged = true;
        previous = undefined;
      } else {
        cell.x = ++i;
        previous = cell;
      }
    });
  });
  //then continue rotating until we get back to original orientation
  if (rotations > 0) {
    cells = rotate(cells, game.boardLength, 4 - rotations);
  }
  //then generate a new cell if slide was succesful
  if (JSON.stringify(cells) !== JSON.stringify(purgeCells(game.cells)))
    cells.push(generateRandomCell(cells, game.boardLength));

  return {...game, cells: cells, points: [...game.points, earnedPoints]};
}

function rotate(
  cells: Cells,
  boardLength: number,
  rotations: number = 1
): Cells {
  cells = structuredClone(cells);
  cells.forEach((cell) => {
    if (cell) {
      for (let i = 0; i < rotations; i++) {
        [cell.x, cell.y] = [boardLength - cell.y - 1, cell.x];
      }
    }
  });
  return cells;
}

function purgeCells(cells: Cells): Cells {
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i]) continue;
    if (cells[i].toBePurged) delete cells[i];
    else {
      cells[i].merged = false;
      cells[i].spawned = false;
    }
  }
  return cells;
}

export const combinations = [
  "うんこ",
  "うんち",
  "おちんこ",
  "おまんこ",
  "おちんちん",
];

function combination(
  cellA: Cell | undefined,
  cellB: Cell | undefined
): Cell | undefined {
  if (!cellA || !cellB) return;
  const [a, b] = [cellA.content, cellB.content];

  const result: Cell = {
    key: 999,
    content: "",
    x: cellA.x,
    y: cellA.y,
    merged: true,
  };

  for (const combo of combinations) {
    if (combo.includes(a + b)) result.content = a + b;
    if (combo.includes(b + a)) result.content = b + a;
  }
  if (result.content === "") return;
  else return result;
}

function getLegalMoves(game: Game): Directions[] {
  const legalMoves = [] as Directions[];

  if (
    JSON.stringify(slide(game, Directions.UP).cells) !==
    JSON.stringify(game.cells)
  )
    legalMoves.push(Directions.UP);
  if (
    JSON.stringify(slide(game, Directions.DOWN).cells) !==
    JSON.stringify(game.cells)
  )
    legalMoves.push(Directions.DOWN);
  if (
    JSON.stringify(slide(game, Directions.LEFT).cells) !==
    JSON.stringify(game.cells)
  )
    legalMoves.push(Directions.LEFT);
  if (
    JSON.stringify(slide(game, Directions.RIGHT).cells) !==
    JSON.stringify(game.cells)
  )
    legalMoves.push(Directions.RIGHT);
  console.log("legal", legalMoves);
  return legalMoves;
}

export {newGame, slide, Directions, getLegalMoves};
export type {Cells, Cell, Game};
