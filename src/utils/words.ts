import { CellsType, TileInCurrentTurn } from "../App";
import { Direction, getDirectionOfCurrentTurn } from "./validate";
import { TileType } from "./tiles";
import { isValidWord } from "./dictionary";

export function getCurrentTurnsWords(
  cells: CellsType,
  currentTurn: TileInCurrentTurn[]
) {
  const tiles: (TileType[] | undefined)[] = [];

  if (currentTurn.length === 1) {
    console.log("LENGTH OF 1");
    tiles.push(
      buildWordFromTurnInDirection(currentTurn, cells, Direction.Vertical)
    );
    tiles.push(
      buildWordFromTurnInDirection(currentTurn, cells, Direction.Horizontal)
    );
  } else {
    const direction = getDirectionOfCurrentTurn(currentTurn);

    console.log("Word in direction: ", direction);
    tiles.push(buildWordFromTurnInDirection(currentTurn, cells, direction));

    currentTurn.forEach((turn) => {
      tiles.push(
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

  const filteredTiles = tiles.filter(Boolean);
  filteredTiles.forEach((tiles) => verifyTilesFormWord(tiles!));
  return filteredTiles as TileType[][];
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

      const hitEdgeOfBoard = changingValue >= 15 || changingValue <= -1;
      if (hitEdgeOfBoard) {
        break;
      }

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

function verifyTilesFormWord(tiles: TileType[]) {
  const letters = tiles.map((tile) => tile.letter);
  const wordFromTiles = letters.join("");
  console.log({ wordFromTiles });

  if (isValidWord(wordFromTiles)) {
    return wordFromTiles;
  } else {
    throw new Error(`${wordFromTiles} is not a valid word.`);
  }
}
