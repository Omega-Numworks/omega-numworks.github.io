import React, { Component } from 'react';
import GithubConnector from "../GithubConnector";
import ImgBanner from '../img/banner.png'
import { Button } from '@quentinguidee/react-jade-ui';

export default class IDEMain extends Component {
    constructor(props) {
        super(props);
        document.title = "Omega - IDE";
        
        this.state = {
            connector: GithubConnector.getInstance()
        };
        
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
        this.login = this.login.bind(this);
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    
    componentDidMount() {
        this.state.connector.onAuthStateChanged(this.onAuthStateChanged);
    }
    
    componentWillUnmount() {
        this.state.connector.removeAuthStateChanged(this.onAuthStateChanged);
    }
    
    login() {
        this.state.connector.login();
    }

    onAuthStateChanged() {
        this.forceUpdate();
    }

    render() {
        
        var accessButton = null;
        
        if (this.state.connector.isLogged()) {
            accessButton = (
                <Button to="/ide/editor" className="project-description__button" rightIcon='play_arrow' outline big>
                    LAUNCH 
                </Button>
            );
        } else {
            accessButton = (
                <Button onClick={this.login} className="project-description__button" rightIcon='play_arrow' outline big>
                        LOGIN WITH GITHUB
                </Button>
            );
        }
        
        return (
            <div className="content">
                <div className="project-description" style={{backgroundImage: `url(${ImgBanner})`}}>
                    <h1 className="project-description__title">
                        Python IDE
                    </h1>
                    <h2 className="project-description__subtitle">
                        An online Python IDE.
                    </h2>
                    {accessButton}
                    <p className="project-description__description">
                        DESCRIPTION HERE
                    </p>
                    
                    {/* <h2 className="mb-3">A whole new set of features</h2> */}
                </div>
            </div>
        )
    }
}
