import React, { useMemo } from "react";
import "./styles.css";
import { useState } from "react";
import Board from "./components/board";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";
import CompleteTurn from "./components/completeTurn";
import "./styles/reset.scss";

const PLAYERS = 2;
const INITIAL_CELLS = Array(15)
  .fill(null)
  .map(() => Array(15).fill(null));

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<number>(0);
  const [cells, setCells] = useState<string[][]>(INITIAL_CELLS);
  const [currentPlayerTile, setCurrentPlayerTile] = useState<string | undefined>();
  const [currentTurn, setCurrentTurn] = useState<{ letter: string, row: number, column: number }[]>([])

  function onCellSelect(row: number, column: number) {
    if (currentPlayerTile) {
      const newCurrentTurn = Array.from(currentTurn);
      newCurrentTurn.push({ letter: currentPlayerTile, row: row, column: column });
      setCurrentTurn(newCurrentTurn);
    } else {
      throw new Error("Current player tile not set")
    }
  }

  function onTileSelect(selectedTile: string) {
    setCurrentPlayerTile(selectedTile);
  }

  const cellsAndCurrentTurn = useMemo(() => {
    const cellsAndCurrentTurn = Array.from(cells);
    currentTurn.map((piece) => {
      cellsAndCurrentTurn[piece.row][piece.column] = piece.letter;
    })
    return cellsAndCurrentTurn
  }, [currentTurn])

  return (
    <div className="App">
      <p>It's player {playerTurn}'s turn</p>
      <Board cells={cellsAndCurrentTurn} onCellSelect={onCellSelect} />

      <CompleteTurn
        onClick={() => null}
        // TODO: @drew change this to check for array length of current turn
        isDisabled={!currentSelection.playerTile}
      />

      <Racks>
        <Rack
          player={1}
          selectedTile={currentPlayerTile}
          onTileSelect={onTileSelect}
        />
      </Racks>
    </div>
  );
}
