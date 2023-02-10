import styles from '../styles/Home.module.css'
import { useState } from 'react'
import symbolsArray from './symbolsArray'

const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const operatorArray = ["+", "-", "×", "÷"]

export default function Calculator() {
  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string[]>([])
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string[]>([])
  const [prevInput, setPrevInput] = useState<string>("")
  const [operator, setOperator] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [err, setErr] = useState<string>("")
  const [showAnswer, setShowAnswer] = useState<boolean>(false)


  // this function stores the last equation 
  const updatePrevArray = () => {
    var prev_equation_string = ""

    // Store the first input if there are no previous inputs
    var prev_equation = [firstCalculatorInput.join(''), "  ", operator, "  ", (secondCalculatorInput.join('')), "  ", "  =  "]
    prev_equation_string = prev_equation.toString().replaceAll(',', '')
    setPrevInput(prev_equation_string)
  }

  // posts equation to api backend to be solved
  const solveEquation = async (newOperator: string) => { 
    if (secondCalculatorInput.length !== 0) {

      setIsLoading(true)
      try {
        const response = await fetch('/api/calculatorData', {
          method: 'POST',
          body: JSON.stringify({
            firstNumber: firstCalculatorInput,
            operator: operator,
            secondNumber: secondCalculatorInput
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        }

        const result = await response.json()
        setShowAnswer(true)
        setFirstCalculatorInput([result.answer])
        // send answer to be added to equation
        updatePrevArray()
      } catch (err: any) {
        setErr(err.message)
        console.log(err)
      } finally {
        setIsLoading(false)
      }
      clearNumbers(newOperator)
    }
  }

  // manages the app inputs when the screen is full (max is 15 integers excl an operator)
  const handleInputExceedsMaximum = (userInput: string) => {
    if (userInput === "AC") {
      resetCalculator()
    } else if (userInput === "=") {
      solveEquation("")
    } else if (userInput === "C") {
      deletePrevInput()
    } else if (userInput === "√"){
      onSquareRoot()
    } else if (userInput === "+/-"){
      changeSign()
    } else {

      // will trigger alert if user tries to add more numbers
      alert("More integers cannot be added to calculator")
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

    // error when negative number is square rooted
    let originalNumber, originalNumberNoNegative = 0
    let dividedNumberString = ""
    let dividedNumberArray: string[]

    if (operator === '') {
      if (firstCalculatorInput.length) {

        // Check if there is a negative number
        if (firstCalculatorInput.includes("-")){
          originalNumber = parseInt(firstCalculatorInput.toString().replaceAll(',', ''))
          originalNumberNoNegative = parseInt(firstCalculatorInput.toString().replaceAll(',', '').replace('-', ''))

          // Solves, rounds to 2d.p, adds negative sign back in and puts back into array
          dividedNumberString = (Math.sqrt(originalNumberNoNegative)).toFixed(2).toString()

          dividedNumberArray = dividedNumberString.split('')
          dividedNumberArray.unshift("-")
          setFirstCalculatorInput(dividedNumberArray)
        } else {
          originalNumber = parseInt(firstCalculatorInput.toString().replaceAll(',', ''))
          
          // Solves, rounds to 2d.p & puts back into array
          dividedNumberString = (Math.sqrt(originalNumber)).toFixed(2).toString()
          dividedNumberArray = dividedNumberString.split('')
          setFirstCalculatorInput(dividedNumberArray)
        }
      }
    } else {

         // Check if there is a negative number
        if (secondCalculatorInput.includes("-")){
          originalNumber = parseInt(secondCalculatorInput.toString().replaceAll(',', ''))
          originalNumberNoNegative = parseInt(secondCalculatorInput.toString().replaceAll(',', '').replace('-', ''))

          // Solves, rounds to 2d.p, adds negative sign back in and puts back into array
          dividedNumberString = (Math.sqrt(originalNumberNoNegative)).toFixed(2).toString()

          dividedNumberArray = dividedNumberString.split('')
          dividedNumberArray.unshift("-")
          setSecondCalculatorInput(dividedNumberArray)
        } else {
          originalNumber = parseInt(secondCalculatorInput.toString().replaceAll(',', ''))
          
          // Solves, rounds to 2d.p & puts back into array
          dividedNumberString = (Math.sqrt(originalNumber)).toFixed(2).toString()
          dividedNumberArray = dividedNumberString.split('')
          setSecondCalculatorInput(dividedNumberArray)
        }
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
    if (firstCalculatorInput.length + secondCalculatorInput.length < 14) {

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