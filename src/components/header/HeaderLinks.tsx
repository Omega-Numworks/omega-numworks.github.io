import React from "react";

import styles from "./sass/Header.module.sass";

type HeaderLinksProps = React.HTMLProps<HTMLDivElement>;

export default function HeaderLinks(props: HeaderLinksProps) {
    return (
        <div {...props} className={styles.links}>
            {props.children}
        </div>
    );
}
