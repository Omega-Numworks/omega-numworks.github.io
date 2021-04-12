import React, { Component } from "react";
import styles from "./sass/button.module.sass";
import classNames from "classnames";

export default class ButtonsGroup extends Component {
    render() {
        return (
            <div
                {...this.props}
                className={classNames(styles.buttonGroup, this.props.className)}
            >
                {this.props.children}
            </div>
        );
    }
}
