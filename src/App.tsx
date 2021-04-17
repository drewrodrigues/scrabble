import "./styles.css";
import { useState } from "react";
import Board from "./components/board";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";

const PLAYERS = 2;
const INITIAL_CELLS = new Array(15).fill(new Array(15).fill(null));

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<number>(0);
  const [cells, setCells] = useState<string[][]>(INITIAL_CELLS);
  const [currentSelection, setCurrentSelection] = useState({
    playerTile: "",
    boardPos: []
  });

  function onCellSelect(row, column) {
    setCurrentSelection((prev) => ({ ...prev, boardPos: [row, column] }));
    console.log(currentSelection);
  }

  function onTileSelect(selectedTile) {
    setCurrentSelection((prev) => ({ ...prev, playerTile: selectedTile }));
    console.log(currentSelection);
  }

  return (
    <div className="App">
      <p>It's player {playerTurn}'s turn</p>
      <Board cells={cells} onCellSelect={onCellSelect} />

      <Racks>
        <Rack
          player={1}
          selectedTile={currentSelection.playerTile}
          onTileSelect={onTileSelect}
        />
        <Rack player={2} />
      </Racks>
    </div>
  );
}
