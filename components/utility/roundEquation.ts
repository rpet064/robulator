export const removeTrailingZeros = (answer: string): string => {
    return answer.includes('.') ? answer.replace(/\.?0*$/, '') : answer
}

export const roundNumber = (value: string, decimalPlaces: number): string => {
    let numberValue = parseFloat(value)
    let roundedNumber = numberValue.toFixed(decimalPlaces)
    return roundedNumber.toString()
   }
   