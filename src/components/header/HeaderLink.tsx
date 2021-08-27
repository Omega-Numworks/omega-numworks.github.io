import React, { MouseEventHandler } from "react";

import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./sass/Header.module.sass";

type HeaderLinkProps = React.HTMLProps<any> & {
    onClick?: MouseEventHandler;
    to?: string;
    icon?: string;
    isExternalLink?: boolean;
    red?: boolean;
    hide?: boolean;
    href?: string;
    style?: {};
};

export default function HeaderLink(props: HeaderLinkProps) {
    let icon = undefined;
    if (props.icon) {
        icon = (
            <i
                className={classNames(
                    "material-icons-round",
                    styles.link__icon
                )}
            >
                {props.icon}
            </i>
        );
    }

    const content = (
        <React.Fragment>
            {props.children}
            {icon}
        </React.Fragment>
    );

    const additionalProps = {
        onClick: props.onClick,
        className: classNames({
            [styles.link]: true,
            [styles.linkRed]: props.red,
            [styles.linkHidden]: props.hide,
        }),
        style: props.style,
    };

    if (props.to) {
        return (
            <NavLink
                to={props.to}
                activeClassName={styles.linkActive}
                {...additionalProps}
                exact
            >
                {content}
            </NavLink>
        );
    } else {
        let external = {};
        if (props.isExternalLink) {
            external = {
                target: "_blank",
                rel: "noopener noreferrer",
            };
        }

        return (
            <a href={props.href} {...additionalProps} {...external}>
                {content}
            </a>
        );
    }
}
