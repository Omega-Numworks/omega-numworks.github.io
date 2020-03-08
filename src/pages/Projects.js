import React, { Component } from 'react'
import GitHub from '../img/github.png'
import firebase from "../firebase"
import { Link, Redirect } from 'react-router-dom'

export default class Scripts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            createNew: false,
            newProjectName: '',
            gists: ''
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
                console.log(user);

                const requestOptions = {
                    headers: {
                        "Authorization": "token " + localStorage.getItem('accessToken'),
                    },
                    credentials: "same-origin"
                };

                fetch("https://api.github.com/user", requestOptions)
                    .then(res => res.json())
                    .then(
                    (result) => {
                        this.setState({
                            githubUser: result
                        });
                        console.log(result)

                        fetch("https://api.github.com/users/" + result.login + "/gists")
                            .then(res => res.json())
                            .then(
                            (result) => {
                                this.setState({
                                    gists: result
                                });
                                console.log(result)
                            },
                            (error) => {
                                this.setState({ });
                                console.log(error)
                            }
                        )
                    },
                    (error) => {
                        this.setState({ });
                        console.log(error)
                    }
                )

                
            }
        });
        
        console.log("auth:" + localStorage.getItem('accessToken'))

        this.onCreateNewScriptClick = this.onCreateNewScriptClick.bind(this);
        this.createGist = this.createGist.bind(this);
        this.onNewProjectNameChange = this.onNewProjectNameChange.bind(this);
    }

    onCreateNewScriptClick() {
        this.setState({ createNew: !this.state.createNew })
    }

    async createGist() {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Authorization": "token " + localStorage.getItem('accessToken'),
            },
            credentials: "same-origin",
            body: JSON.stringify({
                "description": this.state.newProjectName,
                "public": true,
                "files": {
                  "main.py": {
                    "content": "from math import *\n"
                  }
                }
            })
        };
        const response = await fetch('https://api.github.com/gists', requestOptions);
        const data = await response.json();
        this.setState({ postId: data.id });
    }

    onNewProjectNameChange(event) {
        this.setState({ newProjectName: event.target.value });
    }

    render() {
        let gists;

        if (!this.state.gists) {
            gists = (<div className="scripts__noscripts">
                Loading...
            </div>);
        } else if (this.state.gists.length === 0) {
            gists = (<div className="scripts__noscripts">
                Looks like you don't have projects yet.
            </div>);
        } else {
            //gists = []
            gists = this.state.gists.map(gist => {
                return (
                    <div className="scripts__script">
                        <span className="scripts__script__name">{gist.description}</span>
                        <img className="scripts__script__github" alt="GitHub" src={GitHub} />
                        <a className="scripts__script__action" href={'/editor/' + gist.id}>OPEN</a>
                    </div>
                );
            })
        }

        return (
            <div className="content">
                <div className="scripts">
                    {/* <div className="scripts__noscripts">
                        Looks like you don't have scripts yet.
                    </div> */}
                    <div className={"scripts__button" + (this.state.createNew ? " scripts__button-hide" : "")} onClick={this.onCreateNewScriptClick}>NEW PROJECT</div>
                    <div className={"scripts__script scripts__script-new" + (this.state.createNew ? "" : " scripts__script-new-hide")}>
                        <input className="scripts__script__input scripts__script__input-new" onChange={this.onNewProjectNameChange} type="text" placeholder="Project" />
                        {/* <span className="scripts__script__name scripts__script__name-new">.py</span> */}
                        <div onClick={this.createGist} className="scripts__script__action scripts__script__action-new scripts__script__action-new-blue">CREATE</div>
                        <div onClick={this.onCreateNewScriptClick} className="scripts__script__action scripts__script__action-new">CANCEL</div>
                    </div>
                    {gists}
                </div>
            </div>
        )
    }
}
