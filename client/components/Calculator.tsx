import styles from '../styles/Home.module.css';
import calculatorButtonInfo from './calculatorButtons.json'


export default function Calculator(){
    return (
        <div className={styles.calculator}>
          <h3>Hello Calculator</h3>
          <div>
            <div className={styles.calculatorScreen}>     
              <span>50 + 10 = 60</span>        
            </div>
            <div className={styles.calculatorKeypad}>
              {calculatorButtonInfo.rowOne.map((calcBtnSymbol, index) => 
                    <button key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}
                {calculatorButtonInfo.rowTwo.map((calcBtnSymbol, index) => 
                    <button key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}                
                {calculatorButtonInfo.rowThree.map((calcBtnSymbol, index) => 
                    <button key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}                
                {calculatorButtonInfo.rowFour.map((calcBtnSymbol, index) => 
                    <button key={index} className={styles.calcBtn}>{calcBtnSymbol}</button>
                  )}                
                  <button className={styles.calcBtnZero}>
                    <span>{calculatorButtonInfo.rowFive[0]}</span>
                  </button>
                  <button className={styles.calcBtn}>
                    {calculatorButtonInfo.rowFive[1]}
                  </button>
                  <button className={styles.calcBtn}>
                    {calculatorButtonInfo.rowFive[2]}
                  </button>
            </div>
          </div>
        </div>
    )
}