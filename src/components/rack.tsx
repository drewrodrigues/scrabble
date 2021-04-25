import classNames from "classnames";
import React from "react";
import "./rack.scss";
import "./tile.scss";
import { Tile } from "../utils/tiles";

interface RackProps {
  player: number;
  tiles: Tile[];
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
          <span className="tile-letter">{tile.letter}</span>
          <span className="tile-points">{tile.points}</span>
        </div>
      ))}
    </div>
  );
}
