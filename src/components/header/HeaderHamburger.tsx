import React, { MouseEventHandler } from "react";
import styles from "./sass/Header.module.sass";

type HeaderHamburgerProps = {
    onClick?: MouseEventHandler;
};

export default function HeaderHamburger(props: HeaderHamburgerProps) {
    return (
        <div onClick={props.onClick} className={styles.hamburger}>
            <i className={`${styles.hamburgerIcon} material-icons-round`}>
                menu
            </i>
        </div>
    );
}
