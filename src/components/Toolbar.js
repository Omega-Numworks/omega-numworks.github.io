import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import firebase from "../firebase"
import { FormattedMessage } from 'react-intl'

export default class Toolbar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isProfileActive: false,
            isOpened: false
        };

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user: user });
            }
        });

        this.loginWithGitHub = this.loginWithGitHub.bind(this);
        this.onClickHamburger = this.onClickHamburger.bind(this);
        this.closeHamburger = this.closeHamburger.bind(this);
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
            if (errorCode === "auth/popup-closed-by-user" || errorCode === "auth/popup-blocked") {
                firebase.auth().signInWithRedirect(provider);
            }
        });
    }

    onClickHamburger() {
        this.setState({ isOpened: !this.state.isOpened }); 
    }

    closeHamburger() {
        this.setState({ isOpened: false });
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
                <div onClick={this.onClickHamburger} className="header__hamburger">
                    <i className="header__hamburger__icon material-icons-round">menu</i>
                </div>
                <NavLink onClick={this.closeHamburger} className="header__logo" to="/">
                    <FormattedMessage id="toolbar.omega" defaultMessage="Omega" />
                </NavLink>
                <div className={"header__links " + (this.state.isOpened ? "header__links-active" : "")}>
                    <NavLink onClick={this.closeHamburger} className="header__links__link" activeClassName="header__links__link-active" to="/install/latest" exact>
                        <FormattedMessage id="toolbar.install" defaultMessage="Install" />
                    </NavLink>
                    <NavLink onClick={this.closeHamburger} className="header__links__link" activeClassName="header__links__link-active" to="/releases" exact>
                        <FormattedMessage id="toolbar.releases" defaultMessage="Releases" />
                    </NavLink>
                    <NavLink onClick={this.closeHamburger} className="header__links__link" activeClassName="header__links__link-active" to="/simulator" exact>
                        <FormattedMessage id="toolbar.simulator" defaultMessage="Simulator" />
                    </NavLink>
                    <a className="header__links__link" href="https://github.com/Omega-Numworks/Omega" target="_blank" rel="noopener noreferrer">
                        <FormattedMessage id="toolbar.github" defaultMessage="GitHub" /><i className="header__links__link__icon material-icons-round">open_in_new</i>
                    </a>
                    
                    <div className="header__links__separator" />

                    <div onClick={this.loginWithGitHub} className={"header__links__link" + (this.state.user == null ? "" : " header__links__link-hide")} activeClassName="header__links__link-active">
                        <FormattedMessage id="toolbar.login" defaultMessage="Login with Github" />
                    </div>
                    <div className={"header__links__profile-actions" + (this.state.user == null ? " header__links__profile-actions-hide" : "")}>
                        <div onClick={this.logout} className="header__links__link header__links__link-red header__links__profile-actions__link" activeClassName="header__links__link-active">
                            <FormattedMessage id="toolbar.logout" defaultMessage="Logout" />
                        </div>
                        <NavLink onClick={this.closeHamburger} className="header__links__link header__links__profile-actions__link" activeClassName="header__links__link-active" to="/projects">
                            <FormattedMessage id="toolbar.myscripts" defaultMessage="My scripts" />
                        </NavLink>
                    </div>
                    <div className={"header__links__profile" + (this.state.user == null ? " header__links__profile-hide" : "")}>
                        <div className="header__links__profile__name">{(this.state.user == null ? "undefined" : this.state.user.displayName)}</div>
                        <img className="header__links__profile__picture" alt="profile" src={(this.state.user == null ? "" : this.state.user.photoURL)} />
                    </div>
                </div>
            </header>
        );
    }
}
