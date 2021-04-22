import React from "react";
import "./completeTurn.scss";
import classNames from "classnames";

interface CompleteTurnProps {
  onClick: () => void;
  isDisabled: boolean;
}

export default function CompleteTurn({
  onClick,
  isDisabled,
}: CompleteTurnProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={classNames("completeTurn")}
    >
      {isDisabled ? "Place some tiles..." : "Complete turn"}
    </button>
  );
}
