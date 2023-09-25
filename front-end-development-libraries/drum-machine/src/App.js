import './App.css';
import Percussion from './percussion/Percussion';
import Display from './display/Display';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { play } from './store/drumSlice';
import ToggleButton from './togglebutton/ToggleButton';
import { setPower } from './store/displaySlice';

export default function App() {
  const dispatch = useDispatch();
  //const handleKeyDown = useCallback(event => dispatch(play(event.key)),[dispatch]);

  useEffect(() => {
    const handleKeyDown = event => dispatch(play(event.key));

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <Container className='center' style={{display: "inline", maxWidth: 1000}}>
      <Row style={{paddingRight: "2em"}}>
        <Col xs={7}>
          <Percussion/>
        </Col>
        <Col>
          {/* <Stack className='col-11 justify-start p-2'> */}
            <p className="brand">DoriDrum 2023</p>
            <Display className='col-8'/>
            <Row className='power-button'>
              <Col><ToggleButton caption="Power" onToggle={event => dispatch(setPower(event.payload))} /></Col>
              <Col className='edby'>ed by <a href="https://github.com/dorianignee/freeCodeCamp_Challenges">Dorian Ignee</a></Col>
            </Row>
            
          {/* </Stack>  */}
        </Col>
      </Row>
    </Container>
  );
}
