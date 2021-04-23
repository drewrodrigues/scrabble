import React, { useMemo } from "react";
import "./styles.css";
import { useState } from "react";
import Board from "./components/board";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";
import CompleteTurn from "./components/completeTurn";
import "./styles/variables.scss";
import "./styles/reset.scss";
import validate from "./utils/validate";
import { cloneDeep } from "lodash";

const PLAYERS = 2;
const INITIAL_CELLS = Array(15)
  .fill(null)
  .map(() => Array(15).fill(null));

export interface CurrentTurn {
  letter: string;
  row: number;
  column: number;
}

export type Cells = string[][];

export default function App() {
  const [playerTurn, setPlayerTurn] = useState<number>(0);
  const [cells, setCells] = useState<Cells>(INITIAL_CELLS);
  const [currentlySelectedTileIndex, setCurrentlySelectedTileIndex] = useState<
    number | undefined
  >();
  const [currentTurn, setCurrentTurn] = useState<CurrentTurn[]>([]);
  const [tilesOnRack, setTilesOnRack] = useState<string[]>([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
  ]);

  function onCellSelect(row: number, column: number) {
    if (currentlySelectedTileIndex !== undefined) {
      const newCurrentTurn = Array.from(currentTurn);
      newCurrentTurn.push({
        letter: tilesOnRack[currentlySelectedTileIndex],
        row: row,
        column: column,
      });
      setCurrentTurn(newCurrentTurn);
      setCurrentlySelectedTileIndex(undefined);
      const newTilesOnRack = Array.from(tilesOnRack);
      newTilesOnRack.splice(currentlySelectedTileIndex, 1);
      setTilesOnRack(newTilesOnRack);
    } else {
      console.log("No tile selected");
    }
  }

  function onTileSelect(selectedTileIndex: number) {
    setCurrentlySelectedTileIndex(selectedTileIndex);
  }

  const cellsAndCurrentTurn = useMemo(() => {
    const cellsAndCurrentTurn = cloneDeep(cells);
    currentTurn.map((cell) => {
      cellsAndCurrentTurn[cell.row][cell.column] = cell.letter;
    });
    return cellsAndCurrentTurn;
  }, [currentTurn, cells]);

  function onCompleteTurn() {
    validate(cells, currentTurn);
  }

  return (
    <div className="App">
      <p className="turn-notification">It's player {playerTurn}'s turn</p>
      <Board cells={cellsAndCurrentTurn} onCellSelect={onCellSelect} />

      <CompleteTurn
        onClick={onCompleteTurn}
        // TODO: @drew change this to check for array length of current turn
        isDisabled={!currentTurn.length}
      />

      <Racks>
        <Rack
          player={1}
          selectedTileIndex={currentlySelectedTileIndex}
          onTileSelect={onTileSelect}
          tiles={tilesOnRack}
        />
      </Racks>
    </div>
  );
}
