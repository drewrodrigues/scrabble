import React from 'react';
import "./board.scss";
import Cell from "./cell";

interface BoardProps {
  cells: string[][];
  onCellSelect: (row: number, col: number) => void;
  currentlySelectedCell: number[] | undefined;
  currentlySelectedTile: string;
}

export default function Board({ cells, onCellSelect, currentlySelectedCell, currentlySelectedTile }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  console.log(JSON.stringify(cells));

  return (
    <main className="board">
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((cellLetter, j) => {
            const selectedOrCellLetter = currentlySelectedCell && currentlySelectedCell[0] === i && currentlySelectedCell[1] === j ? currentlySelectedTile : cellLetter;
            return (
              <Cell key={j} letter={selectedOrCellLetter} row={i} col={j} onClick={onCellClick} currentlySelectedCell={currentlySelectedCell} />
            );
          })}
        </section>
      ))}
    </main>
  );
}
