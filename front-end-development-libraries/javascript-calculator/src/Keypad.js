/*
Off   7  8  9  /
Bksp  4  5  6  *
CE/C  1  2  3  -
On/AC 0  .  =  +
*/
import styles from './App.module.css';
import Button from './Button';

export default function Keypad() {
    return (
        <div className={styles.keypad}>
            <Button id="off" caption="Off" className={styles.buttonAux}/>
            <Button id="seven" caption="7" className={styles.buttonNumber}/>
            <Button id="eight" caption="8" className={styles.buttonNumber}/>
            <Button id="nine" caption="9" className={styles.buttonNumber}/>
            <Button id="divide" caption="&#xF7;" className={styles.buttonOperator}/>

            <Button id="del" caption="Del" className={styles.buttonAux}/>
            <Button id="four" caption="4" className={styles.buttonNumber}/>
            <Button id="five" caption="5" className={styles.buttonNumber}/>
            <Button id="six" caption="6" className={styles.buttonNumber}/>
            <Button id="multiply" caption="&#xD7;" className={styles.buttonOperator}/>

            <Button id="clearEntry" caption="CE/C" className={styles.buttonClear}/>
            <Button id="one" caption="1" className={styles.buttonNumber}/>
            <Button id="two" caption="2" className={styles.buttonNumber}/>
            <Button id="three" caption="3" className={styles.buttonNumber}/>
            <Button id="subtract" caption="-" className={styles.buttonOperator}/>

            <Button id="clear" caption="On/AC" className={styles.buttonClear}/>
            <Button id="zero" caption="0" className={styles.buttonNumber}/>
            <Button id="decimal" caption="." className={styles.buttonNumber}/>
            <Button id="equals" caption="=" className={styles.buttonEquals}/>
            <Button id="add" caption="+" className={styles.buttonOperator}/>
        </div>
    )
}
