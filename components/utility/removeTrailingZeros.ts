export const removeTrailingZeros = (answer: string): string => {
    return answer.includes(".") ? answer.replace(/\.?0*$/, "") : answer;
}
   