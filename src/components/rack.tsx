import classNames from "classnames";
import React from "react";
import { Tile } from "./board/index";
import { TileType } from "../utils/tiles";
import "./rack.scss";

interface RackProps {
  player: number;
  tiles: TileType[];
  selectedTileIndex: number | undefined;
  onTileSelect: (selectedTile: number) => void;
  isActive: boolean;
}

export function Rack({
  player,
  tiles,
  selectedTileIndex,
  onTileSelect,
  isActive,
}: RackProps) {
  return (
    <div
      className={classNames("rack", `rack--player-${player}`, {
        "rack--is-active": isActive,
      })}
    >
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={classNames("playerTile", {
            selectedTile: isActive && selectedTileIndex === index,
          })}
          onClick={() => onTileSelect(index)}
        >
          <Tile tile={tile} />
        </div>
      ))}
    </div>
  );
}
