import { useState } from "react";
import {
  newGame,
  slide,
  Directions,
  getLegalMoves,
  combinations,
} from "./game";
import { BoardView } from "./BoardView";
import { useLocalStorage } from "./useLocalStorage";
import { GameInfo } from "./GameInfo";

const BOARD_LENGTH = 4;

function App() {
  const [game, setGame] = useState(newGame(BOARD_LENGTH));
  const [censored, setCensored] = useLocalStorage("censored", true);
  const [bestScore, setBestScore] = useLocalStorage("bestScore", 0);
  // prevent swipes while player has not clicked "continue"
  const [continueWithBonus, setContinueWithBonus] = useState(false);

  const handleSwipe = (state: {
    type: string;
    direction: number[];
    distance: number[];
    axis: string | undefined;
    target: {};
  }) => {
    const {
      type,
      direction: [swipeX, swipeY],
      axis,
    } = state;
    console.log(state.target);
    if (!(type === "pointerup" || type === "keydown")) return;
    if (swipeX === 0 && swipeY === 0) return;

    const isCollectionComplete =
      game.state === "2xBonus" ||
      [...new Set(game.cells.map((cell) => cell && cell.content))].filter((e) =>
        combinations.includes(e)
      ).length === combinations.length;
    if (isCollectionComplete && game.state === "playing")
      return setGame((prev) => ({ ...prev, state: "2xBonus" }));
    //prevent player from playing while GameWinDialog is visible
    if (isCollectionComplete && !continueWithBonus) return;

    let direction: Directions;
    if (axis === "x") {
      if (swipeX > 0) direction = Directions.RIGHT;
      else direction = Directions.LEFT;
    } else {
      if (swipeY > 0) direction = Directions.DOWN;
      else direction = Directions.UP;
    }

    const legalMoves = getLegalMoves(game);
    if (legalMoves.length === 0) {
      const score = game.points.reduce((acc, curr) => acc + curr, 0);
      setBestScore(Math.max(bestScore, score));
      return setGame((prev) => ({ ...prev, state: "over" }));
    }

    if (!legalMoves.includes(direction)) return;
    throttle(() => setGame((prev) => slide(prev, direction)), 100)();
  };

  return (
    <div
      className="App"
      tabIndex={-1}
      style={{
        touchAction: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "start",
        flexWrap: "wrap",
        minHeight: "100vh",
        width: "100vw",
        color: "#776e65",
        backgroundColor: "#faf8ef",
      }}>
      <GameInfo
        {...{ game, censored, setCensored, bestScore }}
        onRestart={() => {
          setGame(newGame(BOARD_LENGTH));
        }}
      />
      <BoardView
        {...{ game, censored, handleSwipe }}
        onPlayAgain={() => setGame(newGame(BOARD_LENGTH))}
        onContinue={() => setContinueWithBonus(true)}
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
