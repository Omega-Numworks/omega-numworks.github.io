import React, { Component } from "react";
import ReleaseCard from "../components/releasecard/ReleaseCard";
import { FormattedMessage } from "react-intl";
import { epsilon } from "../firmware/epsilon";

import styles from "./sass/Releases.module.sass";

export default class Beta extends Component<{}> {
    render() {
        return (
            <div className="content">
                <div 
                className={styles.banner}
                style={{
                    backgroundImage: `url(https://unsplash.com/photos/TOmVNJZN1AA/download?force=true&w=1920)`,
                }}
                >
                    <div className={styles.title}>Epsilon</div>
                    <div className={styles.description}>
                        <FormattedMessage
                            defaultMessage="Install epsilon 15."
                            id="epsilon15"
                        />
                    </div>
                </div>
                <div style={{ height: "16px" }}></div>
                <div className={styles.cards}>
                    <ReleaseCard
                        version={epsilon.firmwares[0]}
                        name="Epsilon 15"
                    />
                </div>
                <div style={{ height: "16px" }}></div>
            </div>
        );
    }
}
