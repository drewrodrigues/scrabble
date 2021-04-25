import React, { ReactNode } from "react";

export function Board({ children }: { children: ReactNode }) {
  return <main className="board">{children}</main>;
}
