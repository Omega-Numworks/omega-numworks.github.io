import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import GithubConnector from "../../GithubConnector";
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

import File from './components/File';
import Project from './components/Project';
import {LeftMenu, LeftMenuTitle, LeftMenuContent, LeftMenuActions, LeftMenuAction} from './components/LeftMenu';
import {LeftBar, LeftBarTop, LeftBarBottom, LeftBarAction} from './components/LeftBar';
import {BottomBar, BottomBarElement} from './components/BottomBar';
import Loader from './components/Loader';

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
                <Loader hidden={true}/>

                <div className="editor__panels">
                    {/* Left bar */}
                    <LeftBar>
                        <LeftBarTop>
                            <LeftBarAction icon="insert_drive_file" selected={true} />
                            <LeftBarAction icon="play_arrow" />
                            <LeftBarAction icon="show_chart" />
                            <LeftBarAction icon="error" />
                        </LeftBarTop>
                        <LeftBarBottom>
                            <LeftBarAction icon="account_circle" />
                            <LeftBarAction icon="exit_to_app" />
                        </LeftBarBottom>
                    </LeftBar>

                    {/* Left menu */}
                    <LeftMenu>
                        <LeftMenuActions>
                            <LeftMenuAction icon="create_new_folder"/>
                            <LeftMenuAction icon="more_horiz"/>
                        </LeftMenuActions>
                        <LeftMenuTitle>
                            EXPLORER
                        </LeftMenuTitle>
                        <LeftMenuContent>
                            <Project name="test">
                                <File name="jaaj.py"/>
                                <File name="test.py"/>
                            </Project>
                        </LeftMenuContent>
                    </LeftMenu>

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

                <BottomBar>
                    <BottomBarElement icon="play_arrow" hoverable={true}>Simulator</BottomBarElement>
                    <BottomBarElement icon="usb" hoverable={true}>Device</BottomBarElement>
                    <BottomBarElement icon="error" hoverable={true}>0</BottomBarElement>
                    <BottomBarElement right={true}>Powered by Omega</BottomBarElement>
                </BottomBar>
            </div>
        );
    }

    renderLoading() {
        return (
            <div class="editor">
                <Loader />
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
