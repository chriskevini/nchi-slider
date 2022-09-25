import {Game} from "./game";

interface GameOverDialogProps {
  game: Game;
  gapWidth: number;
  onPlayAgain: () => void;
}
export function GameOverDialog({
  game,
  gapWidth,
  onPlayAgain,
}: GameOverDialogProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: -gapWidth * 2,
        display: "grid",
        placeItems: "center",
        backgroundColor: "#faf8efa8",
        backdropFilter: `blur(${gapWidth * 0.4}px)`,
      }}>
      <div
        style={{
          position: "absolute",
          top: gapWidth * 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          textAlign: "center",
          gap: gapWidth,
        }}>
        <span
          style={{
            fontSize: gapWidth * 4,
            fontWeight: "bold",
            width: "100%",
          }}>
          New High Score!
        </span>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          maxLength={10}
          style={{
            borderRadius: "4px",
            maxWidth: gapWidth * 40,
            width: "15ch",
            border: "1px solid #776e65",
            paddingLeft: "0.5em",
          }}
        />
        <button
          style={{
            backgroundColor: "#f67c5f",
            border: "none",
          }}>
          Submit
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          textAlign: "center",
          translate: "0 0.8em",
        }}>
        <span
          style={{
            fontSize: gapWidth * 6,
            // fontWeight: "bold",
            width: "100%",
          }}>
          GAME OVER
        </span>
        <button
          onClick={onPlayAgain}
          style={{
            fontSize: gapWidth * 2,
          }}>
          Play Again
        </button>
      </div>
    </div>
  );
}
