import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from "react-router-dom";
import GithubConnector from "../../GithubConnector";
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

export default class IDEEditor extends Component {
    constructor(props) {
        super(props);
        document.title = "Omega - IDE";
        
        this.state = {
            connector: GithubConnector.getInstance(),
            logged: null
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
        
        this.renderEditor = this.renderEditor.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        
        if (this.state.connector.isLogged()) {
            this.state.logged = true;
        }
    }
    
    onAuthStateChanged() {
        this.setState({logged: this.state.connector.isLogged()});
    }
    
    componentDidMount() {
        // Hide the cookies think
        let ccrevokes = document.getElementsByClassName("cc-revoke");
        
        for(let i = 0; i < ccrevokes.length; i++) {
            ccrevokes[i].style.display = "none"
        }
        
        let ccgrowers = document.getElementsByClassName("cc-grower");
        
        for(let i = 0; i < ccgrowers.length; i++) {
            ccgrowers[i].style.display = "none"
        }
        
        // Hide the header and footer
        let headers = document.getElementsByClassName("header");
        
        for(let i = 0; i < headers.length; i++) {
            headers[i].classList.add("header__hidden");
        }
        
        let footers = document.getElementsByClassName("footer");
        
        for(let i = 0; i < footers.length; i++) {
            footers[i].classList.add("footer__hidden");
        }
        
        this.state.connector.onAuthStateChanged(this.onAuthStateChanged);
    }
    
    componentWillUnmount() {
        // Show the cookies think
        let ccrevokes = document.getElementsByClassName("cc-revoke");
        
        for(let i = 0; i < ccrevokes.length; i++) {
            ccrevokes[i].style.display = "flex"
        }
        
        let ccgrowers = document.getElementsByClassName("cc-grower");
        
        for(let i = 0; i < ccgrowers.length; i++) {
            ccgrowers[i].style.display = "inherit"
        }
        
        // Show the header and footer again
        let headers = document.getElementsByClassName("header");
        
        for(let i = 0; i < headers.length; i++) {
            headers[i].classList.remove("header__hidden");
        }
        
        let footers = document.getElementsByClassName("footer");
        
        for(let i = 0; i < footers.length; i++) {
            footers[i].classList.remove("footer__hidden");
        }
        
        this.state.connector.removeAuthStateChanged(this.onAuthStateChanged);
    }
    
    renderEditor() {
        return (
            <div className="editor">
                {/* Loading */}
                <div className="editor__loading editor__loading__hidden">
                    <div className="editor__loading__content">
                        <p className="editor__loading__content__title">
                            Omega IDE
                        </p>
                        <i className="editor__loading__content__spinner material-icons">hourglass_empty</i>
                    </div>
                </div>
                
                <div className="editor__panels">
                    <div className="editor__leftbar">
                        <div className="editor__leftbar__icon">
                            <i className="editor__leftbar__icon__icon material-icons">insert_drive_file</i>
                        </div>
                        <div className="editor__leftbar__icon editor__leftbar__icon-selected">
                            <i className="editor__leftbar__icon__icon material-icons">play_arrow</i>
                        </div>
                        <div className="editor__leftbar__icon">
                            <i className="editor__leftbar__icon__icon material-icons">show_chart</i>
                        </div>
                        <div className="editor__leftbar__icon">
                            <i className="editor__leftbar__icon__icon material-icons">error</i>
                        </div>
                    </div>
                    <div className="editor__panel">
                        {/* Top Bar */}
                        <div className="editor__panel__topbar">
                            <div className="editor__panel__topbar__tabs">
                                <div className="editor__panel__topbar__tabs__container">
                                    <div className="editor__panel__topbar__tab">
                                        <span className="editor__panel__topbar__tab__name">
                                            lorem.py
                                        </span>
                                        <i className="editor__panel__topbar__tab__close editor__panel__topbar__tab__close-unsaved material-icons">close</i>
                                    </div>
                                    <div className="editor__panel__topbar__tab">
                                        <span className="editor__panel__topbar__tab__name">
                                            ipsum.py
                                        </span>
                                        <i className="editor__panel__topbar__tab__close material-icons">close</i>
                                    </div>
                                    <div className="editor__panel__topbar__tab editor__panel__topbar__tab-selected">
                                        <span className="editor__panel__topbar__tab__name">
                                            dolor.py
                                        </span>
                                        <i className="editor__panel__topbar__tab__close editor__panel__topbar__tab__close-unsaved material-icons">close</i>
                                    </div>
                                    <div className="editor__panel__topbar__tab">
                                        <span className="editor__panel__topbar__tab__name">
                     let                       sit_amet_aaa.py
                                        </span>
                                        <i className="editor__panel__topbar__tab__close material-icons">close</i>
                                    </div>
                                </div>
                            </div>
                            <div className="editor__panel__topbar__more">
                                <i className="editor__panel__topbar__more__icon material-icons">more_horiz</i>
                            </div>
                            
                            <div className="editor__panel__topbar__filename">
                                <span className="editor__panel__topbar__filename__content">
                                    Projet > fichier.py
                                </span>
                            </div>
                        </div>

                        {/* Monaco */}
                        <div className="editor__panel__monaco">
                            <ReactResizeDetector handleWidth handleHeight>
                                <MonacoEditor
                                    ref="monaco"
                                    width="100%"
                                    height="100%"
                                    language="python"
                                    theme="vs-dark"
                                    value={""}
                                />
                                    {/*value={code}
                                    options={options}
                                    onChange={(nv, e) => this.onChange(nv, e)}
                                    editorDidMount={this.editorDidMount}*/}
                            </ReactResizeDetector>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="editor__bottombar">
                    <div className="editor__bottombar__content editor__bottombar__content-hoverable">
                        <i className="editor__bottombar__content__icon material-icons">play_arrow</i>
                        <div className="editor__bottombar__content__text">Simulator</div>
                    </div>
                    <div className="editor__bottombar__content editor__bottombar__content-hoverable">
                        <i className="editor__bottombar__content__icon material-icons">usb</i>
                        <div className="editor__bottombar__content__text">Device</div>
                    </div>
                    <div className="editor__bottombar__content editor__bottombar__content-hoverable">
                        <i className="editor__bottombar__content__icon material-icons">error</i>
                        <div className="editor__bottombar__content__text">0</div>
                    </div>
                    <div className="editor__bottombar__content editor__bottombar__content-right">
                        <span className="editor__bottombar__content__text">Powered by Omega</span>
                    </div>
                </div>
            </div>
        );
    }
    
    renderLoading() {
        return (
            <div class="editor">
                <div className="editor__loading">
                    <div className="editor__loading__content">
                        <p className="editor__loading__content__title">
                            Omega IDE
                        </p>
                        <i class="editor__loading__content__spinner material-icons md-16">hourglass_empty</i>
                    </div>
                </div>
            </div>
        );
    }

    render() {
    
        if (this.state.logged === true) {
            return this.renderEditor();
        } else if (this.state.logged === false) {
            return (<Redirect to="/ide" />);
        } else {
            return this.renderLoading();
        }
    }
}
