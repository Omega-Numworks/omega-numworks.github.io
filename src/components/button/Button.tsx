import React, { Component } from "react";
import styles from "./sass/Button.module.sass";
import { Link } from "react-router-dom";
import classNames from "classnames";

type ButtonProps = React.HTMLProps<HTMLDivElement> & {
    blue?: boolean;
    outline?: boolean;
    disabled?: boolean;
    loading?: boolean;
    big?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    to?: string;
    isExternalLink?: boolean;
};

export default class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);

        this.renderLeftIcon = this.renderLeftIcon.bind(this);
        this.renderRightIcon = this.renderRightIcon.bind(this);

        this.renderContent = this.renderContent.bind(this);
    }

    renderLeftIcon(icon?: string) {
        if (icon) {
            return (
                <i
                    className={classNames(
                        styles.icon,
                        styles.iconLeft,
                        "material-icons"
                    )}
                >
                    {icon}
                </i>
            );
        }
    }

    renderRightIcon(icon?: string) {
        if (icon) {
            return (
                <i
                    className={classNames(
                        styles.icon,
                        styles.iconRight,
                        "material-icons"
                    )}
                >
                    {icon}
                </i>
            );
        }
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.renderLeftIcon(this.props.leftIcon)}
                {this.props.children}
                {this.renderRightIcon(this.props.rightIcon)}
            </React.Fragment>
        );
    }

    render() {
        const props = {
            className: classNames({
                [styles.button]: true,
                [styles.blue]: this.props.blue,
                [styles.outline]: this.props.outline,
                [styles.disabled]: this.props.disabled,
                [styles.loading]: this.props.loading,
                [styles.big]: this.props.big,
                [this.props.className || ""]: true,
            }),
        };

        let component;
        if (this.props.to) {
            component = (
                <Link to={this.props.to} {...props}>
                    {this.renderContent()}
                </Link>
            );
        } else if (this.props.href) {
            let external;

            if (this.props.isExternalLink) {
                external = {
                    target: "_blank",
                    rel: "noopener noreferrer",
                };
            }

            component = (
                <a href={this.props.href} {...props} {...external}>
                    {this.renderContent()}
                </a>
            );
        } else {
            component = (
                <div {...props} onClick={this.props.onClick}>
                    {this.renderContent()}
                </div>
            );
        }

        return component;
    }
}
