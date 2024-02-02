export const removeLastInputFromString = (calculatorInput: string[]) => {
        let arrayIntoString = calculatorInput.join("").slice(0, -1)
        return arrayIntoString.split("")
}