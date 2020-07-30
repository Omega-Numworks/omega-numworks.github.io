import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import GithubConnector from "../../GithubConnector";

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
                <Link to="/ide/editor" className="button button-outline button-big project-description__button">
                    <div className="project-description__button__text">
                        <FormattedMessage id="ide.head.launch" defaultMessage="LAUNCH" /> <i className="project-description__button__icon material-icons md-16">play_arrow</i>
                    </div>
                </Link>
            );
        } else {
            accessButton = (
                <div onClick={this.login} className="button button-outline button-big project-description__button">
                    <div className="project-description__button__text">
                        <FormattedMessage id="ide.head.connect" defaultMessage="LOGIN WITH GITHUB" /> <i className="project-description__button__icon material-icons md-16">play_arrow</i>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="content">
                <div className="project-description">
                    <h1 className="project-description__title">
                        <FormattedMessage id="ide.head.title" defaultMessage="Python IDE" />
                    </h1>
                    <h2 className="project-description__subtitle">
                        <FormattedMessage id="ide.head.subtitle" defaultMessage="An online Python IDE." />
                    </h2>
                    {accessButton}
                    <p className="project-description__description">
                        <FormattedMessage id="ide.head.description" defaultMessage="DESCRIPTION HERE" />
                    </p>
                    
                    {/* <h2 className="mb-3">A whole new set of features</h2> */}
                </div>
            </div>
        )
    }
}
