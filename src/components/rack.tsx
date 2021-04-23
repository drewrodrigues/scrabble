import classNames from "classnames";
import React from "react";
import "./rack.scss";

interface RackProps {
  player: number;
  tiles: string[];
  selectedTile: number | undefined;
  onTileSelect: (selectedTile: number) => void;
}

export function Rack({ player, tiles, selectedTile, onTileSelect }: RackProps) {
  return (
    <div className="rack">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={classNames("playerTile", { "selectedTile": selectedTile === index })}
          onClick={() => onTileSelect(index)}
        >
          {tile}
        </div>
      ))}
    </div >
  );
}
