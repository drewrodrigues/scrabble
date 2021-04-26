import React, { useReducer } from "react";
import "./styles.css";
import { Racks } from "./components/racks";
import { Rack } from "./components/rack";
import CompleteTurn from "./components/completeTurn";
import "./styles/variables.scss";
import "./styles/reset.scss";
import validate from "./utils/validate";
import ErrorNotification from "./components/error";
import { INITIAL_CELLS } from "./utils/constants";
import { drawRandomTiles, TileType } from "./utils/tiles";
import { Board, BoardCells } from "./components/board";
import { Score } from "./components/score";
import { getCurrentTurnsWords } from "./utils/words";

export interface TileInCurrentTurn {
  tile: TileType;
  row: number;
  column: number;
}

export type CellsType = (TileType | null)[][];

interface AppState {
  playerTurn: number;
  cells: CellsType;
  currentlySelectedTileIndex: number | undefined;
  currentTurn: TileInCurrentTurn[];
  playerRacks: TileType[][];
  errorMessage: string | undefined;
}

const initialAppState: AppState = {
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
  | { type: "COMPLETE_TURN" };

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
        tile: playerRacks[playerTurn][currentlySelectedTileIndex],
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
      let tile: TileType;
      const currentTurnWithTileRemoved = Array.from(currentTurn).filter(
        (currentTurn) => {
          const isClickedTile =
            currentTurn.row === action.row &&
            currentTurn.column === action.column;

          if (isClickedTile) {
            tile = currentTurn.tile;
          }

          return !isClickedTile;
        }
      );

      const newPlayerRacks = Array.from(playerRacks);
      newPlayerRacks[playerTurn].push(tile!);

      return {
        ...state,
        errorMessage: undefined,
        currentTurn: currentTurnWithTileRemoved,
        playerRacks: newPlayerRacks,
      };
    case "COMPLETE_TURN":
      try {
        validate(state.cells, state.currentTurn);

        const cellsAndCurrentTurn = Array.from(cells);
        currentTurn.forEach((cell) => {
          cellsAndCurrentTurn[cell.row][cell.column] = cell.tile;
        });

        const newlyFilledRacks = Array.from(playerRacks);
        const tilesNeeded = 7 - newlyFilledRacks[playerTurn].length;
        newlyFilledRacks[playerTurn].push(...drawRandomTiles(tilesNeeded));
        console.log(getCurrentTurnsWords(cells, currentTurn));

        return {
          ...state,
          cells: cellsAndCurrentTurn,
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

  const onCompleteTurn = () => dispatch({ type: "COMPLETE_TURN" });

  const onTileSelect = (tileIndex: number) =>
    dispatch({ type: "SELECT_TILE", tileIndex });

  return (
    <div className="App">
      <p className="turn-notification">It's player {playerTurn}'s turn</p>
      <main>
        <Score playerName="Viviana" score={10} />
        <Board>
          <BoardCells
            cells={cells}
            currentTurn={currentTurn}
            onCellSelect={onCellSelect}
          />
        </Board>
        <Score playerName="Drew" score={20} />
      </main>
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
