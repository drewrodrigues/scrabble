import classNames from "classnames";
import React from "react";
import "./rack.scss";

interface RackProps {
  player: number;
  tiles: string[];
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
    <div className={classNames("rack", { "rack--is-active": isActive })}>
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={classNames("playerTile", {
            selectedTile: isActive && selectedTileIndex === index,
          })}
          onClick={() => onTileSelect(index)}
        >
          {tile}
        </div>
      ))}
    </div>
  );
}
