import { solveTrigCalculation, manageTrigInput, removeTrigCalculation } from "./trigonometryCalculations"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { numArray, operatorArray, trigSymbolsArray, exponentArray } from "../utility/symbolsArray"
import { getAnswer } from "./equationSolver"
import { squareNumber } from "./numberSquarer"
import { removeTrailingZeros } from "../utility/roundEquation"
import { errorMessage, notifyMessage } from "../utility/toastMessages"
import {solvePiEquation } from "./solvePiEquation"
import { removeLastInputFromString } from "../utility/removeLastInputFromString"
import { solveInequalityCalculation } from "../calculations/solveInequalityCalculation"
import { changeSignArray } from "../utility/changeSignArray"
import { solveFactorial } from "../calculations/factorialCalculation"
import { updatePrevArray } from "../utility/updatePrevArray"
import { setPreviousCalculations } from "../utility/localStorageManager"
import { solveExponentialCalculation} from "./exponentCalculation"

interface calculationsManagerProps {
  firstCalculatorInput: string
  setFirstCalculatorInput: Dispatch<SetStateAction<string>>
  secondCalculatorInput: string
  setSecondCalculatorInput: Dispatch<SetStateAction<string>>
    setPrevInput: (value: string) => void
    operator: string
    setOperator: (value: string) => void
    isLastCalculationAnOperator: boolean
    isDecimalUnfinished: boolean
    doesCalculationExceedInput: boolean
    currentNumberOfInputs: number
    overwriteNumber: boolean
    setOverwriteNumber: (value: boolean) => void
    setIsLastCalculationAnOperator: (value: boolean) => void
    setCurrentNumberOfInputs: (value: number) => void
    setDoesCalculationExceedInput: (value: boolean) => void,
    setIsDecimalUnfinished: (value: boolean) => void,
    prevOperationsArray: string[],
    setPrevOperationsArray: Dispatch<SetStateAction<string[]>>
}

export const CalculationsManager = ({
    firstCalculatorInput,
    setFirstCalculatorInput,
    secondCalculatorInput,
    setSecondCalculatorInput,
    setPrevInput,
    operator,
    setOperator,
    isLastCalculationAnOperator,
    isDecimalUnfinished,
    doesCalculationExceedInput,
    currentNumberOfInputs,
    setOverwriteNumber,
    overwriteNumber,
    setIsLastCalculationAnOperator,
    setCurrentNumberOfInputs,
    setDoesCalculationExceedInput,
    setIsDecimalUnfinished,
    prevOperationsArray,
    setPrevOperationsArray
}: calculationsManagerProps) => {


    const maximumNumberOfIntegers = 15
    const [isFirstCalculatorInput, setIsFirstCalculatorInput] = useState<boolean>(true)
    const [firstCalculatorInputHasAnswer, setFirstCalculatorInputHasAnswer] = useState<boolean>(false)
    const [firstCalculationTrigSymbol, setFirstCalculationTrigSymbol] = useState<string>("")
    const [secondCalculationTrigSymbol, setSecondCalculationTrigSymbol] = useState<string>("")
    const [doesFirstCalculationContainTrig, setDoesFirstCalculationContainTrig] = useState<boolean>(false)
    const [doesSecondCalculationContainTrig, setDoesSecondCalculationContainTrig] = useState<boolean>(false)
    const [doesCurrentCalculationContainTrig, setDoesCurrentCalculationContainTrig] = useState(false)
    const [isOperatorInequalityCheck, setIsOperatorInequalityCheck] = useState<boolean>(false)
    const [currentInput, setCurrentInput] = useState<string>(firstCalculatorInput)
    const [isExpontialCalculation, setIsExpontialCalculation] = useState<boolean>(false)

    // if operator is empty, then still on first equation
    useEffect(() => {
        let isFirstEquation = operator.trim() === ""
        setIsFirstCalculatorInput(isFirstEquation)
    }, [operator])


    // Track if first or second equation
    useEffect(() => {
        if(isLastCalculationAnOperator){
            setCurrentInput(firstCalculatorInput)
            return
        }
        isFirstCalculatorInput ? setCurrentInput(firstCalculatorInput) : setCurrentInput(secondCalculatorInput)
    }, [firstCalculatorInput, secondCalculatorInput, isLastCalculationAnOperator])


    useEffect(() => {
        const currentCalculationContainTrig = doesFirstCalculationContainTrig && isFirstCalculatorInput
            || doesSecondCalculationContainTrig && !isFirstCalculatorInput
        setDoesCurrentCalculationContainTrig(currentCalculationContainTrig)
    }, [firstCalculatorInput, secondCalculatorInput])


    useEffect(() => {
        if (firstCalculatorInputHasAnswer) {
            setOverwriteNumber(true)
            return
        }
        setOverwriteNumber(false)
    }, [firstCalculatorInputHasAnswer, firstCalculatorInput, secondCalculatorInput])


    // this function checks if the last input was an operator
    useEffect(() => {
        let lastCalculatorIsOperator = operator !== "" && secondCalculatorInput.length < 1
        || firstCalculatorInput[0] === "-" && firstCalculatorInput.length < 2
        setIsLastCalculationAnOperator(lastCalculatorIsOperator)
    }, [firstCalculatorInput, operator, secondCalculatorInput])


    // Check if current number of inputs exceeds maximum input
    useEffect(() => {
        setCurrentNumberOfInputs(firstCalculatorInput.length + secondCalculatorInput.length + operator.length)
        if (currentNumberOfInputs > maximumNumberOfIntegers) {
            setDoesCalculationExceedInput(true)
            return
        }
        setDoesCalculationExceedInput(false)
    }, [firstCalculatorInput, secondCalculatorInput, operator])


    const getCurrentTrigSymbol = (): string => {
        return isFirstCalculatorInput ? firstCalculationTrigSymbol : secondCalculationTrigSymbol
    }

    const getCurrentSetInput = (): Dispatch<SetStateAction<string>> => {
        return isFirstCalculatorInput ? setFirstCalculatorInput : setSecondCalculatorInput
    }

    const getCurrentTrigBooleanInput = (): Dispatch<SetStateAction<boolean>> => {
        return isFirstCalculatorInput ? setDoesFirstCalculationContainTrig : setDoesSecondCalculationContainTrig
    }

    const getCurrentTrigSetInput = (): Dispatch<SetStateAction<string>> => {
        return isFirstCalculatorInput ? setFirstCalculationTrigSymbol : setSecondCalculationTrigSymbol
    }

    const calculationCanAddSymbol = (): boolean => {
        return currentInput.length > 0
        && !isDecimalUnfinished && !isLastCalculationAnOperator
    }

    const clearTrigInputs = () => {
        let currentTrigBooleanInput = getCurrentTrigBooleanInput()
        currentTrigBooleanInput(false)

        let curentTrigSetInput = getCurrentTrigSetInput()
        curentTrigSetInput("")
    }

    const setPrevStringAndArray = (prevInput: string, answer: string)=> {
        setPrevInput(prevInput)
        let answerString = `${prevInput} ${answer}`
        prevOperationsArray.push(answerString)
        setPrevOperationsArray(prevOperationsArray)
        setPreviousCalculations(answerString)
    }

    const solveEquation = async (newOperator: string, secondInput: string) => {

        // Check if equation is valid
        if (secondCalculatorInput.length === 0) {
            return
        }

        let firstInput = firstCalculatorInput

        // Solve inequality calculation
        let firstCalcInput
        if(isOperatorInequalityCheck){
            firstCalcInput = solveInequalityCalculation(firstInput, secondInput) ? "Not Equal" : "Equal"
        
        // solve non inequality calculation
        } else {

       // join array of strings into String, then change strings into numbers
        let firstInputAsFloat , secondInputAsFloat

        try{
            firstInputAsFloat = parseFloat(firstInput)
            secondInputAsFloat = parseFloat(secondInput)

            let answer = getAnswer(firstInputAsFloat, operator, secondInputAsFloat)
            firstCalcInput = removeTrailingZeros(answer)

            } catch {
                errorMessage("Equations could not be joined")
                return
            }
        }
        completeCalculations(firstCalcInput, newOperator, secondInput)
    }

    const completeCalculations = (firstCalcInput: string, newOperator: string, secondInput: string) => {

        setFirstCalculatorInput(firstCalcInput)
        setFirstCalculatorInputHasAnswer(true)

        let prevEquationString = updatePrevArray(firstCalculatorInput, secondInput, operator)
        setPrevStringAndArray(prevEquationString, firstCalcInput)
        clearNumbers(newOperator)
    }

    const exponentialManager = (userInput: string) => {
        let currentSetInput = getCurrentSetInput()

        // Current input is blank - then return 0
        let isCurrentInputBlank = currentInput.length < 1
        if(isCurrentInputBlank){
            currentSetInput("0")
            return
        }

        // get matched exponent and positon of where matched in array
        const matchedExponent = exponentArray.find(item => item === userInput)
        if(matchedExponent === undefined){
            return
        }   

        if(matchedExponent === "xy"){
            onInputNumber("x")
            setIsExpontialCalculation(true)
            return
        }

        // solve for current input and set answer as new input
        let newCurrentInput = solveExponentialCalculation(currentInput, matchedExponent)
        currentSetInput(newCurrentInput)
    }

    const solveFactorialEquation = () => {

        if(!calculationCanAddSymbol()){
            return
        }

        if(isFirstCalculatorInput){
            let firstInput = firstCalculatorInput + "!"
            let solvedFactorial = solveFactorial(firstInput)

            setPrevStringAndArray(firstInput, solvedFactorial)
            setFirstCalculatorInput(solvedFactorial)
            return
        }
        let secondInput = secondCalculatorInput + "!"
        secondInput = solveFactorial(secondInput)
        solveEquation("", secondInput)
    }

    const solveEquationContainingPi = () => {

        if(!calculationCanAddSymbol()){
            return
        }

        if(isFirstCalculatorInput){
            let firstInput = firstCalculatorInput + "𝝅"
            let answer = solvePiEquation(firstInput)

            setPrevStringAndArray(firstInput, answer)
            setFirstCalculatorInput(answer)

            return
        }
        let secondInput = secondCalculatorInput + "𝝅"
        secondInput = solvePiEquation(secondInput)
        solveEquation("", secondInput)
    }

    // manages the app inputs when the screen is full (max is 15 integers excl an operator)
    const handleInputExceedsMaximum = (userInput: string) => {
        switch (userInput) {
            case "AC": resetCalculator()
                break

            case "=": solveEquation(userInput, secondCalculatorInput)
                break

            case "C": deletePrevInput()
                break

            case "√": onSquareRoot()
                break

            default: notifyMessage("Cannot add anymore numbers")
        }
    }

    // this function will clear the second input and check if user has already
    // inputted operator for new equation
    const clearNumbers = (newOperator: string) => {

        if (newOperator !== "") {
            setOperator(newOperator)
        } else {
            setOperator("")
        }

        setSecondCalculatorInput("")
    }

    // clear calculator input arrays
    const resetCalculator = () => {

        setFirstCalculatorInput("")
        setOperator("")
        setSecondCalculatorInput("")
        setPrevInput("")
    }

    // This function checks
    const deletePrevInput = () => {

        if(currentInput.length < 2){
            resetCalculator()
        }

        // Clear operator
        if(isLastCalculationAnOperator){
            setOperator("")
            return
        }

        let currentSetInput = getCurrentSetInput()

        let isCurrentcharacterTrigCalc = currentInput[currentInput.length -  2] === ")"
        if(isCurrentcharacterTrigCalc){

            let inputWithoutTrigCalc = removeTrigCalculation(currentInput, getCurrentTrigSymbol())
            currentSetInput(inputWithoutTrigCalc)

            clearTrigInputs()
            return
        }

        // Remove from string and set input
        let stringIntoArray = removeLastInputFromString(currentInput)
        currentSetInput(stringIntoArray)
    }

    const onInputNumber = (userInput: string) => {
        let currentSetInput = getCurrentSetInput()

        // put number inside first trig brackets
        if(doesFirstCalculationContainTrig && isFirstCalculatorInput){
            let newInput = manageTrigInput(userInput, currentInput)
            currentSetInput(newInput)
            return

        // put number inside second trig brackets
        } else if(doesSecondCalculationContainTrig && !isFirstCalculatorInput){
            let newInput = manageTrigInput(userInput, currentInput)
            currentSetInput(newInput)
            return
        }

        // Overwrite is decimal added to answer
        if (overwriteNumber && userInput === ".") {
            setFirstCalculatorInput("0")
            setFirstCalculatorInputHasAnswer(false)
        }

        // Overwrite number and return
        if (overwriteNumber && userInput !== ".") {
            setFirstCalculatorInput(userInput)
            setFirstCalculatorInputHasAnswer(false)
            return
        }

        currentSetInput(currentInput => currentInput + userInput)
    }

    const onSquareRoot = () => {

        let isNegative = false

        let input = currentInput
        let currentSetInput = getCurrentSetInput()

        if (!input.length || (operator !== "" && !secondCalculatorInput.length)) {
            currentSetInput("0")
            setPrevStringAndArray(`√ ${0}`, "0")
            return
        }

        // Remove negative sign from input
        if (input[0] === "-") {
            isNegative = true
            input.split("").shift()
        }

        const originalNumberAsInt = parseFloat(input.toString())
        const answer = squareNumber(input, originalNumberAsInt, input.length)
        const roundedAnswer = removeTrailingZeros(answer.toString())

        let roundedAnswerAsArray = roundedAnswer.split("")

        // Add negative sign back to input
        if (isNegative) {
            roundedAnswerAsArray.unshift("-")
        }

        let joinedRoundedAnswer = roundedAnswerAsArray.join("")
        currentSetInput(joinedRoundedAnswer)
        setPrevStringAndArray(`√ ${originalNumberAsInt}`, joinedRoundedAnswer)
    }


    // handle decimal input logic
    const onInputDecimal = (userInput: string) => {

        let currentSetInput = getCurrentSetInput()

        // Add 0 before decimal if no number is inputted
        if (currentInput.length < 1) {
            currentSetInput("0")
        }

        // Add 0 after negative sign if no number is inputted
        if (currentInput.length < 2 && currentInput[0] === "-") {
            currentSetInput("-" + "0")
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
    const onOperatorInput = (userInput: string) => {

        // Check first number is inputted before operator
        if (firstCalculatorInput.length < 1) {
            errorMessage("please enter a number first")
            return
        }

        // Check second number is inputted before solving equation
        if (secondCalculatorInput.length < 1 && !isFirstCalculatorInput) {
            errorMessage("please enter a number first")
            return
        }

        // Reset overwrite number
        setFirstCalculatorInputHasAnswer(false)

        // Equation is sufficent to solve
        if (secondCalculatorInput.length > 0 && !isFirstCalculatorInput) {
            solveEquation(userInput, secondCalculatorInput)
        }
        setOperator(userInput)
    }

    // handle changing number to negative/positive - sign logic
    const changeSign = () => {
        let updatedArray = changeSignArray(currentInput)
        let currentSetInput = getCurrentSetInput()
        currentSetInput(updatedArray)
    }

    // this const catches userinput from button and triggers correct function accordingly
    const handleUserInput = (userInput: string) => {

        // Calculations don"t need validation
        let calculationComplete = false

        switch (userInput) {
            case "AC":
                calculationComplete = true

                resetCalculator()
                break

            case "C":
                calculationComplete = true

                deletePrevInput()
                break

            case ".":
                calculationComplete = true
                setIsDecimalUnfinished(true)

                onInputDecimal(userInput)
                break

            case "+/-":
                calculationComplete = true

                if (isLastCalculationAnOperator) {
                    break
                }
                changeSign()

            case "!":
                calculationComplete = true

                if (isLastCalculationAnOperator) {
                    break
                }
            solveFactorialEquation()
        }

        if (calculationComplete) {
            return
        }

        // check current size of input
        if (doesCalculationExceedInput) {
            handleInputExceedsMaximum(userInput)
            return
        }
        
        // Add number to calculation
        if (numArray.includes(userInput) || userInput === "!") {

            onInputNumber(userInput)

            // after number is inputted, decimal is finished
            if (isDecimalUnfinished) {
                setIsDecimalUnfinished(false)
            }
            return
        }

        if (exponentArray.includes(userInput)) {
            exponentialManager(userInput)
        }

        // Check last input on first number isn"t a decimal
        if (isDecimalUnfinished) {
            errorMessage("please enter a number first")
            return
        }

        // Add trig symbol to current input
        if(trigSymbolsArray.includes(userInput) && !doesCurrentCalculationContainTrig){
            isFirstCalculatorInput ? setDoesFirstCalculationContainTrig(true) : setDoesSecondCalculationContainTrig(true)
            onInputNumber(userInput + "()")
        }

        if (userInput === "𝝅") {
            solveEquationContainingPi()
            return
        }

        if (operatorArray.includes(userInput) && !isLastCalculationAnOperator) {
            if(isExpontialCalculation){
                let firstCalculatorInput = solveExponentialCalculation(currentInput, null)
                setFirstCalculatorInput(firstCalculatorInput)
            }
            onOperatorInput(userInput)

        } else if (userInput === "=") {
            // TO DO: solve first input automatically if contains exponent
            // and then user puts in second equation
            let currentSecondCalculatorInput = secondCalculatorInput
            if(isExpontialCalculation){
                currentSecondCalculatorInput = solveExponentialCalculation(currentInput, null)
            }
            solveEquation("", currentSecondCalculatorInput)

        } else if (userInput === "√" && !isLastCalculationAnOperator) {
            onSquareRoot()
        }
        return
    }
    return (
        handleUserInput
    )
}