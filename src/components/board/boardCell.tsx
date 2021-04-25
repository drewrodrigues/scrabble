import React from "react";
import classNames from "classnames";
import { BONUS_CELLS } from "../../utils/bonuses";
import { firstLetterOfWords } from "../../utils/formatters";
import { Tile } from "./index";
import { TileType } from "../../utils/tiles";
import "./tile.scss";

interface BoardCellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  isActive: boolean;
  tile?: TileType;
}

export function BoardCell({
  row,
  col,
  tile,
  onClick,
  isActive,
}: BoardCellProps) {
  const bonus = BONUS_CELLS[row][col];
  const bonusText = bonus && firstLetterOfWords(bonus);
  const isCenter = row === 7 && col === 7;
  const isFilled = tile !== null;
  const isClickable = isActive || !tile;

  return (
    <span
      className={classNames("cell", {
        [`cell--${bonus}`]: bonus,
        "cell--is-center": isCenter,
        "cell--is-filled": isFilled,
        "cell--is-active": isActive,
        "cell--is-clickable": isClickable,
      })}
      onClick={isClickable ? () => onClick(row, col) : undefined}
      key={col}
    >
      {tile ? <Tile tile={tile} /> : bonusText}
    </span>
  );
}
