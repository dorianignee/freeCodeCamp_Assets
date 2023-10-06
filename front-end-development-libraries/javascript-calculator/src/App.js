import Display from "./Display";
import Keypad from "./Keypad";
import SolarPanel from "./SolarPanel";
import styles from "./App.module.css"

export default function App() {
  return (
    <div id="calculator" className={styles.calculator}>
      <SolarPanel/>
      <Display/>
      <Keypad/>
    </div>
  );
}