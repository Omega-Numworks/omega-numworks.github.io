import React from "react";
import styles from "./sass/Header.module.sass";
import classNames from "classnames";

type HeaderAccountProps = {
    username?: string | null;
    image?: string | null;
    hide?: boolean;
};

export default function HeaderAccount(props: HeaderAccountProps) {
    return (
        <div
            className={classNames({
                [styles.account]: true,
                [styles.accountHidden]: props.hide,
            })}
        >
            <div className={styles.accountUsername}>{props.username}</div>
            <img
                className={styles.accountImage}
                alt="profile"
                src={props.image || ""}
            />
        </div>
    );
}
