import styles from '../styles/Home.module.css';
import calculatorButtonInfo from './calculatorButtons.json';
import { useState } from 'react';

export default function Calculator(){
  const [firstCalculatorInput, setFirstCalculatorInput] = useState<string[]>([]);
  const [secondCalculatorInput, setSecondCalculatorInput] = useState<string[]>([]);
  const [operator, setOperator] = useState('');
  const [postResponse, setPostResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const clearNumbers = () => {
    setFirstCalculatorInput([]);
    setOperator('');
    setSecondCalculatorInput([]);
  }

  // const solveEquation = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch('https://reqres.in/api/users', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         equation: calculatorInput,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error! status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     console.log('result is: ', JSON.stringify(result, null, 4));

  //     setPostResponse(result);
  //   } catch (err: any) {
  //     setErr(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   setCalculatorInput([]);
  // };

  // handle number input logic
  const onInputNumber = (e: any) => {
    if (operator === ''){
    setFirstCalculatorInput(firstCalculatorInput => [...firstCalculatorInput, e.target.value]);
    } else {
    setSecondCalculatorInput(secondCalculatorInput => [...secondCalculatorInput, e.target.value]);
    }      
  }
    



  //   if (e.target.value === 'AC'){
  //     setCalculatorInput([]);
  //   } else if (e.target.value === '+/-'){
  //    var currentNumber = e.target.value;
  //   } else {
  //     setCalculatorInput(calculatorInput => [...calculatorInput, e.target.value]);
  //   }
  // }

    return (
        <div className={styles.calculator}>
          <div>
            <div className={styles.calculatorScreen}>     
            {/* {!isLoading && <span>{firstCalculatorInput} {operator} {secondCalculatorInput}</span>}
              {isLoading && <span>Loading....</span>} */}
            </div>
            <div className={styles.calculatorKeypad}>
              {/* {calculatorButtonInfo.rowOne.map((calcBtnSymbol, index) => 
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
                  <button onClick={solveEquation} className={styles.calcBtn}>
                    {calculatorButtonInfo.rowFive[2]}
                  </button> */}
            </div>
          </div>
        </div>
    )
}