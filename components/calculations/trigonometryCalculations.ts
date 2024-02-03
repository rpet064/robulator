const regex = /\((\d+)\)/

export const solveTanCalculation = () => {
    // Your code here
}

export const solveSinCalculation = () => {
    // Your code here
}

export const solveLogCalculation = () => {
    // Your code here
}

export const solveCosCalculation = () => {
    // Your code here
}

export const manageTrigInput = (userInput: string, currentInput: string[]) => {
    return currentInput.map(input => {
       // Check if the input is a trigonometric function with empty brackets
       if (/^(sin|cos)\(\)$/.test(input)) {
         // Split the input into the function name and the empty brackets
         const [funcName, brackets] = input.split('(');
         // Concatenate the userInput between the brackets
         return `${funcName}(${userInput})`;
       }
    }).join(', ');
   };

export const removeTrigCalculation = (input: string[]) => {
    return []
}

export const doesInputContaionTrigCalculation = (input: string[]) => {
    return true
}