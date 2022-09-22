import {useState} from "react";
import {newGame} from "./game";
import {BoardView} from "./BoardView";

function App() {
  const [board, setBoard] = useState(newGame(4));
  console.log(board);
  return (
    <div className="App">
      <BoardView {...{board}} />
    </div>
  );
}

export default App;
