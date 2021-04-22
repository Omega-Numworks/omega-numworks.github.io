import { Octokit } from "@octokit/core";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Title from "../title/Title";
import FooterProject from "./FooterProject";
import { ProjectStats } from "./FooterProjectStat";

import styles from "./sass/Footer.module.sass";

type ProjectsStats = {
    [name: string]: ProjectStats;
};

export type Project = {
    name?: string;
    href: string;
    messageID: string;
    messageDefault: string;
};

const projects: Project[] = [
    {
        name: "Omega",
        href: "https://github.com/Omega-Numworks/Omega",
        messageID: "footer.projects.omega",
        messageDefault: "Omega",
    },
    {
        name: "omega-numworks.github.io",
        href: "https://github.com/Omega-Numworks/Omega-Website",
        messageID: "footer.projects.omega-website",
        messageDefault: "Omega Website",
    },
    {
        name: "Omega-RPN",
        href: "https://github.com/Omega-Numworks/Omega-RPN",
        messageID: "footer.projects.omega-rpn",
        messageDefault: "Omega RPN",
    },
    {
        name: "Omega-Atomic",
        href: "https://github.com/Omega-Numworks/Omega-Atomic",
        messageID: "footer.projects.omega-atom",
        messageDefault: "Omega Atomic",
    },
    {
        name: "Omega-Design",
        href: "https://github.com/Omega-Numworks/Omega-Design",
        messageID: "footer.projects.omega-design",
        messageDefault: "Omega Design",
    },
    {
        name: "Omega-External",
        href: "https://omega-numworks.github.io/Omega-External/",
        messageID: "footer.projects.external-apps",
        messageDefault: "External Apps",
    },
];

console.table(projects);

const octokit = new Octokit();

export default function FooterProjects() {
    const [projectsStats, setProjectsStats] = useState<
        ProjectsStats | undefined
    >(undefined);

    const getStats = async () => {
        console.log(
            "%c GITHUB %c Fetching GitHub API (omega-numworks/repos)",
            "background-color: #000000; color: #ffffff;",
            ""
        );

        const TIMER_LABEL = "GitHub API Response delay";
        console.time(TIMER_LABEL);

        const request = await octokit.request("GET /orgs/{org}/repos", {
            org: "Omega-Numworks",
        });

        console.time(TIMER_LABEL);

        let stats: ProjectsStats = {};

        console.table(request.data, [
            "name",
            "forks_count",
            "stargazers_count",
        ]);

        request.data.forEach((repo: any) => {
            const forksCount = repo?.forks_count;
            const starsCount = repo?.stargazers_count;

            stats[repo.name] = {
                forks: forksCount,
                stars: starsCount,
            };
        });

        return stats;
    };

    useEffect(() => {
        const loadStats = async () => {
            const stats = await getStats();
            setProjectsStats(stats);
        };
        loadStats();
    }, []);

    const cards = projects.map((project: Project) => (
        <FooterProject
            key={project.name}
            project={project}
            stats={projectsStats && projectsStats[project.name || ""]}
        />
    ));

    return (
        <div className={styles.links}>
            <Title>
                <FormattedMessage
                    id="footer.projects"
                    defaultMessage="Projects"
                />
            </Title>
            <div className={styles.list}>{cards}</div>
        </div>
    );
}
