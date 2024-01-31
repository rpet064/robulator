export const removeBrackets = (arr: string[]): string[] => {
    return arr.map(str => str.replace(/[\(\)]/g, ''));
}