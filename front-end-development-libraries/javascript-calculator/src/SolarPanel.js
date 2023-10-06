import styles from './App.module.css';

export default function SolarPanel() {
    return (
        <div className={styles.solarRow}>
            <span className={styles.brandMain}><a href="https://github.com/dorianignee/freeCodeCamp_Challenges/">Dorian Instruments</a></span>
            <span className={styles.brandSub}><a href="https://github.com/dorianignee/freeCodeCamp_Challenges/">DI 30S</a></span>
            <div className={styles.solarPanel}/>
        </div>
    )
}