import React from "react";
import { CellsType, TileInCurrentTurn } from "../../App";
import { BoardCell } from "./boardCell";

interface BoardProps {
  cells: CellsType;
  currentTurn: TileInCurrentTurn[];
  onCellSelect: (row: number, col: number) => void;
}

export function BoardCells({ cells, currentTurn, onCellSelect }: BoardProps) {
  return (
    <>
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((cellTile, j) => {
            const currentTurnCell = currentTurn.find(
              (turn) => turn.row === i && turn.column === j
            );

            return (
              <BoardCell
                key={j}
                tile={currentTurnCell ? currentTurnCell.tile : cellTile}
                row={i}
                col={j}
                onClick={onCellSelect}
                isActive={!!currentTurnCell}
              />
            );
          })}
        </section>
      ))}
    </>
  );
}
