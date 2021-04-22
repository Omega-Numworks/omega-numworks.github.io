import React, { useState } from "react";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./sass/CookiesConsent.module.sass";
import { getCookie, setCookie } from "../../cookies";

type CookiesConsentProps = {
    message?: string;
    messageLearnMore?: string;
    messageGotIt?: string;
    linkToPolicy: string;
};

export default function CookiesConsent(props: CookiesConsentProps) {
    let _show = false;
    const cookie = getCookie("cookieconsent_status");
    if (cookie !== "dismiss" && cookie !== "allow") {
        _show = true;
    }

    const [show, setShow] = useState(_show);

    const agree = () => {
        setCookie("cookieconsent_status", "dismiss");
        setShow(false);
    };

    const messages = {
        text:
            props.message ||
            "This website uses cookies to ensure you get the best experience on our website.",
        learnMore: props.messageLearnMore || "Learn more",
        gotIt: props.messageGotIt || "Got it!",
    };

    return (
        <div
            className={classNames(styles.cookiesConsent, "cookiesconsent")}
            style={{ display: show ? "" : "none" }}
        >
            <div className={styles.text}>
                {messages.text}
                <Link to={props.linkToPolicy} className={styles.link}>
                    {messages.learnMore}
                </Link>
            </div>
            <Button onClick={agree} className={styles.button} blue>
                {messages.gotIt}
            </Button>
        </div>
    );
}
