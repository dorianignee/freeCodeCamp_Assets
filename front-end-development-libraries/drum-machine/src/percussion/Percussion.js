import { Container } from 'react-bootstrap'
import Drum from './Drum'
import { useDispatch, useSelector } from 'react-redux';
import { play } from '../store/drumSlice';
import './percussion.css'

export default function Percussion() {
    const dispatch = useDispatch();
    const drums = useSelector(state => state.drums);
    

    return (
        <Container className="percussion d-flex-row" tabIndex={0} onKeyDown={event => dispatch(play(event.key))}>
            {drums.map(mapping => 
                <Drum
                    key={mapping.button}
                    button={mapping.button}
                />
            )}
        </Container>
    )
}