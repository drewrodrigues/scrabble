import React from "react";
import classNames from "classnames";
import { BONUS_CELLS } from "../utils/bonuses";
import "./cell.scss";

interface CellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  letter?: string;
}

export default function Cell({ row, col, letter, onClick }: CellProps) {
  const bonus = BONUS_CELLS[row][col];
  const bonusText = bonus && bonus.replace("-", " ");
  const isCenter = row === 7 && col === 7;
  const isFilled = letter !== null;

  return (
    <span
      className={classNames("cell", {
        [`cell--${bonus}`]: bonus,
        "cell--is-center": isCenter,
        "cell--is-filled": isFilled
      })}
      onClick={() => onClick(row, col)}
      key={col}
    >
      {letter || bonusText || (isCenter ? "CENTER" : "")}
    </span>
  );
}
