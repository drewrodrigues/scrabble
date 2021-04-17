import "./board.scss";
import Cell from "./cell";

interface BoardProps {
  cells: string[][];
  onCellSelect: (row: number, col: number) => void;
}

export default function Board({ cells, onCellSelect }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    alert(`You clicked row: ${row}, column: ${column}`);
    onCellSelect(row, column);
  };

  console.log(JSON.stringify(cells));

  return (
    <main className="board">
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((letter, j) => {
            return (
              <Cell letter={letter} row={i} col={j} onClick={onCellClick} />
            );
          })}
        </section>
      ))}
    </main>
  );
}
