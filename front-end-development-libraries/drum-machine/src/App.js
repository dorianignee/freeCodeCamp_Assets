import styles from './App.module.css';
import Percussion from './percussion/Percussion';
import Display from './display/Display';
import { useDispatch } from 'react-redux';
import ToggleButton from './togglebutton/ToggleButton';
import { setPower } from './store/displaySlice';

export default function App() {
  const dispatch = useDispatch();

  return (
    <div id="drum-machine" className={styles.device}>
      <Percussion/>
      <div className={styles.auxiliary}>
        <div>
          <div className={styles.brandBg}>
            <p className={styles.brand}>DoriDrum 2023</p>
          </div>
          <Display />
        </div>
        <div className={styles.powerbutton}>
          <ToggleButton caption="Power" onToggle={event => dispatch(setPower(event.payload))} />
          <span className={styles.edby}>ed by <a href="https://github.com/dorianignee/freeCodeCamp_Challenges">Dorian Ignee</a></span>
        </div>
      </div>
    </div>
  );
}
