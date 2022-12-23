import symbolsArray from "./data/symbolsArray"


// this equation takes inputs from react from end and solves the equation
const solveEquation = (firstNumber:number, operator:string, secondNumber:number) => {
  if (operator === "+"){
    return firstNumber + secondNumber;
  } else if (operator === "-"){
    return firstNumber - secondNumber;
  } else if (operator === "÷"){

    // will return "0 is indivisible" if user tries to divide 0 by a number
    if (firstNumber === 0){
      return "0 is indivisible";
    } else {
      return firstNumber / secondNumber;
    }
  } else if (operator === "×"){
    return firstNumber * secondNumber;
  }
}

  export default function handler(req: any, res: any) {
    if (req.method === 'POST') {

      // catches post req body - sends to solve equation to be solved, then answer sent back to app
      const {firstNumber, operator, secondNumber} = req.body;
      
      // join array of strings into String, then change strings into numbers 
      let answer = solveEquation(parseInt(firstNumber.join('')), operator, parseInt(secondNumber.join('')));
      res.status(200).json({ "answer": answer });
    } else {

      // GET request when page first loaded sends button data
      res.status(200).json({ 
        btnData: symbolsArray
      })
    }
  }