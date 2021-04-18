import React from 'react';
import "./board.scss";
import Cell from "./cell";

interface BoardProps {
  cells: string[][];
  onCellSelect: (row: number, col: number) => void;
  currentlySelectedCell: number[] | undefined;
}

export default function Board({ cells, onCellSelect, currentlySelectedCell }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  return (
    <main className="board">
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((letter, j) => {
            return (
              <Cell letter={letter} row={i} col={j} onClick={onCellClick} currentlySelectedCell={currentlySelectedCell} />
            );
          })}
        </section>
      ))}
    </main>
  );
}
