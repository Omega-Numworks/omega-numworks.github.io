import React, { Component } from "react";
import ImgSymbolicCalculation from "../img/symbolic-calculation.png";
import ImgAtom from "../img/atom.png";
import ImgRpn from "../img/rpn.png";
import Img3ds from "../img/3ds.png";
import Button from "../components/button/Button";
import { FormattedMessage } from "react-intl";
import Fade from "react-reveal";
import {
    FeatureCard,
    FeatureCardTitle,
    FeatureCardRow,
    FeatureCardColumn,
    FeatureCardDescription,
    FeatureCardImage,
} from "../components/featurecard/FeatureCard";
import "./sass/home.sass";
import { Downloads } from "../components/downloads/Downloads";

export default class Home extends Component {
    constructor(props: {}) {
        super(props);

        document.title = "Omega";
    }

    render() {
        return (
            <div className="content content-home">
                <div
                    className="project-description"
                    style={{
                        backgroundImage: `url(https://unsplash.com/photos/TOmVNJZN1AA/download?force=true&w=1920)`,
                    }}
                >
                    <h1 className="project-description__title">
                        <FormattedMessage
                            id="home.head.title"
                            defaultMessage="Omega"
                        />
                    </h1>
                    <h2 className="project-description__subtitle">
                        <FormattedMessage
                            id="home.head.subtitle"
                            defaultMessage="The next evolution of Epsilon."
                        />
                    </h2>
                    <Button
                        to="/simulator"
                        className="project-description__button"
                        rightIcon="play_arrow"
                        outline
                        big
                    >
                        <FormattedMessage
                            id="home.head.tryit"
                            defaultMessage="TRY IT ONLINE"
                        />
                    </Button>
                    <p className="project-description__description">
                        <FormattedMessage
                            id="home.head.description"
                            defaultMessage="Omega is a fork of Numworks' Epsilon, the OS that runs on their calculator, which brings many features to it. Omega is for the people who want to add features to the calculator, but cannot because they have been rejected by Numworks (for reasons that are 100% understandable!)."
                        />
                    </p>
                </div>

                <div style={{ height: "16px" }}></div>

                <Fade>
                    <FeatureCardRow className="featureCardRow">
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="Theme engine"
                                        id="home.features.theme-engine"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <ul>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Omega light theme"
                                                id="home.features.theme-engine-omega-light"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Omega dark theme"
                                                id="home.features.theme-engine-omega-dark"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Epsilon light theme"
                                                id="home.features.theme-engine-epsilon-light"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Epsilon dark theme"
                                                id="home.features.theme-engine-epsilon-dark"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Community themes"
                                                id="home.features.theme-engine-community-themes"
                                            />
                                        </li>
                                    </ul>
                                </FeatureCardDescription>
                            </FeatureCard>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="External apps"
                                        description=""
                                        id="home.features.external-apps"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        defaultMessage="Install community apps on the fly with External. Also includes KhiCAS and various emulators."
                                        description=""
                                        id="home.features.external-apps-community"
                                    />
                                </FeatureCardDescription>
                            </FeatureCard>
                        </FeatureCardColumn>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        id="home.features.symbolic.name"
                                        defaultMessage="Symbolic computation"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        id="home.features.symbolic.description"
                                        defaultMessage="Symbolic computation was removed from Epsilon in version 11.2. Omega reintroduces that feature."
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage
                                    src={ImgSymbolicCalculation}
                                    alt="Symbolic Calculation"
                                />
                            </FeatureCard>
                        </FeatureCardColumn>
                    </FeatureCardRow>
                </Fade>

                {/* <Fade bottom> */}
                <Fade>
                    <FeatureCardRow className="featureCardRow">
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        id="home.features.atom.name"
                                        defaultMessage="Periodic table"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        id="home.features.atom.description"
                                        defaultMessage="Inspired by the TI83PCE's periodic table app, Omega's periodic table is clean and simple to use."
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage src={ImgAtom} alt="Atom" />
                            </FeatureCard>
                        </FeatureCardColumn>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        id="home.features.rpn.name"
                                        defaultMessage="RPN"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        id="home.features.rpn.description"
                                        defaultMessage="Omega supports using Reverse Polish Notation to do calculations."
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage src={ImgRpn} alt="RPN" />
                            </FeatureCard>
                        </FeatureCardColumn>
                    </FeatureCardRow>
                </Fade>

                <Fade>
                    <FeatureCardRow className="featureCardRow">
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        id="home.features.3ds.name"
                                        defaultMessage="Now available on the Nintendo 3DS"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        id="home.features.3ds.description"
                                        defaultMessage="Omega is avaliable and fully usable on the Nintendo 3DS."
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage src={Img3ds} alt="3ds" />
                            </FeatureCard>
                        </FeatureCardColumn>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        defaultMessage="And more!"
                                        description=""
                                        id="home.features.and-more"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <ul>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Physical and chemical constants"
                                                id="home.features.and-more.constants"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Open method and os module"
                                                id="home.features.and-more.os"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Android simulator with script backup"
                                                id="home.features.and-more.android"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Hungarian support"
                                                id="home.features.and-more.hungarian"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Accessibility settings"
                                                id="home.features.and-more.accessibility"
                                            />
                                        </li>
                                        <li>
                                            <FormattedMessage
                                                defaultMessage="Choice of multiplication symbol"
                                                id="home.features.and-more.mult-symbol"
                                            />
                                        </li>
                                        <li>…</li>
                                    </ul>
                                </FeatureCardDescription>
                            </FeatureCard>
                        </FeatureCardColumn>
                    </FeatureCardRow>
                </Fade>

                <div style={{ height: "16px" }}></div>

                <Fade>
                    <Downloads />
                </Fade>
            </div>
        );
    }
}
