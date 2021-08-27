import React from "react";

import { NavLink, NavLinkProps } from "react-router-dom";
import classNames from "classnames";

import styles from "./sass/Header.module.sass";

export default function HeaderLogo(props: NavLinkProps) {
    return (
        <NavLink
            {...props}
            className={classNames(styles.logo, props.className)}
        >
            {props.children}
        </NavLink>
    );
}
