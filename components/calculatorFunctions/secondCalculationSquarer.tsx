const SquareSecondCalculation = (calculatorInput: string[], originalNumber: number) => {

  let originalNumberNoNegative = 0
  let dividedNumberString = ""
  let dividedNumberArray = []

  // Check if there is a negative number
  if (calculatorInput.includes("-")) {

    originalNumberNoNegative = parseInt(calculatorInput.toString().replaceAll(',', '').replace('-', ''))

    // Solves, rounds to 2d.p, adds negative sign back in and puts back into array
    dividedNumberString = (Math.sqrt(originalNumberNoNegative)).toFixed(2).toString()

    dividedNumberArray = dividedNumberString.split('')

    dividedNumberArray.unshift("-")

    return dividedNumberArray

  } else {
    
    // Solves, rounds to 2d.p & puts back into array
    dividedNumberString = (Math.sqrt(originalNumber)).toFixed(2).toString()

    dividedNumberArray = dividedNumberString.split('')

    return dividedNumberArray
  }
}

export default SquareSecondCalculation