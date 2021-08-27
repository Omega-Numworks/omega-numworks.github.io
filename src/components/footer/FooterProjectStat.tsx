import React from "react";

import classNames from "classnames";

import styles from "./sass/Footer.module.sass";

export type ProjectStats = { stars: number; forks: number };

type ProjectStatProps = {
    icon: string;
    number?: number;
};

export default function ProjectStat(props: ProjectStatProps) {
    if (!props.number && props.number !== 0) return <></>;

    return (
        <div className={styles.listItemStatsItem}>
            <i
                className={classNames(
                    styles.listItemStatsItemIcon,
                    "material-icons-round"
                )}
            >
                {props.icon}
            </i>
            <span className={styles.listItemStatsItemLabel}>
                {props.number}
            </span>
        </div>
    );
}
