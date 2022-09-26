import React from "react";
import {Cell} from "./game";

export const colors = [
  "",
  "#776e65",
  "#776e65",
  "#f9f6f2",
  "#f9f6f2",
  "#f9f6f2",
];
export const bgcolors = [
  "#cdc1b4",
  "#eee4da",
  "#ede0c8",
  "#f2b179",
  "#f59563",
  "#f67c5f",
];

interface CellViewProps {
  currentCell: Cell;
  cellWidth: number;
  censored?: boolean;
  gray?: boolean;
}
export function CellView({
  currentCell,
  cellWidth,
  censored = true,
  gray = false,
}: CellViewProps): React.ReactElement {
  //fontSizes
  const full = 0.9 * ((cellWidth * 2) / 3);
  const half = 0.9 * ((cellWidth * 1) / 2);

  function censor(word: string): string {
    if (!censored) return word;
    else return word.replaceAll("ん", "▢");
  }

  //おちんちん text shadow
  const otntn = cellWidth * 0.035 + "px";

  const grayStyle = {
    color: colors[1],
    backgroundColor: "transparent",
    scale: "0.9",
    border: "0.05em solid",
    opacity: 0.5,
    textShadow:
      `0 ${otntn} ${colors[5]}, 0 -${otntn} ${colors[5]},` +
      `${otntn} 0 ${colors[5]}, -${otntn} 0 ${colors[5]}, ` +
      `${otntn} ${otntn} ${colors[5]}, ${otntn} -${otntn} ${colors[5]}, ` +
      `-${otntn} -${otntn} ${colors[5]}, -${otntn} ${otntn} ${colors[5]}`,
  };

  return (
    <div
      style={{
        // boxSizing: "border-box",
        // this prevents shifting for collectionView
        // but leaving it on causes gray cells to overflow on safari on ipad
        alignItems: "center",
        width: cellWidth,
        height: cellWidth,
        color: colors[currentCell.content.length],
        backgroundColor: bgcolors[currentCell.content.length],
        borderRadius: 4,
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        fontSize: currentCell.content.length === 1 ? full : half,
        lineHeight: "1",
        fontWeight: "bold",
        transition: "all 0.2s, scale 0.3s cubic-bezier(.2,5,0,0)",
        scale: "1.0",
        opacity: 1.0,
        animation: currentCell.merged
          ? "overshoot 0.4s"
          : currentCell.spawned
          ? "zoom 0.4s"
          : "",
        zIndex: currentCell.merged ? 1 : 0,
        ...(gray ? grayStyle : {}),
        textShadow: "",
      }}>
      {censor(currentCell.content.slice(-4))}
      {/* special span for おちんちん  */}
      <span
        style={{
          position: "absolute",
          textShadow: gray
            ? grayStyle.textShadow
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
