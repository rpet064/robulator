import { solveTanCalculation, solveSinCalculation,
    solveLogCalculation, solveCosCalculation } from './trigonometryCalculations';
import { useEffect, useState, Dispatch, SetStateAction, RefObject, FC } from 'react'
import { numArray, operatorArray, trigSymbolsArray } from '../utility/symbolsArray'
import SolveEquation from './equationSolver'
import squareNumber from './numberSquarer'
import removeTrailingZeros from '../utility/removeTrailingZeros'
import { errorMessage, notifyMessage } from '../utility/toastMessages'
import {solvePiEquation } from './solvePiEquation'
import { removeBrackets } from '../utility/removeBrackets';


interface calculationsManagerProps {
    firstCalculatorInput: string[]
    setFirstCalculatorInput: Dispatch<SetStateAction<string[]>>
    secondCalculatorInput: string[]
    setSecondCalculatorInput: Dispatch<SetStateAction<string[]>>
    setPrevInput: (value: string) => void
    operator: string
    setOperator: (value: string) => void
    calculatorRef: RefObject<HTMLDivElement>
    textInputRef: RefObject<HTMLDivElement>
    isLastCalculationAnOperator: boolean
    isDecimalUnfinished: boolean
    doesCalculationExceedInput: boolean
    doesCalculationExceedScreenWidth: boolean
    currentNumberOfInputs: number
    overwriteNumber: boolean
    setOverwriteNumber: (value: boolean) => void
    setIsLastCalculationAnOperator: (value: boolean) => void
    setCurrentNumberOfInputs: (value: number) => void
    setDoesCalculationExceedInput: (value: boolean) => void,
    setIsDecimalUnfinished: (value: boolean) => void
    setDoesCalculationExceedScreenWidth: (value: boolean) => void
}

const CalculationsManager = ({
    firstCalculatorInput,
    setFirstCalculatorInput,
    secondCalculatorInput,
    setSecondCalculatorInput,
    setPrevInput,
    operator,
    setOperator,
    calculatorRef,
    isLastCalculationAnOperator,
    isDecimalUnfinished,
    doesCalculationExceedInput,
    doesCalculationExceedScreenWidth,
    currentNumberOfInputs,
    setOverwriteNumber,
    overwriteNumber,
    setIsLastCalculationAnOperator,
    setCurrentNumberOfInputs,
    setDoesCalculationExceedInput,
    setIsDecimalUnfinished,
    textInputRef,
    setDoesCalculationExceedScreenWidth,
}: calculationsManagerProps) => {


    const maximumNumberOfIntegers = 15
    const [isFirstCalculatorInput, setIsFirstCalculatorInput] = useState(true)
    const [firstCalculatorInputHasAnswer, setFirstCalculatorInputHasAnswer] = useState(false)
    const [currentFontSizeInRem, setCurrentFontSizeInRem] = useState(5.25)
    const [doesCalculationContainPi, setDoesCalculationContainPi] = useState(false)
    const [doesFirstCalculationContainPi, setFirstDoesCalculationContainPi] = useState(false)
    const [doesSecondCalculationContainPi, setSecondDoesCalculationContainPi] = useState(false)
    const [doesFirstCalculationContainTrig, setDoesFirstCalculationContainTrig] = useState(false)
    const [doesSecondCalculationContainTrig, setDoesSecondCalculationContainTrig] = useState(false)

    
    // if operator is empty, then still on first equation
    useEffect(() => {
        let isFirstEquation = operator.trim() === ""
        setIsFirstCalculatorInput(isFirstEquation)
    }, [operator])


    // track if first equation contains a trig related calculation
    useEffect(() => {
        let trimmedFirstCalculatorInput = removeBrackets(firstCalculatorInput)
        let includesTrigInput = trimmedFirstCalculatorInput.some(input => trigSymbolsArray.includes(input));
        setDoesFirstCalculationContainTrig(includesTrigInput)
    }, [firstCalculatorInput])


    // track if first equation contains a trig related calculation
    useEffect(() => {
        let trimmedSecondCalculatorInput = removeBrackets(secondCalculatorInput)
        let includesTrigInput = trimmedSecondCalculatorInput.some(input => trigSymbolsArray.includes(input));
        setDoesSecondCalculationContainTrig(includesTrigInput)
    }, [secondCalculatorInput])


    // Track if first equation contains pi
    useEffect(() => {
        setFirstDoesCalculationContainPi(firstCalculatorInput.includes("𝝅"))
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
        setIsLastCalculationAnOperator(operator !== "" && secondCalculatorInput.length < 1
            || firstCalculatorInput[0] === "-" && firstCalculatorInput.length < 2)
    }, [firstCalculatorInput, operator, secondCalculatorInput])


    // Checks if currently contains unfinished decimal
    useEffect(() => {
        setIsDecimalUnfinished(
            firstCalculatorInput.length < 3 && firstCalculatorInput[1] === "."
            || secondCalculatorInput.length < 3 && secondCalculatorInput[1] === "."
            || firstCalculatorInput.length < 4 && firstCalculatorInput[0] === "-" && firstCalculatorInput[2] === "."
            || secondCalculatorInput.length < 4 && secondCalculatorInput[0] === "-" && secondCalculatorInput[2] === "."
        )
    }, [firstCalculatorInput, secondCalculatorInput])


    // Check if current number of inputs exceeds maximum input
    useEffect(() => {
        setCurrentNumberOfInputs(firstCalculatorInput.length + secondCalculatorInput.length + operator.length)
        if (currentNumberOfInputs > maximumNumberOfIntegers) {
            setDoesCalculationExceedInput(true)
            return
        }
        setDoesCalculationExceedInput(false)
    }, [firstCalculatorInput, secondCalculatorInput, operator])


    // get current font size
    useEffect(() => {
        if (textInputRef.current) {
            const style = window.getComputedStyle(textInputRef.current)
            setCurrentFontSizeInRem(parseFloat(style.fontSize))
        }
    }, [textInputRef])


    // check number of inputs * font size width is larger than the screen
    useEffect(() => {
        if (calculatorRef.current) {
            let doesCalculationExceedScreenWidth = (calculatorRef.current.offsetWidth - currentFontSizeInRem * currentNumberOfInputs) > 0
            setDoesCalculationExceedScreenWidth(doesCalculationExceedScreenWidth)
        }
    }, [calculatorRef, currentNumberOfInputs, currentFontSizeInRem])


    useEffect(() => {
        if (textInputRef.current && doesCalculationExceedScreenWidth) {
            const style = window.getComputedStyle(textInputRef.current)
            const fontSizeInPixels = parseInt(style.fontSize, 10)
            const newFontSizeInRem = fontSizeInPixels * 0.9 / 16
            textInputRef.current.style.fontSize = `${newFontSizeInRem}rem`
        }
    }, [doesCalculationExceedScreenWidth])


    // this function stores the last equation
    const updatePrevArray = () => {

        const firstOperand = firstCalculatorInput.join("")
        const secondOperand = secondCalculatorInput.join("")

        // Construct the equation string
        const equationString = `${firstOperand} ${operator} ${secondOperand} =`

        // Convert the array to a string and remove commas
        const prevEquationString = equationString.replace(/,/g, "")

        setPrevInput(prevEquationString)
    }

    const solveEquation = async (newOperator: string) => {
        if (secondCalculatorInput.length !== 0) {

            let firstInput = firstCalculatorInput.join("")
            let secondInput = secondCalculatorInput.join("")

            // replace pi with actual number
            if (doesCalculationContainPi) {
                firstInput = solvePiEquation(firstInput)
                secondInput = solvePiEquation(secondInput)
            }

            // join array of strings into String, then change strings into numbers
            let firstInputAsFloat , secondInputAsFloat

            try{
                firstInputAsFloat = parseFloat(firstInput)
                secondInputAsFloat = parseFloat(secondInput)
            } catch {
                errorMessage("Equations could not be joined")
                return
            }

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

            default: notifyMessage("Cannot add anymore numbers")
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
        } else if (!isFirstCalculatorInput) {

            arrayIntoString = secondCalculatorInput.join("").slice(0, -1)

            let stringIntoArray: Array<string> = arrayIntoString.split("")

            setSecondCalculatorInput(stringIntoArray)

            // Catches exception where user wants to delete the operator
        } else {
            setOperator("")
        }
    }

    const onInputNumber = (userInput: string) => {

        // Overwrite is decimal added to answer
        if (overwriteNumber && userInput === ".") {
            setFirstCalculatorInput(["0"])
            setFirstCalculatorInputHasAnswer(false)
        }

        // Overwrite number and return
        if (overwriteNumber && userInput !== ".") {
            setFirstCalculatorInput([userInput])
            setFirstCalculatorInputHasAnswer(false)
            return
        }

        if (isFirstCalculatorInput) {
            setFirstCalculatorInput(firstCalculatorInput => [...firstCalculatorInput, userInput])
            return
        }
        setSecondCalculatorInput(secondCalculatorInput => [...secondCalculatorInput, userInput])
    }

    const onSquareRoot = () => {

        let isNegative = false

        let input = isFirstCalculatorInput ? firstCalculatorInput : secondCalculatorInput
        const setInput = isFirstCalculatorInput ? setFirstCalculatorInput : setSecondCalculatorInput

        // IsFirstCalc & contains Pi or isSecondCalc and contains pi = true
        const doesCurrentCalculationHavePi = isFirstCalculatorInput ? 
        doesFirstCalculationContainPi : doesSecondCalculationContainPi

        // Solve equation with Pi for calculation
        if(doesCurrentCalculationHavePi){
            input = solvePiEquation(input.join("")).split("")
        }

        if (!input.length || (operator !== "" && !secondCalculatorInput.length)) {
            setInput(['0'])
            setPrevInput(`√ ${0}`)
            return
        }

        // Remove negative sign from input
        if (input[0] === "-") {
            isNegative = true
            input.shift()
        }

        const originalNumberAsInt = parseFloat(input.toString().replaceAll(',', ""))
        const answer = squareNumber(input, originalNumberAsInt, input.length)
        const roundedAnswer = removeTrailingZeros(answer.toString().replaceAll(',', ""))

        let roundedAnswerAsArray = roundedAnswer.split("")

        // Add negative sign back to input
        if (isNegative) {
            roundedAnswerAsArray.unshift("-")
        }

        setInput(roundedAnswerAsArray)
        setPrevInput(`√ ${originalNumberAsInt}`)
    }


    // handle decimal input logic
    const onInputDecimal = (userInput: string) => {

        // add 0 to first array (it's empty) 
        if (firstCalculatorInput.length < 1) {
            setFirstCalculatorInput(['0'])
        }

        // add 0 to second array (it's empty)
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
            errorMessage('please enter a number first')
            return
        }

        // Check second number is inputted before solving equation
        if (secondCalculatorInput.length < 1 && !isFirstCalculatorInput) {
            errorMessage('please enter a number first')
            return
        }

        // Reset overwrite number
        setFirstCalculatorInputHasAnswer(false)

        // Equation is sufficent to solve
        if (secondCalculatorInput.length > 0 && !isFirstCalculatorInput) {
            solveEquation(userInput)
        }
        setOperator(userInput)
    }

    // handle changing number to negative/positive - sign logic
    const changeSign = () => {

        function handleSign(input: string[], setInput: Dispatch<SetStateAction<string[]>>) {
            var originalArray = input

            if (input[0] === "-") {
                // remove "-" from front of array making it "positive"
                originalArray = originalArray.slice(1)
            } else {
                // add "-" to front of array making it "negative"
                originalArray.unshift("-")
            }

            setInput([...originalArray])
        }

        if (isFirstCalculatorInput) {
            handleSign(firstCalculatorInput, setFirstCalculatorInput)
        } else {
            handleSign(secondCalculatorInput, setSecondCalculatorInput)
        }
    }

    // this const catches userinput from button and triggers correct function accordingly
    const handleUserInput = (userInput: string) => {

        // Calculations don't need validation
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

                onInputDecimal(userInput)
                break

            case "+/-":
                calculationComplete = true

                if (isLastCalculationAnOperator) {
                    break
                }

                changeSign()
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
            return
        }

        // Add number to calculation
        for (let i = 0; i < trigSymbolsArray.length; i++) {
            if (trigSymbolsArray[i] === userInput) {

                if (isFirstCalculatorInput && !doesFirstCalculationContainTrig) {
                    onInputNumber(userInput + "()")

                } else if (!isFirstCalculatorInput && !doesSecondCalculationContainTrig) {
                    onInputNumber(userInput + "()")

                } else {
                    notifyMessage("Only one trig calculation can be added to the equation")
                }
                return;
            }
        }

        // Add pi to array
        if (userInput === "𝝅") {

            if(isFirstCalculatorInput && !doesFirstCalculationContainPi){
                onInputNumber(userInput)

            } else if(!isFirstCalculatorInput && !doesSecondCalculationContainPi){
                onInputNumber(userInput)
                
            } else {
                notifyMessage("Only one Pi can be added to the equation")
            }
            calculationComplete = true
            return
        }

        // Check last input on first number isn't a decimal
        if (isDecimalUnfinished) {
            errorMessage('please enter a number first')
            return
        }

        if (operatorArray.includes(userInput) && !isLastCalculationAnOperator) {
            onInputOperator(userInput)

            // No additional operator selected, so equation is solved and operator is set to ""
        } else if (userInput === "=") {
            solveEquation("")

        } else if (userInput === "√" && !isLastCalculationAnOperator) {
            onSquareRoot()

        }
        return
    }
    return (
        handleUserInput
    )
}

export default CalculationsManager