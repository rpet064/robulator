function removeTrailingZeros(answer: string): string {

    // Remove trailing zeros and the decimal point if the number is an integer
    return answer.includes('.') ? answer.replace(/\.?0*$/, '') : answer;
}

export default removeTrailingZeros