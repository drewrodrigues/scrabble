import DICTIONARY from "./dictionary.json";

export function isValidWord(word: string) {
  return (DICTIONARY as Record<string, number>)[word.toLowerCase()];
}
