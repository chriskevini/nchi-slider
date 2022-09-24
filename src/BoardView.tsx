import React, {useMemo} from "react";
import {CellView} from "./CellView";
import {Game} from "./game";
import {windowSizeUtils} from "./windowSizeUtils";

interface BoardViewProps {
  game: Game;
  censored?: boolean;
}

export function BoardView({
  game,
  censored = true,
}: BoardViewProps): React.ReactElement {
  const boardWidth = 90;
  const gapWidth = 2;
  const cellWidth =
    (boardWidth - gapWidth * (game.boardLength - 1)) / game.boardLength;
  const borderRadius = 1;

  //scale down for large screens
  const maxWidth = 600; //px
  const {vmin} = windowSizeUtils();
  const scale = Math.min(maxWidth / vmin(100), 1);

  const blankCells = useMemo(() => {
    const blankCells = [];
    for (let x = 0; x < game.boardLength; x++) {
      for (let y = 0; y < game.boardLength; y++) {
        blankCells.push(
          <div
            key={x + "," + y}
            style={{
              position: "absolute",
              width: cellWidth + "vmin",
              height: cellWidth + "vmin",
              left: (cellWidth + gapWidth) * x + "vmin",
              top: (cellWidth + gapWidth) * y + "vmin",
              backgroundColor: "#cdc1b4",
              borderRadius: borderRadius + "vmin",
            }}></div>
        );
      }
    }
    return blankCells;
  }, [game.boardLength]);

  const cells = game.cells.map(
    (currentCell) =>
      currentCell && (
        <CellView
          key={currentCell.key}
          {...{
            currentCell,
            cellWidth,
            gapWidth,
            borderRadius,
            censored,
          }}
        />
      )
  );

  return (
    <div
      style={{
        position: "relative",
        width: boardWidth + "vmin",
        height: boardWidth + "vmin",
        backgroundColor: "#bbada0",
        borderRadius: borderRadius + "vmin",
        border: gapWidth + "vmin solid transparent",
        scale: scale.toString(),
      }}>
      {blankCells}
      {cells}
    </div>
  );
}
