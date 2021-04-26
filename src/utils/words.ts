import { CellsType, CurrentTurn } from "../App";
import { Direction, getDirectionOfCurrentTurn } from "./validate";

export function getCurrentTurnsWords(
  cells: CellsType,
  currentTurn: CurrentTurn[]
) {
  const words: (string | undefined)[] = [];

  if (currentTurn.length === 1) {
    console.log("LENGTH OF 1");
    words.push(
      buildWordFromTurnInDirection(currentTurn, cells, Direction.Vertical)
    );
    words.push(
      buildWordFromTurnInDirection(currentTurn, cells, Direction.Horizontal)
    );
  } else {
    const direction = getDirectionOfCurrentTurn(currentTurn);

    console.log("Word in direction: ", direction);
    words.push(buildWordFromTurnInDirection(currentTurn, cells, direction));

    currentTurn.forEach((turn) => {
      words.push(
        buildWordFromTurnInDirection(
          [turn],
          cells,
          direction === Direction.Horizontal
            ? Direction.Vertical
            : Direction.Horizontal
        )
      );
    });
  }

  return words.filter(Boolean);
}

function buildWordFromTurnInDirection(
  turns: CurrentTurn[],
  cells: CellsType,
  direction: Direction
) {
  const constantProp = direction === Direction.Vertical ? "column" : "row";
  const changingProp = direction === Direction.Vertical ? "row" : "column";

  const constantValue = turns[0][constantProp];
  let word = turns[0].tile.letter;

  [-1, 1].forEach((decrementOrIncrement) => {
    let anyTilesInDirection = true;
    let changingValue = turns[0][changingProp];

    while (anyTilesInDirection) {
      changingValue += decrementOrIncrement;

      const isTileInCells =
        cells[changingProp === "row" ? changingValue : constantValue][
          changingProp === "column" ? changingValue : constantValue
        ];
      const isTileInCurrentTurn = turns.find(
        (turn) =>
          turn[changingProp] === changingValue &&
          turn[constantProp] === constantValue
      );

      const letter = isTileInCurrentTurn?.tile.letter || isTileInCells?.letter;

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
