import { Octokit } from "@octokit/core";
import classNames from "classnames";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import translations from "../../i18n/locales/index";
import VercelIcon from "../../img/powered-by-vercel.svg";

import styles from "./sass/Footer.module.sass";

var languages: any = translations;

type Project = {
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

type ProjectStats = { stars: number; forks: number };
type ProjectsStats = {
    [name: string]: ProjectStats;
};

type ProjectsProps = {};
type ProjectsState = {
    projectsStats?: ProjectsStats;
};

class Projects extends Component<ProjectsProps, ProjectsState> {
    constructor(props: ProjectsProps) {
        super(props);

        this.state = {
            projectsStats: undefined,
        };

        this.loadStats();
    }

    async loadStats() {
        await octokit
            .request("GET /orgs/{org}/repos", {
                org: "Omega-Numworks",
            })
            .then((res: any) => {
                console.dir(res.data);

                let projectsStats: ProjectsStats = {};

                res.data.forEach((repo: any) => {
                    const forksCount = repo?.forks_count;
                    const starsCount = repo?.stargazers_count;

                    projectsStats[repo.name] = {
                        forks: forksCount,
                        stars: starsCount,
                    };
                });

                this.setState({
                    projectsStats: projectsStats,
                });
            });
    }

    render() {
        return (
            <>
                {projects.map((project: Project) => (
                    <Project
                        project={project}
                        stats={
                            this.state.projectsStats &&
                            this.state.projectsStats[project.name || ""]
                        }
                    />
                ))}
            </>
        );
    }
}

function Project(props: { project: Project; stats?: ProjectStats }) {
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

function ProjectStat(props: { icon: string; number?: number }) {
    if (!props.number && props.number !== 0) return <></>;

    return (
        <div className={styles.listItemStatsItem}>
            <i
                className={classNames(
                    styles.listItemStatsItemIcon,
                    "material-icons-round"
                )}
            >
                {props.icon}
            </i>
            <span className={styles.listItemStatsItemLabel}>
                {props.number}
            </span>
        </div>
    );
}

function Vercel() {
    return (
        <div className={styles.vercel}>
            <a
                href="https://vercel.com/?utm_source=getomega&utm_campaign=oss"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    className={styles.vercelIcon}
                    src={VercelIcon}
                    alt="Vercel"
                />
            </a>
        </div>
    );
}

function Discord() {
    return (
        <div className={styles.discord}>
            <iframe
                title="Discord"
                src="https://discordapp.com/widget?id=663420259851567114&theme=dark"
                width="300"
                height="300"
                allowTransparency={true}
                frameBorder="0"
            ></iframe>
        </div>
    );
}

function Separator() {
    return <div className={styles.separator} />;
}

type FooterProps = {
    onChangeLanguage: (lang: string) => void;
    locale: string;
};

type FooterState = {
    locale: string;
    localeDropdown: boolean;
};

export default class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);

        this.state = {
            locale: props.locale,
            localeDropdown: false,
        };

        this.setLanguage = this.setLanguage.bind(this);
        this.onClickOverlay = this.onClickOverlay.bind(this);
    }

    setLanguage(lang: string) {
        this.setState({
            locale: lang,
            localeDropdown: false,
        });
        this.props.onChangeLanguage(lang);
    }

    onClickOverlay() {
        this.setState({ localeDropdown: false });
    }

    render() {
        var langs_list = [];

        for (let lang in languages) {
            langs_list.push(
                <div
                    onClick={() => this.setLanguage(lang)}
                    className={styles.localeDropdownItem}
                >
                    {languages[lang]["footer.language"]}{" "}
                    {languages[lang]["footer.flag"]}
                </div>
            );
        }

        return (
            <footer className={classNames("footer", styles.footer)}>
                <div
                    className={
                        styles.overlay +
                        " " +
                        (this.state.localeDropdown ? styles.overlayShow : "")
                    }
                    onClick={this.onClickOverlay}
                ></div>
                <div className={styles.links}>
                    <h3 className={styles.title}>
                        <FormattedMessage
                            id="footer.projects"
                            defaultMessage="Projects"
                        />
                    </h3>
                    <div className={styles.list}>
                        <Projects />
                    </div>
                </div>
                <Discord />
                <div
                    className={styles.separator}
                    style={{
                        borderColor: "transparent",
                        marginBottom: "0",
                    }}
                />
                <Separator />
                <Vercel />
                <div className={styles.aboutNw}>
                    <FormattedMessage
                        id="footer.trademark"
                        defaultMessage="NumWorks is a registered trademark. Omega is not affiliated with Numworks. "
                        values={{ br: <br /> }}
                    />

                    <a
                        className={styles.aboutNwContact}
                        href="mailto:getomega.pro@gmail.com"
                    >
                        <FormattedMessage
                            id="footer.contact"
                            defaultMessage="Contact"
                        />
                    </a>
                </div>
                <div
                    className={
                        styles.locale +
                        " " +
                        (this.state.localeDropdown ? styles.localeActive : "")
                    }
                    onClick={() =>
                        this.setState({
                            localeDropdown: !this.state.localeDropdown,
                        })
                    }
                >
                    {languages[this.state.locale]["footer.language"]}{" "}
                    {languages[this.state.locale]["footer.flag"]}
                    <div
                        className={
                            styles.localeDropdown +
                            " " +
                            (this.state.localeDropdown
                                ? styles.localeDropdownShow
                                : "")
                        }
                    >
                        {langs_list}
                    </div>
                </div>
            </footer>
        );
    }
}
