import {useState} from "react";
import type {Board} from "./game";
import {newGame} from "./game";

function App() {
  const board: Board = newGame(4);
  console.log(board);
  return <div className="App">Hello</div>;
}

export default App;
