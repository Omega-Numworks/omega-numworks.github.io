import React from "react";
import styles from "./sass/Header.module.sass";
import { NavLink, NavLinkProps } from "react-router-dom";
import classNames from "classnames";

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
