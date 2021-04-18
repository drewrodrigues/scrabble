import React from 'react';
import classNames from "classnames";

interface CellProps {
  row: number;
  col: number;
  letter: string | undefined;
  onClick: (row: number, col: number) => void;
}

export default function Cell({ row, col, letter, onClick }: CellProps) {
  return (
    <span
      className={classNames("cell")}
      onClick={() => onClick(row, col)}
      key={col}
    >
      {letter}
    </span>
  );
}
