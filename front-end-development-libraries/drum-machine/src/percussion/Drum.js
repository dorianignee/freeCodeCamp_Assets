import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux'
import { play, deactivate } from '../store/drumSlice';
import { setText } from '../store/displaySlice';
import { useRef, useState } from 'react';

export default function Drum({button}) {    
    const drumData = useSelector(state => state.drums.find(drum=>drum.button === button));
    const name = drumData.name;
    const audio = drumData.audio;
    const audioRef = useRef();
    const dispatch = useDispatch();
    const [ active, setActive ] = useState("")

    const store = useStore();
    store.subscribe(() => {
        if (store.getState().drums.find(drum=>drum.button === button).active && !active) {
            setActive("active");
            dispatch(setText(name));
            if (audioRef.current !== undefined)
                audioRef.current.play();
        }
    }, shallowEqual);

    const deactivateLocal = () => {
        if (active) {
            dispatch(deactivate(button));
            setActive("");
        }
    }

    return (
        <div 
            className={`drum-pad ${active}`} 
            id={name} 
            onClick={()=>dispatch(play(button))} 
            onTransitionEnd={deactivateLocal}
            tabIndex={-1}>
            <p>{button}</p>
            <p className="description">{name}</p>
            <audio className="clip" src={audio} id={button} ref={audioRef}>
                <source src={audio} type="audio/mpeg"/>
            </audio>
        </div>
    );
}