function removeTrailingZeros(answer: string): string {

    // Remove trailing zeros and the decimal point if the number is an integer
    let roundedAnswer = answer.includes('.')

        ? answer.replace(/\.?0*$/, '')
        
        : answer;

    return roundedAnswer;
}

export default removeTrailingZeros