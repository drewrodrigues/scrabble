import { CellsType, TileInCurrentTurn } from "../App";

enum Direction {
  Vertical = "Vertical",
  Horizontal = "Horizontal",
}

export default function validate(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  if (!currentTurn.length) {
    throw new Error("Cannot validate when no currentTurn");
  }

  _validateCenterCovered(cells, currentTurn);
  _validateCurrentTurnAdjacent(cells, currentTurn);
  _validateCurrentTurnNoGapsAndUnidirectional(cells, currentTurn);
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
  const isFirstTurn = currentTurn.some(
    (turn) => turn.row === 7 && turn.column === 7
  );

  if (!isFirstTurn) {
    const isAtLeastOneTileAdjacent = currentTurn.some((tile) => {
      // Check left neighbor
      const leftAdjacent =
        tile.column !== 0 ? cells[tile.row][tile.column - 1] : false;

      // Check right neighbor
      const rightAdjacent =
        tile.column !== cells[0].length
          ? cells[tile.row + 1][tile.column]
          : false;

      // Check top neighbor
      const topAdjacent =
        tile.row !== 0 ? cells[tile.row - 1][tile.column] : false;

      // Check bottom neighbor
      const bottomAdjacent =
        tile.row !== cells.length ? cells[tile.row + 1][tile.column] : false;

      return leftAdjacent || rightAdjacent || topAdjacent || bottomAdjacent;
    });
    if (!isAtLeastOneTileAdjacent) {
      throw new Error(
        "The new word must use at least one of the letters already on the board."
      );
    }
  }
}

function _validateCurrentTurnNoGapsAndUnidirectional(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  if (currentTurn.length > 1) {
    const direction =
      currentTurn[0].column === currentTurn[1].column
        ? Direction.Vertical
        : Direction.Horizontal;

    _validateUnidirectional(currentTurn, direction);
    _validateNoGaps(cells, currentTurn, direction);
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
      const tileExistsInCells =
        direction === Direction.Vertical
          ? cells[i][currentTurn[0].column]
          : cells[currentTurn[0].row][i];

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
}
