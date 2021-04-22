import classNames from "classnames";
import React, { useState } from "react";

import { App } from "../../apps/apps";

import OmegaLogo from "./../../img/logo.png";

import styles from "./sass/Apps.module.sass";

type AppCardProps = {
    app: App;
    onClick: (app: App, selected: boolean) => void;
};

export default function AppCard(props: AppCardProps) {
    const { name, description } = props.app;

    const [selected, setSelected] = useState(false);

    const click = () => {
        props.onClick(props.app, !selected);
        setSelected(!selected);
    };

    const checkboxText = selected ? "Selected" : "Not selected";

    return (
        <div className={styles.app} onClick={click}>
            <img className={styles.image} src={OmegaLogo} alt={name} />
            <div className={styles.content}>
                <span className={styles.name}>{name}</span>
                <span className={styles.description}>{description.en}</span>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div
                className={classNames({
                    [styles.checkbox]: true,
                    [styles.checkboxSelected]: selected,
                })}
            >
                <span className={styles.checkboxText}>{checkboxText}</span>
                <span
                    className={classNames({
                        "material-icons-round": true,
                        [styles.checkboxIcon]: true,
                    })}
                >
                    check
                </span>
            </div>
        </div>
    );
}
