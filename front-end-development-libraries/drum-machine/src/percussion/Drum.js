import { useSelector, useDispatch } from 'react-redux'
import { setText } from '../store/displaySlice';
import { useCallback, useRef, useState, useEffect } from 'react';
import styles from './percussion.module.css';

export default function Drum({button, name, audio}) {    
    const power = useSelector(state => state.display.power);
    const audioRef = useRef();
    const dispatch = useDispatch();
    const [ active, setActive ] = useState(false);

    const play = useCallback(() => {
        if (power) {
            if (audioRef.current !== undefined) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            dispatch(setText(name));
            setActive(true);
        }
    }, [dispatch, name, power]);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key.toUpperCase() === button)
                play();
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [button, play]);

    return (
        <div 
            className={`drum-pad ${styles.drumpad} ${active ? styles.active :""}`} 
            id={name} 
            onClick={play} 
            onAnimationEnd={() => setActive(false)}
            tabIndex={-1}>
            <p>{button}</p>
            {/* <p className={styles.description}>{drumData.name}</p> */}
            <audio className="clip" src={audio} id={button} ref={audioRef} preload='auto'>
                <source src={audio} type="audio/mpeg"/>
            </audio>
        </div>
    );
}