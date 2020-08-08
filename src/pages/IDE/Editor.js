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
import {SimulatorScreen, SimulatorKeyboard} from './components/Simulator';
import Monaco from './components/Monaco';
import Loader from './components/Loader';
import JSZip from 'jszip';

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
            creating_file_in: null,
            creating_project: false,
            selected_left_menu: null,
            left_menues: {
                "explorer": {
                    "icon": "insert_drive_file",
                    "render": this.renderExplorer.bind(this)
                },
                "simulator": {
                    "icon": "play_arrow",
                    "render": this.renderSimulator.bind(this)
                },
                "calcultaor": {
                    "icon": "usb",
                    "render": this.renderCalculator.bind(this)
                }
            },
            confirm_popup_file: null,
            locked: false,
            simulator: null
        };

        this.simulator = <iframe title="Simulator" src="/ide/simulator" ref={(ref) => this.simulatorRef = ref} width="256px" height="192px" />;
        this.simulatorRef = null;

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
        this.handleFileRename = this.handleFileRename.bind(this);
        this.handleFileRemove = this.handleFileRemove.bind(this);
        this.handleFileCreate = this.handleFileCreate.bind(this);
        this.handleNewFileCancel = this.handleNewFileCancel.bind(this);
        this.handleNewFileValidate = this.handleNewFileValidate.bind(this);
        this.handleProjectRemove = this.handleProjectRemove.bind(this);
        this.handleNewProjectCancel = this.handleNewProjectCancel.bind(this);
        this.handleNewProjectValidate = this.handleNewProjectValidate.bind(this);
        this.handleCreateProject = this.handleCreateProject.bind(this);
        this.handleProjectRename = this.handleProjectRename.bind(this);
        this.handleProjectSelect = this.handleProjectSelect.bind(this);
        this.handleProjectRunSimu = this.handleProjectRunSimu.bind(this);
        this.handleProjectZip = this.handleProjectZip.bind(this);
        
        this.handleSimuKeyDown = this.handleSimuKeyDown.bind(this);
        this.handleSimuKeyUp = this.handleSimuKeyUp.bind(this);
        this.handleSimuScreen = this.handleSimuScreen.bind(this);
        this.handleSimuReload = this.handleSimuReload.bind(this);
    }

    handleProjectZip(userdata) {
        if (this.state.locked) {
            return;
        }

        if (!this.simulatorRef) {
            return;
        }

        let project_id = this.getProjectID(userdata);

        if (project_id === -1) {
            return;
        }

        if (this.state.projects[project_id].loaded) {
            var zip = new JSZip();
            
            for(let i = 0; i < this.state.projects[project_id].files.length; i++) {
                let file = this.state.projects[project_id].files[i];
                zip.file(file.name, file.content);
            }

            zip.generateAsync({type:"base64"}).then(function (base64) {
                var link = document.createElement('a');
                link.download = this.state.projects[project_id].name + '.zip';

                link.href = "data:application/zip;base64," + base64;
                link.click();
                
            }.bind(this));
        } else {
            let projects = this.state.projects;
            projects[project_id].loading = true;
            this.setState({
                locked: true,
                projects: projects
            });
            this.state.connector.loadProject(userdata, function(files) {
                let project_id = this.getProjectID(files.name);
                
                if (project_id === -1) {
                    return;
                }
                
                let projects = this.state.projects;
                
                projects[project_id] = files;
                
                var zip = new JSZip();
                
                for(let i = 0; i < projects[project_id].files.length; i++) {
                    let file = projects[project_id].files[i];
                    zip.file(file.name, file.content);
                }

                zip.generateAsync({type:"base64"}).then(function (base64) {
                    var link = document.createElement('a');
                    link.download = projects[project_id].name + '.zip';

                    link.href = "data:application/zip;base64," + base64;
                    link.click();
                    
                }.bind(this));
                    
                this.setState({
                    projects: projects,
                    locked: false
                });
            }.bind(this));
        }
    }

    handleProjectRunSimu(userdata) {
        if (this.state.locked) {
            return;
        }

        if (!this.simulatorRef) {
            return;
        }

        let project_id = this.getProjectID(userdata);

        if (project_id === -1) {
            return;
        }

        if (this.state.projects[project_id].loaded) {
            var event = new CustomEvent("reload-simu", {'detail': {'scripts': this.state.projects[project_id].files}});
            this.simulatorRef.contentWindow.document.dispatchEvent(event);

            this.setState({
                selected_left_menu: "simulator"
            });
        } else {
            let projects = this.state.projects;
            projects[project_id].loading = true;
            this.setState({
                locked: true,
                projects: projects
            });
            this.state.connector.loadProject(userdata, function(files) {
                let project_id = this.getProjectID(files.name);
                
                if (project_id === -1) {
                    return;
                }
                
                let projects = this.state.projects;
                
                projects[project_id] = files;
                
                var event = new CustomEvent("reload-simu", {'detail': {'scripts': projects[project_id].files}});
                this.simulatorRef.contentWindow.document.dispatchEvent(event);
                
                this.setState({
                    projects: projects,
                    selected_left_menu: "simulator",
                    locked: false
                });
            }.bind(this));
        }
    }
    
    handleSimuReload() {
        if (this.simulatorRef) {
            
            if (this.state.tabs.length === 0)
                return;
            
            let project_id = this.getProjectID(this.state.tabs[this.state.selected_tab].project);
            
            if (project_id === -1)
                return;
            
            let project = this.state.projects[project_id];
            
            if (!project.loaded)
                return;
            
            var event = new CustomEvent("reload-simu", {'detail': {'scripts': project.files}});
            this.simulatorRef.contentWindow.document.dispatchEvent(event);
            
            this.setState({
                selected_left_menu: "simulator"
            });
        }
    }
    
    handleSimuScreen() {
        if (this.simulatorRef) {
            var event = new CustomEvent("screenshot", {'detail': {}});
            this.simulatorRef.contentWindow.document.dispatchEvent(event);
        }
    }

    handleSimuKeyDown(num) {
        if (this.simulatorRef) {
            var event = new CustomEvent("key-down", {'detail': {'keynum': num}});
            this.simulatorRef.contentWindow.document.dispatchEvent(event);
        }
    }

    handleSimuKeyUp(num) {
        if (this.simulatorRef) {
            var event = new CustomEvent("key-up", {'detail': {'keynum': num}});
            this.simulatorRef.contentWindow.document.dispatchEvent(event);
        }
    }

    normalizeContent(content) {
        let new_content = content.replace(/\r\n/g, "\n");
        new_content = new_content.replace(/\r/g, "\n");
        
        if (!new_content.replace(/\s/g, '').length) {
            let comment  = "# This comment was added automatically to allow this file to save.\n"
                comment += "# You'll be able to remove it after adding text to the file.\n"
            new_content = comment + new_content;
        }
        
        if (!new_content.endsWith("\n")) {
            new_content += "\n";
        }
        
        return new_content;
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

        if (this.state.connector.isLogged()) {
            this.state.connector.getProjects(function (projects) {
                this.setState({
                    projects: projects,
                    logged: true
                });
            }.bind(this));
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
    
    getProjectID(project) {
        for (let i = 0; i < this.state.projects.length; i++) {
            let cur_project = this.state.projects[i];
            
            if (cur_project.name === project) {
                return i;
            }
        }
        
        return -1;
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
        
        tab.content = this.normalizeContent(new_content);
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
        if (this.state.locked) {
            return;
        }

        let tab = this.state.tabs[this.state.selected_tab];
        
        var file_id = this.getFileID(tab.project, tab.file);
        
        if (file_id === null) {
            return;
        }
        
        let projects = this.state.projects;
        projects[file_id.project].loading = true;
        
        this.setState({
            projects: projects,
            locked: true
        });
        
        let project = this.state.projects[file_id.project];
        project.files[file_id.file].content = this.normalizeContent(tab.content);
        
        this.state.connector.saveProject(project, function(project) {
            let tabs = this.state.tabs;
            let tab_id = this.state.selected_tab;
            let tab = tabs[tab_id];
            
            let projects = this.state.projects;
            
            projects[file_id.project] = project;
            projects[file_id.project].loading = false;
            
            tab.unsaved = false;
            
            this.setState({
                tabs: tabs,
                projects: projects,
                locked: false
            });
        }.bind(this));
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
            "content": this.normalizeContent(content),
            "unsaved": false
        };
        
        tabs.push(new_tab);
        
        this.setState({
            tabs: tabs,
            selected_tab: tabs.length - 1
        });
    }
    
    handleFileRename(userdata, oldname, newname) {
        if (this.state.locked) {
            return;
        }

        let file_id = this.getFileID(userdata.project, userdata.file);
        
        if (file_id === null) {
            return false;
        }
        
        if (this.getFileID(userdata.project, newname) !== null) {
            // File exists !
            return false;
        }
        
        let projects = this.state.projects;
        
        
        projects[file_id.project].loading = true;
        
        this.setState({
            projects: projects,
            locked: true
        });
        
        let project = projects[file_id.project];
        project.files[file_id.file].name = newname;
        
        this.state.connector.saveProject(project, function(project) {
            let projects = this.state.projects;
            projects[file_id.project] = project;
            projects[file_id.project].loading = false;
            
            let tab_id = this.getTabID(userdata.project, userdata.file);
            
            let tabs = this.state.tabs;
            
            if (tab_id !== -1) {
                tabs[tab_id].file = newname;
            }
            
            this.setState({
                tabs: tabs,
                projects: projects,
                locked: false
            });
        }.bind(this));
        
        return true;
    }
    
    handleFileRemove(userdata) {
        if (this.state.locked) {
            return;
        }

        let file_id = this.getFileID(userdata.project, userdata.file);
        
        if (file_id === null) {
            return false;
        }
        
        let projects = this.state.projects;
        
        projects[file_id.project].loading = true;
        this.handleTabClose(userdata, true);

        let project = JSON.parse(JSON.stringify(projects[file_id.project]));
        project.files.splice(file_id.file, 1);
        projects[file_id.project].files.splice(file_id.file, 1);
        
        this.setState({
            projects: projects,
            locked: true
        });

        this.state.connector.saveProject(project, function(project) {
            let projects = this.state.projects;
            projects[file_id.project] = project;
            projects[file_id.project].loading = false;
            
            this.setState({
                projects: projects,
                locked: false
            });
        }.bind(this));
    }
    
    handleFileCreate(userdata) {
        if (this.state.locked) {
            return;
        }

        if (this.state.creating_file_in !== null)
            return;
        
        let project_id = this.getProjectID(userdata);
        
        if (project_id === -1) {
            return;
        }
        
        if (this.state.projects[project_id].loaded) {
            this.setState({
                creating_file_in: userdata
            });
        } else {
            let projects = this.state.projects;
            projects[project_id].loading = true;
            this.setState({
                locked: true,
                projects: projects
            });
            this.state.connector.loadProject(userdata, function(files) {
                let project_id = this.getProjectID(files.name);
                
                if (project_id === -1) {
                    return;
                }
                
                let projects = this.state.projects;
                
                projects[project_id] = files;
                
                this.setState({
                    projects: projects,
                    creating_file_in: files.name,
                    locked: false
                });
            }.bind(this));
        }
    }

    handleNewFileCancel(userdata) {
        this.setState({
            creating_file_in: null,
        });
    }

    handleNewFileValidate(userdata, oldname, newname) {
        if (this.state.locked) {
            return;
        }

        if (newname === "") {
            this.setState({
                creating_file_in: null,
            });
            return;
        }

        let file_id = this.getFileID(userdata, newname);
        
        if (file_id !== null) {
            // File exists
            this.setState({
                creating_file_in: null
            });
            return;
        }
        
        let project_id = this.getProjectID(userdata);
        
        if (project_id === -1) {
            // Weird shit happens
            this.setState({
                creating_file_in: null
            });
            return;
        }
        
        let projects = this.state.projects;
        
        let newfile = {
            "name": newname,
            "content": "from math import *\n"
        };
        
        let project = JSON.parse(JSON.stringify(projects[project_id]));
        
        project.files.push(newfile);
        projects[project_id].files.push(newfile);
        projects[project_id].loading = true;
        
        this.setState({
            projects: projects,
            creating_file_in: null,
            locked: true
        });
        
        this.state.connector.saveProject(project, function(project) {
            let projects = this.state.projects;
            projects[project_id] = project;
            this.setState({
                projects: projects,
                creating_file_in: null,
                locked: false
            });
        }.bind(this));
    }
    
    handleProjectRemove(userdata) {
        if (this.state.locked) {
            return;
        }

        let project_id = this.getProjectID(userdata);
        
        if (project_id === -1) {
            return;
        }
        
        let projects = this.state.projects;
        
        projects[project_id].loading = true;
        
        this.setState({
            projects: projects,
            locked: true
        });
        
        this.state.connector.removeProject(userdata, function(name) {
            let project_id = this.getProjectID(name);
            
            if (project_id === -1) {
                return;
            }
            
            let projects = this.state.projects;
            
            let tabs = this.state.tabs;
            let newtabs = [];
            let selected_tab = this.state.selected_tab;
            
            for(let i = 0; i < tabs.length; i++) {
                if (tabs[i].project !== name) {
                    newtabs.push(tabs[i]);
                } else if (this.state.selected_tab >= i) {
                    selected_tab = selected_tab > 0 ? selected_tab - 1 : 0;
                }
            }
            
            projects.splice(project_id, 1);
            
            this.setState({
                projects: projects,
                tabs: newtabs,
                selected_tab: selected_tab,
                locked: false
            });
        }.bind(this));
    }
    
    handleCreateProject(userdata) {
        if (this.state.locked) {
            return;
        }

        this.setState({
            creating_project: true
        });
    }
    
    handleProjectRename(userdata, newname) {
        if (this.state.locked) {
            return;
        }

        let project_id = this.getProjectID(userdata);
        
        if (project_id === -1) {
            return;
        }
        
        let projects = this.state.projects;
        
        projects[project_id].loading = true;
        
        this.setState({
            projects: projects,
            locked: true
        });
        
        this.state.connector.renameProject(userdata, newname, function(oldname, newname) {
            let project_id = this.getProjectID(userdata);
            
            if (project_id === -1) {
                return;
            }
            
            let projects = this.state.projects;
            
            projects[project_id].name = newname;
            projects[project_id].loading = false;
            
            let tabs = this.state.tabs;
            
            for(let i = 0; i < tabs.length; i++) {
                if (tabs[i].project === userdata) {
                    tabs[i].project = newname;
                }
            }
            
            this.setState({
                projects: projects,
                tabs: tabs,
                locked: false
            });
        }.bind(this));
    }
    
    handleProjectSelect(userdata, selected) {
        var project_id = this.getProjectID(userdata);
        
        if (project_id === -1) {
            return;
        }

        if (!this.state.projects[project_id].selected) {
            if (!this.state.projects[project_id].loaded) {
                if (this.state.locked) {
                    return;
                }

                let projects = this.state.projects;

                projects[project_id].loading = true;
                
                this.setState({
                    projects: projects,
                    locked: true
                });

                this.state.connector.loadProject(userdata, function(files) {
                    let project_id = this.getProjectID(files.name);

                    if (project_id === -1) {
                        return;
                    }

                    let projects = this.state.projects;
                    
                    projects[project_id] = files;
                    
                    this.setState({
                        projects: projects,
                        locked: false
                    });
                }.bind(this));
            } else {
                let projects = this.state.projects;
                projects[project_id].selected = true;
                this.setState({
                    projects: projects
                });
            }
        } else {
            let projects = this.state.projects;
            projects[project_id].selected = false;
            this.setState({
                projects: projects
            });
        }
    }
    
    handleNewProjectCancel(userdata) {
        this.setState({
            creating_project: false
        });
    }
    
    handleNewProjectValidate(userdata, name) {
        if (this.state.locked) {
            return;
        }

        if (name === "") {
            this.setState({
                creating_project: null,
            });
            return;
        }

        let project_id = this.getProjectID(name);
        
        if (project_id !== -1) {
            // File exists!
            this.setState({
                creating_project: false
            });
            return;
        }
        
        let projects = this.state.projects;
        projects.push({
            "name": name,
            "files": [],
            "loading": true,
            "loaded": true
        });
        
        this.setState({
            creating_project: false,
            locked: true
        });

        this.state.connector.createProject(name, function(files) {
            let projects = this.state.projects;
            let project_id = this.getProjectID(files.name);
            
            projects[project_id] = files;
            
            this.setState({
                projects: projects,
                locked: false
            });
        }.bind(this));
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

    handleTabClose(userdata, force) {
        if (this.state.locked) {
            return;
        }

        let tab_id = this.getTabID(userdata.project, userdata.file);
        
        if (tab_id === -1) {
            return;
        }
        
        let tab = this.state.tabs[tab_id];
        
        if (tab.unsaved && force !== true) {
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
    
    renderCalculator(shown) {
        return (
            <LeftMenu shown={shown}>
                <LeftMenuTitle>
                    CALCULATOR
                </LeftMenuTitle>
                <LeftMenuContent>
                    
                </LeftMenuContent>
            </LeftMenu>
        );
    }
    
    renderSimulator(shown) {
        return (
            <LeftMenu shown={shown}>
                <LeftMenuTitle>
                    SIMULATOR
                </LeftMenuTitle>
                <LeftMenuContent>
                    <SimulatorScreen onScreen={this.handleSimuScreen}>
                         {this.simulator}
                    </SimulatorScreen>
                    <SimulatorKeyboard onKeyDown={this.handleSimuKeyDown} onKeyUp={this.handleSimuKeyUp} />
                </LeftMenuContent>
            </LeftMenu>
        );
    }

    renderExplorer(shown) {
        let content = [];

        for (let i = 0; i < this.state.projects.length; i++) {
            let project = this.state.projects[i];

            var files = [];

            for (let j = 0; j < project.files.length; j++) {
                let file = project.files[j];

                files.push(<File locked={this.state.locked} onRemove={this.handleFileRemove} onRename={this.handleFileRename} onClick={this.handleFileClick} name={file.name} userdata={{"project": project.name, "file": file.name}} />)
            }
            
            var selected = project.selected;
            
            if (this.state.creating_file_in === project.name) {
                selected = true;
                files.push(<File locked={this.state.locked} userdata={project.name} onRename={this.handleNewFileValidate} onCancel={this.handleNewFileCancel} name={".py"} renaming={true} />)
            }

            content.push(<Project locked={this.state.locked} loading={project.loading} onZip={this.handleProjectZip} onRunSimu={this.handleProjectRunSimu} onSelect={this.handleProjectSelect} selected={selected} onRename={this.handleProjectRename} onRemove={this.handleProjectRemove} onNewFile={this.handleFileCreate} userdata={project.name} name={project.name}>{files}</Project>);
        }
        
        if (this.state.creating_project === true) {
            content.push(<Project locked={this.state.locked} selected={false} onRename={this.handleNewProjectValidate} onCancel={this.handleNewProjectCancel} renaming={true} name={""}>{files}</Project>);
        }
        
        return (
            <LeftMenu shown={shown}>
                <LeftMenuActions>
                    <LeftMenuAction icon="create_new_folder" onClick={this.handleCreateProject}/>
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
        let menues = [];
        
        for(let menu_name in this.state.left_menues) {
            let left_menu = this.state.left_menues[menu_name];
            let selected = (menu_name === this.state.selected_left_menu);
            
            menues.push(left_menu.render(selected));
            
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
                {menues}
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
    
        for (let i = 0; i < this.state.tabs.length; i++) {
            let tab = this.state.tabs[i];
            
            tabs.push(<TopBarTab onClose={this.handleTabClose} onClick={this.handleTabClick} selected={this.state.selected_tab === i} unsaved={tab.unsaved}  userdata={{"project": tab.project, "file": tab.file}}>{tab.file}</TopBarTab>)
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
            <div onContextMenu={(e) => {e.preventDefault(); e.stopPropagation()}} className={"editor "+ (this.state.locked ? " editor_locked" : "")}>
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
                    <BottomBarElement icon="play_arrow" hoverable={true} onClick={this.handleSimuReload}>Simulator</BottomBarElement>
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
            <div onContextMenu={(e) => {e.preventDefault(); e.stopPropagation()}} className="editor">
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
