import React, { Component } from "react";
import ImgSadCalculator from "../img/sad-calculator.png";
import { FormattedMessage } from "react-intl";

import styles from "./sass/NotFound.module.sass";

export default class NotFound extends Component {
    constructor(props: {}) {
        super(props);
        document.title = "Omega - 404";
    }

    render() {
        return (
            <div className="content">
                <div className={styles.notfound}>
                    <div className={styles.title}>
                        <FormattedMessage
                            id="notfound.title"
                            defaultMessage="Oi, not found."
                        />
                    </div>
                    <div className={styles.subtitle}>
                        <FormattedMessage
                            id="notfound.description"
                            defaultMessage="Smh, the page you're looking for doesn't exist."
                        />
                    </div>
                    <div className={styles.images}>
                        <img
                            className={styles.image}
                            alt="Sad numworks"
                            src={ImgSadCalculator}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
