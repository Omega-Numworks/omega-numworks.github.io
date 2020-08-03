import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import GithubConnector from "../../GithubConnector";

import File from './components/File';
import Project from './components/Project';
import {LeftMenu, LeftMenuTitle, LeftMenuContent, LeftMenuActions, LeftMenuAction} from './components/LeftMenu';
import {LeftBar, LeftBarTop, LeftBarBottom, LeftBarAction} from './components/LeftBar';
import {BottomBar, BottomBarElement} from './components/BottomBar';
import {Greeting, GreetingLogo, GreetingTitle, GreetingVersion, Help, HelpLine, HelpLeft, HelpRight, HelpKey} from './components/Greeting';
import {TopBarTabs, TopBarMore, TopBarFileName, TopBarTab, TopBar} from './components/TopBar';
import Monaco from './components/Monaco';
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

    renderGreeting() {
        return (
            <Greeting>
                <GreetingLogo />
                <GreetingTitle>Omega IDE</GreetingTitle>
                <GreetingVersion>2.0.0 Alpha</GreetingVersion>
                <Help>
                    <HelpLine>
                        <HelpLeft>Create a new project</HelpLeft>
                        <HelpRight>
                            <HelpKey>Ctrl</HelpKey> + <HelpKey>N</HelpKey>
                        </HelpRight>
                    </HelpLine>
                    <HelpLine>
                        <HelpLeft>Run simulator</HelpLeft>
                        <HelpRight>
                            <HelpKey>F5</HelpKey>
                        </HelpRight>
                    </HelpLine>
                    <HelpLine>
                        <HelpLeft>Send to device</HelpLeft>
                        <HelpRight>
                            <HelpKey>F6</HelpKey>
                        </HelpRight>
                    </HelpLine>
                </Help>
            </Greeting>
        );
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
                        {/* Top Bar */}
                        <TopBar>
                            <TopBarTabs>
                                <TopBarTab>aaa.py</TopBarTab>
                                <TopBarTab selected={true}>aaa.py</TopBarTab>
                                <TopBarTab unsaved={true}>aaa.py</TopBarTab>
                                <TopBarTab selected={true} unsaved={true}>aaa.py</TopBarTab>
                            </TopBarTabs>
                            <TopBarMore />
                            <TopBarFileName>
                                Projet > fichier.py
                            </TopBarFileName>
                        </TopBar>

                        {/* Monaco */}
                        <Monaco />
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
