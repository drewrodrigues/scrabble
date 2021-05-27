import React from "react";
import "./completeTurn.scss";

interface CompleteTurnProps {
  onClick: () => void;
  isDisabled: boolean;
}

export default function CompleteTurn({
  onClick,
  isDisabled,
}: CompleteTurnProps) {
  return (
    <button onClick={onClick} disabled={isDisabled} className="completeTurn">
      {isDisabled ? "Place some tiles..." : "Complete turn"}
    </button>
  );
}
