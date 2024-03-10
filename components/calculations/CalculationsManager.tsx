import { solveTrigCalculation, manageTrigInput, removeTrigCalculation, 
    checkContainsTrigSymbol } from "./trigonometryCalculations"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { numArray, operatorArray, trigSymbolsArray, exponentArray } from "../utility/symbolsArray"
import { getAnswer } from "./equationSolver"
import { squareNumber } from "./numberSquarer"
import { removeTrailingZeros } from "../utility/removeTrailingZeros"
import { errorMessage, notifyMessage } from "../utility/toastMessages"
import {solvePiEquation } from "./solvePiEquation"
import { removeLastInputFromString } from "../utility/removeLastInputFromString"
import { solveInequalityCalculation } from "../calculations/solveInequalityCalculation"
import { changeSignArray } from "../utility/changeSignArray"
import { solveFactorial } from "../calculations/factorialCalculation"
import { updatePrevArray } from "../utility/updatePrevArray"
import { setPreviousCalculations } from "../utility/localStorageManager"
import { solveExponentialCalculation} from "./exponentCalculation"
import { calculationsManagerProps } from "../utility/interfacePropsManager"

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
    setPrevOperationsArray,
    setEqualityMessage
}: calculationsManagerProps) => {


    const maximumNumberOfIntegers = 15
    const [isFirstCalculatorInput, setIsFirstCalculatorInput] = useState<boolean>(true)
    const [firstCalculatorInputHasAnswer, setFirstCalculatorInputHasAnswer] = useState<boolean>(false)
    const [firstCalculationTrigSymbol, setFirstCalculationTrigSymbol] = useState<string>("")
    const [secondCalculationTrigSymbol, setSecondCalculationTrigSymbol] = useState<string>("")
    const [doesFirstCalculationContainTrig, setDoesFirstCalculationContainTrig] = useState<boolean>(false)
    const [doesSecondCalculationContainTrig, setDoesSecondCalculationContainTrig] = useState<boolean>(false)
    const [currentCalculationContainTrigInput, setCurrentCalculationContainTrigInput] = useState(false)
    const [isOperatorInequalityCheck, setIsOperatorInequalityCheck] = useState<boolean>(false)
    const [inputNumberInsideBrackets, setInputNumberInsideBrackets] = useState<boolean>(false)
    const [currentInput, setCurrentInput] = useState<string>(firstCalculatorInput)
    const [isExpontialCalculation, setIsExpontialCalculation] = useState<boolean>(false)
    const [isCurrentTrigCalculationValid, setIsCurrentTrigCalculationValid] = useState<boolean>(true)

    // if operator is empty or contains first answer, then still on first equation
    useEffect(() => {
        let isFirstEquation = operator.trim() === ""
        setIsFirstCalculatorInput(isFirstEquation)
    }, [operator, firstCalculatorInput])


    // Track if first or second equations
    useEffect(() => {
        isFirstCalculatorInput ? setCurrentInput(firstCalculatorInput) : setCurrentInput(secondCalculatorInput)
    }, [firstCalculatorInput, secondCalculatorInput, isLastCalculationAnOperator])


    useEffect(() => {
        let inputNumberInsideBrackets = doesFirstCalculationContainTrig && isFirstCalculatorInput
        || doesSecondCalculationContainTrig && !isFirstCalculatorInput
        setInputNumberInsideBrackets(inputNumberInsideBrackets)
    })


    useEffect(() => {
        const currentCalculationContainTrig = doesFirstCalculationContainTrig && isFirstCalculatorInput
            || doesSecondCalculationContainTrig && !isFirstCalculatorInput
        setCurrentCalculationContainTrigInput(currentCalculationContainTrig)
    }, [firstCalculatorInput, secondCalculatorInput])


    useEffect(() => {
        let overwriteNumber = firstCalculatorInputHasAnswer 
        || firstCalculatorInput[0] === "0" && firstCalculatorInput.length < 2
        || firstCalculatorInput[0] === "-" && firstCalculatorInput[1] === "0"
        setOverwriteNumber(overwriteNumber)
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


    // Check if first input contains trig symbol
    useEffect(() => {
        if(firstCalculatorInput.length > 0){
            let containsTrigSymbol = checkContainsTrigSymbol(firstCalculatorInput)
            setDoesFirstCalculationContainTrig(containsTrigSymbol)
            return
        }
        setDoesFirstCalculationContainTrig(false)
    },[firstCalculatorInput])


    useEffect(() => {
        if(secondCalculatorInput.length > 0){
            let containsTrigSymbol = checkContainsTrigSymbol(secondCalculatorInput)
            setDoesSecondCalculationContainTrig(containsTrigSymbol)
            return
        }
        setDoesSecondCalculationContainTrig(false)
    },[secondCalculatorInput])


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

    const calculationCanAddExponent = (): boolean => {
        return currentInput.length > 0 && !isDecimalUnfinished 
        && !isLastCalculationAnOperator || firstCalculatorInputHasAnswer
        
    }

    const clearTrigInputs = () => {
        let currentTrigBooleanInput = getCurrentTrigBooleanInput()
        currentTrigBooleanInput(false)

        let curentTrigSetInput = getCurrentTrigSetInput()
        curentTrigSetInput("")
    }

    const updatePreviousCalculationArray = (prevInput: string, answer: string)=> {
        setPrevInput(prevInput)
        let answerString = `${prevInput} = ${answer}`
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
            let equalityMessage = solveInequalityCalculation(firstInput, secondInput) ? "Not Equal" : "Equal"
            setEqualityMessage(equalityMessage)
            firstCalcInput = firstCalculatorInput

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

        if(isOperatorInequalityCheck){
            setIsOperatorInequalityCheck(false)
            setFirstCalculatorInput("")
        } else {
            setFirstCalculatorInput(firstCalcInput)
            setFirstCalculatorInputHasAnswer(true)
            setIsFirstCalculatorInput(true)
        }
        let prevEquationString = updatePrevArray(firstCalcInput, secondInput, operator)
        updatePreviousCalculationArray(prevEquationString, firstCalcInput)
        clearNumbers(newOperator)
    }

    const exponentialManager = (userInput: string) => {
        let currentSetInput = getCurrentSetInput()

        // Current input is blank - then return 0
        let isCurrentInputBlank = currentInput.length < 1
        if(isCurrentInputBlank){
            return
        }

        // get matched exponent and positon of where matched in array
        const matchedExponent = exponentArray.find(item => item === userInput)
        if(!matchedExponent){
            return
        }

        if(matchedExponent === "xy"){
            onInputNumber("x")
            setIsExpontialCalculation(true)
            return
        }

        let updatedCurrentInput = currentInput

        // solve trig equation before solving exponent
        if(currentCalculationContainTrigInput && isCurrentTrigCalculationValid ){
            updatedCurrentInput = solveTrigCalculation(currentInput)
            currentSetInput(updatedCurrentInput)
        }

        // solve for current input and set answer as new input
        let newCurrentInput = solveExponentialCalculation(updatedCurrentInput, matchedExponent)
        currentSetInput(newCurrentInput)
    }

    const solveFactorialEquation = () => {
        let currentSetInput = getCurrentSetInput()
        let updatedCurrentInput = currentInput

        if(!calculationCanAddExponent()){
            return
        }

        if(currentCalculationContainTrigInput && isCurrentTrigCalculationValid ){
            updatedCurrentInput = solveTrigCalculation(currentInput)
            currentSetInput(updatedCurrentInput)
        }

        if(isFirstCalculatorInput){
            let firstInput = updatedCurrentInput + "!"
            let solvedFactorial = solveFactorial(firstInput)

            updatePreviousCalculationArray(firstInput, solvedFactorial)
            setFirstCalculatorInput(solvedFactorial)
            setFirstCalculatorInputHasAnswer(true)
            return
        }
        let secondInput = updatedCurrentInput + "!"
        secondInput = solveFactorial(secondInput)
        solveEquation("", secondInput)
    }

    const solveEquationContainingPi = () => {

        if(currentCalculationContainTrigInput){
            onInputNumber("𝝅")
            return
        }

        if(isFirstCalculatorInput){
            let firstInput = firstCalculatorInput + "𝝅"
            let answer = solvePiEquation(firstInput)

            updatePreviousCalculationArray(firstInput, answer)
            setFirstCalculatorInput(answer)
            setFirstCalculatorInputHasAnswer(true)

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

    const resetCalculator = () => {
        setFirstCalculatorInput("")
        setOperator("")
        setSecondCalculatorInput("")
        setPrevInput("")
        clearTrigInputs()
        setIsOperatorInequalityCheck(false)
        setEqualityMessage("")
    }

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

        let isCurrentcharacterTrigCalc = currentInput[currentInput.length -  1] === ")"
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
        if(inputNumberInsideBrackets){
            let newInput = manageTrigInput(userInput, currentInput)
            currentSetInput(newInput)
            setIsCurrentTrigCalculationValid(true)
            return
        }

        // Overwrite is decimal added to answer
        if (overwriteNumber && userInput === ".") {
            setFirstCalculatorInput("0")
            setFirstCalculatorInputHasAnswer(false)

        } else if(overwriteNumber && userInput !== "."){
            setFirstCalculatorInput(userInput)
            setFirstCalculatorInputHasAnswer(false)
            return
        }
        currentSetInput(currentInput => currentInput + userInput)
    }

    const onSquareRoot = () => {

        let input = currentInput
        let currentSetInput = getCurrentSetInput()

        if (currentInput.length < 1) {
            currentSetInput("0")
            updatePreviousCalculationArray(`√ ${0}`, "0")
            return
        }

        const answer = squareNumber(input)
        const roundedAnswer = removeTrailingZeros(answer)

        currentSetInput(roundedAnswer)
        updatePreviousCalculationArray(`√ ${input}`, roundedAnswer)
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
                resetCalculator()
                calculationComplete = true
                break

            case "C":
                deletePrevInput()
                calculationComplete = true
                break

            case ".":
                setIsDecimalUnfinished(true)
                onInputDecimal(userInput)

                calculationComplete = true
                break

            case "+/-":
                if (!isLastCalculationAnOperator) {
                    changeSign()
                }
                calculationComplete = true
                break

            case "!":
                if (!isExpontialCalculation){
                    solveFactorialEquation()
                }
                calculationComplete = true
                break
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
        if (numArray.includes(userInput)) {

            onInputNumber(userInput)

            // after number is inputted, decimal is finished
            if (isDecimalUnfinished) {
                setIsDecimalUnfinished(false)
            }
            return
        }

        if (userInput === "𝝅") {
            solveEquationContainingPi()
            return
        }

        if(currentCalculationContainTrigInput && !isCurrentTrigCalculationValid){
            errorMessage("Please complete trig calculation")
            return
        }

        if (exponentArray.includes(userInput)) {
            if(currentInput.length < 2 && currentInput[0] === "-"){
                return
            }
            exponentialManager(userInput)
        }

        // Check last input on first number isn't a decimal
        if (isDecimalUnfinished) {
            errorMessage("please enter a number first")
            return
        }

        // Add trig symbol to current input
        if(trigSymbolsArray.includes(userInput) && !currentCalculationContainTrigInput){
            isFirstCalculatorInput ? setDoesFirstCalculationContainTrig(true) : setDoesSecondCalculationContainTrig(true)
            onInputNumber(userInput + "()")
            setIsCurrentTrigCalculationValid(false)
            return
        }

        // Solve first input before adding operator
        if (operatorArray.includes(userInput) && !isLastCalculationAnOperator) {

            let updatedInput = null

            const hasNegative = currentInput[0] === "-"
            if(hasNegative){
                updatedInput = currentInput.replace("-", "")
            }

            if(currentCalculationContainTrigInput && isCurrentTrigCalculationValid){
                updatedInput = solveTrigCalculation(currentInput)
                setFirstCalculatorInput(updatedInput)
            }

            if(isExpontialCalculation){
                updatedInput = solveExponentialCalculation(currentInput, null)
                setFirstCalculatorInput(updatedInput)
            }

            if(userInput === "≠"){
                setIsOperatorInequalityCheck(true)
            }

            if (hasNegative) {
                updatedInput = "-" + updatedInput
              }

            onOperatorInput(userInput)

        } else if (userInput === "=") {

            let updatedInput = secondCalculatorInput
            const hasNegative = currentInput[0] === "-"
            if(hasNegative){
                updatedInput = currentInput.replace("-", "")
            }

            if(currentCalculationContainTrigInput && isCurrentTrigCalculationValid){
                updatedInput = solveTrigCalculation(currentInput)
            }

            if(isExpontialCalculation){
                updatedInput = solveExponentialCalculation(currentInput, null)
            }

            if (hasNegative) {
                userInput = "-" + userInput
              }

            solveEquation("", updatedInput)

        } else if (userInput === "√" && !isLastCalculationAnOperator) {
            onSquareRoot()
        }
        return
    }
    return (
        handleUserInput
    )
}