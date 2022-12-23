import symbolsArray from "./data/symbolsArray"


// this equation takes inputs from react from end and solves the equation
const solveEquation = (firstNumber:number, operator:string, secondNumber:number) => {
  if (operator === "+"){
    return firstNumber + secondNumber;
  } else if (operator === "-"){
    return firstNumber - secondNumber;
  } else if (operator === "÷"){
      return firstNumber / secondNumber;
  } else if (operator === "×"){
    return firstNumber * secondNumber;
  }
}

  export default function handler(req: any, res: any) {
    if (req.method === 'POST') {

      // catches post req body - sends to solve equation to be solved, then answer sent back to app
      const {firstNumber, operator, secondNumber} = req.body;
      console.log(firstNumber + secondNumber)
      
      // join array of strings into String, then change strings into numbers 
      let answer = solveEquation(parseFloat(firstNumber.join('')), operator, parseFloat(secondNumber.join('')))!;
      let roundedAnswer = answer.toFixed(2);
      res.status(200).json({ "answer": roundedAnswer });
    } else {

      // GET request when page first loaded sends button data
      res.status(200).json({ 
        btnData: symbolsArray
      })
    }
  }