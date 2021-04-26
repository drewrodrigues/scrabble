import DICTIONARY from "./dictionary.json";

export function isValidWord(word: string) {
  return Object.keys(DICTIONARY).includes(word);
}
