import {useState} from "react";
import {newGame, slide, Directions, combineOverlappingCells} from "./game";
import {BoardView} from "./BoardView";

function App() {
  const [board, setBoard] = useState(newGame(4));
  console.log(board);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event.code);
    if (event.code === "ArrowUp") setBoard(slide(board, Directions.UP));
    else if (event.code === "ArrowDown")
      setBoard(slide(board, Directions.DOWN));
    else if (event.code === "ArrowLeft")
      setBoard(slide(board, Directions.LEFT));
    else if (event.code === "ArrowRight")
      setBoard(slide(board, Directions.RIGHT));
    else if (event.code === "ShiftRight")
      setBoard(combineOverlappingCells(board));
  };

  return (
    <div
      className="App"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}>
      <BoardView {...{board}} />
    </div>
  );
}

export default App;
