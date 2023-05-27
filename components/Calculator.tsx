import styles from '../styles/Home.module.css'
import { useState } from 'react'
import symbolsArray from './symbolsArray'
import SolveEquation from './calculatorFunctions/equationSolver'
import SquareFirstCalculation from './calculatorFunctions/firstCalculationSquarer'
import SquareSecondCalculation from './calculatorFunctions/secondCalculationSquarer'


const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const operatorArray = ["+", "-", "×", "÷"]

export default function Calculator() {
  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string[]>([])
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string[]>([])
  const [prevInput, setPrevInput] = useState<string>("")
  const [operator, setOperator] = useState("")
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  // this function stores the last equation 
  const updatePrevArray = () => {
    let prev_equation_string = ""

    // Store the first input if there are no previous inputs
    let prev_equation = [firstCalculatorInput.join(''), "  ", operator, "  ", (secondCalculatorInput.join('')), "  ", "  =  "]
    prev_equation_string = prev_equation.toString().replaceAll(',', '')
    setPrevInput(prev_equation_string)
  }

  const solveEquation = async (newOperator: string) => {
    if (secondCalculatorInput.length !== 0) {
        // this equation takes inputs from react from end and solves the equation

    // join array of strings into String, then change strings into numbers
      let firstInputAsFloat = parseFloat(firstCalculatorInput.join(''))
      let secondInputAsFloat = parseFloat(secondCalculatorInput.join(''))
      let answer = SolveEquation(firstInputAsFloat, operator, secondInputAsFloat)!;      
      
    // check decimal needed (not .00) - answer from multiplying large numbers causes displayed text to overflow div
      if (answer.split('.')[1] === "00000"){
        answer = answer.split('.')[0]
      }
      let splitAnswer = answer.split("")
      setShowAnswer(true)
      setFirstCalculatorInput(splitAnswer)
      // send answer to be added to equation
      updatePrevArray()
      clearNumbers(newOperator)
    }
  }

  // manages the app inputs when the screen is full (max is 15 integers excl an operator)
  const handleInputExceedsMaximum = (userInput: string) => {
    switch (userInput){
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
    setOperator('')
    setSecondCalculatorInput([])
    setPrevInput("")
    setShowAnswer(false)
  }

  // This function checks 
  const deletePrevInput = () => {
    let arrayIntoString: string

    // Removes last inputted number from first input array
    if (operator === "") {
      arrayIntoString = firstCalculatorInput.join('').slice(0, -1)
      let stringIntoArray: Array<string> = arrayIntoString.split('')
      setFirstCalculatorInput(stringIntoArray)

      // Removes last inputted number from second input array
    } else if (secondCalculatorInput.length > 0) {
      arrayIntoString = secondCalculatorInput.join('').slice(0, -1)
      let stringIntoArray: Array<string> = arrayIntoString.split('')
      setSecondCalculatorInput(stringIntoArray)

      // Catches exception where user wants to delete the operator
    } else {
      setOperator("")
    }
  }

  // this function checks if the first or second number is currently 
  // being inputted, then adds to array accordingly
  const onInputNumber = (userInput: string) => {
    if (operator === "") {

      // ignores 0 inputs on first input && check if answer is inside first input array
      if ((userInput !== "0") && (showAnswer)) {

        // if answer is inside, overwrite and set array to false (answer has been written over)
        setFirstCalculatorInput([userInput])
        setPrevInput("")
        setShowAnswer(false)

        // add input to first input array
      } else {
        setFirstCalculatorInput(firstCalculatorInput => [...firstCalculatorInput, userInput])
      }

      // Add to second array, as first array and operator have already been inputted
    } else {

      if (secondCalculatorInput.length === 0) {
        setSecondCalculatorInput([userInput])
      } else {
        setSecondCalculatorInput(secondCalculatorInput => [...secondCalculatorInput, userInput])
      }
    }
  }

  const onSquareRoot = () => {
    let originalNumber, newOutput = []
    if (operator === '') {
      originalNumber = parseInt(firstCalculatorInput.toString().replaceAll(',', ''))
      // ! used here to tell ts the output won't be null
      newOutput = SquareFirstCalculation(firstCalculatorInput, originalNumber, firstCalculatorInput.length)!
       setFirstCalculatorInput(newOutput)
    } else {
      originalNumber = parseInt(secondCalculatorInput.toString().replaceAll(',', ''))
      newOutput = SquareSecondCalculation(secondCalculatorInput, originalNumber)
      setSecondCalculatorInput(newOutput)
    }
    // Assign prev calculation to show on calculator screen
    let prevInputString = " √ " + originalNumber
    setPrevInput(prevInputString)
  }

  // handle number input logic - this function checks if the first or second number is currently
  // being inputted, then checks if array is empty
  const onInputDecimal = (userInput: string) => {
    if (operator === '') {
      if (!firstCalculatorInput.length) {

        // add 0. to first array (as it's empty)
        setFirstCalculatorInput(['0.'])

      } else if (!firstCalculatorInput.includes(".")) {

        // add decimal like normal to first array
        onInputNumber(userInput)
      }

    } else {
      if (!secondCalculatorInput.length) {

        // add 0. to second array (as it's empty)
        setSecondCalculatorInput(['0.'])

      } else if (!secondCalculatorInput.includes(".")) {

        // add decimal like normal to second array
        onInputNumber(userInput)
      }
    }
  }

  // takes operator input
  const onInputOperator = (userInput: string) => {
    if (operator === '') {

      // checks if a number has been inputted into equation
      // before adding an operator
      if (firstCalculatorInput.length === 0) {
        alert('please enter a number first')
      } else {
        setOperator(userInput)
      }
    } else {

      // Submits for solving and saves second operator for new calculation
      setOperator(userInput)
      solveEquation(userInput)
    }
  }

  // handle sign change logic - checks if currently first or second array, then checks
  // the sign at the front of the array (if the number is positive or negative) - the values
  //  are taken from the hook and then added back in as useState hooks are immutable
  const changeSign = () => {
    if (operator === '') {
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

    // checks that the equation isn't too big (max length excluding operator is 15)
    if (firstCalculatorInput.length + secondCalculatorInput.length < 11) {

      if (numArray.includes(userInput)) {
        onInputNumber(userInput)
      } else if (operatorArray.includes(userInput)) {
        onInputOperator(userInput)
      } else if (userInput === "AC") {
        resetCalculator()
      } else if (userInput === "+/-") {
        changeSign()
      } else if (userInput === "C") {
        deletePrevInput()
      } else if (userInput === ".") {
        onInputDecimal(".")
      } else if (userInput === "=") {

        // No additional operator has been selected, so will send an empty
        // string to replace the existing operator
        solveEquation("")
      } else if (userInput === "√") {
        onSquareRoot()
      }
    } else {
      handleInputExceedsMaximum(userInput)
    }
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
