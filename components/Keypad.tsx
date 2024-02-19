import { useEffect, useState, Dispatch, SetStateAction, RefObject, FC } from 'react'
import styles from '../styles/Keypad.module.css'
import { regularSymbolsArray, scientificSymbolsArray } from './utility/symbolsArray'
import { CalculationsManager } from "./calculations/CalculationsManager"
import colours from '../styles/Colours.module.css'

interface KeypadProps {
  firstCalculatorInput: string
  setFirstCalculatorInput: Dispatch<SetStateAction<string>>
  secondCalculatorInput: string
  setSecondCalculatorInput: Dispatch<SetStateAction<string>>
  setPrevInput: (value: string) => void
  operator: string
  setOperator: (value: string) => void
  isScientificSymbolsArray: boolean
}

const Keypad: FC<KeypadProps> = ({
  firstCalculatorInput,
  setFirstCalculatorInput,
  secondCalculatorInput,
  setSecondCalculatorInput,
  setPrevInput,
  operator,
  setOperator,
  isScientificSymbolsArray
}) => {

  const [overwriteNumber, setOverwriteNumber] = useState<boolean>(false)
  const [isLastCalculationAnOperator, setIsLastCalculationAnOperator] = useState<boolean>(false)
  const [isDecimalUnfinished, setIsDecimalUnfinished] = useState<boolean>(false)
  const [doesCalculationExceedInput, setDoesCalculationExceedInput] = useState<boolean>(false)
  const [currentNumberOfInputs, setCurrentNumberOfInputs] = useState<number>(0)
  const [symbolsArray, setSymbolsArray] = useState<string[]>([])
  const [buttonStyle, setButtonStyle] = useState<string>(styles.calcBtn)
  const [keypadContainerStyle, setKeypadContainerStyle] = useState<string>(styles.compactCalculatorKeypad)


  const calculationsManager = CalculationsManager({
    firstCalculatorInput: firstCalculatorInput,
    setFirstCalculatorInput: setFirstCalculatorInput,
    secondCalculatorInput: secondCalculatorInput,
    setSecondCalculatorInput: setSecondCalculatorInput,
    setPrevInput: setPrevInput,
    operator: operator,
    setOperator: setOperator,
    overwriteNumber: overwriteNumber,
    setOverwriteNumber: setOverwriteNumber,
    isLastCalculationAnOperator: isLastCalculationAnOperator,
    setIsLastCalculationAnOperator: setIsLastCalculationAnOperator,
    isDecimalUnfinished: isDecimalUnfinished,
    setIsDecimalUnfinished: setIsDecimalUnfinished,
    doesCalculationExceedInput: doesCalculationExceedInput,
    setDoesCalculationExceedInput: setDoesCalculationExceedInput,
    currentNumberOfInputs: currentNumberOfInputs,
    setCurrentNumberOfInputs: setCurrentNumberOfInputs
   });


  // Toggle between compact calculations and advanced
  useEffect(() => {
    let currentSymbolsArray = isScientificSymbolsArray ? scientificSymbolsArray : regularSymbolsArray
    setSymbolsArray(currentSymbolsArray)
  }, [isScientificSymbolsArray])


  // Toggle between compact calculations and scientific styles
  useEffect(() => {
    setButtonStyle(isScientificSymbolsArray ? styles.scientificCalcBtn : styles.compactCalcBtn)
  }, [isScientificSymbolsArray])


  useEffect(() => {
    setKeypadContainerStyle(isScientificSymbolsArray ? styles.scientificCalculatorKeypad : styles.compactCalculatorKeypad)
  }, [isScientificSymbolsArray])

  return (
    <div className={`${keypadContainerStyle} ${styles.calculatorKeypadStyle}`}>
      {symbolsArray.map((symbol, index) => {
        return (
          <button onClick={() => calculationsManager(symbol)} 
          key={index}
            className={`${buttonStyle} ${styles.calcBtn} ${colours.lighterButton}`}>{symbol}</button>
        )
      })
      }
    </div>
  )
}

export default Keypad