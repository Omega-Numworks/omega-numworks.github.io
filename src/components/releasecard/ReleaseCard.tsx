import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import ButtonsGroup from "../button/ButtonsGroup";
import Button from "../button/Button";

import { Firmware } from "../../firmware/firmwares";

import styles from "./sass/ReleaseCard.module.sass";
import classNames from "classnames";

type ReleaseCardProps = {
    name?: string;
    version: Firmware;
    hidden?: boolean;
};

type Tag = "New" | "Change" | "Fix" | "Update";

const tags = {
    New: {
        label: "NEW",
        className: styles.changelogListElementTagNew,
    },
    Change: {
        label: "CHG",
        className: styles.changelogListElementTagChange,
    },
    Fix: {
        label: "FIX",
        className: styles.changelogListElementTagFix,
    },
    Update: {
        label: "UPD",
        className: styles.changelogListElementTagUpdate,
    },
};

function ChangelogElement(props: { change: string }) {
    const separatorIndex = props.change.indexOf(":");
    const tag = props.change.substring(0, separatorIndex) as Tag;

    const text = props.change.substring(separatorIndex + 1);

    return (
        <li className={styles.changelogListElement}>
            <ChangelogElementTag tag={tag} />
            <ChangelogElementContent text={text} />
        </li>
    );
}

function ChangelogElementTag(props: { tag: Tag }) {
    var tag = tags[props.tag];

    return (
        <div
            className={classNames(
                styles.changelogListElementTag,
                tag?.className
            )}
        >
            {tag?.label}
        </div>
    );
}

function ChangelogElementContent(props: { text: string }) {
    return (
        <div className={styles.changelogListElementContent}>{props.text}</div>
    );
}

function DownloadButtons(props: { firmware: Firmware }) {
    const { name, available, compatibility } = props.firmware;

    const buttons = [
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/tag/${name}`,
            icon: "code",
            enabled: true,
            externalLink: true,
            messageID: "releases.github",
            messageDefault: "GITHUB",
        },
        {
            to: `/install/${props.firmware.name}`,
            icon: "system_update_alt",
            enabled: available && (compatibility.N0110 || compatibility.N0100),
            messageID: "releases.install",
            messageDefault: "INSTALL",
        },
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/download/${name}/simulator.apk`,
            icon: "android",
            enabled: available && compatibility.android,
            messageID: "releases.android",
            messageDefault: "ANDROID",
        },
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/download/${name}/simulator.zip`,
            icon: "web",
            enabled: available && compatibility.web,
            messageID: "releases.web",
            defaultMessage: "WEB",
        },
        {
            href: `https://github.com/Omega-Numworks/Omega/releases/download/${name}/simulator.3dsx`,
            icon: "gamepad",
            enabled: available && compatibility["3ds"],
            messageID: "releases.3ds",
            defaultMessage: "3DS",
        },
    ];

    const buttonsComponents = buttons.map((el) => (
        <Button
            to={el.enabled ? el.to : undefined}
            href={el.enabled ? el.href : undefined}
            leftIcon={el.icon}
            isExternalLink={el.externalLink}
            disabled={!el.enabled}
        >
            <FormattedMessage
                id={el.messageID}
                defaultMessage={el.messageDefault}
            />
        </Button>
    ));

    return (
        <ButtonsGroup className={styles.actions}>
            {buttonsComponents}
        </ButtonsGroup>
    );
}

export default class ReleaseCard extends Component<ReleaseCardProps> {
    constructor(props: ReleaseCardProps) {
        super(props);

        this.getReleaseVersion = this.getReleaseVersion.bind(this);
        this.getEpsilonVersion = this.getEpsilonVersion.bind(this);
        this.getVersionName = this.getVersionName.bind(this);
    }

    getReleaseVersion(tag: string): string {
        return tag.substring(tag.lastIndexOf("O") + 1, tag.lastIndexOf("-"));
    }

    getEpsilonVersion(tag: string): string {
        return tag.substring(tag.lastIndexOf("E") + 1);
    }

    getVersionName() {
        if (this.props.name) {
            return this.props.name;
        } else {
            return "Omega " + this.getReleaseVersion(this.props.version.name);
        }
    }

    render() {
        const version = this.props.version;

        return (
            <div
                className={styles.card}
                style={{ display: this.props.hidden ? "none" : "block" }}
            >
                <div className={styles.title}>{this.getVersionName()}</div>
                <div className={styles.subtitle}>
                    Epsilon {this.getEpsilonVersion(version.name)}
                </div>
                <DownloadButtons firmware={version} />
                <div className={styles.changelog}>
                    <ul className={styles.changelogList}>
                        {version.changelog.map((change) => {
                            return <ChangelogElement change={change} />;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
