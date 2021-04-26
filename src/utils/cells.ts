import { CellsType, CurrentTurn } from "../App";
import { Direction } from "./validate";

export function buildWordFromTurnInDirection(
  turns: CurrentTurn[],
  cells: CellsType,
  direction: Direction
) {
  const constantProp = direction === Direction.Vertical ? "column" : "row";
  const changingProp = direction === Direction.Vertical ? "row" : "column";

  const constantValue = turns[0][constantProp];
  let word = turns[0].letter;

  [-1, 1].forEach((decrementOrIncrement) => {
    let anyTilesInDirection = true;
    let currentValue = turns[0][changingProp];

    while (anyTilesInDirection) {
      currentValue = currentValue + decrementOrIncrement;

      const aboveTileInCells =
        cells[changingProp === "row" ? currentValue : constantValue][
          changingProp === "column" ? currentValue : constantValue
        ];
      const aboveTileInCurrentTurn = turns.find(
        (turn) =>
          turn[changingProp] === currentValue &&
          turn[constantProp] === constantValue
      );

      const letter = aboveTileInCurrentTurn
        ? aboveTileInCurrentTurn.letter
        : aboveTileInCells;

      if (letter) {
        if (decrementOrIncrement === -1) {
          word = letter + word;
        } else {
          word += letter;
        }
      } else {
        anyTilesInDirection = false;
      }
    }
  });

  return word.length === 1 ? undefined : word;
}
