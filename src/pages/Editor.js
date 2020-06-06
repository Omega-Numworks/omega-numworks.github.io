import React, { Component } from 'react';
import NewWindow from 'react-new-window';
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
import Calculator from '../components/Calculator';
import Numworks from "numworks.js";

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            activeFile: 'main.py',
            saveState: {},
            newScriptName: '',
            localSave: {
                files: {}
            },
            isSaving: false,
            isUploading: false,
            contextMenuPosition: {
                x: 0,
                y: 0
            },
            statusMessage: 'Loading...',
            simuState: 'hidden',
            simuWindow: null,
            numworksInstance: null
        }
        
        if (typeof navigator.usb !== 'undefined') {
            this.state.numworksInstance = new Numworks();
            navigator.usb.addEventListener("disconnect", this.onUnexpectedDisconnect.bind(this));
            this.state.numworksInstance.autoConnect(function(){});
        }

        const requestOptions = {
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin"
        };

        fetch("https://api.github.com/gists/" + this.props.match.params.id, requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    project: result,
                });

                console.log(result)

                Object.entries(result.files).map(([key, value]) => {
                    this.setState({
                        localSave: {
                            files: {
                                ...this.state.localSave.files,
                                [key]: {
                                    content: value.content,
                                    filename: value.filename
                                }
                            }
                        }
                    })
                });

                this.setState({
                    activeFile: Object.entries(result.files)[0][0],
                    code: result.files[Object.entries(result.files)[0][0]].content
                });
            },
            (error) => {
                this.setState({ });
                console.error(error)
            }
        );

        this.save = this.save.bind(this);
        this.onUnexpectedDisconnect = this.onUnexpectedDisconnect.bind(this);
        this.upload = this.upload.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
        this.newScriptButtonClick = this.newScriptButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createScript = this.createScript.bind(this);
        this.onRightClickFile = this.onRightClickFile.bind(this);
        this.onClickOverlay = this.onClickOverlay.bind(this);
        this.delete = this.delete.bind(this);
        
        this.runSimu = this.runSimu.bind(this);
        this.handleKeyPressName = this.handleKeyPressName.bind(this);
        
        document.addEventListener("keydown", function(e) {
            if(e.ctrlKey && e.key === "s"){
                e.preventDefault();
                this.save();
                return false;
            } else if (e.ctrlKey && e.key === "o") {
                e.preventDefault();
                this.newScriptButtonClick();
                return false;
            } else if (e.key === "F5") {
                e.preventDefault();
                this.runSimu();
                return false;
            } else if (e.key === "F6") {
                e.preventDefault();
                this.upload();
                return false;
            }
        }.bind(this));
        
        window.onbeforeunload = function() {
            if (this.state.localSave && this.state.localSave.files) {
                var unsaved = false;
                Object.entries(this.state.localSave.files).map(([key, value]) => {
                    if (value !== null) {
                        if (this.state.saveState[key]) {
                            unsaved = true;
                        }
                    }
                });
                
                if (unsaved) {
                    return "You have unsaved modifications!";
                }
            }
        }.bind(this);
    }
    
    onUnexpectedDisconnect(e) {
        if (this.state.numworksInstance !== null) {
            this.state.numworksInstance.onUnexpectedDisconnect(e, function(){});
        }
    }

    editorDidMount(editor, monaco) {
        // console.log('editorDidMount', editor);
        editor.focus();
    }

    onChange(newValue, e) {
        // console.log('onChange', newValue, e);
        this.setState({
            saveState: {
                ...this.state.saveState,
                [this.state.activeFile]: true
            },
            code: newValue,
            localSave: {
                files: {
                    ...this.state.localSave.files,
                    [this.state.activeFile]: {
                        ...this.state.localSave.files[this.state.activeFile],
                        content: (newValue === "" ? "# " + this.state.activeFile + "\n" : newValue)
                    }
                }
            }
        });
    }
    
    newScriptButtonClick() {
        this.setState({ newScript: !this.state.newScript });
        document.getElementById("script_name").focus();
    }

    upload() {
        if (this.state.numworksInstance === null) {
            return;
        }
        
        this.setState({ isUploading: true });
        if (this.state.numworksInstance.device == null) {
            var _this = this;
            this.state.numworksInstance.detect(function() {
                _this.send_scripts();
            }, function(error) {
                console.error(error);
            });
        } else {
            this.send_scripts();
        }

    }
    
    send_scripts() {
        var _this = this;
        this.state.numworksInstance.backupStorage().then(function(storage) {
            
            var localSave = _this.state.localSave.files;
            for (var i in localSave) {
                var code = localSave[i].content;
                var period = localSave[i].filename.lastIndexOf('.');
                var fileName = localSave[i].filename.substring(0, period);
                var fileExtension = localSave[i].filename.substring(period + 1);
                
                for(var i in storage.records) {
                    var currentRecord = storage.records[i];
                    if (currentRecord.name == fileName && currentRecord.type == fileExtension) {
                        storage.records.splice(i, 1);
                    }
                }
                
                var newRecord = {
                    name: fileName,
                    type: fileExtension,
                    autoImport: true,
                    code: code
                };
                storage.records.push(newRecord);
            }
            _this.state.numworksInstance.installStorage(storage, function() {
                _this.setState({
                    isUploading: false
                });
            });
        });
    }

    save() {
        this.setState({ isSaving: true });

        const requestOptions = {
            method: 'PATCH',
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            body: JSON.stringify(this.state.localSave)
        };

        console.log(this.state);

        fetch("https://api.github.com/gists/" + this.props.match.params.id, requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isSaving: false,
                    saveState: {},
                    project: result,
                    localSave: {
                        files: result.files
                    }
                });

                this.changeFile(this.state.activeFile)
            },
            (error) => {
                this.setState({ });
                console.error(error)
            }
        );
    }

    changeFile(filename) {
        this.setState({
            activeFile: filename,
            code: this.state.localSave.files[filename].content
        });
    }
    
    handleChange(event) {
        this.setState({ newScriptName: event.target.value });
    }
    
    handleKeyPressName(event) {
        if(event.key === 'Enter') {
            this.createScript();
        }
    }

    createScript() {
        this.setState({
            newScript: false,
            newScriptName: '',
            saveState: {
                ...this.state.saveState,
                [this.state.newScriptName]: true
            },
            localSave: {
                files: {
                    ...this.state.localSave.files,
                    [this.state.newScriptName]: {
                        filename: this.state.newScriptName,
                        content: '# ' + this.state.newScriptName
                    }
                }
            }
        });

        console.log(this.state);
    }

    onRightClickFile(e, key) {
        e.preventDefault();
        this.setState({
            showContextMenu: true,
            contextMenuPosition: {
                x: e.pageX,
                y: e.pageY
            },
            contextMenuScriptName: key
        });
    }

    delete() {
        this.setState({
            showContextMenu: true,
            contextMenuScriptName: '',
            localSave: {
                files: {
                    ...this.state.localSave.files,
                    [this.state.contextMenuScriptName]: null
                }
            } 
        });
        this.setState({ showContextMenu: false });
        console.log(this.state);
    }

    onClickOverlay(e) {
        this.setState({ showContextMenu: false });
    }

    runSimu() {
        var simu_scripts = [];
        
        if (this.state.localSave && this.state.localSave.files) {
            Object.entries(this.state.localSave.files).map(([key, value]) => {
                simu_scripts.push({name: value.filename, code: value.content});
            });
        }
        
        var event = new CustomEvent("reload-simu", {'detail': {'scripts': simu_scripts}});
        document.getElementById("simu_frame").contentWindow.document.dispatchEvent(event);
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };

        let files = '';

        
        if (this.state.localSave && this.state.localSave.files) {
            console.log(this.state.localSave);
            files = Object.entries(this.state.localSave.files).map(([key, value]) => {
                if (value !== null) {
                    return <div onContextMenu={(e) => this.onRightClickFile(e, key)} onClick={() => this.changeFile(key)} className={"editor__sidebar__file" + (this.state.activeFile === key ? " editor__sidebar__file-active" : "")}>
                        <i className="editor__sidebar__file__icon material-icons-round">insert_drive_file</i>
                        <div className="editor__sidebar__file__name">{key}</div>
                        <div className={"editor__sidebar__file__circle" + (this.state.saveState[key] ? " editor__sidebar__file__circle-active" : "")}></div>
                    </div>;
                }
            });
        }

        var uploadButton = this.state.numworksInstance !== null ? (
            <div className="editor__toolbar__item editor__toolbar__item-yellow editor__toolbar__item-right" onClick={this.upload}>
                <i className={"material-icons-round editor__toolbar__item__icon" + (this.state.isUploading ? " editor__toolbar__item__icon-hide" : "")}>usb</i>
                <div className={"editor__toolbar__item__text" + (this.state.isUploading ? " editor__toolbar__item__text-hide" : "")}>UPLOAD ON DEVICE</div>
                <div className={"editor__toolbar__item__loading" + (this.state.isUploading ? " editor__toolbar__item__loading-show" : "")}>
                    <div className="editor__toolbar__item__loading__circle editor__toolbar__item__loading__circle-yellow"></div>
                </div>
            </div>
        ) : (
            <div className="editor__toolbar__item editor__toolbar__item-yellow-disabled editor__toolbar__item-disabled editor__toolbar__item-right" title="Your browser deosn't support WebUSB. Please use Chromium">
                <i className={"material-icons-round editor__toolbar__item__icon" + (this.state.isUploading ? " editor__toolbar__item__icon-hide" : "")}>usb</i>
                <div className={"editor__toolbar__item__text" + (this.state.isUploading ? " editor__toolbar__item__text-hide" : "")}>UPLOAD ON DEVICE</div>
                <div className={"editor__toolbar__item__loading" + (this.state.isUploading ? " editor__toolbar__item__loading-show" : "")}>
                    <div className="editor__toolbar__item__loading__circle editor__toolbar__item__loading__circle-yellow"></div>
                </div>
            </div>
        );

        return (
            <div className="content">
                <div className={"editor__overlay" + (this.state.showContextMenu ? " editor__overlay-show" : "")} onClick={this.onClickOverlay}></div>
                <div className={"editor__contextmenu" + (this.state.showContextMenu ? " editor__contextmenu-show" : "")} style={{top: this.state.contextMenuPosition.y + "px", left: this.state.contextMenuPosition.x + "px" }}>
                    <div className="editor__contextmenu__action">
                        <i className="material-icons-round editor__contextmenu__action__icon">edit</i>
                        <div className="editor__contextmenu__action__text">RENAME</div>
                    </div>
                    <div className="editor__contextmenu__action editor__contextmenu__action-red" onClick={this.delete}>
                        <i className="material-icons-round editor__contextmenu__action__icon">delete</i>
                        <div className="editor__contextmenu__action__text">DELETE</div>
                    </div>
                </div>
                <div className="editor__toolbar">
                    <div className="editor__toolbar__logo">Omega IDE</div>
                    <div className="editor__toolbar__text">{this.state.project ? this.state.project.description : "Loading..."}</div>
                    <div className="editor__toolbar__item" onClick={this.save}>
                        <i className={"material-icons-round editor__toolbar__item__icon" + (this.state.isSaving ? " editor__toolbar__item__icon-hide" : "")}>save</i>
                        <div className={"editor__toolbar__item__text" + (this.state.isSaving ? " editor__toolbar__item__text-hide" : "")}>SAVE</div>
                        <div className={"editor__toolbar__item__loading" + (this.state.isSaving ? " editor__toolbar__item__loading-show" : "")}>
                            <div className="editor__toolbar__item__loading__circle"></div>
                        </div>
                    </div>
                    <div className={"editor__toolbar__status" + (this.state.isUploading ? " editor__toolbar__status-active" : "")}>
                        <div className="editor__toolbar__status__text">{this.state.statusMessage}</div>
                    </div>
                    {uploadButton}
                    <div className="editor__toolbar__item editor__toolbar__item-green editor__toolbar__item-right" onClick={this.runSimu}>
                        <i className="material-icons-round editor__toolbar__item__icon">play_arrow</i>
                        <div className="editor__toolbar__item__text">SIMULATOR</div>
                    </div>
                </div>
                <div className="editor__sidebar">
                    {files}
                    <div className={"editor__sidebar__file editor__sidebar__file-new" + (this.state.newScript ? " editor__sidebar__file-hide" : "")} onClick={this.newScriptButtonClick}>
                        <i className="editor__sidebar__file__icon material-icons-round">add</i>
                        <div className="editor__sidebar__file__name">New script</div>
                    </div>
                    <div className={"editor__sidebar__add" + (this.state.newScript ? " editor__sidebar__add-active": "")}>
                        <span className="editor__sidebar__add__title">Name your new script</span>
                        <input type="text" id="script_name" className="editor__sidebar__add__input" placeholder="script.py" value={this.state.newScriptName} onChange={this.handleChange} onKeyPress={this.handleKeyPressName}></input>
                        <div className="editor__sidebar__add__button" onClick={this.createScript}>
                            <i className="editor__sidebar__add__button__icon material-icons-round">check</i>
                        </div>
                    </div>
                </div>
                <div className="editor__monaco">
                    <ReactResizeDetector handleWidth handleHeight>
                        <MonacoEditor
                            ref="monaco"
                            width="100%"
                            height="100%"
                            language="python"
                            theme="vs-dark"
                            value={code}
                            options={options}
                            onChange={(nv, e) => this.onChange(nv, e)}
                            editorDidMount={this.editorDidMount} />
                    </ReactResizeDetector>
                </div>
                <div className="editor__powered">Powered by Omega.</div>
                <div class="editor__simulator">
                    <iframe src="/editor/run" width="600" height="800" id="simu_frame"/>
                </div>
            </div>
        );
    }
}
