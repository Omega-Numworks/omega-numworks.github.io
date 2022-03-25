import React, { Component } from "react";
import ImgSymbolicCalculation from "../img/symbolic-calculation.png";
import ImgSymbolicCalculationDark from "../img/symbolic-calculation-dark.png";
import ImgAtom from "../img/atom.png";
import ImgAtomDark from "../img/atom-dark.png";
import ImgRpn from "../img/rpn.png";
import ImgRpnDark from "../img/rpn-dark.png";
import Img3ds from "../img/3ds.png";
import Img3dsDark from "../img/3ds-dark.png";
import ImgBootloader from "../img/bootloader-light.png";
import ImgBootloaderDark from "../img/bootloader-dark.png";
import ImgPhi from "../img/phi-home.png";
import OmegaNeonLogo from "../img/logo-neon.png";
import ShrugIcon from "../img/shrug.png";
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

type HomeProps = {
    theme: string;
};

function PhiURL() {
    return (
        <a className="link" href="https://phi.getomega.dev">
            Phi
        </a>
    );
}

function MaximeURL() {
    return (
        <a className="link" href="https://github.com/M4xi1m3">
            M4xi1m3
        </a>
    );
}

export default class Home extends Component<HomeProps> {
    constructor(props: HomeProps) {
        super(props);

        document.title = "Omega";
    }

    render() {
        return (
            <div className="content content-home">
                <div
                    className="project-description"
                    style={{
                        backgroundImage: `url(https://unsplash.com/photos/bMkRxaVMvj4/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDYwNzYyMjg&force=true&w=1920)`,
                    }}
                >
                    <h1 className="project-description__title">
                        {/* <FormattedMessage
                            id="home.head.title"
                            defaultMessage="Omega"
                        /> */}
                        <img alt="Omega 2.0" src={OmegaNeonLogo} height="72" />
                    </h1>
                    <h2 className="project-description__subtitle">
                        <FormattedMessage
                            id="home.head.subtitle"
                            defaultMessage="Compatible with "
                        />
                        <PhiURL />.
                    </h2>
                    <h2 className="project-description__subtitle">
                        <img alt="Omega 2.0" src={ShrugIcon} height="24" />
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
                                        id="home.features.dualboot.name"
                                        defaultMessage="Dual boot"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        id="home.features.dualboot.description"
                                        defaultMessage="Omega integrates a new Bootloader. It allows you to boot multiple OS from different slots."
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage
                                    src={
                                        this.props.theme === "light"
                                            ? ImgBootloader
                                            : ImgBootloaderDark
                                    }
                                    alt="Symbolic Calculation"
                                />
                            </FeatureCard>
                        </FeatureCardColumn>
                        <FeatureCardColumn>
                            <FeatureCard>
                                <FeatureCardTitle>
                                    <FormattedMessage
                                        id="home.features.phi.name"
                                        defaultMessage="Compatible with Phi"
                                    />
                                </FeatureCardTitle>
                                <FeatureCardDescription>
                                    <FormattedMessage
                                        id="home.features.phi.description"
                                        defaultMessage="{phi} is a tool developed by {maxime} that unlocks your calculator after an Epsilon 16+ update."
                                        values={{
                                            phi: <PhiURL />,
                                            maxime: <MaximeURL />,
                                        }}
                                    />
                                </FeatureCardDescription>
                                <FeatureCardImage
                                    src={ImgPhi}
                                    alt="Symbolic Calculation"
                                />
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
                                    src={
                                        this.props.theme === "light"
                                            ? ImgSymbolicCalculation
                                            : ImgSymbolicCalculationDark
                                    }
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
                                <FeatureCardImage
                                    src={
                                        this.props.theme === "light"
                                            ? ImgAtom
                                            : ImgAtomDark
                                    }
                                    alt="Atom"
                                />
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
                                <FeatureCardImage
                                    src={
                                        this.props.theme === "light"
                                            ? ImgRpn
                                            : ImgRpnDark
                                    }
                                    alt="RPN"
                                />
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
                                <FeatureCardImage
                                    src={
                                        this.props.theme === "light"
                                            ? Img3ds
                                            : Img3dsDark
                                    }
                                    alt="3ds"
                                />
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
                                                defaultMessage="99 KB Python heap (instead of a 32 KB)"
                                                id="home.features.and-more.python"
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
