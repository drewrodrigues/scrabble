import React from 'react';
import "./rack.scss";

const tiles = ["A", "B", "C", "D", "E", "F", "G"];

export function Rack({ player, selectedTile, onTileSelect }) {
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
