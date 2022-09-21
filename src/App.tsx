import {useState} from "react";
import type {Board} from "./game";
import {generateEmptyBoard} from "./game";

function App() {
  const board: Board = generateEmptyBoard(4);
  console.log(board);
  return <div className="App">Hello</div>;
}

export default App;
