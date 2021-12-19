import React, { useEffect, useState } from "react";

import { FormattedMessage as Message } from "react-intl";
import GithubConnector from "../../GithubConnector";
import classNames from "classnames";

import HeaderLogo from "./HeaderLogo";
import HeaderAccount from "./HeaderAccount";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLink from "./HeaderLink";
import HeaderLinks from "./HeaderLinks";
import HeaderSpacer from "./HeaderSpacer";

import styles from "./sass/Header.module.sass";

type HeaderProps = React.HTMLProps<HTMLHeadElement> & {
    theme: string;
    toggleTheme: () => void;
};

export default function Header(props: HeaderProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [username, setUsername] = useState<string>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string>();

    const connector = GithubConnector.getInstance();

    useEffect(() => {
        connector.onAuthStateChanged(onAuthStateChanged);
        return () => connector.removeAuthStateChanged(onAuthStateChanged);
    });

    const onAuthStateChanged = () => {
        setUsername(connector.getUserName() || undefined);
        setProfilePicture(connector.getUserPhotoURL() || undefined);
        setIsLoggedIn(connector.isLogged());
    };

    const login = () => connector.login();
    const logout = () => connector.logout();

    const toggleHamburger = () => setIsOpened(!isOpened);
    const closeHamburger = () => setIsOpened(false);

    let messages = {
        omega: <Message id="toolbar.omega" defaultMessage="Omega" />,
        install: <Message id="toolbar.install" defaultMessage="Install" />,
        releases: <Message id="toolbar.releases" defaultMessage="Releases" />,
        simulator: (
            <Message id="toolbar.simulator" defaultMessage="Simulator" />
        ),
        wiki: <Message id="toolbar.wiki" defaultMessage="Wiki" />,
        IDE: <Message id="toolbar.ide" defaultMessage="Python IDE" />,
        gitHub: <Message id="toolbar.github" defaultMessage="GitHub" />,
        epsilon: <Message id="toolbar.epsilon" defaultMessage="Epsilon" />,
        login: (
            <Message id="toolbar.login" defaultMessage="Login with Github" />
        ),
        logout: <Message id="toolbar.logout" defaultMessage="Logout" />,
    };

    return (
        <header
            className={classNames({
                [styles.header]: true,
                [styles.headerOpened]: isOpened,
                header: true, // For Omega-IDE
            })}
        >
            <HeaderLogo onClick={closeHamburger} to="/">
                {messages.omega}
            </HeaderLogo>
            <HeaderLinks>
                <HeaderLink onClick={closeHamburger} to="/install/latest">
                    {messages.install}
                </HeaderLink>
                <HeaderLink onClick={closeHamburger} to="/releases">
                    {messages.releases}
                </HeaderLink>
                <HeaderLink onClick={closeHamburger} to="/simulator">
                    {messages.simulator}
                </HeaderLink>
                <HeaderLink onClick={closeHamburger} to="/ide">
                    {messages.IDE}
                </HeaderLink>
                <HeaderLink onClick={closeHamburger} to="/epsilon">
                    {messages.epsilon}
                </HeaderLink>
                <HeaderLink
                    href="https://github.com/Omega-Numworks/Omega"
                    icon="open_in_new"
                    isExternalLink
                >
                    {messages.gitHub}
                </HeaderLink>
                <HeaderSpacer />
                <HeaderLink onClick={props.toggleTheme}>
                    <span role="img" aria-label="moon">
                        {props.theme === "dark" ? (
                            <span
                                style={{ verticalAlign: "middle" }}
                                className="material-icons-round"
                            >
                                dark_mode
                            </span>
                        ) : (
                            <span
                                style={{ verticalAlign: "middle" }}
                                className="material-icons-round"
                            >
                                light_mode
                            </span>
                        )}
                    </span>
                </HeaderLink>
                <HeaderLink onClick={login} hide={isLoggedIn}>
                    {messages.login}
                </HeaderLink>
                <HeaderLink onClick={logout} hide={!isLoggedIn} red>
                    {messages.logout}
                </HeaderLink>
                <HeaderAccount
                    username={username}
                    image={profilePicture}
                    hide={!isLoggedIn}
                />
            </HeaderLinks>
            <HeaderHamburger onClick={toggleHamburger} />
        </header>
    );
}
