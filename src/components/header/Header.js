import React, { Component } from 'react'
import { FormattedMessage as Message } from 'react-intl'
import GithubConnector from '../../GithubConnector'
import { Header as JHeader, HeaderLinks, HeaderLink, HeaderLogo, HeaderSeparator, HeaderSpacer, HeaderHamburger, HeaderAccount } from '@quentinguidee/react-jade-ui'
import './sass/header.sass'

export default class Header extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpened: false,
            connector: GithubConnector.getInstance()
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.toggleHamburger = this.toggleHamburger.bind(this);
        this.closeHamburger = this.closeHamburger.bind(this);

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

    logout() {
        this.state.connector.logout();
    }

    toggleHamburger() {
        this.setState({ isOpened: !this.state.isOpened }); 
    }

    closeHamburger() {
        this.setState({ isOpened: false });
    }

    render() {
        let isLogged = this.state.connector.isLogged();

        let messages = {
            omega: <Message id='toolbar.omega' defaultMessage='Omega' />,
            install: <Message id='toolbar.install' defaultMessage='Install' />,
            releases: <Message id='toolbar.releases' defaultMessage='Releases' />,
            simulator: <Message id='toolbar.simulator' defaultMessage='Simulator' />,
            wiki: <Message id='toolbar.wiki' defaultMessage='Wiki' />,
            IDE: <Message id='toolbar.ide' defaultMessage='Python IDE' />,
            gitHub: <Message id='toolbar.github' defaultMessage='GitHub' />,
            login: <Message id='toolbar.login' defaultMessage='Login with Github' />,
            logout: <Message id='toolbar.logout' defaultMessage='Logout' />,
        }

        return (
            <JHeader isOpened={this.state.isOpened} className='header'>
                <HeaderLogo onClick={this.closeHamburger} className='logo'>{messages.omega}</HeaderLogo>
                <HeaderSpacer/>
                <HeaderLinks>
                    <HeaderLink onClick={this.closeHamburger} to='/install/latest'>{messages.install}</HeaderLink>
                    <HeaderLink onClick={this.closeHamburger} to='/releases'>{messages.releases}</HeaderLink>
                    <HeaderLink onClick={this.closeHamburger} to='/simulator'>{messages.simulator}</HeaderLink>
                    {/* <HeaderLink onClick={this.closeHamburger}  to='/wiki'>{messages.wiki}</HeaderLink> */}
                    <HeaderLink onClick={this.closeHamburger} to='/ide'>{messages.IDE}</HeaderLink>
                    <HeaderLink href='https://github.com/Omega-Numworks/Omega' icon='open_in_new' isExternalLink>{messages.gitHub}</HeaderLink>
                    <HeaderSeparator />
                    <HeaderLink onClick={this.login} hide={isLogged}>{messages.login}</HeaderLink>
                    <HeaderLink onClick={this.logout} hide={!isLogged} red>{messages.logout}</HeaderLink>
                    <HeaderAccount 
                        username={(!isLogged ? undefined : this.state.connector.getUserName())}
                        image={(!isLogged ? '' : this.state.connector.getUserPhotoURL())}
                        hide={!isLogged} />
                </HeaderLinks>
                <HeaderHamburger onClick={this.toggleHamburger} />
            </JHeader>
        );
    }
}
