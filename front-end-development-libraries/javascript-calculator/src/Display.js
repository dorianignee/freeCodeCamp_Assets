import { useSelector } from 'react-redux'
import styles from './App.module.css'

export default function Display() {
    const value = useSelector(state=>state.calc.display);
    const power = useSelector(state=>state.calc.power);

    return (
        <div className={styles.displayContainer}>
            <div className={`${styles.display} ${styles.displayBackground}`}>{power ? "-8.8.8.8.8.8.8.8." : ""}</div>
            <div className={`${styles.display} ${styles.displayBackground} ${styles.fakeDot}`}>{(power && !value.includes(".")) ? "." : ""}</div>
            <div id="display" className={styles.display}>{value}</div>
        </div>
        
    )
}