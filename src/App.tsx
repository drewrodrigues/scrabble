import React, { useMemo } from "react";
import "./styles.css";
import { useState } from "react";
import Board from "./components/board";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";
import CompleteTurn from "./components/completeTurn";
import "./styles/variables.scss";
import "./styles/reset.scss";

const PLAYERS = 2;
const INITIAL_CELLS = Array(15)
  .fill(null)
  .map(() => Array(15).fill(null));
const tilesOnRack = ["A", "B", "C", "D", "E", "F", "G"];

interface CurrentTurn {
  letter: string;
  row: number;
  column: number;
}

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<number>(0);
  const [cells, setCells] = useState<string[][]>(INITIAL_CELLS);
  const [currentlySelectedTile, setCurrentlySelectedTile] = useState<
    number | undefined
  >();
  const [currentTurn, setCurrentTurn] = useState<CurrentTurn[]>([]);

  function onCellSelect(row: number, column: number) {
    if (currentlySelectedTile !== undefined) {
      const newCurrentTurn = Array.from(currentTurn);
      newCurrentTurn.push({
        letter: tilesOnRack[currentlySelectedTile],
        row: row,
        column: column,
      });
      setCurrentTurn(newCurrentTurn);
      setCurrentlySelectedTile(undefined);
      tilesOnRack.splice(currentlySelectedTile, 1);
    } else {
      console.log("No tile selected");
    }
  }

  function onTileSelect(selectedTile: number) {
    setCurrentlySelectedTile(selectedTile);
  }

  const cellsAndCurrentTurn = useMemo(() => {
    const cellsAndCurrentTurn = Array.from(cells);
    currentTurn.map((cell) => {
      cellsAndCurrentTurn[cell.row][cell.column] = cell.letter;
    });
    return cellsAndCurrentTurn;
  }, [currentTurn]);

  return (
    <div className="App">
      <p>It's player {playerTurn}'s turn</p>
      <Board cells={cellsAndCurrentTurn} onCellSelect={onCellSelect} />

      <CompleteTurn
        onClick={() => null}
        // TODO: @drew change this to check for array length of current turn
        isDisabled={!currentTurn.length}
      />

      <Racks>
        <Rack
          player={1}
          selectedTile={currentlySelectedTile}
          onTileSelect={onTileSelect}
          tiles={tilesOnRack}
        />
      </Racks>
    </div>
  );
}
