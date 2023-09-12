import SplitPane from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { useState } from 'react';
import defaultMarkdown from './default.md'
import { marked } from 'marked'

export default function CodePane () {
    const [sizes, setSizes] = useState([
        '25%',
        'auto'
    ]);

    const [sourceCode, setSourceCode] = useState("");

    if (sourceCode === "")
        fetch(defaultMarkdown)
            .then(response => response.text())
            .then(text => setSourceCode(text));

    marked.use({breaks: true});
    
    return (
        <div className='codePane'>
            <SplitPane
                split='vertical'
                sizes={sizes}
                onChange={setSizes}
                resizerSize={2}
            >
                <textarea id="editor" value={sourceCode} onChange={event => setSourceCode(event.target.value)} />
                <div id="preview" dangerouslySetInnerHTML={{__html: marked.parse(sourceCode)}} />
            </SplitPane>
        </div>
    );
};