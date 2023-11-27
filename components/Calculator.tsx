import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import symbolsArray from './symbolsArray'
import SolveEquation from './calculatorFunctions/equationSolver'
import squareNumber from './calculatorFunctions/numberSquarer'
import removeTrailingZeros from './calculatorFunctions/removeTrailingZeros'

const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const operatorArray = ["+", "-", "×", "÷"]

export default function Calculator() {
  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string[]>([])
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string[]>([])
  const [prevInput, setPrevInput] = useState<string>("")
  const [operator, setOperator] = useState("")
  const [isFirstCalculatorInput, setIsFirstCalculatorInput] = useState(true)
  const [firstCalculatorInputHasAnswer, setFirstCalculatorInputHasAnswer] = useState(false)
  const [overwriteNumber, setOverwriteNumber] = useState(false)

  useEffect(() => {

    // if operator is empty, then still on first equation
    let isFirstEquation = operator.trim() === ""
    setIsFirstCalculatorInput(isFirstEquation)
  }, [operator])

  useEffect(() => {

    let firstElementIsZero = false;
    let secondElementIsDecimalPoint = false;

    // overwrite number if answer displayed
    if(firstCalculatorInputHasAnswer){
      setOverwriteNumber(true)
      return;
    }

    if(isFirstCalculatorInput){
      firstElementIsZero = firstCalculatorInput[0] === "0"
      secondElementIsDecimalPoint = firstCalculatorInput[1] === "."

    } else if(!isFirstCalculatorInput) {
      firstElementIsZero = secondCalculatorInput[0] === "0"
      secondElementIsDecimalPoint = secondCalculatorInput[1] === "."
    }

    console.log(firstElementIsZero)
    console.log(secondElementIsDecimalPoint)
    
    if(firstElementIsZero && !secondElementIsDecimalPoint){
      setOverwriteNumber(true)
      return;
    }
    setOverwriteNumber(false)

  }, [firstCalculatorInputHasAnswer, firstCalculatorInput, secondCalculatorInput])

  // this function stores the last equation 
  const updatePrevArray = () => {

    const firstOperand = firstCalculatorInput.join("")

    const secondOperand = secondCalculatorInput.join("")

    const equationOperator = operator

    // Construct the equation string
    const equationString = `${firstOperand} ${equationOperator} ${secondOperand} =`

    // Convert the array to a string and remove commas
    const prevEquationString = equationString.replace(/,/g, "")

    setPrevInput(prevEquationString)
  }

  const solveEquation = async (newOperator: string) => {
    if (secondCalculatorInput.length !== 0) {

      // join array of strings into String, then change strings into numbers
      let firstInputAsFloat = parseFloat(firstCalculatorInput.join(""))

      let secondInputAsFloat = parseFloat(secondCalculatorInput.join(""))

      let answer = SolveEquation(firstInputAsFloat, operator, secondInputAsFloat)!

      let roundedAnswer = removeTrailingZeros(answer).split("")
      
      setFirstCalculatorInput(roundedAnswer)

      setFirstCalculatorInputHasAnswer(true)

      // send answer to be added to equation
      updatePrevArray()

      clearNumbers(newOperator)
    }
  }

  // manages the app inputs when the screen is full (max is 15 integers excl an operator)
  const handleInputExceedsMaximum = (userInput: string) => {
    switch (userInput) {
      case "AC": resetCalculator()
        break

      case "=": solveEquation(userInput)
        break

      case "C": deletePrevInput()
        break

      case "√": onSquareRoot()
        break

      case "+/-": changeSign()
        break

      default: alert("No more space for more numbers")
    }
  }

  // this function will clear the second input and check if user has already
  // inputted operator for new equation
  const clearNumbers = (newOperator: string) => {

    if (newOperator === "") {
      setOperator(newOperator)
    }
    setSecondCalculatorInput([])
  }

  // clear calculator input arrays
  const resetCalculator = () => {

    setFirstCalculatorInput([])
    setOperator("")
    setSecondCalculatorInput([])
    setPrevInput("")
  }

  // This function checks 
  const deletePrevInput = () => {
    let arrayIntoString: string

    // Removes last inputted number from first input array
    if (isFirstCalculatorInput) {

      arrayIntoString = firstCalculatorInput.join("").slice(0, -1)

      let stringIntoArray: Array<string> = arrayIntoString.split("")

      setFirstCalculatorInput(stringIntoArray)

      // Removes last inputted number from second input array
    } else if (secondCalculatorInput.length > 0) {

      arrayIntoString = secondCalculatorInput.join("").slice(0, -1)

      let stringIntoArray: Array<string> = arrayIntoString.split("")

      setSecondCalculatorInput(stringIntoArray)

      // Catches exception where user wants to delete the operator
    } else {
      setOperator("")
    }
  }

  const onInputNumber = (userInput: string) => {

    // Overwrite number and return
    if(overwriteNumber && isFirstCalculatorInput && userInput !== "."){
      setFirstCalculatorInput([userInput])
      setFirstCalculatorInputHasAnswer(false)
      return

    } else if(overwriteNumber && userInput !== "."){
      setSecondCalculatorInput([userInput])
      return
    }

    if(isFirstCalculatorInput){
      setFirstCalculatorInput(firstCalculatorInput => [...firstCalculatorInput, userInput])
      return
    }
    setSecondCalculatorInput(secondCalculatorInput => [...secondCalculatorInput, userInput])
  }

  const onSquareRoot = () => {

    let originalNumber, answer = []
    let calculationFinished = false
    let roundedAnswer = ""

    // Check if no numbers have been put in first calculation
    if (firstCalculatorInput.length < 1) {

      setFirstCalculatorInput(['0'])

      calculationFinished = true
    }

    // Check if no numbers have been put in second calculation
    if (secondCalculatorInput.length < 1 && isFirstCalculatorInput) {

      setSecondCalculatorInput(['0'])

      calculationFinished = true
    }

    // Square number in first calculation if operator not yet set
    // And calculation isn't already finished - i.e set to 0
    if (isFirstCalculatorInput && !calculationFinished) {

      originalNumber = firstCalculatorInput

      // Change to number
      let firstNumber = parseInt(originalNumber.toString().replaceAll(',', ""))

      answer = squareNumber(originalNumber, firstNumber, originalNumber.length)!

      roundedAnswer = removeTrailingZeros(answer.toString().replaceAll(',', ""))

      setFirstCalculatorInput([roundedAnswer])

    } else if (!calculationFinished) {

      originalNumber = secondCalculatorInput

      let secondNumber = parseInt(originalNumber.toString().replaceAll(',', ""))

      answer = squareNumber(originalNumber, secondNumber, originalNumber.length)!

      roundedAnswer = removeTrailingZeros(answer.toString().replaceAll(',', ""))

      setSecondCalculatorInput([roundedAnswer])
    }

    // Check if undefined
    if (originalNumber === undefined) {

      originalNumber = 0
    }

    // check if changed to number
    let originalNumberIsArray = Array.isArray(originalNumber)

    // If an array set to number
    if (originalNumberIsArray) {

      originalNumber = originalNumber.toString().replaceAll(',', "")
    }
    // Assign prev calculation to show on calculator screen
    let prevInputString = " √ " + originalNumber

    setPrevInput(prevInputString)
  }

  // handle decimal input logic
  const onInputDecimal = (userInput: string) => {

    // add 0 to first array (as it's empty) 
    if (firstCalculatorInput.length < 1) {
      setFirstCalculatorInput(['0'])
    }

    // add 0 to second array (as it's empty)
    if (secondCalculatorInput.length < 1 && !isFirstCalculatorInput) {
      setSecondCalculatorInput(['0'])
    }

    // check if decimal already exists in current array
    if (isFirstCalculatorInput && firstCalculatorInput.includes(".")) {
      return

    } else if (!isFirstCalculatorInput && secondCalculatorInput.includes(".")) {
      return
    }
    onInputNumber(userInput)
  }

  // takes operator input (+, -, *, /)
  const onInputOperator = (userInput: string) => {

    // Check first number is inputted before operator
    if (firstCalculatorInput.length < 1) {
      alert('please enter a number first')
      return
    }

    // Check second number is inputted before solving equation
    if (secondCalculatorInput.length < 1 && !isFirstCalculatorInput) {
      alert('please enter a number first')
      return
    }

    // Equation is sufficent to solve
    if (secondCalculatorInput.length > 0 && !isFirstCalculatorInput) {
      solveEquation(userInput)
    }
    setOperator(userInput)
  }

  // handle changing number to negative/positive - sign logic
  const changeSign = () => {

    // Real numbers do not contain -0
    if(isFirstCalculatorInput){
      
      if(firstCalculatorInput[0] === "0")
        return;
      
      } else if(secondCalculatorInput[0] === "0"){
        return;
    }

    if (isFirstCalculatorInput) {

      var originalArray = firstCalculatorInput

      if (firstCalculatorInput[0] === "-") {

        // remove "-" from front of first array making it "positive"
        originalArray = originalArray.slice(1)

        setFirstCalculatorInput([...originalArray])

      } else {

        // add "-" to front of first array making it "negative"
        originalArray.unshift("-")

        setFirstCalculatorInput([...originalArray])
      }
    } else {

      var originalArray = secondCalculatorInput

      if (secondCalculatorInput[0] === "-") {

        // remove "-" from front of second array making it "positive"
        originalArray = originalArray.slice(1)

        setSecondCalculatorInput([...originalArray])
      } else {

        // add "-" to front of second array making it "negative"
        originalArray.unshift("-")

        setSecondCalculatorInput([...originalArray])
      }
    }
  }

  // this const catches userinput from button and triggers correct function accordingly
  const handleUserInput = (userInput: string) => {

    // Calculations don't need validation
    let calculationComplete = false

    // Add number to array
    if (numArray.includes(userInput)) {
      onInputNumber(userInput)
      calculationComplete = true
    }

    switch (userInput) {
      case "AC":
        resetCalculator()
        calculationComplete = true
        break

      case "C":
        deletePrevInput()
        calculationComplete = true
        break

      case "+/-":
        changeSign()
        calculationComplete = true
        break

      case ".":
        onInputDecimal(userInput)
        calculationComplete = true
        break
    }

  if(calculationComplete){
    return
  }

    // check current size of input
    if (firstCalculatorInput.length + secondCalculatorInput.length > 11) {
      handleInputExceedsMaximum(userInput)
      return
    }

    let endsWithPeriod = false

   if(firstCalculatorInput.length > 0){
    endsWithPeriod = checkLastItemIsDecimal(firstCalculatorInput)

   } else if(secondCalculatorInput.length > 1 && !isFirstCalculatorInput){
    endsWithPeriod = checkLastItemIsDecimal(secondCalculatorInput)
   }

    // Check last input on first number isn't a decimal
      if (endsWithPeriod) {
        alert('please enter a number first')
        return
      }

    // Calculations first need validation
    if (operatorArray.includes(userInput)) {
      onInputOperator(userInput)

    // No additional operator selected, so equation is solved and operator is set to ""
    } else if (userInput === "=") {
      solveEquation("")

    } else if (userInput === "√") {
      onSquareRoot()
    }
  }

  // Get last item in current number array to check if decimal
  function checkLastItemIsDecimal(array: string[]) {
    let lastItem = array[array.length - 1]
    return lastItem.endsWith(".")
  }

  return (
    // Calculator Screen
    <div className={styles.calculator}>
      <div className={styles.calculatorScreen}>
        <div className={styles.miniScreen}>
          <span>{prevInput}</span>
        </div>
        <div className={styles.mainScreen}>
          <span>{firstCalculatorInput}{operator}{secondCalculatorInput}</span>
        </div>
      </div>

      {/* Calculator Keypad */}
      <div id="calculatorKeypad" className={styles.calculatorKeypad}>
        {symbolsArray.map((symbol, index) => {
          return (
            <button onClick={() => handleUserInput(symbol)} key={index} className={styles.calcBtn}>{symbol}</button>
          )
        })
        }
      </div>
    </div>
  )
}
