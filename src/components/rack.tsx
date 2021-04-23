import classNames from "classnames";
import React from "react";
import "./rack.scss";

interface RackProps {
  player: number;
  tiles: string[];
  selectedTileIndex: number | undefined;
  onTileSelect: (selectedTile: number) => void;
}

export function Rack({ player, tiles, selectedTileIndex, onTileSelect }: RackProps) {
  return (
    <div className="rack">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={classNames("playerTile", { "selectedTile": selectedTileIndex === index })}
          onClick={() => onTileSelect(index)}
        >
          {tile}
        </div>
      ))}
    </div >
  );
}
