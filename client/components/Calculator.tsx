import styles from '../styles/Home.module.css';
import calculatorButtonInfo from './calculatorButtons.json'


export default function Calculator(){
    return (
        <div className={styles.calculator}>
          <h1>Cal_cpp_ulator</h1>
          <div>
            <div className={styles.calculatorScreen}>              
            </div>
            <div className={styles.calculatorKeypad}>
              {calculatorButtonInfo.rowOne.map((calcBtnSymbol, index) => 
                    <div key={index} className={styles.calcBtn}>{calcBtnSymbol}</div>
                  )}
                {calculatorButtonInfo.rowTwo.map((calcBtnSymbol, index) => 
                    <div key={index} className={styles.calcBtn}>{calcBtnSymbol}</div>
                  )}                
                {calculatorButtonInfo.rowThree.map((calcBtnSymbol, index) => 
                    <div key={index} className={styles.calcBtn}>{calcBtnSymbol}</div>
                  )}                
                {calculatorButtonInfo.rowFour.map((calcBtnSymbol, index) => 
                    <div key={index} className={styles.calcBtn}>{calcBtnSymbol}</div>
                  )}                
                  <div>
                    {calculatorButtonInfo.rowFive[1]}
                  </div>
                  <div>
                    {calculatorButtonInfo.rowFive[2]}
                  </div>
                  <div>
                    {calculatorButtonInfo.rowFive[3]}
                  </div>
            </div>
          </div>
        </div>
    )
}