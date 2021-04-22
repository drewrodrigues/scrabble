import React from "react";
import "./styles.css";
import { useState } from "react";
import Board from "./components/board";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";

const PLAYERS = 2;
const INITIAL_CELLS = Array(15)
  .fill(null)
  .map(() => Array(15).fill(null));

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<number>(0);
  const [cells, setCells] = useState<string[][]>(INITIAL_CELLS);
  const [currentSelection, setCurrentSelection] = useState<{
    playerTile: string;
    boardPos: number[] | undefined;
  }>({
    playerTile: "",
    boardPos: undefined,
  });

  function onCellSelect(row: number, column: number) {
    setCurrentSelection((prev) => ({ ...prev, boardPos: [row, column] }));
  }

  function onTileSelect(selectedTile: string) {
    setCurrentSelection((prev) => ({ ...prev, playerTile: selectedTile }));
  }

  if (
    currentSelection.boardPos !== undefined &&
    currentSelection.playerTile !== ""
  ) {
    console.log(
      "Tile " +
        currentSelection.playerTile +
        " is selected at " +
        currentSelection.boardPos
    );
  }

  return (
    <div className="App">
      <p>It's player {playerTurn}'s turn</p>
      <Board
        cells={cells}
        onCellSelect={onCellSelect}
        currentlySelectedCell={currentSelection.boardPos}
        currentlySelectedTile={currentSelection.playerTile}
      />

      <Racks>
        <Rack
          player={1}
          selectedTile={currentSelection.playerTile}
          onTileSelect={onTileSelect}
        />
        {/*<Rack player={2} selectedTile={currentSelection.playerTile}
          onTileSelect={onTileSelect} />*/}
      </Racks>
    </div>
  );
}
