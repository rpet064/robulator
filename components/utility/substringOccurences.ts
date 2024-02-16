function countSubstringOccurrences(input: string, substring: string) {
    let count = 0;
    
    input.split(substring).forEach((char: string) => {
        if (char === substring) {
            count++;
        }
    })
    return count;
}