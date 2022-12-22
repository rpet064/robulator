import styles from '../styles/Home.module.css';
import calculatorButtonInfo from './calculatorButtons.json';
import { useState } from 'react';

export default function Calculator(){
  const [calculatorInput, setCalculatorInput] = useState<string[]>([])
  
  const onChangeHandler = (e: any) => {
    if (e.target.value === 'AC'){
      setCalculatorInput([])
    } else if ((e.target.value === '=')) {
      alert('submitted')
      setCalculatorInput([])
    } else {
      setCalculatorInput(calculatorInput => [...calculatorInput, e.target.value]);
    }
  }

    return (
        <div className={styles.calculator}>
          <div>
            <div className={styles.calculatorScreen}>     
              <span>{calculatorInput}</span>        
            </div>
            <div className={styles.calculatorKeypad}>
              {calculatorButtonInfo.rowOne.map((calcBtnSymbol, index) => 
                    <button onClick={onChangeHandler} value={calcBtnSymbol} key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}
                {calculatorButtonInfo.rowTwo.map((calcBtnSymbol, index) => 
                    <button onClick={onChangeHandler} value={calcBtnSymbol} key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}                
                {calculatorButtonInfo.rowThree.map((calcBtnSymbol, index) => 
                    <button onClick={onChangeHandler} value={calcBtnSymbol} key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}                
                {calculatorButtonInfo.rowFour.map((calcBtnSymbol, index) => 
                    <button onClick={onChangeHandler} value={calcBtnSymbol} key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}                
                  <button onClick={onChangeHandler} value={calculatorButtonInfo.rowFive[0]} className={styles.calcBtnZero}>
                    <span>{calculatorButtonInfo.rowFive[0]}</span>
                  </button>
                  <button onClick={onChangeHandler} value={calculatorButtonInfo.rowFive[1]} className={styles.calcBtn}>
                    {calculatorButtonInfo.rowFive[1]}
                  </button>
                  <button onClick={onChangeHandler} value={calculatorButtonInfo.rowFive[2]} className={styles.calcBtn}>
                    {calculatorButtonInfo.rowFive[2]}
                  </button>
            </div>
          </div>
        </div>
    )
}