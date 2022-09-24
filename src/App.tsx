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
  const containerWidth = Math.min(vmin(90), 600);
  const collection = [
    ...new Set(game.cells.map((cell) => cell && cell.content)),
  ];

  // let collection: string[] = [];
  // collection = ["おちんこ"];
  // collection = combinations;
  return (
    <div
      style={{
        width: containerWidth,
        // height: "200px",
        outline: "1px solid lime",
      }}>
      <h1
        style={{
          backgroundColor: "pink",
        }}>
        nchi slider
      </h1>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-around",
          width: "100%",
          backgroundColor: "red",
        }}>
        {[
          {label: "SCORE", value: 120312},
          {label: "BEST", value: 1209312},
        ].map(({label, value}) => (
          <div
            key={label}
            style={{
              fontSize: "30px",
              textAlign: "center",
              flexGrow: "1",
              backgroundColor: "skyblue",
            }}>
            <h5
              style={{
                fontSize: "0.5em",
                // display: "block",
              }}>
              {label}
            </h5>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <span
        style={{
          fontSize: "6vmin",
          // fontStyle: "italic",
        }}>
        Collection・コレクション
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          outline: "1px solid red",
          height: "100px",
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
        minHeight: "100vh",
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
