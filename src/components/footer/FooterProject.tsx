import React from "react";
import { FormattedMessage } from "react-intl";
import { Project } from "./FooterProjects";
import ProjectStat, { ProjectStats } from "./FooterProjectStat";

import styles from "./sass/Footer.module.sass";

type ProjectProps = {
    project: Project;
    stats?: ProjectStats;
};

export default function FooterProject(props: ProjectProps) {
    const { href, messageID, messageDefault } = props.project;

    return (
        <a
            className={styles.listItem}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className={styles.listItemTitle}>
                <FormattedMessage
                    id={messageID}
                    defaultMessage={messageDefault}
                />
            </span>
            <div className={styles.listItemStats}>
                <ProjectStat icon="star" number={props.stats?.stars} />
                <ProjectStat icon="alt_route" number={props.stats?.forks} />
            </div>
        </a>
    );
}
