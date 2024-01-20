import styles from '../styles/Home.module.css'
import SideMenu from './SideMenu'
import {Toaster} from 'react-hot-toast'
import { copyPreviousCalculationToClipboard, copyCurrentCalculationToClipboard} from './utility/clipboardUtils'
import Keypad from './Keypad'
import { useState, useRef, SetStateAction, Dispatch, FC } from 'react'
import colours from '../styles/Colours.module.css'

interface CalculatorProps {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
}

const Calculator: FC<CalculatorProps> = ({
    theme,
    setTheme
    }) => {

  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string[]>([])
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string[]>([])
  const [prevInput, setPrevInput] = useState<string>("")
  const [operator, setOperator] = useState("")
  const [isScientificSymbolsArray, setScientificSymbolsArray] = useState(false);

  const calculatorRef = useRef(null);
  const textInputRef = useRef(null);

  return (

    // Calculator Screen
    <div className={styles.calculator} ref={calculatorRef}>
         <Toaster/>

      {/* // above main screen calculations */}
      <div className={`${styles.calculatorScreen} ${theme === 'light' ? colours.darkBackground : colours.lightBackground}`}>

          <SideMenu
              ScientificSymbolsArray={isScientificSymbolsArray}
              setScientificSymbolsArray={setScientificSymbolsArray}
              theme={theme}
              setTheme={setTheme}
          />

          <div className={styles.miniScreen} 
            onClick={() => copyPreviousCalculationToClipboard(prevInput)}>
            
            <span>{prevInput}</span>
        </div>

        {/* // Main screen */}
        <div className={styles.mainScreen}
          onClick={() => copyCurrentCalculationToClipboard(firstCalculatorInput, operator, secondCalculatorInput)}>
          <span className="mainScreenTextInput" ref={textInputRef}>
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
        calculatorRef={calculatorRef}
        textInputRef={textInputRef}
        isScientificSymbolsArray={isScientificSymbolsArray}
      />
    </div>
  )
}

export default Calculator