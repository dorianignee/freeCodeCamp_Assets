import Drum from './Drum'
import styles from './percussion.module.css'

const buttons = [
    {button: "Q", name: "Heater 1", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
    {button: "W", name: "Heater 2", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
    {button: "E", name: "Heater 3", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
    {button: "A", name: "Heater 4", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
    {button: "S", name: "Clap", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
    {button: "D", name: "Open-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
    {button: "Z", name: "Kick-n'-Hat", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
    {button: "X", name: "Kick", audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
    {button: "C", name: "Closed-HH", audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
];

export default function Percussion() {
    return (
        <div className={styles.percussion}>
            {buttons.map(mapping => 
                <Drum
                    key={mapping.button}
                    button={mapping.button}
                    name={mapping.name}
                    audio={mapping.audio}
                />
            )}
        </div>
    )
}