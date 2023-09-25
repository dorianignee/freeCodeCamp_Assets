import { useState } from "react";
import styles from './togglebutton.module.css';
import LED from "./LED";

export default function ToggleButton({caption, initialState = true, onToggle = null}) {
    const [ toggled, setToggled ] = useState(initialState);

    const toggle = () => {
        if (typeof onToggle === 'function') {
            onToggle({payload: !toggled});
        }
        setToggled(!toggled);
    }

    return (
        <div className={styles.toggleButton} onClick={toggle}>
            <LED on={toggled} size="10px"/><span className={styles.caption}>{caption}</span>
        </div>
    )
}