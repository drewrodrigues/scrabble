import "./rack.scss";

const tiles = ["A", "B", "C", "D", "E", "F", "G"];

export function Rack({ player, selectLetter, selectedLetter }) {

    <div className="rack">
      {tiles.map((tile, index) => (
        <div key={index} className=`playerTile ${selectedLetter === tile ? ""} ` onClick={() => selectLetter(tile)}>
          {tile}
        </div>
      ))}
    </div>
  );
}
