import { trigSymbolsArray } from "../utility/symbolsArray"

export const solveTanCalculation = () => {
    // Your code here
}

export const solveSinCalculation = () => {
    // Your code here
}

export const solveLogCalculation = () => {
    // Your code here
}

export const solveCosCalculation = () => {
    // Your code here
}

export const manageTrigInput = (userInput: string, currentInput: string[]) => {
    try{
        let joinedInput = currentInput.join('')

        // get content between brackets or ""
        let splitString = splitStringByBrackers(joinedInput)
        
        // append "" or existing number between brackets
        splitString[1] += userInput

        // Split string for calculation
        let stringSplitForCalculation
        splitString.forEach(input => {
            stringSplitForCalculation = splitStringForCalculation(input);
        });

        return stringSplitForCalculation

        } catch (e) {
        throw new Error(`This equation doesn't contain brackets ${e}`)
    }
}

export const removeTrigCalculation = (input: string[]) => {
    return []
}

// Check if the input contains a trigonometric calculation
export const doesInputContainTrigCalculation = (input: string[]) => {

    let inputContainTrigCalculation = false

    input.forEach(str => {
        // Iterate over each trigonometric symbol
        trigSymbolsArray.forEach(symbol => {
            // Check if the string contains the trigonometric symbol followed by an opening bracket
            if (str.includes(`${symbol}(`)) {
                inputContainTrigCalculation = true;
            }
        });
    });
    return inputContainTrigCalculation
}