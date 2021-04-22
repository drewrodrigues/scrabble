import classNames from "classnames";
import React from "react";
import "./rack.scss";

const tiles = ["A", "B", "C", "D", "E", "F", "G"];

interface RackProps {
  player: number;
  selectedTile: string | undefined;
  onTileSelect: (selectedTile: string) => void;
}

export function Rack({ player, selectedTile, onTileSelect }: RackProps) {
  return (
    <div className="rack">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={classNames("playerTile", { "selectedTile": selectedTile === tile })}
          onClick={() => onTileSelect(tile)}
        >
          {tile}
        </div>
      ))
      }
    </div >
  );
}
