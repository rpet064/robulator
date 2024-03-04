import { notifyMessage } from "../utility/toastMessages"

export const solveExponentialCalculation = (input: string, matchedExponent: string | null): string => {
    try{

        let base, exponent

        // Calculations containing any number
        if(!matchedExponent){
            let splitString = input.split('x')

            base = parseInt(splitString[0])

            // TODO: solve for complex exponent input
            exponent = parseInt(splitString[1])
        
        // simple exponent calculations
        } else {
            base = parseInt(input)
            exponent = parseInt(matchedExponent.split('x')[1])
        }

        let newOutput = base
        for(let i = 0; i < exponent - 1; i++){
            newOutput *= base
        }
        return newOutput.toString()
    } catch (e) {
        notifyMessage("Invalid exponent" + matchedExponent + e)
        return "0"
    }
}