import { notifyMessage } from "../utility/toastMessages";
import { countSubstringOccurrences } from "../utility/substringOccurences";
import { round } from "mathjs";

export const solveFactorial = (input: string) => {

    const isNegative = input[0] === "-";
    if(isNegative){
        input = input.replace("-", "");
    }

    // Split input by factorial, then get first number
    let operand = 0;
    try{
        operand = parseFloat(input.split("!")[0]);
    } catch (e) {
        notifyMessage(`Cannot solve factorial calculation ${e}`);
        return input.toString();
    }

    // get number of times need to calculate factorial
    let numOfFactorials = countSubstringOccurrences(input, "!");
    if(numOfFactorials < 1){
        return operand.toString();
    }

    let inputTotal = operand, numOfIterations = operand;

    // Number of factorials
    while (numOfFactorials > 0) {

        numOfIterations = inputTotal;

        // factorial starts from highest nunber and multiplies down
        while (numOfIterations > 1){
            numOfIterations--;
            inputTotal *= numOfIterations;
        }
        numOfFactorials--;
    }
    let roundedOutput = round(inputTotal, 5).toString();
    if (isNegative) {
        roundedOutput = "-" + roundedOutput;
      }
    return roundedOutput;
};