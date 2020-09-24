
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
        this.handleResize = this.handleResize.bind(this);
    }

    editorDidMount(editor, monaco) {
        this.setState({
            editor: editor,
            monaco: monaco
        });
    }
    
    handleResize() {
        if (this.state.editor !== null)
            this.state.editor.layout();
    }
    
    handleChange(newValue, e) {
        if (this.props.onChange)
            this.props.onChange(this.props.userdata, newValue);
    }

    render() {
        return (
            <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}>
                <div className="editor__panel__monaco">
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
                </div>
            </ReactResizeDetector>
        )
    }
}

