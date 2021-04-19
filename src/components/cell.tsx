import React from "react";
import classNames from "classnames";
import { BONUS_CELLS } from "../utils/bonuses";
import "./cell.scss";

interface CellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  letter?: string;
  currentlySelectedCell?: number[];
}

export default function Cell({
  row,
  col,
  letter,
  onClick,
  currentlySelectedCell,
}: CellProps) {
  const isSelected =
    currentlySelectedCell &&
    currentlySelectedCell[0] === row &&
    currentlySelectedCell[1] === col;
  const bonus = BONUS_CELLS[row][col];
  const bonusText = bonus && bonus.replace("-", " ");
  const isCenter = row === 7 && col === 7;

  return (
    <span
      className={classNames("cell", {
        "cell--is-selected": isSelected,
        [`cell--${bonus}`]: bonus,
        "cell--is-center": isCenter,
      })}
      onClick={() => onClick(row, col)}
      key={col}
    >
      {letter || bonusText || (isCenter ? "CENTER" : "")}
    </span>
  );
}
