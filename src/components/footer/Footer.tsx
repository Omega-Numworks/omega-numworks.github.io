import classNames from "classnames";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import translations from "../../i18n/locales/index";
import VercelIcon from "../../img/powered-by-vercel.svg";

import styles from "./sass/Footer.module.sass";

var languages: any = translations;

type Project = {
    href: string;
    messageID: string;
    messageDefault: string;
    icon: string;
};

const projects: Project[] = [
    {
        href: "https://github.com/Omega-Numworks/Omega",
        messageID: "footer.projects.omega",
        messageDefault: "Omega",
        icon: "alt_route",
    },
    {
        href: "https://github.com/Omega-Numworks/Omega-Themes",
        messageID: "footer.projects.omega-themes",
        messageDefault: "Omega Themes",
        icon: "dns",
    },
    {
        href: "https://github.com/Omega-Numworks/Omega-Website",
        messageID: "footer.projects.omega-website",
        messageDefault: "Omega Website",
        icon: "dns",
    },
    {
        href: "https://github.com/Omega-Numworks/Omega-RPN",
        messageID: "footer.projects.omega-rpn",
        messageDefault: "Omega RPN",
        icon: "apps",
    },
    {
        href: "https://github.com/Omega-Numworks/Omega-Atomic",
        messageID: "footer.projects.omega-atom",
        messageDefault: "Omega Atomic",
        icon: "apps",
    },
    {
        href: "https://github.com/Omega-Numworks/Omega-Design",
        messageID: "footer.projects.omega-design",
        messageDefault: "Omega Design",
        icon: "dns",
    },
    {
        href: "https://omega-numworks.github.io/Omega-External/",
        messageID: "footer.projects.external-apps",
        messageDefault: "External Apps",
        icon: "alt_route",
    },
];

function Projects() {
    return (
        <>
            {projects.map((project) => (
                <Project project={project} />
            ))}
        </>
    );
}

function Project(props: { project: Project }) {
    const { href, icon, messageID, messageDefault } = props.project;
    return (
        <a
            className={styles.listItem}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <i
                className={
                    "material-icons material-icons-round " +
                    styles.materialIcons
                }
            >
                {icon}
            </i>
            <FormattedMessage id={messageID} defaultMessage={messageDefault} />
        </a>
    );
}

function Vercel() {
    return (
        <a
            href="https://vercel.com/?utm_source=getomega&utm_campaign=oss"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                style={{
                    display: "inline-block",
                    borderRadius: "8px",
                    border: "1px solid #333333",
                }}
                src={VercelIcon}
                alt="Vercel"
            />
        </a>
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
                    style={{ borderColor: "transparent", marginBottom: "0" }}
                />
                <Vercel />
                <div className={styles.separator} />
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
