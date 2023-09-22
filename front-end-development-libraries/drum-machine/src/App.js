import './App.css';
import Percussion from './percussion/Percussion';
import Display from './display/Display';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function App() {
  return (
    <Container className='center' style={{border: "1px solid red", display: "inline", maxWidth: 1000}}>
      <Row >
        <Col xs={8}>
          <Percussion/>
        </Col>
        <Col>
          <Stack className='col-11 justify-start p-2'>
            <p class="brand">DoriDrum</p>
            <Display/>
          </Stack> 
        </Col>
      </Row>
    </Container>
  );
}
