export function firstLetterOfWords(string: string) {
    return string[0] + string[string.indexOf("-") + 1]
}