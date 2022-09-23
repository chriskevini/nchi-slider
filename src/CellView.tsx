import React from "react";
import {Cell} from "./game";

const colors = ["", "#776e65", "#776e65", "#f9f6f2", "#f9f6f2", "#f9f6f2"];
const bgcolors = ["", "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f"];

interface CellViewProps {
  currentCell: Cell;
  cellWidth: number;
  gapWidth: number;
  borderRadius: number;
  full: string;
  half: string;
  censor: (word: string) => string;
}
export function CellView({
  currentCell,
  cellWidth,
  gapWidth,
  borderRadius,
  full,
  half,
  censor,
}: CellViewProps): React.ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        width: cellWidth + "vmin",
        height: cellWidth + "vmin",
        translate:
          (cellWidth + gapWidth) * currentCell.x +
          "vmin " +
          (cellWidth + gapWidth) * currentCell.y +
          "vmin",
        backgroundColor: bgcolors[currentCell.content.length],
        color: colors[currentCell.content.length],
        borderRadius: borderRadius + "vmin",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        fontSize: currentCell.content.length === 1 ? full : half,
        lineHeight: "1",
        fontWeight: "bold",
        transition: "translate 0.2s",
        animation: currentCell.merged
          ? "overshoot 0.4s"
          : currentCell.spawned
          ? "zoom 0.4s"
          : "",
        zIndex: currentCell.merged ? 1 : 0,
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
