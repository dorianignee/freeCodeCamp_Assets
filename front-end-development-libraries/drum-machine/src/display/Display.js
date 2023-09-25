import { useSelector } from "react-redux"
import styles from './display.module.css'

export default function Display() {
    const displayText = useSelector((state) => state.display.text)

    return(
        <div id="display" className={styles.display}>{displayText}</div>
    )
}