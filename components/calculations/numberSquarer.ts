import { round } from "mathjs"
import { errorMessage } from "../utility/toastMessages"

export const squareNumber = (calculatorInput: string): string => {
    try{
        const hasNegative = calculatorInput[0] === "-"
        if(hasNegative){
            calculatorInput = calculatorInput.replace("-", "")
        }

        let answer = Math.sqrt(Number(calculatorInput))
        let roundedAnswer = round(answer, 5).toString()
    
          if (hasNegative) {
            roundedAnswer = "-" + roundedAnswer
          }
          return roundedAnswer
    } catch (error) {
        errorMessage(`Unable to calculate square root of input: ${calculatorInput}`)
        return "0"
    }
}

