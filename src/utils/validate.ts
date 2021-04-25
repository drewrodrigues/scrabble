import { CellsType, TileInCurrentTurn } from "../App";

export enum Direction {
  Vertical = "Vertical",
  Horizontal = "Horizontal",
}

export function getDirectionOfCurrentTurn(currentTurn: TileInCurrentTurn[]) {
  if (currentTurn.length === 1) return Direction.Vertical;
  return currentTurn[0].column === currentTurn[1].column
    ? Direction.Vertical
    : Direction.Horizontal;
}

export default function validate(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  if (!currentTurn.length) {
    throw new Error("Cannot validate when no currentTurn");
  }

  const currentTurnMoreThanOneTile = currentTurn.length > 1;
  const isFirstTurn = currentTurn.some(
    (turn) => turn.row === 7 && turn.column === 7
  );

  _validateCenterCovered(cells, currentTurn);
  if (!isFirstTurn) _validateCurrentTurnAdjacent(cells, currentTurn);
  if (currentTurnMoreThanOneTile) {
    const direction =
      currentTurn[0].column === currentTurn[1].column
        ? Direction.Vertical
        : Direction.Horizontal;
    _validateUnidirectional(currentTurn, direction);
    _validateNoGaps(cells, currentTurn, direction);
  }
}

function _validateCenterCovered(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  // TODO: @drew make flexible for different sized boards
  const isCenterCovered =
    cells[7][7] ||
    currentTurn.some((turn) => turn.row === 7 && turn.column === 7);

  if (!isCenterCovered) {
    throw new Error("Center tile needs to be covered");
  }
}

function _validateCurrentTurnAdjacent(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  const isAtLeastOneTileAdjacent = currentTurn.some((tile) => {
    const touchesLeftEndOfBoard = tile.column === 0;
    const isLeftAdjacent = !touchesLeftEndOfBoard
      ? cells[tile.row][tile.column - 1]
      : false;

    const touchesRightEndOfBoard = tile.column === cells[0].length;
    const isRightAdjacent = !touchesRightEndOfBoard
      ? cells[tile.row + 1][tile.column]
      : false;

    const touchesTopEndOfBoard = tile.row === 0;
    const isTopAdjacent = !touchesTopEndOfBoard
      ? cells[tile.row - 1][tile.column]
      : false;

    const touchesBottomEndOfBoard = tile.row === cells.length;
    const isBottomAdjacent = !touchesBottomEndOfBoard
      ? cells[tile.row + 1][tile.column]
      : false;

    return (
      isLeftAdjacent || isRightAdjacent || isTopAdjacent || isBottomAdjacent
    );
  });
  if (!isAtLeastOneTileAdjacent) {
    throw new Error(
      "The new word must use at least one of the letters already on the board."
    );
  }
}

function _validateNoGaps(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[],
  direction: Direction
) {
  const rowOrColumnValues = currentTurn.map(
    (cell) => cell[direction === Direction.Vertical ? "row" : "column"]
  );
  const [min, max] = [
    Math.min(...rowOrColumnValues),
    Math.max(...rowOrColumnValues),
  ];

  for (let i = min; i <= max; i++) {
    const tileExistsInCells = getDirectionOfCurrentTurn(currentTurn);

    if (!rowOrColumnValues.includes(i) && !tileExistsInCells) {
      throw new Error("There's a gap in the cells direction");
    }
  }
}

function _validateUnidirectional(
  currentTurn: TileInCurrentTurn[],
  direction: Direction
) {
  const shouldBeStaticValue = currentTurn.map(
    (cell) => cell[direction === Direction.Vertical ? "column" : "row"]
  );
  const areAllStaticValuesEqual = shouldBeStaticValue.every(
    (value) => value === shouldBeStaticValue[0]
  );
  if (!areAllStaticValuesEqual) {
    throw new Error(
      `Cells are not concurrently ${direction} and they are expected to be`
    );
  }
}
