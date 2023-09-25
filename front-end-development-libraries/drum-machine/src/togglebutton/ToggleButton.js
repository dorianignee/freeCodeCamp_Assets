import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './togglebutton.css';

export default function ToggleButton({caption, initialState = true, onToggle = null}) {
    const [ toggled, setToggled ] = useState(initialState);

    const toggle = () => {
        if (typeof onToggle === 'function') {
            onToggle({payload: !toggled});
        }
        setToggled(!toggled);
    }

    return (
        <div className="toggleButton" onClick={toggle}>
            <p><span className={`led${toggled?" on":""}`}>&bull;</span>{caption}</p>
        </div>
    )
}