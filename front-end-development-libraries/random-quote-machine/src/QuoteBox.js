import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons/faQuoteLeft'

export default function QuoteBox(props) {
    return (
        <div id="quote-box">
            <Row>
                <p id="text" className="quote"><FontAwesomeIcon icon={ faQuoteLeft }/> {props.quote}</p>
                <p id="author" className="author">- {props.author}</p>
            </Row>
            <ButtonToolbar className='justify-content-between'>
                <a target='_blank' rel="noreferrer noopener" href={"https://twitter.com/intent/tweet?text=\"" + props.quote + "\" - " + props.author}>
                    <Button id="tweet">
                        <FontAwesomeIcon icon={ faTwitter }/> Tweet
                    </Button>
                </a>
                <Button id="newQuote" onClick={props.newQuote}>
                    <FontAwesomeIcon icon={ faRefresh }/> New Quote
                </Button>
            </ButtonToolbar>
        </div>
    );
}