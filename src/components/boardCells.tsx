import React from "react";
import { CellsType } from "../App";
import Cell from "./cell";
import "./boardCells.scss";

interface BoardProps {
  cells: CellsType;
  onCellSelect: (row: number, col: number) => void;
}

export function BoardCells({ cells, onCellSelect }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  return (
    <>
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((cellLetter, j) => {
            return (
              <Cell
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
