import React from 'react';
import classNames from "classnames";

interface CellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  letter?: string;
  currentlySelectedCell?: number[];
}

export default function Cell({ row, col, letter, onClick, currentlySelectedCell }: CellProps) {
  const isSelected = currentlySelectedCell && currentlySelectedCell[0] === row && currentlySelectedCell[1] === col;

  return (
    <span
      className={classNames("cell", {'cell--is-selected': isSelected})}
      onClick={() => onClick(row, col)}
      key={col}
    >
      {letter}
    </span>
  );
}
