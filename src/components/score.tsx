import React from "react";
import "./score.scss";

interface ScoreProps {
  playerName: string;
  score: number;
}

export function Score({ playerName, score }: ScoreProps) {
  return (
    <div className="score">
      <h2 className="score--player">{playerName}</h2>
      <p className="score--counter">{score} </p>
      <p className="score--points">points</p>
    </div>
  );
}
