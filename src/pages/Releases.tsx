import React, { Component, CSSProperties } from "react";

import { FormattedMessage } from "react-intl";
import ReleaseCard from "../components/releasecard/ReleaseCard";
import { releases } from "../firmware/firmwares";

import styles from "./sass/Releases.module.sass";

type ReleasesForVersionProps = {
    majorVersion: number;
    backgroundURL: string;
};

function ReleasesForVersion(props: ReleasesForVersionProps) {
    const { majorVersion, backgroundURL } = props;

    const firmwares = releases.firmwares.filter((firmware) => {
        return firmware.omegaVersion.major === majorVersion;
    });

    const title = (
        <FormattedMessage
            id={`releases.title.omega${majorVersion}`}
            defaultMessage={`Omega ${majorVersion}.× version history`}
        />
    );

    const cards = firmwares.map((firmware) => {
        return <ReleaseCard key={firmware.name} firmware={firmware} />;
    });

    const bannerStyle: CSSProperties = {
        backgroundImage: `url(${backgroundURL})`,
    };

    return (
        <React.Fragment>
            <div className={styles.banner} style={bannerStyle}>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.cards}>{cards}</div>
        </React.Fragment>
    );
}

export default class Releases extends Component {
    constructor(props: {}) {
        super(props);

        document.title = "Omega — Releases";
    }

    render() {
        return (
            <div className="content">
                <ReleasesForVersion
                    majorVersion={2}
                    backgroundURL="https://unsplash.com/photos/bMkRxaVMvj4/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDYwNzYyMjg&force=true&w=1920"
                />
                <div style={{ height: "48px" }}></div>
                <ReleasesForVersion
                    majorVersion={1}
                    backgroundURL="https://unsplash.com/photos/mTCCRtWbFHk/download?force=true&w=1920"
                />
                <div style={{ height: "16px" }}></div>
            </div>
        );
    }
}
