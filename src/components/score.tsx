import React from "react";
import "./score.scss";

interface ScoreProps {
  playerName: string;
  score: number;
}

export function Score({ playerName, score }: ScoreProps) {
  return (
    <div className="score">
      <h2 className="score__player">{playerName}</h2>
      <p className="score__counter">{score} </p>
      <p className="score__points">points</p>
    </div>
  );
}
