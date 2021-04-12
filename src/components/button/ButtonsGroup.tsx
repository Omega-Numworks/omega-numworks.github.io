import React from "react";
import styles from "./sass/Button.module.sass";
import classNames from "classnames";

export default function ButtonsGroup(props: React.HTMLProps<HTMLDivElement>) {
        return (
            <div
                {...props}
                className={classNames(styles.buttonGroup, props.className)}
            >
                {props.children}
            </div>
        );
}
