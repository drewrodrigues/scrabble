import { CellsType, CurrentTurn } from "../App";

// turn should be sorted before being passed
export function buildHorizontalWordFromTurn(
  turns: CurrentTurn[],
  cells: CellsType
) {
  let anyTilesAbove = true;
  let currentColumn = turns[0].column;
  const constantRow = turns[0].row;
  let word = turns[0].letter;

  while (anyTilesAbove) {
    currentColumn--;

    const aboveTileInCells = cells[constantRow][currentColumn];
    const aboveTileInCurrentTurn = turns.find(
      (turn) => turn.column === currentColumn && turn.row === constantRow
    );

    if (aboveTileInCells) {
      word = aboveTileInCells + word;
    } else if (aboveTileInCurrentTurn) {
      word = aboveTileInCurrentTurn.letter + word;
    } else {
      anyTilesAbove = false;
    }
  }

  currentColumn = turns[0].column;
  let anyTilesBelow = true;
  while (anyTilesBelow) {
    currentColumn++;

    const belowTileInCells = cells[constantRow][currentColumn];
    const belowTileInCurrentTurn = turns.find(
      (turn) => turn.column === currentColumn && turn.row === constantRow
    );

    if (belowTileInCells) {
      word += belowTileInCells;
    } else if (belowTileInCurrentTurn) {
      word += belowTileInCurrentTurn.letter;
    } else {
      anyTilesBelow = false;
    }
  }

  console.log({ word });

  return word.length === 1 ? undefined : word;
}

// turn should be sorted before being passed
export function buildVerticalWordFromTurn(
  turns: CurrentTurn[],
  cells: CellsType
) {
  let anyTilesAbove = true;
  let currentRow = turns[0].row;
  const constantColumn = turns[0].column;
  let word = turns[0].letter;

  while (anyTilesAbove) {
    currentRow--;

    const aboveTileInCells = cells[currentRow][constantColumn];
    const aboveTileInCurrentTurn = turns.find(
      (turn) => turn.row === currentRow && turn.column === constantColumn
    );

    if (aboveTileInCells) {
      word = aboveTileInCells + word;
    } else if (aboveTileInCurrentTurn) {
      word = aboveTileInCurrentTurn.letter + word;
    } else {
      anyTilesAbove = false;
    }
  }

  currentRow = turns[0].row;
  let anyTilesBelow = true;
  while (anyTilesBelow) {
    currentRow++;

    const belowTileInCells = cells[currentRow][constantColumn];
    const belowTileInCurrentTurn = turns.find(
      (turn) => turn.row === currentRow && turn.column === constantColumn
    );

    if (belowTileInCells) {
      word += belowTileInCells;
    } else if (belowTileInCurrentTurn) {
      word += belowTileInCurrentTurn.letter;
    } else {
      anyTilesBelow = false;
    }
  }

  console.log({ word });

  return word.length === 1 ? undefined : word;
}
