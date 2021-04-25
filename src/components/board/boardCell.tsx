import React from "react";
import classNames from "classnames";
import { BONUS_CELLS } from "../../utils/bonuses";
import { firstLetterOfWords } from "../../utils/formatters";

interface BoardCellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  isActive: boolean;
  letter?: string;
}

export function BoardCell({
  row,
  col,
  letter,
  onClick,
  isActive,
}: BoardCellProps) {
  const bonus = BONUS_CELLS[row][col];
  const bonusText = bonus && firstLetterOfWords(bonus);
  const isCenter = row === 7 && col === 7;
  const isFilled = letter !== null;

  return (
    <span
      className={classNames("cell", {
        [`cell--${bonus}`]: bonus,
        "cell--is-center": isCenter,
        "cell--is-filled": isFilled,
        "cell--is-active": isActive,
      })}
      onClick={() => onClick(row, col)}
      key={col}
    >
      {letter || bonusText}
    </span>
  );
}
