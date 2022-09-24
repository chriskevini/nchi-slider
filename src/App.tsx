import {useState} from "react";
import {
  newGame,
  slide,
  Directions,
  getLegalMoves,
  combinations,
  Game,
} from "./game";
import {BoardView} from "./BoardView";
import {windowSizeUtils} from "./windowSizeUtils";
import {CellView} from "./CellView";
import {useLocalStorage} from "./useLocalStorage";

const BOARD_LENGTH = 4;

interface GameInfoProps {
  game: Game;
  censored?: boolean;
}

function GameInfo({game, censored = true}: GameInfoProps) {
  const {vmin} = windowSizeUtils();
  const collection = [
    ...new Set(game.cells.map((cell) => cell && cell.content)),
  ];

  // let collection: string[] = [];
  // collection = ["おちんこ"];
  // collection = combinations;
  return (
    <div
      style={{
        width: "90vmin",
        height: "200px",
        backgroundColor: "lime",
      }}>
      <h1
        style={{
          backgroundColor: "pink",
        }}>
        nchi slider
      </h1>
      <div
        style={{
          fontSize: "30px",
          textAlign: "center",
          // width: "5em",
          // height: "5em",
          backgroundColor: "skyblue",
        }}>
        <h5
          style={{
            fontSize: "0.5em",
            // display: "block",
          }}>
          Score
        </h5>
        <p>1209312</p>
      </div>
      <span
        style={{
          fontSize: "6vmin",
          // fontStyle: "italic",
        }}>
        Collection・コレクション
      </span>
      {combinations.map((combo, i) => (
        <CellView
          key={i}
          currentCell={{
            content: combo,
            key: i,
            x: i,
            y: 0,
          }}
          cellWidth={17}
          gapWidth={1}
          borderRadius={1}
          censored={censored}
          gray={!collection.includes(combo)}
        />
      ))}
    </div>
  );
}

function App() {
  const [game, setGame] = useState(newGame(BOARD_LENGTH));
  const [censored, setCensored] = useLocalStorage("true");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const direction = {
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
      ArrowLeft: Directions.LEFT,
      ArrowRight: Directions.RIGHT,
    }[event.code] as Directions;
    if (!getLegalMoves(game).includes(direction)) return;
    setGame((prev) => slide(prev, direction));
  };

  return (
    <div
      className="App"
      tabIndex={-1}
      onKeyDown={throttle((e) => handleKeyDown(e), 100)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        // placeItems: "center",
        height: "100vh",
        width: "100vw",
        // overflow: "hidden",
        color: "#776e65",
        backgroundColor: "#faf8ef",
      }}>
      <GameInfo {...{game, censored}} />
      <BoardView {...{game, censored}} />
    </div>
  );
}

let throttling = false;
function throttle(
  func: (...args: any) => any,
  interval: number
): (...args: any) => any {
  return function (...args) {
    if (throttling) return;
    func(...args);
    throttling = true;
    setTimeout(() => (throttling = false), interval);
  };
}

export default App;
