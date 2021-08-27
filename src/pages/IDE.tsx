import React, { Component } from "react";
import GithubConnector from "../GithubConnector";
import ImgBanner from "../img/banner.png";
import ImgIDE from "../img/ide.png";
import ImgIDESimu from "../img/ide-simu.png";
import Button from "../components/button/Button";
import { Fade } from "react-reveal";
import {
    FeatureCardRow,
    FeatureCardColumn,
    FeatureCard,
    FeatureCardTitle,
    FeatureCardDescription,
    FeatureCardImage,
} from "../components/featurecard/FeatureCard";
import { FormattedMessage } from "react-intl";

type IDEMainState = {
    connector: GithubConnector;
};

export default class IDEMain extends Component<{}, IDEMainState> {
    constructor(props: {}) {
        super(props);
        document.title = "Omega - IDE";

        this.state = {
            connector: GithubConnector.getInstance(),
        };

        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
        this.login = this.login.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.state.connector.onAuthStateChanged(this.onAuthStateChanged);
    }

    componentWillUnmount() {
        this.state.connector.removeAuthStateChanged(this.onAuthStateChanged);
    }

    login() {
        this.state.connector.login();
    }

    onAuthStateChanged() {
        this.forceUpdate();
    }

    render() {
        var accessButton = null;

        if (this.state.connector.isLogged()) {
            accessButton = (
                <Button
                    to="/ide/editor"
                    className="project-description__button"
                    rightIcon="play_arrow"
                    outline
                    big
                >
                    <FormattedMessage defaultMessage="LAUNCH" id="ide.launch" />
                </Button>
            );
        } else {
            accessButton = (
                <Button
                    onClick={this.login}
                    className="project-description__button"
                    rightIcon="play_arrow"
                    outline
                    big
                >
                    <FormattedMessage
                        defaultMessage="LOGIN WITH GITHUB"
                        description=""
                        id="ide.login"
                    />
                </Button>
            );
        }

        return (
            <div className="content content-home">
                <div
                    className="project-description"
                    style={{ backgroundImage: `url(${ImgBanner})` }}
                >
                    <h1 className="project-description__title">
                        <FormattedMessage
                            defaultMessage="Omega IDE"
                            description=""
                            id="ide.title"
                        />
                    </h1>
                    <h2 className="project-description__subtitle">
                        <FormattedMessage
                            defaultMessage="An online Python IDE."
                            description=""
                            id="ide.subtitle"
                        />
                    </h2>
                    {accessButton}
                    <p className="project-description__description">
                        <FormattedMessage
                            defaultMessage="Omega IDE is a python script editor making Python programming for Numworks easier than ever. This IDE works equally well with or without Omega installed."
                            id="ide.description"
                        />
                    </p>
                </div>

                <div style={{ height: "16px" }}></div>

                <Fade>
                    <FeatureCardRow>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="Interface"
                                        id="ide.interface"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        defaultMessage="The interface is easy to use and has two themes: an Omega theme and a VSCode theme."
                                        id="ide.interface.description"
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage src={ImgIDE} />
                            </FeatureCard>
                        </FeatureCardColumn>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="Test with ease"
                                        id="ide.test"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        defaultMessage="With Omega IDE, you can test your Python scripts directly in the Omega simulator, or by installing them in seconds on the calculator."
                                        id="ide.test.description"
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage src={ImgIDESimu} />
                            </FeatureCard>
                        </FeatureCardColumn>
                    </FeatureCardRow>
                </Fade>

                <Fade>
                    <FeatureCardRow>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="Multi-file projects"
                                        id="ide.multifile"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        defaultMessage="The Omega editor is able to manage projects made up of several files."
                                        id="ide.multifile.description"
                                    />
                                </FeatureCardDescription>
                            </FeatureCard>
                        </FeatureCardColumn>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="Sauvegarde sur Gist"
                                        id="ide.save"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        defaultMessage="All scripts are saved to your own GitHub Gist account."
                                        id="ide.save.description"
                                    />
                                </FeatureCardDescription>
                            </FeatureCard>
                        </FeatureCardColumn>
                    </FeatureCardRow>
                </Fade>

                <div style={{ height: "16px" }}></div>
            </div>
        );
    }
}
