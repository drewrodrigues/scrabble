const DICTIONARY = require('./utils/dictionary.json');

export function isValidWord(word: string) {
  return Object.keys(DICTIONARY).includes(word);
}
