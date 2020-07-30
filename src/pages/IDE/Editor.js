import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from "react-router-dom";
import GithubConnector from "../../GithubConnector";

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

    render() {
        if (this.state.logged === true) {
            return "ok!";
        } else if (this.state.logged === false) {
            return (<Redirect to="/ide" />);
        } else {
            return "loading...";
        }
    }
}
