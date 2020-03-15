import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import firebase from "../firebase"
import { Link } from 'react-router-dom'

export default class Toolbar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isProfileActive: false
        };

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
            }
        });

        this.loginWithGitHub = this.loginWithGitHub.bind(this);
        this.onProfileClick = this.onProfileClick.bind(this);
        this.logout = this.logout.bind(this);
    }

    loginWithGitHub() {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("gist");

        firebase.auth().signInWithPopup(provider).then((result) => {
            var token = result.credential.accessToken;
            this.setState({ user: result.user });
            console.log(this.state.user);
            localStorage.setItem('accessToken', token);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode + "//" + errorMessage + "//" + email + "//" + credential);
        });
    }

    onProfileClick() {
        this.setState({ isProfileActive: !this.state.isProfileActive });
    }

    logout() {
        firebase.auth().signOut();
        this.setState({
            user: null,
            isProfileActive: false
        });
    }

    render() {
        return (
            <header className="header">
                <NavLink className="header__logo" to="/">Omega</NavLink>
                <div className="header__links">
                    <NavLink className="header__links__link" activeClassName="header__links__link-active" to="/install/latest" exact>Install</NavLink>
                    <NavLink className="header__links__link" activeClassName="header__links__link-active" to="/releases" exact>Releases</NavLink>
                    <NavLink className="header__links__link" activeClassName="header__links__link-active" to="/simulator" exact>Simulator</NavLink>
                    <a className="header__links__link" href="https://github.com/Omega-Numworks/Omega" target="_blank" rel="noopener noreferrer">Github</a>
                    
                    <div className="header__links__separator" />

                    <div onClick={this.loginWithGitHub} className={"header__links__link" + (this.state.user == null ? "" : " header__links__link-hide")} activeClassName="header__links__link-active">Login with GitHub</div>
                    <div className={"header__links__profile-actions" + (this.state.isProfileActive ? "" : " header__links__profile-actions-hide")}>
                        <div onClick={this.logout} className="header__links__link header__links__link-red header__links__profile-actions__link" activeClassName="header__links__link-active">Logout</div>
                        <Link className="header__links__link header__links__profile-actions__link" activeClassName="header__links__link-active" to="/projects">My scripts</Link>
                    </div>
                    <div onClick={this.onProfileClick} className={"header__links__profile" + (this.state.user == null ? " header__links__profile-hide" : "")}>
                        <div className="header__links__profile__name">{(this.state.user == null ? "undefined" : this.state.user.displayName)}</div>
                        <img className="header__links__profile__picture" alt="profile" src={(this.state.user == null ? "" : this.state.user.photoURL)} />
                    </div>
                </div>
            </header>
        );
    }
}
