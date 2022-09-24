import React from "react";
import {Cell} from "./game";

const colors = ["", "#776e65", "#776e65", "#f9f6f2", "#f9f6f2", "#f9f6f2"];
const bgcolors = ["", "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f"];

interface CellViewProps {
  currentCell: Cell;
  cellWidth: number;
  gapWidth: number;
  borderRadius: number;
  censored?: boolean;
  gray?: boolean;
}
export function CellView({
  currentCell,
  cellWidth,
  gapWidth,
  borderRadius,
  censored = true,
  gray = false,
}: CellViewProps): React.ReactElement {
  //fontSizes
  const full = 0.9 * ((cellWidth * 2) / 3) + "vmin";
  const half = 0.9 * ((cellWidth * 1) / 2) + "vmin";

  function censor(word: string): string {
    if (!censored) return word;
    else return word.replaceAll("ん", "▢");
  }

  //おちんちん text shadow
  const otntn = cellWidth * 0.035 + "vmin";

  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        alignItems: "center",
        width: cellWidth + "vmin",
        height: cellWidth + "vmin",
        translate:
          (cellWidth + gapWidth) * currentCell.x +
          "vmin " +
          (cellWidth + gapWidth) * currentCell.y +
          "vmin",
        backgroundColor: gray
          ? "transparent"
          : bgcolors[currentCell.content.length],
        color: gray ? colors[1] : colors[currentCell.content.length],
        borderRadius: borderRadius + "vmin",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        fontSize: currentCell.content.length === 1 ? full : half,
        lineHeight: "1",
        fontWeight: "bold",
        transition: "all 0.2s, scale 0.3s cubic-bezier(.2,5,0,0)",
        scale: gray ? "0.9" : "1.0",
        border: gray ? "0.05em solid" : "",
        opacity: gray ? 0.5 : 1.0,
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
          textShadow: gray
            ? `0 ${otntn} ${colors[5]}, 0 -${otntn} ${colors[5]},` +
              `${otntn} 0 ${colors[5]}, -${otntn} 0 ${colors[5]}, ` +
              `${otntn} ${otntn} ${colors[5]}, ${otntn} -${otntn} ${colors[5]}, ` +
              `-${otntn} -${otntn} ${colors[5]}, -${otntn} ${otntn} ${colors[5]}`
            : `0 ${otntn} ${bgcolors[5]}, 0 -${otntn} ${bgcolors[5]},` +
              `${otntn} 0 ${bgcolors[5]}, -${otntn} 0 ${bgcolors[5]}, ` +
              `${otntn} ${otntn} ${bgcolors[5]}, ${otntn} -${otntn} ${bgcolors[5]}, ` +
              `-${otntn} -${otntn} ${bgcolors[5]}, -${otntn} ${otntn} ${bgcolors[5]}`,
          fontSize: full,
          // fontWeight: "normal",
        }}>
        {currentCell.content.slice(-5, -4)}
      </span>
    </div>
  );
}
