import { solveTrigCalculation, manageTrigInput, removeTrigCalculation,  } from "./trigonometryCalculations"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { numArray, operatorArray, trigSymbolsArray } from "../utility/symbolsArray"
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
    setIsDecimalUnfinished: (value: boolean) => void
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
}: calculationsManagerProps) => {


    const maximumNumberOfIntegers = 15
    const [isFirstCalculatorInput, setIsFirstCalculatorInput] = useState<boolean>(true)
    const [firstCalculatorInputHasAnswer, setFirstCalculatorInputHasAnswer] = useState<boolean>(false)
    const [doesCalculationContainPi, setDoesCalculationContainPi] = useState<boolean>(false)
    const [doesFirstCalculationContainPi, setDoesFirstCalculationContainPi] = useState<boolean>(false)
    const [doesSecondCalculationContainPi, setSecondDoesCalculationContainPi] = useState<boolean>(false)
    const [firstCalculationTrigSymbol, setFirstCalculationTrigSymbol] = useState<string>("")
    const [secondCalculationTrigSymbol, setSecondCalculationTrigSymbol] = useState<string>("")
    const [doesFirstCalculationContainTrig, setDoesFirstCalculationContainTrig] = useState<boolean>(false)
    const [doesSecondCalculationContainTrig, setDoesSecondCalculationContainTrig] = useState<boolean>(false)
    const [isOperatorInequalityCheck, setIsOperatorInequalityCheck] = useState<boolean>(false)
    const [currentInput, setCurrentInput] = useState<string>(firstCalculatorInput)
    const [isFactorialCalculationValid, setIsFactorialCalculationValid] = useState<boolean>(true)


    // check if operator is inquality check
    useEffect(() => {
        let isInequalitySymbol = operator.trim() === "≠"
        setIsOperatorInequalityCheck(isInequalitySymbol)
    }, [operator])

    
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


    // Track if first equation contains pi
    useEffect(() => {
        setDoesFirstCalculationContainPi(firstCalculatorInput.includes("𝝅"))
    }, [firstCalculatorInput])


    // Track if second equation contains pi
    useEffect(() => {
        setSecondDoesCalculationContainPi(secondCalculatorInput.includes("𝝅"))
    }, [secondCalculatorInput])


    // Track if any equation contains pi
    useEffect(() => {
        setDoesCalculationContainPi(doesFirstCalculationContainPi || doesSecondCalculationContainPi)
    }, [doesFirstCalculationContainPi, doesSecondCalculationContainPi])


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

    const currentCalculationContainsPi = (): boolean => {
        return isFirstCalculatorInput ? doesFirstCalculationContainPi : doesSecondCalculationContainPi
    }

    const clearTrigInputs = () => {
        let currentTrigBooleanInput = getCurrentTrigBooleanInput()
        currentTrigBooleanInput(false)

        let curentTrigSetInput = getCurrentTrigSetInput()
        curentTrigSetInput("")
    }

    const solveEquation = async (newOperator: string, secondInput: string) => {

        // Check if equation is valid
        if (secondCalculatorInput.length === 0) {
            return
        }

        let firstInput = firstCalculatorInput

        // replace pi with actual number
        if (doesCalculationContainPi) {
            firstInput = solvePiEquation(firstInput)
            secondInput = solvePiEquation(secondInput)
        }

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
        setPrevInput(prevEquationString)

        clearNumbers(newOperator)
    }

    const solveFactorialEquation = () => {

        if(!isFactorialCalculationValid){
            setFirstCalculatorInput("0")
        }

        if(isFirstCalculatorInput){
            let firstInput = firstCalculatorInput + "!"
            setPrevInput(firstInput)
            firstInput = solveFactorial(firstInput)
            setFirstCalculatorInput(firstInput)
            return
        }
        let secondInput = secondCalculatorInput + "!"
        secondInput = solveFactorial(secondInput)
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

        // IsFirstCalc & contains Pi or isSecondCalc and contains pi = true
        const doesCurrentCalculationHavePi = isFirstCalculatorInput ? 
        doesFirstCalculationContainPi : doesSecondCalculationContainPi

        // Solve equation with Pi for calculation
        if(doesCurrentCalculationHavePi){
            input = solvePiEquation(input)
        }

        if (!input.length || (operator !== "" && !secondCalculatorInput.length)) {
            currentSetInput("0")
            setPrevInput(`√ ${0}`)
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

        currentSetInput(roundedAnswerAsArray.join(""))
        setPrevInput(`√ ${originalNumberAsInt}`)
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
    const onInputOperator = (userInput: string) => {

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
                setIsDecimalUnfinished(false);
            }
            return
        }

        // Check last input on first number isn"t a decimal
        if (isDecimalUnfinished) {
            errorMessage("please enter a number first")
            return
        }

        // Add number to calculation
        for (let i = 0; i < trigSymbolsArray.length; i++) {
            if (trigSymbolsArray[i] === userInput) {

                if (isFirstCalculatorInput && !doesFirstCalculationContainTrig) {
                    setFirstCalculationTrigSymbol(userInput)
                    setDoesFirstCalculationContainTrig(true)
                    onInputNumber(userInput + "()")

                } else if (!isFirstCalculatorInput && !doesSecondCalculationContainTrig) {
                    setSecondCalculationTrigSymbol(userInput)
                    setDoesSecondCalculationContainTrig(true)
                    onInputNumber(userInput + "()")

                } else {
                    notifyMessage("Only one trig calculation can be added to the equation")
                }
                return
            }
        }

        // Add pi to array
        if (userInput === "𝝅") {

            if(!currentCalculationContainsPi()){
                onInputNumber(userInput)
            } else {
                notifyMessage("Only one pi can be added to the equation")
            }
            return
        }


        if (operatorArray.includes(userInput) && !isLastCalculationAnOperator) {
            onInputOperator(userInput)

        } else if (userInput === "=") {
            solveEquation("", secondCalculatorInput)

        } else if (userInput === "√" && !isLastCalculationAnOperator) {
            onSquareRoot()
        }
        return
    }
    return (
        handleUserInput
    )
}