import {useState} from "react";
import {newGame, slide, Directions, getLegalMoves} from "./game";
import {BoardView} from "./BoardView";
import {useLocalStorage} from "./useLocalStorage";
import {GameInfo} from "./GameInfo";
import {useDrag} from "@use-gesture/react";

const BOARD_LENGTH = 4;

function App() {
  const [game, setGame] = useState(newGame(BOARD_LENGTH));
  const [censored, setCensored] = useLocalStorage("true");

  const handleSwipe = (state: {
    type: string;
    direction: number[];
    distance: number[];
  }) => {
    const {
      type,
      direction: [swipeX, swipeY],
      distance: [dx, dy],
    } = state;
    if (!(type === "pointerup" || type === "keydown")) return;
    if (swipeX === 0 && swipeY === 0) return;

    let direction: Directions;
    if (swipeX * swipeX + dx > swipeY * swipeY + dy) {
      if (swipeX > 0) direction = Directions.RIGHT;
      else direction = Directions.LEFT;
    } else {
      if (swipeY > 0) direction = Directions.DOWN;
      else direction = Directions.UP;
    }

    if (!getLegalMoves(game).includes(direction)) return;
    throttle(() => setGame((prev) => slide(prev, direction)), 100)();
  };
  const bind = useDrag((state) => handleSwipe(state), {
    swipe: {distance: 1, duration: 1000},
  });

  return (
    <div
      className="App"
      tabIndex={-1}
      {...bind()}
      style={{
        touchAction: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "start",
        flexWrap: "wrap",
        // gap: "1vmax",
        // paddingTop: "1vmax",
        minHeight: "100vh",
        width: "100vw",
        color: "#776e65",
        backgroundColor: "#faf8ef",
        // backgroundColor: "red",
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
