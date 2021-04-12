import React, { Component, MouseEventHandler } from "react";
import styles from "./sass/Header.module.sass";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

type HeaderLinkProps = {
    onClick?: MouseEventHandler;
    to?: string;
    icon?: string;
    isExternalLink?: boolean;
    red?: boolean;
    hide?: boolean;
    href?: string;
};

export default class HeaderLink extends Component<HeaderLinkProps> {
    constructor(props: HeaderLinkProps) {
        super(props);

        this.renderIcon = this.renderIcon.bind(this);

        this.renderContent = this.renderContent.bind(this);
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.props.children}
                {this.renderIcon(this.props.icon)}
            </React.Fragment>
        );
    }

    renderIcon(icon?: string) {
        if (icon) {
            return (
                <i className={"material-icons-round " + styles.link__icon}>
                    {icon}
                </i>
            );
        }
    }

    render() {
        var component;
        var props = {
            onClick: this.props.onClick,
            className: classNames({
                [styles.link]: true,
                [styles.linkRed]: this.props.red,
                [styles.linkHidden]: this.props.hide,
            }),
            exact: true,
        };

        if (this.props.to) {
            component = (
                <NavLink
                    to={this.props.to}
                    activeClassName={styles.linkActive}
                    {...props}
                    exact
                >
                    {this.renderContent()}
                </NavLink>
            );
        } else {
            var external = {};

            if (this.props.isExternalLink) {
                external = {
                    target: "_blank",
                    rel: "noopener noreferrer",
                };
            }

            component = (
                <a href={this.props.href} {...props} {...external}>
                    {this.renderContent()}
                </a>
            );
        }

        return component;
    }
}
