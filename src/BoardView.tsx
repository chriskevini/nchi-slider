import {useMemo} from "react";
import {Board} from "./game";

interface props {
  board: Board;
  censored?: boolean;
}

const colors = ["", "#776e65", "#776e65", "#f9f6f2", "#f9f6f2", "#f9f6f2"];
const bgcolors = ["", "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f"];

export function BoardView({board, censored = false}: props) {
  const boardWidth = 90;
  const gapWidth = 2;
  const cellWidth = (boardWidth - gapWidth * (board.length - 1)) / board.length;
  const borderRadius = 1.5;
  //fontSizes
  const full = 0.9 * ((cellWidth * 2) / 3) + "vmin";
  const half = 0.9 * ((cellWidth * 1) / 2) + "vmin";

  const blankCells = useMemo(() => {
    const blankCells = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        blankCells.push(
          <div
            key={x + "," + y}
            style={{
              position: "absolute",
              width: cellWidth + "vmin",
              height: cellWidth + "vmin",
              left: (cellWidth + gapWidth) * x + "vmin",
              top: (cellWidth + gapWidth) * y + "vmin",
              // scale: "0.9",
              backgroundColor: "#cdc1b4",
              borderRadius: borderRadius + "vmin",
            }}></div>
        );
      }
    }
    return blankCells;
  }, [board.length]);

  const cells = [];
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      for (let z = 0; z < 2; z++) {
        const currentCell = board[y][x][z];
        if (currentCell)
          cells.push(
            <div
              key={currentCell.key}
              style={{
                position: "absolute",
                width: cellWidth + "vmin",
                height: cellWidth + "vmin",
                left: (cellWidth + gapWidth) * x + "vmin",
                top: (cellWidth + gapWidth) * y + "vmin",
                backgroundColor: bgcolors[currentCell.content.length],
                color: colors[currentCell.content.length],
                borderRadius: borderRadius + "vmin",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                fontSize: currentCell.content.length === 1 ? full : half,
                lineHeight: "1",
                fontWeight: "bold",
              }}>
              {censor(currentCell.content.slice(-4))}
              {/* special span for おちんちん  */}
              <span
                style={{
                  position: "absolute",
                  textShadow:
                    "0 0.75vmin #f47c5f, 0 -0.75vmin #f47c5f, 0.75vmin 0 #f47c5f, -0.75vmin 0 #f47c5f,  0.75vmin 0.75vmin #f47c5f, 0.75vmin -0.75vmin #f47c5f, -0.75vmin -0.75vmin #f47c5f, -0.75vmin 0.75vmin #f47c5f",
                  fontSize: full,
                  // fontWeight: "normal",
                }}>
                {currentCell.content.slice(-5, -4)}
              </span>
            </div>
          );
      }
    }
  }

  function censor(word: string): string {
    if (!censored) return word;
    else return word.replaceAll("ん", "▢");
  }

  return (
    <div
      style={{
        position: "relative",
        width: boardWidth + "vmin",
        height: boardWidth + "vmin",
        backgroundColor: "#bbada0",
        borderRadius: borderRadius + "vmin",
        border: gapWidth + "vmin solid transparent",
      }}>
      {blankCells}
      {cells}
    </div>
  );
}
