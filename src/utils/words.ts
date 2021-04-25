import { CellsType, CurrentTurn } from "../App";
import {
  buildHorizontalWordFromTurn,
  buildVerticalWordFromTurn,
} from "./cells";
import { Direction } from "./validate";

export function getCurrentTurnsWords(
  cells: CellsType,
  currentTurn: CurrentTurn[]
) {
  if (currentTurn.length === 1) {
    console.log("LENGTH OF 1");
    return [
      buildVerticalWordFromTurn(currentTurn, cells),
      buildHorizontalWordFromTurn(currentTurn, cells),
    ].filter(Boolean);
  } else {
    const direction =
      currentTurn[0].column === currentTurn[1].column
        ? Direction.Vertical
        : Direction.Horizontal;

    if (direction === Direction.Vertical) {
      console.log("Vertical word");
      const words = [buildVerticalWordFromTurn(currentTurn, cells)];

      currentTurn.forEach((turn) => {
        words.push(buildHorizontalWordFromTurn([turn], cells));
      });

      return words.filter(Boolean);
    } else {
      console.log("Vertical word");
      const words = [buildHorizontalWordFromTurn(currentTurn, cells)];

      currentTurn.forEach((turn) => {
        words.push(buildVerticalWordFromTurn([turn], cells));
      });

      return words.filter(Boolean);
    }
  }
}
