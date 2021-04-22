import React from "react";

import classNames from "classnames";

import styles from "./sass/ReleaseCard.module.sass";

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

export default function ChangelogElement(props: { change: string }) {
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
