import { useSelector, useDispatch } from 'react-redux'
import { setText } from '../store/displaySlice';
import { useCallback, useRef, useState, useEffect } from 'react';
import styles from './percussion.module.css';

export default function Drum({button}) {    
    const drumData = useSelector(state => state.drums.find(drum=>drum.button === button));
    const clicks = useSelector(state => state.drums.find(drum=>drum.button === button).clicks);
    const power = useSelector(state => state.display.power);
    const audioRef = useRef();
    const dispatch = useDispatch();
    const [ active, setActive ] = useState(false);
    const [ localClicks, setLocalClicks ] = useState(0);

    const play = useCallback(() => {
        if (power) {
            setActive(true);
            if (audioRef.current !== undefined) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            dispatch(setText(drumData.name));
        }
    }, [dispatch, drumData.name, power]);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key.toUpperCase() === drumData.button)
                play();
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [drumData.button, play]);

    return (
        <div 
            className={`drum-pad ${styles.drumpad} ${active ? styles.active :""}`} 
            id={drumData.name} 
            onClick={play} 
            onAnimationEnd={() => setActive(false)}
            tabIndex={-1}>
            <p>{drumData.button}</p>
            {/* <p className={styles.description}>{drumData.name}</p> */}
            <audio className="clip" src={drumData.audio} id={drumData.button} ref={audioRef} preload='auto'>
                <source src={drumData.audio} type="audio/mpeg"/>
            </audio>
        </div>
    );
}