import { Cells, CurrentTurn } from "../App";

enum Direction {
  Vertical = "Vertical",
  Horizontal = "Horizontal",
}

export default function validate(cells: Cells, currentTurn: CurrentTurn[]) {
  _validateCenterCovered(cells, currentTurn);
  _validateCurrentTurnAdjacent(currentTurn);
}

function _validateCenterCovered(cells: Cells, currentTurn: CurrentTurn[]) {
  // TODO: @drew make flexible for different sized boards
  const isCenterCovered =
    cells[7][7] ||
    currentTurn.some((turn) => turn.row === 7 && turn.column === 7);

  if (!isCenterCovered) {
    throw new Error("Center tile needs to be covered");
  }
}

function _validateCurrentTurnAdjacent(currentTurn: CurrentTurn[]) {
  if (currentTurn.length === 1) return;
  const direction =
    currentTurn[0].column == currentTurn[1].column
      ? Direction.Vertical
      : Direction.Horizontal;

  _validateNoGaps(currentTurn, direction);
  _validateRowOrColumnAllEqual(currentTurn, direction);
}

function _validateNoGaps(currentTurn: CurrentTurn[], direction: Direction) {
  const rowOrColumnValues = currentTurn.map(
    (cell) => cell[direction === Direction.Vertical ? "row" : "column"]
  );
  const [min, max] = [
    Math.min(...rowOrColumnValues),
    Math.max(...rowOrColumnValues),
  ];

  for (let i = min; i <= max; i++) {
    if (!rowOrColumnValues.includes(i)) {
      throw new Error("There's a gap in the cells direction");
    }
  }
}

function _validateRowOrColumnAllEqual(
  currentTurn: CurrentTurn[],
  direction: Direction
) {
  const shouldBeStaticValue = currentTurn.map(
    (cell) => cell[direction === Direction.Vertical ? "column" : "row"]
  );
  const allStaticValuesEqual = shouldBeStaticValue.every(
    (value) => value === shouldBeStaticValue[0]
  );
  if (!allStaticValuesEqual) {
    throw new Error(
      `Cells are not concurrently ${direction} and they are expected to be`
    );
  }
}
