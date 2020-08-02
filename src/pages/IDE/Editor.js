import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from "react-router-dom";
import GithubConnector from "../../GithubConnector";
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
import OmegaLogo from '../../img/logo-ide.svg'

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
                    {/* Left bar */}
                    <div className="editor__leftbar">
                        <div className="editor__leftbar__container editor__leftbar__container-top">
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
                        <div className="editor__leftbar__container editor__leftbar__container-bottom">
                            <div className="editor__leftbar__icon">
                                <i className="editor__leftbar__icon__icon material-icons">account_circle</i>
                            </div>
                            <div className="editor__leftbar__icon">
                                <i className="editor__leftbar__icon__icon material-icons">exit_to_app</i>
                            </div>
                        </div>
                    </div>
                    {/* Left menu */}
                    <div className="editor__leftmenu">
                        <div class="editor__leftmenu__actions">
                            <i className="editor__leftmenu__actions__icon material-icons">create_new_folder</i>
                            <i className="editor__leftmenu__actions__icon material-icons">more_horiz</i>
                        </div>
                        <div class="editor__leftmenu__title">
                            <span className="editor__leftmenu__title__content">
                                EXPLORER
                            </span>
                        </div>
                        <div className="editor__leftmenu__content">
                            <div class="editor__leftmenu__dropdown editor__leftmenu__dropdown-selected">
                                <div class="editor__leftmenu__dropdown__title">
                                    <i className="editor__leftmenu__dropdown__title__chevron material-icons">keyboard_arrow_right</i>
                                    <span className="editor__leftmenu__dropdown__title__content">PROJET 1</span>
                                    <div className="editor__leftmenu__dropdown__title__actions">
                                        <i className="editor__leftmenu__dropdown__title__actions__icon material-icons">create</i>
                                        <i className="editor__leftmenu__dropdown__title__actions__icon material-icons">delete</i>
                                    </div>
                                </div>
                                <ul className="editor__leftmenu__dropdown__content">
                                    <li className="editor__leftmenu__dropdown__content__element">
                                        <i className="editor__leftmenu__dropdown__content__element__icon material-icons">insert_drive_file</i>
                                        <span className="editor__leftmenu__dropdown__content__element__name">test.py</span>
                                        <div className="editor__leftmenu__dropdown__content__element__actions">
                                            <i className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">create</i>
                                            <i className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">delete</i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="editor__panel">
                        {/* Greeting */}
                        {/*
                        <div className="editor__panel__greeting">
                            <div className="editor__panel__greeting__content">
                                <img className="editor__panel__greeting__content__logo" src={OmegaLogo} alt="Omega Logo"/>
                                <h1 className="editor__panel__greeting__content__title">
                                    Omega IDE
                                </h1>
                                <h2 className="editor__panel__greeting__content__version">
                                    2.0.0 Alpha
                                </h2>
                                <div className="editor__panel__greeting__content__help">
                                    <div className="editor__panel__greeting__content__help__line">
                                        <div className="editor__panel__greeting__content__help__left">
                                            Create a new project
                                        </div>
                                        <div className="editor__panel__greeting__content__help__right">
                                        <span className="editor__panel__greeting__content__help__key">Ctrl</span>
                                        +
                                        <span className="editor__panel__greeting__content__help__key">N</span>
                                        </div>
                                    </div>
                                    <div className="editor__panel__greeting__content__help__line">
                                        <div className="editor__panel__greeting__content__help__left">
                                            Run in simulator
                                        </div>
                                        <div className="editor__panel__greeting__content__help__right">
                                        <span className="editor__panel__greeting__content__help__key">F5</span>
                                        </div>
                                    </div>
                                    <div className="editor__panel__greeting__content__help__line">
                                        <div className="editor__panel__greeting__content__help__left">
                                            Send on calculator
                                        </div>
                                        <div className="editor__panel__greeting__content__help__right">
                                        <span className="editor__panel__greeting__content__help__key">F6</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        */}
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
                                            sit_amet_aaa.py
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
                                    {
                                    //value={code}
                                    //options={options}
                                    //onChange={(nv, e) => this.onChange(nv, e)}
                                    //editorDidMount={this.editorDidMount}
                                    }
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
