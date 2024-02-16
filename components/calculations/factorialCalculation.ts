import { notifyMessage } from "../utility/toastMessages"

export const solveFactorial = (input: string) => {

    // Split input by factorial, then get first number
    let operand = 0
    try{
        operand = parseInt(input.split('!')[0])
    } catch (e) {
        notifyMessage(`Cannot solve factorial calculation ${e}`)
        return
    }

    // get number of times need to calculate factorial
    let numOfFactorials = countSubstringOccurrences(input, '!')
    if(numOfFactorials < 1){
        return operand
    }

    let inputTotal = operand, numOfIterations = operand;

    // Number of factorials
    while (numOfFactorials > 0) {

        numOfIterations = inputTotal

        // factorial starts from highest nunber and multiplies down
        while (numOfIterations > 0){
            numOfIterations--
            inputTotal *= numOfIterations
        }
        numOfFactorials--
    }
}