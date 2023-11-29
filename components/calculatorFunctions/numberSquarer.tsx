
const squareNumber = (calculatorInput: string[], originalNumber: number, arrayLength: number) => {
  
  if (arrayLength) {
      const hasNegative = calculatorInput.includes("-");
      const numberToSquare = hasNegative
          ? parseInt(calculatorInput.join("").replace(/,/g, "").replace("-", ""))
          : originalNumber;

      const squaredNumberString = (Math.sqrt(numberToSquare)).toFixed(2).toString();
      const squaredNumberArray = squaredNumberString.split('');

      if (hasNegative) {
          squaredNumberArray.unshift("-");
      }

      return squaredNumberArray;
  }

  return [];
};

export default squareNumber;

