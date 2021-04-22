import React from "react";

import styles from "./sass/Title.module.sass";

type TitleProps = React.HTMLProps<HTMLHeadingElement>;

export default function Title(props: TitleProps) {
    return <div {...props} className={styles.title} />;
}
