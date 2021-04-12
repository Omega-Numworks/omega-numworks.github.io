import React, { Component } from "react";

import { FormattedMessage } from "react-intl";
import ReleaseCard from "../components/releasecard/ReleaseCard";
import { releases } from "../firmware/firmwares";

import styles from "./sass/Releases.module.sass";

export default class Releases extends Component {
    constructor(props: {}) {
        super(props);

        document.title = "Omega — Releases";
    }

    render() {
        return (
            <div className="content">
                <div className={styles.banner}>
                    <div className={styles.title}>
                        <FormattedMessage
                            id="releases.title"
                            defaultMessage="Omega version history"
                        />
                    </div>
                </div>
                <div style={{ height: "16px" }}></div>
                <div className={styles.cards}>
                    {releases.firmwares.map((version) => {
                        return <ReleaseCard version={version} />;
                    })}
                </div>
                <div style={{ height: "16px" }}></div>
            </div>
        );
    }
}
