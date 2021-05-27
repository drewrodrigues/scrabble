import React from "react";
import { TileType } from "../utils/tiles";
import "./tile.scss";

interface TileProps {
  tile: TileType;
}

export function Tile({ tile }: TileProps) {
  const { letter, points } = tile;

  return (
    <div className="tile">
      <div className="tile-letter">{letter}</div>
      <span className="tile-points">{points}</span>
    </div>
  );
}
