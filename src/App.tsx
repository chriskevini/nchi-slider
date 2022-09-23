import {useState} from "react";
import {newGame, slide, Directions, getLegalMoves} from "./game";
import {BoardView} from "./BoardView";

const BOARD_LENGTH = 4;
function App() {
  const [game, setGame] = useState(newGame(BOARD_LENGTH));

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
        display: "grid",
        placeItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}>
      <BoardView
        {...{game}}
        censored
      />
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
