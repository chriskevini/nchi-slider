import {combinations, Game} from "./game";
import {windowSizeUtils} from "./windowSizeUtils";
import {bgcolors, CellView, colors} from "./CellView";

interface GameInfoProps {
  game: Game;
  censored?: boolean;
}
export function GameInfo({game, censored = true}: GameInfoProps) {
  const {vmin} = windowSizeUtils();
  const containerWidth = 300;
  const collection = [
    ...new Set(game.cells.map((cell) => cell && cell.content)),
  ];

  return (
    <div
      style={{
        width: containerWidth,
        position: "relative",
      }}>
      <span
        style={{
          fontSize: "100px",
          letterSpacing: "-30px",
        }}>
        んち
        <span
          style={{
            position: "absolute",
            top: "2em",
            fontSize: "0.2em",
            letterSpacing: "0.5em",
          }}>
          スライダー
        </span>
      </span>
      <span
        style={{
          position: "absolute",
          top: "6em",
          left: "10em",
          fontWeight: "bold",
        }}>
        NCHI Slider
      </span>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
        }}>
        {[
          {label: "SCORE", value: 120312},
          {label: "BEST", value: 1209312},
        ].map(({label, value}) => (
          <div
            key={label}
            style={{
              fontSize: "30px",
              textAlign: "left",
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              color: "#faf8ef",
              backgroundColor: bgcolors[0],
            }}>
            <span
              style={{
                fontSize: "0.3em",
                display: "block",
              }}>
              {label}
            </span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <span
        style={{
          fontSize: (containerWidth / combinations.length) * 0.25,
          // fontStyle: "italic",
        }}>
        Collection・コレクション
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}>
        {combinations.map((combo, i) => (
          <CellView
            key={i}
            currentCell={{
              content: combo,
              key: i,
              x: i,
              y: 0,
            }}
            cellWidth={(containerWidth / combinations.length) * 0.95}
            censored={censored}
            gray={!collection.includes(combo)}
          />
        ))}
      </div>
    </div>
  );
}
