import React, { ReactNode } from "react";
import "./board.scss";

export default function Board({ children }: { children: ReactNode }) {
  return <main className="board">{children}</main>;
}
