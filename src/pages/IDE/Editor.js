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
import {PopUp, PopUpContent, PopUpButtons, PopUpButton, PopUpBar, PopUpTitle, PopUpClose} from './components/PopUp';
import Monaco from './components/Monaco';
import Loader from './components/Loader';

export default class IDEEditor extends Component {
    constructor(props) {
        super(props);
        document.title = "Omega - IDE";

        this.state = {
            connector: GithubConnector.getInstance(),
            logged: null,
            tabs: [],
            selected_tab: 0,
            projects: null,
            selected_left_menu: null,
            left_menues: {
                "explorer": {
                    "icon": "insert_drive_file",
                    "render": this.renderExplorer.bind(this)
                }
            },
            confirm_popup_file: null
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        this.renderEditor = this.renderEditor.bind(this);
        this.renderGreeting = this.renderGreeting.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderLeftBar = this.renderLeftBar.bind(this);
        
        this.handleLeftBarClick = this.handleLeftBarClick.bind(this);
        this.handleFileClick = this.handleFileClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleMonacoChange = this.handleMonacoChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleTabClose = this.handleTabClose.bind(this);
        this.closeTab = this.closeTab.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.handlePopUpSave = this.handlePopUpSave.bind(this);

        if (this.state.connector.isLogged()) {
            this.state.logged = true;
        }
    }

    onAuthStateChanged() {
        this.setState({logged: this.state.connector.isLogged()});
        
        if (this.state.projects === null && this.state.connector.isLogged()) {
            this.state.connector.getProjects(function (projects) {
                this.setState({
                    projects: projects
                });
            }.bind(this));
        }
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
    
    getFileContent(project, file) {
        for (let i = 0; i < this.state.projects.length; i++) {
            let cur_project = this.state.projects[i];
            
            if (cur_project.name === project) {
                for (let j = 0; j < cur_project.files.length; j++) {
                    let cur_file = cur_project.files[j];
                    
                    if (cur_file.name === file) {
                        return cur_file.content;
                    }
                }
            }
        }
        
        return null;
    }
    
    getFileID(project, file) {
        for (let i = 0; i < this.state.projects.length; i++) {
            let cur_project = this.state.projects[i];
            
            if (cur_project.name === project) {
                for (let j = 0; j < cur_project.files.length; j++) {
                    let cur_file = cur_project.files[j];
                    
                    if (cur_file.name === file) {
                        return {"project": i, "file": j};
                    }
                }
            }
        }
        
        return null;
    }
    
    getTabID(project, file) {
        for (let i = 0; i < this.state.tabs.length; i++) {
            let tab = this.state.tabs[i]
            if (tab.project === project && tab.file === file) {
                return i;
            }
        }
        
        return -1;
    }
    
    handleMonacoChange(userdata, new_content) {
        let tab_id = this.getTabID(userdata.project, userdata.file);
        
        if (tab_id === -1) {
            return;
        }
        
        let tabs = this.state.tabs;
        let tab = tabs[tab_id];
        
        tab.content = new_content;
        tab.unsaved = true;
        
        tabs[tab_id] = tab;
        
        this.setState({
            tabs: tabs
        });
    }
    
    closePopUp() {
        this.setState({
            confirm_popup_file: null
        });
    }
    
    handlePopUpSave(userdata) {
        this.handleSave();
        this.closeTab(userdata);
    }
    
    handleSave() {
        let tabs = this.state.tabs;
        let tab_id = this.state.selected_tab;
        let tab = tabs[tab_id];
        
        let file_id = this.getFileID(tab.project, tab.file);
        
        if (file_id === null) {
            return;
        }
        
        let projects = this.state.projects;
        
        projects[file_id.project].files[file_id.file].content = tab.content;
        
        tab.unsaved = false;
        
        this.state.connector.saveProject(projects[file_id.project]);
        
        this.setState({
            tabs: tabs,
            projects: projects
        });
    }

    handleFileClick(userdata) {
        let tab_id = this.getTabID(userdata.project, userdata.file);
        
        if (tab_id !== -1) {
            this.setState({selected_tab: tab_id});
            return;
        }
        
        let tabs = this.state.tabs;
        let content = this.getFileContent(userdata.project, userdata.file);
        
        if (content === null) {
            return;
        }

        let new_tab = {
            "project": userdata.project,
            "file": userdata.file,
            "content": content,
            "unsaved": false
        };
        
        tabs.push(new_tab);
        
        this.setState({
            tabs: tabs,
            selected_tab: tabs.length - 1
        });
    }
    
    closeTab(userdata) {
        let tab_id = this.getTabID(userdata.project, userdata.file);
        
        if (tab_id === -1) {
            return;
        }
        
        let tabs = this.state.tabs
        tabs.splice(tab_id, 1);
        let selected_tab = this.state.selected_tab;
        
        if (this.state.selected_tab >= tab_id) {
            selected_tab = selected_tab > 0 ? selected_tab - 1 : 0;
        }
        
        this.setState({
            selected_tab: selected_tab,
            tabs: tabs
        });
        
        this.closePopUp();
    }

    handleTabClose(userdata) {
        let tab_id = this.getTabID(userdata.project, userdata.file);
        
        if (tab_id === -1) {
            return;
        }
        
        let tab = this.state.tabs[tab_id];
        
        if (tab.unsaved) {
            this.setState({
                confirm_popup_file: userdata
            });
        } else {
            this.closeTab(userdata);
        }
    }

    handleTabClick(userdata) {
        let tab_id = this.getTabID(userdata.project, userdata.file);
        
        if (tab_id !== -1) {
            this.setState({selected_tab: tab_id});
        }
    }

    renderExplorer() {
        let content = [];

        for (let i = 0; i < this.state.projects.length; i++) {
            let project = this.state.projects[i];

            var files = [];

            for (let j = 0; j < project.files.length; j++) {
                let file = project.files[j];

                files.push(<File onClick={this.handleFileClick} name={file.name} userdata={{"project": project.name, "file": file.name}} />)
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
            
            tabs.push(<TopBarTab onClose={this.handleTabClose} onClick={this.handleTabClick} selected={this.state.selected_tab == i} unsaved={tab.unsaved}  userdata={{"project": tab.project, "file": tab.file}}>{tab.file}</TopBarTab>)
        }
        
        let curr_tab = this.state.tabs[this.state.selected_tab];
    
        return (
            <div className="editor__panel">
                {/* Top Bar */}
                <TopBar>
                    <TopBarTabs>
                        {tabs}
                    </TopBarTabs>
                    <TopBarMore onClick={this.handleSave} />
                    <TopBarFileName>
                        {curr_tab.project} > {curr_tab.file}
                    </TopBarFileName>
                </TopBar>

                {/* Monaco */}
                <Monaco onChange={this.handleMonacoChange} value={curr_tab.content} userdata={{project: curr_tab.project, file: curr_tab.file}}/>
            </div>
        )
    }

    renderConfirmPopUp() {
        return (
            <PopUp>
                <PopUpBar>
                    <PopUpTitle>
                        You have unsaved changes
                    </PopUpTitle>
                    <PopUpClose userdata={this.state.confirm_popup_file} onClick={this.closePopUp} />
                </PopUpBar>
                <PopUpContent>
                    <p>Do you want to save the changes you made to {this.state.confirm_popup_file.file} ?</p>
                    <p>Your changes will be lost if you don't save them.</p>
                </PopUpContent>
                <PopUpButtons>
                    <PopUpButton userdata={this.state.confirm_popup_file} onClick={this.closePopUp}>Cancel</PopUpButton>
                    <PopUpButton userdata={this.state.confirm_popup_file} onClick={this.closeTab}>Don't save</PopUpButton>
                    <PopUpButton userdata={this.state.confirm_popup_file} onClick={this.handlePopUpSave} autofocus={true}>Save</PopUpButton>
                </PopUpButtons>
            </PopUp>
        );
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
                    <BottomBarElement icon="highlight_off" hoverable={true}>0</BottomBarElement>
                    <BottomBarElement right={true}>Powered by Omega</BottomBarElement>
                </BottomBar>
                
                {this.state.confirm_popup_file !== null ? this.renderConfirmPopUp() : ""}
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
            if (this.state.projects === null) {
                return this.renderLoading();
            } else {
                return this.renderEditor();
            }
        } else if (this.state.logged === false) {
            return (<Redirect to="/ide" />);
        } else {
            return this.renderLoading();
        }
    }
}
