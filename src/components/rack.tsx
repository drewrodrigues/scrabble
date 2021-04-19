import React from "react";
import "./rack.scss";

const tiles = ["A", "B", "C", "D", "E", "F", "G"];

interface RackProps {
  player: number;
  selectedTile: string;
  onTileSelect: (selectedTile: string) => void;
}

export function Rack({ player, selectedTile, onTileSelect }: RackProps) {
  return (
    <div className="rack">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`playerTile ${
            selectedTile === tile ? "selectedTile" : ""
          }`}
          onClick={() => onTileSelect(tile)}
        >
          {tile}
        </div>
      ))}
    </div>
  );
}
