import { CellsType, TileInCurrentTurn } from "../App";
import { Direction, getDirectionOfCurrentTurn } from "./validate";
import { TileType } from "./tiles";
import { isValidWord } from "./dictionary";

export function getCurrentTurnsWords(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  const words: (TileType[] | undefined)[] = [];

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

  return words.filter(Boolean).filter((word) => {
    const letters = word!.map((tile) => tile.letter);
    const wordFromTiles = letters.join("");
    console.log({ wordFromTiles });

    if (isValidWord(wordFromTiles)) {
      return wordFromTiles;
    } else {
      throw new Error(`${wordFromTiles} is not a valid word.`);
    }
  });
}

function buildWordFromTurnInDirection(
  currentTurn: TileInCurrentTurn[],
  cells: CellsType,
  direction: Direction
) {
  const constantProp = direction === Direction.Vertical ? "column" : "row";
  const changingProp = direction === Direction.Vertical ? "row" : "column";

  const constantValue = currentTurn[0][constantProp];
  const word: TileType[] = [currentTurn[0].tile];

  [-1, 1].forEach((decrementOrIncrement) => {
    let anyTilesInDirection = true;
    let changingValue = currentTurn[0][changingProp];

    while (anyTilesInDirection) {
      changingValue += decrementOrIncrement;

      const isTileInCells =
        cells[changingProp === "row" ? changingValue : constantValue][
          changingProp === "column" ? changingValue : constantValue
        ];
      const isTileInCurrentTurn = currentTurn.find(
        (turn) =>
          turn[changingProp] === changingValue &&
          turn[constantProp] === constantValue
      );

      const tile = isTileInCurrentTurn?.tile || isTileInCells;

      if (tile) {
        if (decrementOrIncrement === -1) {
          word.unshift(tile);
        } else {
          word.push(tile);
        }
      } else {
        anyTilesInDirection = false;
      }
    }
  });

  return word.length === 1 ? undefined : word;
}
