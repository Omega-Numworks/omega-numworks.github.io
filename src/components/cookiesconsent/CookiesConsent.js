import React, { Component } from "react";
import Button from "./../button/Button";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./sass/cookiesconsent.module.sass";

export default class CookiesConsent extends Component {
    constructor(props) {
        super(props);

        let show = false;
        const cookie = this.getCookie("cookieconsent_status");
        if (cookie !== "dismiss" && cookie !== "allow") {
            show = true;
        }

        this.state = {
            show: show,
        };

        this.setCookie = this.setCookie.bind(this);
        this.agree = this.agree.bind(this);
    }

    setCookie(cookie, value) {
        // Source: https://www.w3schools.com/js/js_cookies.asp
        var d = new Date();
        const EXPIRATION_IN_DAYS = 7;
        d.setTime(d.getTime() + EXPIRATION_IN_DAYS * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookie + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(cookie) {
        // Source: https://www.w3schools.com/js/js_cookies.asp
        var name = cookie + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    agree() {
        this.setCookie("cookieconsent_status", "dismiss");
        this.setState({ show: false });
    }

    render() {
        const messages = {
            text: this.props.text
                ? this.props.text
                : "This website uses cookies to ensure you get the best experience on our website.",
            learnMore: this.props.learnMore
                ? this.props.learnMore
                : "Learn more",
            gotIt: this.props.gotIt ? this.props.gotIt : "Got it!",
        };

        return (
            <div
                className={classNames(styles.cookiesconsent, "cookiesconsent")}
                style={{ display: this.state.show ? "" : "none" }}
            >
                <div className={styles.text}>
                    {messages.text}
                    <Link to={this.props.toPolicy} className={styles.link}>
                        {messages.learnMore}
                    </Link>
                </div>
                <Button onClick={this.agree} className={styles.button} blue>
                    {messages.gotIt}
                </Button>
            </div>
        );
    }
}
