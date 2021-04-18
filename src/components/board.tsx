import React from 'react';
import "./board.scss";
import Cell from "./cell";

interface BoardProps {
  cells: string[][];
  onCellSelect: (row: number, col: number) => void;
  currentlySelectedCell: number[] | undefined;
  currentPlayerTile: string;
}

export default function Board({ cells, onCellSelect, currentlySelectedCell, currentPlayerTile }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    onCellSelect(row, column);
  };

  console.log(JSON.stringify(cells));
  const currentCells = Array.from(cells);
  if (currentlySelectedCell !== undefined) {
    console.log(currentlySelectedCell[0])
    console.log(currentlySelectedCell[1])
    console.log(currentCells[currentlySelectedCell[0]][currentlySelectedCell[1]]);
    currentCells[currentlySelectedCell[0]][currentlySelectedCell[1]] = currentPlayerTile;
    console.log(currentCells[0][0])
  }

  return (
    <main className="board">
      {currentCells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((letter, j) => {
            return (
              <Cell key={j} letter={letter} row={i} col={j} onClick={onCellClick} currentlySelectedCell={currentlySelectedCell} />
            );
          })}
        </section>
      ))}
    </main>
  );
}
