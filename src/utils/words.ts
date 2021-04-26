import { CellsType, CurrentTurn } from "../App";
import { buildWordFromTurnInDirection } from "./cells";
import { Direction } from "./validate";

export function getCurrentTurnsWords(
  cells: CellsType,
  currentTurn: CurrentTurn[]
) {
  if (currentTurn.length === 1) {
    console.log("LENGTH OF 1");
    return [
      buildWordFromTurnInDirection(currentTurn, cells, Direction.Vertical),
      buildWordFromTurnInDirection(currentTurn, cells, Direction.Horizontal),
    ].filter(Boolean);
  } else {
    const direction =
      currentTurn[0].column === currentTurn[1].column
        ? Direction.Vertical
        : Direction.Horizontal;

    if (direction === Direction.Vertical) {
      console.log("Vertical word");
      const words = [
        buildWordFromTurnInDirection(currentTurn, cells, Direction.Vertical),
      ];

      currentTurn.forEach((turn) => {
        words.push(
          buildWordFromTurnInDirection([turn], cells, Direction.Horizontal)
        );
      });

      return words.filter(Boolean);
    } else {
      console.log("Horizontal word");
      const words = [
        buildWordFromTurnInDirection(currentTurn, cells, Direction.Horizontal),
      ];

      currentTurn.forEach((turn) => {
        words.push(
          buildWordFromTurnInDirection([turn], cells, Direction.Vertical)
        );
      });

      return words.filter(Boolean);
    }
  }
}
