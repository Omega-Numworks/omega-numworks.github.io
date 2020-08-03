
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

export default class Monaco extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            editor: null,
            monaco: null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
    }

    editorDidMount(editor, monaco) {
        
    }
    
    handleChange(newValue, e) {
        if (this.props.onChange)
            this.props.onChange(newValue);
    }

    render() {
        return (
            <div className="editor__panel__monaco">
                <ReactResizeDetector handleWidth handleHeight>
                    <MonacoEditor
                        ref="monaco"
                        width="100%"
                        height="100%"
                        language="python"
                        theme="vs-dark"
                        value={this.props.value}
                        onChange={this.handleChange}
                        editorDidMount={this.editorDidMount}
                    />
                </ReactResizeDetector>
            </div>
        )
    }
}

