import classNames from "classnames";
import React from "react";

import styles from "./sass/FeatureCard.module.sass";

function FeatureCardTitle(props: React.HTMLProps<HTMLHeadingElement>) {
    return <h2 className={styles.title}>{props.children}</h2>;
}

function FeatureCardDescription(props: React.HTMLProps<HTMLDivElement>) {
    return <div className={styles.description}>{props.children}</div>;
}

function FeatureCardImage(props: React.HTMLProps<HTMLImageElement>) {
    return (
        <div className={styles.imageWrapper}>
            <img
                className={styles.imageWrapperImage}
                src={props.src}
                alt={props.alt}
            />
        </div>
    );
}

function FeatureCard(props: React.HTMLProps<HTMLDivElement>) {
    return <div className={styles.featureCard}>{props.children}</div>;
}

function FeatureCardRow(props: React.HTMLProps<HTMLDivElement>) {
    return <div {...props} className={classNames(styles.featureCardRow, props.className)}>{props.children}</div>;
}

function FeatureCardColumn(props: React.HTMLProps<HTMLDivElement>) {
    return <div className={styles.featureCardColumn}>{props.children}</div>;
}

export {
    FeatureCard,
    FeatureCardTitle,
    FeatureCardDescription,
    FeatureCardImage,
    FeatureCardRow,
    FeatureCardColumn,
};
