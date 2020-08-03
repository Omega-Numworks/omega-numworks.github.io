import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
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
            logged: null,
            tabs: [{
                "project": "test",
                "file": "aaa.py",
                "content": "juhytgfrd\n",
                "unsaved": false
            }],
            selected_tab: 0,
            files: [{
                "name": "test",
                "files": [{
                    "name": "aaa.py",
                    "content": "from math import *\n"
                }, {
                    "name": "bbb.py",
                    "content": "ikjuyhtgfr\n"
                }]
            }],
            selected_left_menu: null,
            left_menues: {
                "explorer": {
                    "icon": "insert_drive_file",
                    "render": this.renderExplorer.bind(this)
                }
            }
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        this.renderEditor = this.renderEditor.bind(this);
        this.renderGreeting = this.renderGreeting.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderLeftBar = this.renderLeftBar.bind(this);
        
        this.handleLeftBarClick = this.handleLeftBarClick.bind(this);

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
    
    renderExplorer() {
        let content = [];

        for (let i in this.state.files) {
            let project = this.state.files[i];

            var files = [];

            for (let j in project.files) {
                let file = project.files[j];

                files.push(<File name={file.name} userdata={{"project": project.name, "file": file.name}} />)
            }

            content.push(<Project name={project.name}>{files}</Project>);
        }
        
        return (
            <LeftMenu>
                <LeftMenuActions>
                    <LeftMenuAction icon="create_new_folder"/>
                    <LeftMenuAction icon="more_horiz"/>
                </LeftMenuActions>
                <LeftMenuTitle>
                    EXPLORER
                </LeftMenuTitle>
                <LeftMenuContent>
                    {content}
                </LeftMenuContent>
            </LeftMenu>
        );
    }
    
    handleLeftBarClick(userdata) {
        if (userdata === this.state.selected_left_menu) {
            this.setState({
                selected_left_menu: null
            });
        } else {
            this.setState({
                selected_left_menu: userdata
            });
        }
    }
    
    renderLeftBar() {
        let actions = [];
        let menu_render = null;
        
        for(let menu_name in this.state.left_menues) {
            let left_menu = this.state.left_menues[menu_name];
            let selected = (menu_name === this.state.selected_left_menu);
            
            if (selected)
                menu_render = left_menu.render;
            
            actions.push(<LeftBarAction onClick={this.handleLeftBarClick} userdata={menu_name} selected={selected} icon={left_menu.icon} />);
        }
        
        return (
            <>
                <LeftBar>
                    <LeftBarTop>
                        {actions}
                    </LeftBarTop>
                    <LeftBarBottom>
                        <LeftBarAction img={this.state.connector.getUserPhotoURL()} icon="account_circle" />
                        <Link to="/ide">
                            <LeftBarAction icon="exit_to_app" />
                        </Link>
                    </LeftBarBottom>
                </LeftBar>
                {menu_render !== null ? menu_render() : ""}
            </>
        );
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
    
    renderCentralPane() {
        let tabs = [];
    
        for (let i in this.state.tabs) {
            let tab = this.state.tabs[i];
            
            tabs.push(<TopBarTab selected={this.state.selected_tab == i} unsaved={tab.unsaved} userdata={{tab}}>{tab.file}</TopBarTab>)
        }
    
        return (
            <div className="editor__panel">
                {/* Top Bar */}
                <TopBar>
                    <TopBarTabs>
                        {tabs}
                    </TopBarTabs>
                    <TopBarMore />
                    <TopBarFileName>
                        {this.state.tabs[this.state.selected_tab].project} > {this.state.tabs[this.state.selected_tab].file}
                    </TopBarFileName>
                </TopBar>

                {/* Monaco */}
                <Monaco value={this.state.tabs[this.state.selected_tab].content}/>
            </div>
        )
    }

    renderEditor() {
        return (
            <div className="editor">
                {/* Loading */}
                <Loader hidden={true}/>

                <div className="editor__panels">
                    {/* Left bar */}
                    {this.renderLeftBar()}

                    {/* Left menu */}
                    
                    {this.state.tabs.length === 0 ? this.renderGreeting() : this.renderCentralPane()}
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
