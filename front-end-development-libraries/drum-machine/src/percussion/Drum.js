import { useSelector, useDispatch } from 'react-redux'
import { play } from '../store/drumSlice';
import { setText } from '../store/displaySlice';
import { useRef, useState } from 'react';

export default function Drum({button}) {    
    const drumData = useSelector(state => state.drums.find(drum=>drum.button === button));
    const clicks = useSelector(state => state.drums.find(drum=>drum.button === button).clicks);
    const power = useSelector(state => state.display.power);
    const audioRef = useRef();
    const dispatch = useDispatch();
    const [ active, setActive ] = useState(false);
    const [ localClicks, setLocalClicks ] = useState(0);

    // play sound if clicked or on keypress
    if (clicks !== localClicks) {
        setLocalClicks(clicks);
        if (power) {
            setActive(true);
            dispatch(setText(drumData.name));
            if (audioRef.current !== undefined) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        }
    }

    return (
        <div 
            className={`drum-pad${active?" active":""}`} 
            id={drumData.name} 
            onClick={()=>dispatch(play(drumData.button))} 
            onAnimationEnd={() => setActive(false)}
            tabIndex={-1}>
            <p>{drumData.button}</p>
            <p className="description">{drumData.name}</p>
            <audio className="clip" src={drumData.audio} id={drumData.button} ref={audioRef} preload='auto'>
                <source src={drumData.audio} type="audio/mpeg"/>
            </audio>
        </div>
    );
}