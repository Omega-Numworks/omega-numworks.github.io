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
        // Hide the header and footer
        var headers = document.getElementsByClassName("header");
        
        for(var i = 0; i < headers.length; i++) {
            headers[i].classList.add("header__hidden");
        }
        
        var footers = document.getElementsByClassName("footer");
        
        for(var i = 0; i < footers.length; i++) {
            footers[i].classList.add("footer__hidden");
        }
        
        this.state.connector.onAuthStateChanged(this.onAuthStateChanged);
    }
    
    componentWillUnmount() {
        // Show the header and footer again
        var headers = document.getElementsByClassName("header");
        
        for(var i = 0; i < headers.length; i++) {
            headers[i].classList.remove("header__hidden");
        }
        
        var footers = document.getElementsByClassName("footer");
        
        for(var i = 0; i < footers.length; i++) {
            footers[i].classList.remove("footer__hidden");
        }
        
        this.state.connector.removeAuthStateChanged(this.onAuthStateChanged);
    }
    
    renderEditor() {
        return (
            <div className="editor">
                <div className="editor__loading editor__loading__hidden">
                    <div className="editor__loading__content">
                        <p className="editor__loading__content__title">
                            Omega IDE
                        </p>
                        <i className="editor__loading__content__spinner material-icons">hourglass_empty</i>
                    </div>
                </div>
                
                <div className="editor__topbar">
                    <div className="editor__topbar__tabs">
                        <div className="editor__topbar__tabs__container">
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    lorem.py
                                </span>
                                <i className="editor__topbar__tab__close editor__topbar__tab__close-unsaved material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    ipsum.py
                                </span>
                                <i className="editor__topbar__tab__close material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab editor__topbar__tab-selected">
                                <span className="editor__topbar__tab__name">
                                    dolor.py
                                </span>
                                <i className="editor__topbar__tab__close editor__topbar__tab__close-unsaved material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    sit_amet_aaa.py
                                </span>
                                <i className="editor__topbar__tab__close material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    lorem.py
                                </span>
                                <i className="editor__topbar__tab__close editor__topbar__tab__close-unsaved material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    ipsum.py
                                </span>
                                <i className="editor__topbar__tab__close material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab editor__topbar__tab-selected">
                                <span className="editor__topbar__tab__name">
                                    dolor.py
                                </span>
                                <i className="editor__topbar__tab__close editor__topbar__tab__close-unsaved material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    sit_amet_aaa.py
                                </span>
                                <i className="editor__topbar__tab__close material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    lorem.py
                                </span>
                                <i className="editor__topbar__tab__close editor__topbar__tab__close-unsaved material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    ipsum.py
                                </span>
                                <i className="editor__topbar__tab__close material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab editor__topbar__tab-selected">
                                <span className="editor__topbar__tab__name">
                                    dolor.py
                                </span>
                                <i className="editor__topbar__tab__close editor__topbar__tab__close-unsaved material-icons">close</i>
                            </div>
                            <div className="editor__topbar__tab">
                                <span className="editor__topbar__tab__name">
                                    sit_amet_aaa.py
                                </span>
                                <i className="editor__topbar__tab__close material-icons">close</i>
                            </div>
                        </div>
                    </div>
                    <div className="editor__topbar__more">
                        <i className="editor__topbar__more__icon material-icons">more_horiz</i>
                    </div>
                    
                    <div className="editor__topbar__filename">
                        <span className="editor__topbar__filename__content">
                            Projet > fichier.py
                        </span>
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
                            value={""}
                        />
                            {/*value={code}
                            options={options}
                            onChange={(nv, e) => this.onChange(nv, e)}
                            editorDidMount={this.editorDidMount}*/}
                    </ReactResizeDetector>
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
