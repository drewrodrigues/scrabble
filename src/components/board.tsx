import "./board.scss";

interface BoardProps {
  cells: string[][];
  onCellSelect: (row: number, column: number) => void;
}

export default function Board({ cells, onCellSelect }: BoardProps) {
  const onCellClick = (row: number, column: number) => {
    alert(`You clicked row: ${row}, column: ${column}`);
    onCellSelect(row, column);
  };

  return (
    <main className="board">
      {cells.map((row, i) => (
        <section className="row" key={i}>
          {row.map((letter, j) => (
            <span
              className={`cell cell-${(j + j) % 2 === 0 ? "odd" : "even"}`}
              onClick={() => onCellClick(i, j)}
              key={j}
            >
              {letter}
            </span>
          ))}
        </section>
      ))}
    </main>
  );
}
