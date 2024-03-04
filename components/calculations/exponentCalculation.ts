import { notifyMessage } from "../utility/toastMessages"

export const solveExponentialCalculation = (input: string, matchedExponent: string): string => {
    try{
        const base = parseInt(input)

        // TODO: solve exponent calculation (currently only works for x2, x3 etc)
        const exponent = parseInt(matchedExponent.split('x')[1])

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