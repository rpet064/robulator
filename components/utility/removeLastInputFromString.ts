export const removeLastInputFromString = (calculatorInput: string[]) => {
        let arrayIntoString = calculatorInput.join("")
        let newArray = ""

        // Remove Pi from equation
        if (arrayIntoString.endsWith("𝝅")) {
                newArray = arrayIntoString.replace(/𝝅$/, '');
        } else {
                newArray = arrayIntoString.slice(0, -1)
        }
        return newArray.split("")
}