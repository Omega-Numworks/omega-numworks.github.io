import React from "react";

import { Firmware } from "../../firmware/firmwares";
import ChangelogElement from "./ReleaseCardChangelogElement";
import DownloadButtons from "./ReleaseCardDownloadButtons";

import styles from "./sass/ReleaseCard.module.sass";

type ReleaseCardProps = {
    name?: string;
    firmware: Firmware;
    hidden?: boolean;
};

export default function ReleaseCard(props: ReleaseCardProps) {
    const firmware = props.firmware;

    const getReleaseVersion = (tag: string) => {
        return tag.substring(tag.lastIndexOf("O") + 1, tag.lastIndexOf("-"));
    };

    const getEpsilonVersion = (tag: string) => {
        return tag.substring(tag.lastIndexOf("E") + 1);
    };

    const getVersionName = () => {
        if (props.name) {
            return props.name;
        } else {
            return "Omega " + getReleaseVersion(firmware.name);
        }
    };

    return (
        <div
            className={styles.card}
            style={{ display: props.hidden ? "none" : "block" }}
        >
            <div className={styles.title}>{getVersionName()}</div>
            <div className={styles.subtitle}>
                Epsilon {getEpsilonVersion(firmware.name)}
            </div>
            <DownloadButtons firmware={firmware} />
            <div className={styles.changelog}>
                <ul className={styles.changelogList}>
                    {firmware.changelog.map((change, i) => {
                        return <ChangelogElement key={i} change={change} />;
                    })}
                </ul>
            </div>
        </div>
    );
}
