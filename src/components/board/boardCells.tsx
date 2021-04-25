import React from "react";
import { CellsType, CurrentTurn } from "../../App";
import { BoardCell } from "./boardCell";

interface BoardProps {
  cells: CellsType;
  currentTurn: CurrentTurn[];
  onCellSelect: (row: number, col: number) => void;
}

export function BoardCells({ cells, currentTurn, onCellSelect }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  return (
    <>
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((cellLetter, j) => {
            const currentTurnCell = currentTurn.find(
              (turn) => turn.row === i && turn.column === j
            );

            return (
              <BoardCell
                key={j}
                letter={currentTurnCell ? currentTurnCell.letter : cellLetter}
                row={i}
                col={j}
                onClick={onCellClick}
                isActive={!!currentTurnCell}
              />
            );
          })}
        </section>
      ))}
    </>
  );
}
