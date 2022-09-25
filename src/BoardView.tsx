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
  const {vmin, vw, vh} = windowSizeUtils();
  const containerWidth = Math.min(vw(90), vh(100) - 330, 600);
  const gapWidth = containerWidth * 0.02;
  const cellWidth =
    (containerWidth - gapWidth * (game.boardLength - 1)) / game.boardLength;

  const blankCells = useMemo(() => {
    const blankCells = [];
    for (let x = 0; x < game.boardLength; x++) {
      for (let y = 0; y < game.boardLength; y++) {
        blankCells.push(
          <div
            key={[x, y].join(",")}
            style={{
              position: "absolute",
              translate: `${(cellWidth + gapWidth) * x}px  ${
                (cellWidth + gapWidth) * y
              }px`,
            }}>
            <CellView
              currentCell={{content: "", x: x, y: y}}
              cellWidth={cellWidth}
            />
          </div>
        );
      }
    }
    return blankCells;
  }, [vmin(100)]);

  const cells = game.cells.map(
    (currentCell) =>
      currentCell && (
        <div
          key={currentCell.key}
          style={{
            position: "absolute",
            translate: `${(cellWidth + gapWidth) * currentCell.x}px  ${
              (cellWidth + gapWidth) * currentCell.y
            }px`,
            transition: "all 0.2s",
          }}>
          <CellView
            {...{
              currentCell,
              cellWidth,
              censored,
            }}
          />
        </div>
      )
  );

  return (
    <div
      style={{
        position: "relative",
        width: containerWidth,
        height: containerWidth,
        backgroundColor: "#bbada0",
        border: gapWidth + "px solid transparent",
        borderRadius: 4,
        margin: "1vmax",
      }}>
      {blankCells}
      {cells}
    </div>
  );
}
