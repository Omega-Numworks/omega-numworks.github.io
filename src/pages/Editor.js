import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: 'def omega():\n\tprint("Hello World!")',
        }
    }
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }
    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <div className="content">
                <div className="editor__toolbar">
                    <div className="editor__toolbar__text">
                        script.py
                    </div>
                    <div className="editor__toolbar__item">
                        <i class="material-icons-round editor__toolbar__item__icon">edit</i>
                        <div className="editor__toolbar__item__text">RENAME</div>
                    </div>
                    <div className="editor__toolbar__item">
                        <i class="material-icons-round editor__toolbar__item__icon">save</i>
                        <div className="editor__toolbar__item__text">SAVE</div>
                    </div>
                    <div className="editor__toolbar__item">
                        <i class="material-icons-round editor__toolbar__item__icon">play_arrow</i>
                        <div className="editor__toolbar__item__text">RUN</div>
                    </div>
                </div>
                <MonacoEditor 
                    width="100%"
                    height="calc(100vh - 64px - 48px)"
                    language="python"
                    /* theme="vs-dark" */
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount} />
            </div>
        );
    }
}