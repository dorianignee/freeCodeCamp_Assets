import { Container } from 'react-bootstrap'
import Drum from './Drum'
import { useSelector } from 'react-redux';
import './percussion.css'

export default function Percussion() {
    const drums = useSelector(state => state.drums);
    
    return (
        <Container className="percussion d-flex-row">
            {drums.map(mapping => 
                <Drum
                    key={mapping.button}
                    button={mapping.button}
                />
            )}
        </Container>
    )
}