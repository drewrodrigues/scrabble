import { Cells, CurrentTurn } from "../App";

function _validateCenterCovered(cells: Cells, currentTurn: CurrentTurn[]) {
  // TODO: @drew make flexible for different sized boards
  const isCenterCovered =
    cells[7][7] ||
    currentTurn.some((turn) => turn.row === 7 && turn.column === 7);

  if (!isCenterCovered) {
    throw new Error("Center tile needs to be covered");
  }
}

function _validateMoves(cells: Cells, currentTurn: CurrentTurn[]) {}

export default function validate(cells: Cells, currentTurn: CurrentTurn[]) {
  _validateCenterCovered(cells, currentTurn);
}
