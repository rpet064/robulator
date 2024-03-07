import styles from '../styles/Home.module.css'
import SideMenu from './SideMenu'
import { Toaster } from 'react-hot-toast'
import { copyPreviousCalculationToClipboard, copyCurrentCalculationToClipboard } from './utility/clipboardUtils'
import Keypad from './Keypad'
import { useState, useRef, SetStateAction, Dispatch, FC, useEffect } from 'react'
import colours from '../styles/Colours.module.css'
import HistorySideMenu from './HistorySideMenu'
import { getPreviousCalculations } from './utility/localStorageManager'

interface CalculatorProps {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}

const Calculator: FC<CalculatorProps> = ({
  theme,
  setTheme
}) => {

  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string>("")
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string>("")
  const [prevInput, setPrevInput] = useState<string>("")
  const [operator, setOperator] = useState<string>("")
  const [isScientificSymbolsArray, setScientificSymbolsArray] = useState<boolean>(true)
  const [prevOperationsArray, setPrevOperationsArray] = useState<string[]>([])
  const [equalityMessage, setEqualityMessage] = useState<string>("")

  const calculatorRef = useRef(null)
  const textInputRef = useRef(null)

  const getPreviousOperationsOnload = (callback: any) => {
    useEffect(() => {
      callback()
    }, [])
  }

  getPreviousOperationsOnload(() => {
    let prevCalculationsInStorage = getPreviousCalculations()
    if (prevCalculationsInStorage) {
      setPrevOperationsArray(prevCalculationsInStorage)
    }
  })

  // Reset setEqualityMessage when user inputs a number
  useEffect(() => {
    if(firstCalculatorInput.length > 0){
      setEqualityMessage("")
    }
  }, [firstCalculatorInput])

  return (

    // Calculator Screen
    <div className={`${styles.calculator} ${theme === 'light' ? colours.lightText : colours.darkText}`} ref={calculatorRef}>
      <Toaster />

      {/* // above main screen calculations */}
      <div className={`${styles.calculatorScreen} ${theme === 'light' ? colours.darkBackground : colours.lightBackground}`}>

        <SideMenu
          ScientificSymbolsArray={isScientificSymbolsArray}
          setScientificSymbolsArray={setScientificSymbolsArray}
          theme={theme}
          setTheme={setTheme}
          setPrevOperationsArray={setPrevOperationsArray}
        />
        <HistorySideMenu theme={theme} prevOperationsArray={prevOperationsArray} />

        <div className={styles.miniScreen}
          onClick={() => copyPreviousCalculationToClipboard(prevInput)}>

          <span>{prevInput}</span>
        </div>

        {/* // Main screen */}
        <div className={styles.mainScreen}
          onClick={() => copyCurrentCalculationToClipboard(firstCalculatorInput, operator, secondCalculatorInput)}>
          <span className="mainScreenTextInput" ref={textInputRef}>
            {/* Displays equals/not equals message */}
            {firstCalculatorInput.length < 1 && equalityMessage}
            {firstCalculatorInput}{operator}{secondCalculatorInput}
          </span>
        </div>
      </div>

      {/* All useState variables passed to Keypad for calculations*/}
      <Keypad
        firstCalculatorInput={firstCalculatorInput}
        setFirstCalculatorInput={setFirstCalculatorInput}
        secondCalculatorInput={secondCalculatorInput}
        setSecondCalculatorInput={setSecondCalculatorInput}
        setPrevInput={setPrevInput}
        operator={operator}
        setOperator={setOperator}
        isScientificSymbolsArray={isScientificSymbolsArray}
        prevOperationsArray={prevOperationsArray}
        setPrevOperationsArray={setPrevOperationsArray}
        setEqualityMessage={setEqualityMessage}
      />
    </div>
  )
}

export default Calculator