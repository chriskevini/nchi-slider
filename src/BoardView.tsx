import {useDrag} from "@use-gesture/react";
import React, {useMemo} from "react";
import {CellView} from "./CellView";
import {Game} from "./game";
import {GameOverDialog} from "./GameOverDialog";
import {GameWinDialog} from "./GameWinDialog";
import {windowSizeUtils} from "./windowSizeUtils";

interface BoardViewProps {
  game: Game;
  censored?: boolean;
  onPlayAgain: () => void;
  onContinue: () => void;
  handleSwipe: (state: {
    type: string;
    direction: number[];
    distance: number[];
    axis: string | undefined;
    target: {};
  }) => void;
}

export function BoardView({
  game,
  censored = true,
  onPlayAgain,
  onContinue,
  handleSwipe,
}: BoardViewProps): React.ReactElement {
  const {vmin, vmax, vw, vh} = windowSizeUtils();
  const verticalOrientation =
    game.state === "over" || 330 + vmin(100) < vmax(100);
  // verticalOrientation = game.state === "over"
  // this prevents board from resizing when the virtual keyboard pops up
  // which only happens when the game is over and player is inputting name
  let containerWidth = verticalOrientation ? vmin(96) : vmax(100) - 330;
  containerWidth = Math.min(containerWidth, 600);
  const gapWidth = containerWidth * 0.02;
  const cellWidth =
    (containerWidth - gapWidth * (game.boardLength + 1)) / game.boardLength;
  const margin = (((containerWidth * 1) / 0.96) * 0.04) / 2;

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
  }, [containerWidth]);

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

  const bind = useDrag((state) => handleSwipe(state));

  return (
    <div
      {...bind()}
      // onKeyDown={(e) => console.log(e)}
      tabIndex={-1}
      style={{
        // touchAction: "none",
        outline: "none",
        position: "relative",
        boxSizing: "border-box",
        width: containerWidth,
        height: containerWidth,
        backgroundColor: "#bbada0",
        border: gapWidth + "px solid transparent",
        borderRadius: 4,
        margin: margin,
      }}>
      {blankCells}
      {cells}
      {game.state === "over" && (
        <GameOverDialog {...{game, gapWidth, onPlayAgain}} />
      )}
      {game.state === "2xBonus" && (
        <GameWinDialog {...{gapWidth, onContinue}} />
      )}
    </div>
  );
}
