import { useDispatch } from 'react-redux';
import { buttonPress } from './calculatorSlice.ts';
import styles from './App.module.css';

export default function Button({caption, caption2 = "", caption3 = "", id, className = styles.buttonAux}) {
    const dispatch = useDispatch();

    return (
        <div className={styles.buttonBox}>
            <span className={styles.f2}>{caption2}</span>
            <span className={styles.f3}>{caption3}</span>
            <div className={`${styles.button} ${className}`} id={id} onClick={()=>dispatch(buttonPress(id))}>
                <div className={styles.buttonCaption}>{caption}</div>
            </div>
        </div>
    );
}