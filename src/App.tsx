import React, { useMemo, useReducer } from "react";
import "./styles.css";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";
import CompleteTurn from "./components/completeTurn";
import "./styles/variables.scss";
import "./styles/reset.scss";
import validate from "./utils/validate";
import { cloneDeep } from "lodash";
import ErrorNotification from "./components/error";
import { INITIAL_CELLS } from "./utils/constants";
import { drawRandomTiles } from "./utils/tiles";
import { Board, BoardCells } from "./components/board";

export interface CurrentTurn {
  letter: string;
  row: number;
  column: number;
}

export type CellsType = string[][];

interface AppState {
  playerTurn: number;
  cells: CellsType;
  currentlySelectedTileIndex: number | undefined;
  currentTurn: CurrentTurn[];
  playerRacks: string[][];
  errorMessage: string | undefined;
}

const initialAppState = {
  cells: INITIAL_CELLS,
  currentlySelectedTileIndex: undefined,
  currentTurn: [],
  errorMessage: undefined,
  playerTurn: 0,
  playerRacks: [drawRandomTiles(7), drawRandomTiles(7)],
};

type AppAction =
  | { type: "PLACE_TILE"; row: number; column: number }
  | { type: "REMOVE_TILE"; row: number; column: number }
  | { type: "SELECT_TILE"; tileIndex: number }
  | { type: "COMPLETE_TURN"; cellsAndCurrentTurn: CellsType };

function AppReducer(state: AppState, action: AppAction): AppState {
  console.info(`AppReducer: ${action.type}`);

  const {
    playerTurn,
    playerRacks,
    currentTurn,
    currentlySelectedTileIndex,
    cells,
  } = state;

  switch (action.type) {
    case "SELECT_TILE":
      return {
        ...state,
        currentlySelectedTileIndex: action.tileIndex,
      };
    case "PLACE_TILE":
      if (currentlySelectedTileIndex === undefined) {
        console.warn("Celled SELECTED cell with no tile selected");
        return state;
      }
      const { row, column } = action;
      const newCurrentTurn = Array.from(currentTurn);

      newCurrentTurn.push({
        letter: playerRacks[playerTurn][currentlySelectedTileIndex],
        row,
        column: column,
      });

      const newTilesOnRack = Array.from(playerRacks);
      newTilesOnRack[playerTurn].splice(currentlySelectedTileIndex, 1);

      return {
        ...state,
        currentlySelectedTileIndex: undefined,
        errorMessage: undefined,
        currentTurn: newCurrentTurn,
        playerRacks: newTilesOnRack,
      };
    case "REMOVE_TILE":
      let tileLetter: string;
      const currentTurnWithTileRemoved = Array.from(currentTurn).filter(
        (currentTurn) => {
          const isClickedTile =
            currentTurn.row === action.row &&
            currentTurn.column === action.column;

          if (isClickedTile) {
            tileLetter = currentTurn.letter;
          }

          return !isClickedTile;
        }
      );

      const newPlayerRacks = Array.from(playerRacks);
      newPlayerRacks[playerTurn].push(tileLetter!);

      return {
        ...state,
        errorMessage: undefined,
        currentTurn: currentTurnWithTileRemoved,
        playerRacks: newPlayerRacks,
      };
    case "COMPLETE_TURN":
      try {
        validate(state.cells, state.currentTurn);
        return {
          ...state,
          cells: action.cellsAndCurrentTurn,
          currentTurn: [],
          currentlySelectedTileIndex: undefined,
          playerTurn: (state.playerTurn + 1) % playerRacks.length,
        };
      } catch (e) {
        return {
          ...state,
          errorMessage: e.message,
        };
      }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(AppReducer, initialAppState);
  const {
    cells,
    currentlySelectedTileIndex,
    currentTurn,
    playerRacks,
    playerTurn,
    errorMessage,
  } = state;

  const cellsAndCurrentTurn = useMemo(() => {
    const cellsAndCurrentTurn = cloneDeep(cells);
    currentTurn.forEach((cell) => {
      cellsAndCurrentTurn[cell.row][cell.column] = cell.letter;
    });
    return cellsAndCurrentTurn;
  }, [currentTurn, cells]);

  const onCellSelect = (row: number, column: number) => {
    const isSelectedCellInCurrentTurn = currentTurn.some(
      (cell) => cell.row === row && cell.column === column
    );
    if (isSelectedCellInCurrentTurn) {
      dispatch({ type: "REMOVE_TILE", row, column });
    } else {
      dispatch({ type: "PLACE_TILE", row, column });
    }
  };

  const onCompleteTurn = () =>
    dispatch({ type: "COMPLETE_TURN", cellsAndCurrentTurn });

  const onTileSelect = (tileIndex: number) =>
    dispatch({ type: "SELECT_TILE", tileIndex });

  return (
    <div className="App">
      <p className="turn-notification">It's player {playerTurn}'s turn</p>
      <Board>
        <BoardCells cells={cellsAndCurrentTurn} onCellSelect={onCellSelect} />
      </Board>

      {errorMessage ? (
        <ErrorNotification message={errorMessage} />
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
