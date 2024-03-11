export const getAnswer = (firstNumber: number, operator: string, secondNumber:number) => {
    let answer = 0;

    if (operator === "+"){
        answer = firstNumber + secondNumber;

    } else if (operator === "-"){
        answer = firstNumber - secondNumber;

    } else if (operator === "÷"){
        answer = firstNumber / secondNumber;

    } else if (operator === "×"){
        answer = firstNumber * secondNumber;
    }
    return answer.toFixed(5).toString();
};