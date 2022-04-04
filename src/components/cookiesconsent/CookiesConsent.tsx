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
    if (cookie !== "refused" && cookie !== "accepted") {
        _show = true;
    }

    const [show, setShow] = useState(_show);

    const agree = () => {
        setCookie("cookieconsent_status", "accepted");
        setShow(false);
        // @ts-ignore
        window["ga-disable-G-P9YFFF08LN"] = false;
    };

    const refuse = () => {
        setCookie("cookieconsent_status", "refused");
        setShow(false);
        // @ts-ignore
        window["ga-disable-G-P9YFFF08LN"] = true;
    };

    const messages = {
        text:
            props.message ||
            "This website uses cookies to ensure you get the best experience on our website.",
        learnMore: props.messageLearnMore || "Learn more",
        accept: "Accept",
        refuse: "Refuse",
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: "16px",
                    width: "100%",
                }}
            >
                <Button
                    rightIcon="sentiment_very_satisfied"
                    onClick={agree}
                    className={styles.button}
                    blue
                    big
                >
                    {messages.accept.toUpperCase()}
                </Button>
                <Button onClick={refuse} className={styles.button} big>
                    {messages.refuse.toUpperCase()}
                </Button>
            </div>
        </div>
    );
}
