import { notifyMessage } from "../utility/toastMessages";
import { round } from "mathjs";
import { exponentDictionary } from "../utility/symbolsArray";

export const solveExponentialCalculation = (input: string, exponentToCalculate: string | null, 
    startOfExponent: number | null): string => {
    try{
        let base, exponent, exponentAsString;

        // handle complex exponents
        if(!exponentToCalculate){

            if(startOfExponent === null){
                return "0";
            }

            base = parseFloat(input.slice(0, startOfExponent));
            let exponentPart = input.slice(startOfExponent, startOfExponent + 1);
            exponentAsString = findKeyByValue(exponentPart);

        // handle simple exponents
        } else {
            base = parseFloat(input);
            exponentAsString = findKeyByValue(exponentToCalculate);
        }

        exponent = parseFloat(exponentAsString);

        let newOutput = base;
        for(let i = 0; i < exponent - 1; i++){
            newOutput *= base;
        }
        let roundedOutput = round(newOutput, 5);
        return roundedOutput.toString();
    } catch (e) {
        notifyMessage("Invalid exponent" + exponentToCalculate + e);
        return "0";
    }
}

const findKeyByValue = (value: string): string => {
    for (const [key, val] of Object.entries(exponentDictionary)) {
        if (val === value) {
            return key;
        }
    }
    return value;
};
