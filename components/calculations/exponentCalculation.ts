import { notifyMessage } from "../utility/toastMessages"
import { round } from "mathjs"

export const solveExponentialCalculation = (input: string, matchedExponent: string | null): string => {
    try{

        let base, exponent

        // Calculations containing any number
        if(!matchedExponent){
            let splitString = input.split("x")

            base = parseFloat(splitString[0])
            exponent = parseFloat(splitString[1])
        
        // simple exponent calculations
        } else {
            base = parseFloat(input)
            exponent = parseInt(matchedExponent.split("x")[1])
        }

        let newOutput = base
        for(let i = 0; i < exponent - 1; i++){
            newOutput *= base
        }
        let roundedOutput = round(newOutput, 5)
        return roundedOutput.toString()
    } catch (e) {
        notifyMessage("Invalid exponent" + matchedExponent + e)
        return "0"
    }
}