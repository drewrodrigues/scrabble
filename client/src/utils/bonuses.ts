export enum Bonuses {
  DOUBLE_WORD = "double-word",
  TRIPLE_WORD = "triple-word",

  DOUBLE_LETTER = "double-letter",
  TRIPLE_LETTER = "triple-letter",
}

const TOP_HALF = [
  [
    Bonuses.TRIPLE_WORD,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    null,
    Bonuses.TRIPLE_WORD,
    null,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    Bonuses.TRIPLE_WORD,
  ],
  [
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
    null,
    Bonuses.TRIPLE_LETTER,
    null,
    null,
    null,
    Bonuses.TRIPLE_LETTER,
    null,
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
  ],
  [
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
  ],
  [
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
    null,
    null,
    null,
    Bonuses.DOUBLE_WORD,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    Bonuses.TRIPLE_LETTER,
    null,
    null,
    null,
    Bonuses.TRIPLE_LETTER,
    null,
    null,
    null,
    Bonuses.TRIPLE_LETTER,
    null,
    null,
    null,
    Bonuses.TRIPLE_LETTER,
    null,
  ],
  [
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
  ],
];

const CENTER_ROW = [
  [
    Bonuses.TRIPLE_WORD,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    Bonuses.DOUBLE_LETTER,
    null,
    null,
    Bonuses.TRIPLE_WORD,
  ],
];

const BOTTOM_HALF = Array.from(TOP_HALF).reverse();

export const BONUS_CELLS = TOP_HALF.concat(CENTER_ROW).concat(BOTTOM_HALF);
