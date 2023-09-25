import styles from './togglebutton.module.css'

export default function LED({on = true, color = "red", size = "1em"}) {
    return (
        <div 
            className={`${styles.led} ${on ? styles.on : ""}`}
            style={{width: size, height: size, backgroundColor: color}}
        />
    )
}