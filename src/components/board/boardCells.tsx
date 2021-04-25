import React from "react";
import { CellsType } from "../../App";
import BoardCell from "./boardCell";
import "./boardCells.scss";

interface BoardProps {
  cells: CellsType;
  onCellSelect: (row: number, col: number) => void;
}

export default function BoardCells({ cells, onCellSelect }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  return (
    <>
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((cellLetter, j) => {
            return (
              <BoardCell
                key={j}
                letter={cellLetter}
                row={i}
                col={j}
                onClick={onCellClick}
              />
            );
          })}
        </section>
      ))}
    </>
  );
}
