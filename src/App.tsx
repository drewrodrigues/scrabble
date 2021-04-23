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
import Error from "./components/error";

const PLAYER_COUNT = 2;
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
  const [playerRacks, setPlayerRacks] = useState<string[][]>([
    ["A", "B", "C", "D", "E", "F", "G"],
    ["A", "B", "C", "D", "E", "F", "G"],
  ]);
  const [errorMessage, setError] = useState<string | undefined>();

  function onCellSelect(row: number, column: number) {
    if (currentlySelectedTileIndex !== undefined) {
      const newCurrentTurn = Array.from(currentTurn);
      newCurrentTurn.push({
        letter: playerRacks[playerTurn][currentlySelectedTileIndex],
        row: row,
        column: column,
      });
      setCurrentTurn(newCurrentTurn);
      setCurrentlySelectedTileIndex(undefined);
      setError(undefined);
      const newTilesOnRack = Array.from(playerRacks);
      newTilesOnRack[playerTurn].splice(currentlySelectedTileIndex, 1);
      setPlayerRacks(newTilesOnRack);
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
    try {
      validate(cells, currentTurn);
      addCurrentTurnToCells();
      goToNextPlayer();
    } catch (e) {
      setError(e.message);
    }
  }

  function addCurrentTurnToCells() {
    setCells(cellsAndCurrentTurn);
    setCurrentTurn([]);
  }

  function goToNextPlayer() {
    setPlayerTurn(
      (previousPlayerNumber) => (previousPlayerNumber + 1) % PLAYER_COUNT
    );
  }

  return (
    <div className="App">
      <p className="turn-notification">It's player {playerTurn}'s turn</p>
      <Board cells={cellsAndCurrentTurn} onCellSelect={onCellSelect} />

      {errorMessage ? (
        <Error message={errorMessage} />
      ) : (
        <CompleteTurn
          onClick={onCompleteTurn}
          isDisabled={!currentTurn.length}
        />
      )}

      <Racks>
        <Rack
          player={0}
          selectedTileIndex={currentlySelectedTileIndex}
          onTileSelect={onTileSelect}
          tiles={playerRacks[0]}
          isActive={playerTurn === 0}
        />
        <Rack
          player={1}
          selectedTileIndex={currentlySelectedTileIndex}
          onTileSelect={onTileSelect}
          tiles={playerRacks[1]}
          isActive={playerTurn === 1}
        />
      </Racks>
    </div>
  );
}
