import React, { MouseEventHandler } from "react";

import classNames from "classnames";

import styles from "./sass/Header.module.sass";

type HeaderHamburgerProps = {
    onClick?: MouseEventHandler;
};

export default function HeaderHamburger(props: HeaderHamburgerProps) {
    return (
        <div onClick={props.onClick} className={styles.hamburger}>
            <i
                className={classNames(
                    styles.hamburgerIcon,
                    "material-icons-round"
                )}
            >
                menu
            </i>
        </div>
    );
}
