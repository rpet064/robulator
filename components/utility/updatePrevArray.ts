export const updatePrevArray = (
    firstCalculatorInput: string, secondCalculatorInput: string, operator: string) => {
    const firstOperand = firstCalculatorInput;
    const secondOperand = secondCalculatorInput;

    // Construct the equation string
    const equationString = `${firstOperand} ${operator} ${secondOperand}`;

    // Convert the array to a string and remove commas
    return equationString.replace(/,/g, "");
};