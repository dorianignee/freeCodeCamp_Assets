import styles from './App.module.css';

export default function SolarPanel() {
    return (
        <div className={styles.solarRow}>
            <span className={styles.brandMain}>Dorian Instruments</span>
            <span className={styles.brandSub}>DI 30S</span>
            <div className={styles.solarPanel}/>
        </div>
    )
}