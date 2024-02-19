import { trigSymbolsArray } from "../utility/symbolsArray"
import { splitStringByBrackers } from "../utility/splitStringByBrackers"


export const solveTrigCalculation = () => {
    // Your code here
}

export const manageTrigInput = (userInput: string, currentInput: string) => {
    try{
        let joinedInput = currentInput

        // get content between brackets or ""
        let splitString = splitStringByBrackers(joinedInput)
        
        // append "" or existing number between brackets
        splitString[2] += userInput

        return splitString.join("")

        } catch (e) {
        throw new Error(`This equation doesn't contain brackets ${e}`)
    }
}

export const removeTrigCalculation = (input: string, inputContainTrigCalculation: string) => {
    let inputString = input
    let splitString = inputString.split(inputContainTrigCalculation)
    return splitString[0].trim()
}
