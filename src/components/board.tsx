import React from "react";
import "./board.scss";
import Cell from "./cell";

interface BoardProps {
  cells: string[][];
  onCellSelect: (row: number, col: number) => void;
}

export default function Board({ cells, onCellSelect }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  console.log(JSON.stringify(cells));

  return (
    <main className="board">
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
    </main>
  );
}
