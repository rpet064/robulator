import styles from '../styles/Home.module.css'
import SideMenu from './SideMenu'
import {Toaster} from 'react-hot-toast'
import { copyPreviousCalculationToClipboard, copyCurrentCalculationToClipboard} from './utility/clipboardUtils'
import Keypad from './Keypad'
import { useState } from 'react'
import {notifyMessage} from './utility/toastMessages'

export default function Calculator() {

  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string[]>([])
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string[]>([])
  const [prevInput, setPrevInput] = useState<string>("")
  const [operator, setOperator] = useState("")
  const [isFirstCalculatorInput, setIsFirstCalculatorInput] = useState(true)
  const [firstCalculatorInputHasAnswer, setFirstCalculatorInputHasAnswer] = useState(false)
  const [overwriteNumber, setOverwriteNumber] = useState(false)
  const [isLastCalculationAnOperator, setIsLastCalculationAnOperator] = useState(false)
  const [isDecimalUnfinished, setIsDecimalUnfinished] = useState(false)

  return (

    // Calculator Screen
    <div className={styles.calculator}>
         <Toaster/>

      {/* // above main screen calculations */}
      <div className={styles.calculatorScreen}>
          <SideMenu/>
          <div className={styles.miniScreen} 
            onClick={() => copyPreviousCalculationToClipboard(prevInput)}>
            
            <span>{prevInput}</span>
        </div>

        {/* // Main screen */}
        <div className={styles.mainScreen}
          onClick={() => copyCurrentCalculationToClipboard(firstCalculatorInput, operator, secondCalculatorInput)}>
          
          <span>{firstCalculatorInput}{operator}{secondCalculatorInput}</span>
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
        isFirstCalculatorInput={isFirstCalculatorInput}
         setIsFirstCalculatorInput={setIsFirstCalculatorInput}
        firstCalculatorInputHasAnswer={firstCalculatorInputHasAnswer}
        setFirstCalculatorInputHasAnswer={setFirstCalculatorInputHasAnswer}
        overwriteNumber={overwriteNumber}
         setOverwriteNumber={setOverwriteNumber}
        isLastCalculationAnOperator={isLastCalculationAnOperator}
        setIsLastCalculationAnOperator={setIsLastCalculationAnOperator}
        isDecimalUnfinished={isDecimalUnfinished}
        setIsDecimalUnfinished={setIsDecimalUnfinished}
        notifyMessage={notifyMessage}
      />
    </div>
  )
}