import { round } from "mathjs";
import { errorMessage } from "../utility/toastMessages";

export const squareRootNumber = (calculatorInput: string): string => {
    try{
        const isNegative = calculatorInput[0] === "-";
        if(isNegative){
            calculatorInput = calculatorInput.replace("-", "");
        }

        let answer = Math.sqrt(parseFloat(calculatorInput));
        let roundedAnswer = round(answer, 5).toString();
    
          if (isNegative) {
            roundedAnswer = "-" + roundedAnswer;
          }
          return roundedAnswer;
    } catch (error) {
        errorMessage(`Unable to calculate square root of input: ${calculatorInput}`);
        return "0";
    }
};

