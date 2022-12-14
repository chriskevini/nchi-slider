import { combinations, Game } from "./game";
import { windowSizeUtils } from "./windowSizeUtils";
import { bgcolors, CellView, colors } from "./CellView";
import Leaderboard from "./Leaderboard";

interface GameInfoProps {
  game: Game;
  censored: boolean;
  setCensored: (c: boolean) => void;
  bestScore: number;
  onRestart: () => void;
}
export function GameInfo({
  game,
  censored,
  setCensored,
  bestScore,
  onRestart,
}: GameInfoProps) {
  const { vmin } = windowSizeUtils();
  const containerWidth = Math.min(vmin(80), 300);
  const collection = [
    ...new Set(game.cells.map((cell) => cell && cell.content)),
  ];
  const score = game.points.reduce((acc, curr) => acc + curr, 0);

  const scoreBoxes = [
    { label: "SCORE", value: score },
    { label: "BEST", value: bestScore },
  ].map(({ label, value }) => (
    <div
      key={label}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        padding: "10px",
        width: "100%",
        borderRadius: "4px",
        fontSize: Math.min(vmin(7), 30),
        color: "#faf8ef",
        backgroundColor: bgcolors[0],
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontSize: "0.3em",
          zIndex: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          margin: "auto 0",
          fontWeight: "bold",
          zIndex: 1,
        }}
      >
        {value}
      </span>
      {label === "SCORE" && game.state === "2xBonus" && <BonusIndicator />}
      {label === "BEST" && <Leaderboard />}
    </div>
  ));

  const floatingPoints = game.points.map((pt, i) => (
    <span
      key={i}
      style={{
        position: "absolute",
        color: game.state === "2xBonus" ? bgcolors[5] : colors[5],
        translate: "3em -1em",
        fontSize: "20px",
        fontWeight: "bold",
        opacity: 0,
        animation: "points 0.8s ",
      }}
    >
      {"+" + pt}
    </span>
  ));

  return (
    <div
      style={{
        width: containerWidth,
        position: "relative",
      }}
    >
      <Logo width={containerWidth} />
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        {scoreBoxes}
        {floatingPoints}
        <Interactives {...{ setCensored, censored, onRestart }} />
      </div>
      <CollectionView {...{ containerWidth, censored, collection }} />
    </div>
  );
}

function BonusIndicator() {
  return (
    <span
      style={{
        position: "absolute",
        fontSize: "3em",
        right: 0,
        top: 0,
        lineHeight: 1,
        color: bgcolors[5],
        animation: "fadeIn 1s",
      }}
    >
      2x
    </span>
  );
}

interface InteractivesProps {
  setCensored: (c: boolean) => void;
  censored: boolean;
  onRestart: () => void;
}

function Interactives({ censored, setCensored, onRestart }: InteractivesProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "space-between",
        minWidth: 60,
      }}
    >
      <button
        onClick={() => setCensored(!censored)}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          aspectRatio: 2,
          padding: 0,
          borderRadius: 4,
          border: `1px solid ${colors[1]}40`,
          fontSize: 22,
          lineHeight: 1,
          textAlign: "center",
          backgroundColor: censored ? bgcolors[1] : bgcolors[5],
          transition: "background-color 0.15s",
        }}
      >
        <span
          style={{
            width: "100%",
            color: colors[5],
          }}
        >
          ???
        </span>
        <span
          style={{
            width: "100%",
          }}
        >
          ???
        </span>
        <div
          style={{
            position: "absolute",
            width: "50%",
            aspectRatio: 1,
            backgroundColor: censored ? colors[1] : colors[5],
            borderRadius: 4,
            transform: "scale(0.8)",
            translate: censored ? "-50%" : "50%",
            transition:
              "translate 0.3s cubic-bezier(.86,1.72,.01,.59), background-color 0.15s",
          }}
        ></div>
      </button>
      <button
        onClick={onRestart}
        style={{
          position: "relative",
          padding: "0.2em",
          borderRadius: 4,
          aspectRatio: 2,
        }}
      >
        <span>Restart</span>
      </button>
    </div>
  );
}

function Logo({ width }: { width: number }) {
  return (
    <span
      style={{
        fontSize: width / 3,
        letterSpacing: "-0.3em",
      }}
    >
      ??????
      <span
        style={{
          position: "absolute",
          top: "2em",
          fontSize: "0.2em",
          letterSpacing: "0.5em",
        }}
      >
        ???????????????
      </span>
      <span
        style={{
          position: "absolute",
          top: "6em",
          left: "10.5em",
          fontSize: "0.15em",
          fontWeight: "bold",
          fontStyle: "italic",
          letterSpacing: "0.05em",
        }}
      >
        NCHI
        <span style={{ fontSize: "0.8em" }}> Slider</span>
      </span>
    </span>
  );
}

interface CollectionViewProps {
  containerWidth: number;
  censored: boolean;
  collection: string[];
}
function CollectionView({
  containerWidth,
  censored,
  collection,
}: CollectionViewProps) {
  return (
    <>
      <span
        style={{
          fontSize: (containerWidth / combinations.length) * 0.25,
          // fontStyle: "italic",
        }}
      >
        Collection?????????????????????
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
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
    </>
  );
}
