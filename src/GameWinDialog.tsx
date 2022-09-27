import React, {useState} from "react";

interface GameWinDialogProps {
  gapWidth: number;
  onContinue: () => void;
}
export function GameWinDialog({gapWidth, onContinue}: GameWinDialogProps) {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        inset: -gapWidth * 1.5,
        display: "grid",
        placeItems: "center",
        backgroundColor: "#ffff0044",
        backdropFilter: `blur(${gapWidth * 0.4}px)`,
        animation: "fadeIn 3s ease-out",
        opacity: hidden ? 0 : 1,
        transition: "opacity 1s",
      }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          textAlign: "center",
          translate: "0 0.7em",
        }}>
        <span
          style={{
            fontSize: gapWidth * 6,
            // fontWeight: "bold",
            width: "100%",
          }}>
          YOU WIN
        </span>
        <button
          onClick={() => {
            setHidden(true);
            onContinue();
          }}
          style={{
            fontSize: gapWidth * 2,
          }}>
          <span>Continue with 2x Bonus</span>
        </button>
      </div>
    </div>
  );
}
