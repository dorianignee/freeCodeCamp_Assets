import Drum from './Drum'
import { useSelector,  } from 'react-redux';
import styles from './percussion.module.css'

export default function Percussion() {
    const drums = useSelector(state => state.drums);
    
    return (
        <div className={styles.percussion}>
            {drums.map(mapping => 
                <Drum
                    key={mapping.button}
                    button={mapping.button}
                />
            )}
        </div>
    )
}