import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import firebase from "../firebase"
import { FormattedMessage } from 'react-intl'
import GithubConnector from "../ide/GithubConnector"

export default class Toolbar extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isOpened: false,
            connector: GithubConnector.getInstance()
        };

        this.login = this.login.bind(this);
        this.onClickHamburger = this.onClickHamburger.bind(this);
        this.closeHamburger = this.closeHamburger.bind(this);
        this.logout = this.logout.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    
    componentDidMount() {
        this.state.connector.onAuthStateChanged(this.onAuthStateChanged);
    }
    
    componentWillUnmount() {
        this.state.connector.removeAuthStateChanged(this.onAuthStateChanged);
    }
    
    onAuthStateChanged() {
        this.forceUpdate();
    }

    login() {
        this.state.connector.login();
    }

    onClickHamburger() {
        this.setState({ isOpened: !this.state.isOpened }); 
    }

    closeHamburger() {
        this.setState({ isOpened: false });
    }

    logout() {
        this.state.connector.logout();
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
                    <NavLink onClick={this.closeHamburger} className="header__links__link" activeClassName="header__links__link-active" to="/wiki" exact>
                        <FormattedMessage id="toolbar.wiki" defaultMessage="Wiki" />
                    </NavLink>
                    <NavLink onClick={this.closeHamburger} className="header__links__link" activeClassName="header__links__link-active" to="/ide" exact>
                        <FormattedMessage id="toolbar.ide" defaultMessage="Python IDE" />
                    </NavLink>
                    <a className="header__links__link" href="https://github.com/Omega-Numworks/Omega" target="_blank" rel="noopener noreferrer">
                        <FormattedMessage id="toolbar.github" defaultMessage="GitHub" /><i className="header__links__link__icon material-icons-round">open_in_new</i>
                    </a>
                    
                    <div className="header__links__separator" />

                    <div onClick={this.login} className={"header__links__link" + (!this.state.connector.isLogged() ? "" : " header__links__link-hide")} activeClassName="header__links__link-active">
                        <FormattedMessage id="toolbar.login" defaultMessage="Login with Github" />
                    </div>
                    <div className={"header__links__profile-actions" + (!this.state.connector.isLogged() ? " header__links__profile-actions-hide" : "")}>
                        <div onClick={this.logout} className="header__links__link header__links__link-red header__links__profile-actions__link" activeClassName="header__links__link-active">
                            <FormattedMessage id="toolbar.logout" defaultMessage="Logout" />
                        </div>
                    </div>
                    <div className={"header__links__profile" + (!this.state.connector.isLogged() ? " header__links__profile-hide" : "")}>
                        <div className="header__links__profile__name">{(!this.state.connector.isLogged() ? "undefined" : this.state.connector.getUserName())}</div>
                        <img className="header__links__profile__picture" alt="profile" src={(!this.state.connector.isLogged() ? "" : this.state.connector.getUserPhotoURL())} />
                    </div>
                </div>
            </header>
        );
    }
}
