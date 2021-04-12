import React, { Component } from 'react'
import ImgBanner from '../img/banner.png'
import ImgSymbolicCalculation from '../img/symbolic-calculation.png'
import ImgAtom from '../img/atom.png'
import ImgRpn from '../img/rpn.png'
import Img3ds from '../img/3ds.png'
import { releases } from '../firmware/firmwares'
import Button from '../components/button/Button'
import { FormattedMessage } from 'react-intl'
import Fade from "react-reveal";
import { FeatureCard, FeatureCardTitle, FeatureCardRow, FeatureCardColumn, FeatureCardDescription, FeatureCardImage } from '../components/featurecard/FeatureCard'
import { Link } from 'react-router-dom'
import './sass/home.sass'

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.getReleaseVersion = this.getReleaseVersion.bind(this);
        document.title = "Omega"
    }

    getReleaseVersion(tag) {
        return tag.substring(
            tag.lastIndexOf("O") + 1, 
            tag.lastIndexOf("-")
        );
    }

    render() {
        var latest_id = 0
        for(var i = 0; i < releases.firmwares.length; i++) {
            if (releases.firmwares[i].name === releases.latest) {
                latest_id = i;
                break;
            }
        }
        
        var latest_version = releases.firmwares[latest_id];
        
        return (
            <div className="content content-home">
                {/* Parallax */}
                {/*<div className="parallax"></div>*/}

                {/* Project description */}
                <div className="project-description" style={{backgroundImage: `url(${ImgBanner})`}}>
                    {/* Photo by https://unsplash.com/@eberhardgross?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText eberhard grossgasteiger on https://unsplash.com/s/photos/abstract?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText Unsplash */}
                    <h1 className="project-description__title">
                        <FormattedMessage id="home.head.title" defaultMessage="Omega" />
                    </h1>
                    <h2 className="project-description__subtitle">
                        <FormattedMessage id="home.head.subtitle" defaultMessage="The next evolution of Epsilon." />
                    </h2>
                    <Button to="/simulator" className="project-description__button" rightIcon='play_arrow' outline big>
                        <FormattedMessage id="home.head.tryit" defaultMessage="TRY IT ONLINE" />
                    </Button>
                    <p className="project-description__description">
                        <FormattedMessage id="home.head.description" defaultMessage="Omega is a fork of Numworks' Epsilon, the OS that runs on their calculator, which brings many features to it. Omega is for the people who want to add features to the calculator, but cannot because they have been rejected by Numworks (for reasons that are 100% understandable!)." />
                    </p>
                    {/* <h2 className="mb-3">A whole new set of features</h2> */}
                </div>

                <div style={ { height: "16px" } }></div>

                <Fade>
                <FeatureCardRow>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage defaultMessage="Theme engine" id="home.features.theme-engine"/>
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <ul>
                                    <li><FormattedMessage defaultMessage="Omega light theme" id="home.features.theme-engine-omega-light"/></li>
                                    <li><FormattedMessage defaultMessage="Omega dark theme" id="home.features.theme-engine-omega-dark"/></li>
                                    <li><FormattedMessage defaultMessage="Epsilon light theme" id="home.features.theme-engine-epsilon-light"/></li>
                                    <li><FormattedMessage defaultMessage="Epsilon dark theme" id="home.features.theme-engine-epsilon-dark"/></li>
                                    <li><FormattedMessage defaultMessage="Community themes" id="home.features.theme-engine-community-themes"/></li>
                                </ul>
                            </FeatureCardDescription>
                        </FeatureCard>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage defaultMessage="External apps" description="" id="home.features.external-apps"/>
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <FormattedMessage defaultMessage="Install community apps on the fly with External. Also includes KhiCAS and various emulators." description="" id="home.features.external-apps-community"/>
                            </FeatureCardDescription>
                        </FeatureCard>
                    </FeatureCardColumn>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage id="home.features.symbolic.name" defaultMessage="Symbolic computation" />
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <FormattedMessage id="home.features.symbolic.description" defaultMessage="Symbolic computation was removed from Epsilon in version 11.2. Omega reintroduces that feature." />
                            </FeatureCardDescription>
                            <FeatureCardImage src={ImgSymbolicCalculation} alt="Symbolic Calculation" />
                        </FeatureCard>
                    </FeatureCardColumn>
                </FeatureCardRow>
                </Fade>

                {/* <Fade bottom> */}
                <Fade>
                <FeatureCardRow>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage id="home.features.atom.name" defaultMessage="Periodic table" />
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <FormattedMessage id="home.features.atom.description" defaultMessage="Inspired by the TI83PCE's periodic table app, Omega's periodic table is clean and simple to use." />
                            </FeatureCardDescription>
                            <FeatureCardImage src={ImgAtom} alt="Atom" />
                        </FeatureCard>
                    </FeatureCardColumn>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage id="home.features.rpn.name" defaultMessage="RPN" />
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <FormattedMessage id="home.features.rpn.description" defaultMessage="Omega supports using Reverse Polish Notation to do calculations." />
                            </FeatureCardDescription>
                            <FeatureCardImage src={ImgRpn} alt="RPN" />
                        </FeatureCard>
                    </FeatureCardColumn>
                </FeatureCardRow>
                </Fade>

                <Fade>
                <FeatureCardRow>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage id="home.features.3ds.name" defaultMessage="Now available on the Nintendo 3DS" />
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <FormattedMessage id="home.features.3ds.description" defaultMessage="Omega is avaliable and fully usable on the Nintendo 3DS." />
                            </FeatureCardDescription>
                            <FeatureCardImage src={Img3ds} alt="3ds" />
                        </FeatureCard>
                    </FeatureCardColumn>
                    <FeatureCardColumn>
                        <FeatureCard>
                            <FeatureCardTitle>
                                <FormattedMessage defaultMessage="And more!" description="" id="home.features.and-more"/>
                            </FeatureCardTitle>
                            <FeatureCardDescription>
                                <ul>
                                    <li><FormattedMessage defaultMessage="Physical and chemical constants" id="home.features.and-more.constants"/></li>
                                    <li><FormattedMessage defaultMessage="Open method and os module" id="home.features.and-more.os"/></li>
                                    <li><FormattedMessage defaultMessage="Android simulator with script backup" id="home.features.and-more.android"/></li>
                                    <li><FormattedMessage defaultMessage="Hungarian support" id="home.features.and-more.hungarian"/></li>
                                    <li><FormattedMessage defaultMessage="Accessibility settings" id="home.features.and-more.accessibility"/></li>
                                    <li><FormattedMessage defaultMessage="Choice of multiplication symbol" id="home.features.and-more.mult-symbol"/></li>
                                    <li>…</li>
                                </ul>
                            </FeatureCardDescription>
                        </FeatureCard>
                    </FeatureCardColumn>
                </FeatureCardRow>
                </Fade>

                <div style={ { height: "16px" } }></div>

                <div className="download" style={{backgroundImage: `url(${ImgBanner})`}}>
                    <h2 className="download__title"><FormattedMessage defaultMessage="Installation d'Omega" description="" id="home.install"/> {this.getReleaseVersion(latest_version.name)}</h2>
                    <div className="download__cards">
                        <Link to="/install" className="download__cards__card">
                            <span className="download__cards__card__icon">
                                <i className="material-icons">system_update_alt</i>
                            </span>
                            <div className="download__cards__card__content">
                                <span className="download__cards__card__content__text"><FormattedMessage defaultMessage="Installation automatique" id="home.install.auto"/></span>
                                <span className="download__cards__card__content__description"><FormattedMessage defaultMessage="For Numworks, via USB" id="home.install.auto.fornumworks"/></span>
                            </div>
                        </Link>
                        <a href="https://play.google.com/store/apps/details?id=io.github.omega.simulator" target="_blank" rel="noopener noreferrer" className="download__cards__card">
                            <span className="download__cards__card__icon">
                                <i className="material-icons">android</i>
                            </span>
                            <div className="download__cards__card__content">
                                <span className="download__cards__card__content__text"><FormattedMessage defaultMessage="Android simulator" id="home.install.android"/></span>
                                <span className="download__cards__card__content__description"><FormattedMessage defaultMessage="From Google Play" id="home.install.android.from-google-play"/></span>
                            </div>
                        </a>
                    </div>
                    <div className="download__title"><FormattedMessage defaultMessage="Other downloads" description="" id="home.install.dl.others"/></div>
                    <div className="download__list">
                        <a href={latest_version.compatibility.android && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/binpack-n0100.tgz") : "#"} className="download__list__item">
                            <span className="download__list__item__icon"><i className="material-icons">get_app</i></span>
                            <span className="download__list__item__text"><FormattedMessage defaultMessage="Binpack n0100" id="home.install.dl.binpack-n0100"/> <span className="download__list__item__text__extension">.tgz</span></span>
                        </a>
                        <a href={latest_version.compatibility.android && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/binpack-n0110.tgz") : "#"} className="download__list__item">
                            <span className="download__list__item__icon"><i className="material-icons">get_app</i></span>
                            <span className="download__list__item__text"><FormattedMessage defaultMessage="Binpack n0110" id="home.install.dl.binpack-n0110"/> <span className="download__list__item__text__extension">.tgz</span></span>
                        </a>
                        <a href={latest_version.compatibility.android && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/simulator.apk") : "#"} className="download__list__item">
                            <span className="download__list__item__icon"><i className="material-icons">android</i></span>
                            <span className="download__list__item__text"><FormattedMessage defaultMessage="Android simulator" id="home.install.dl.android"/> <span className="download__list__item__text__extension">.apk</span></span>
                        </a>
                        <a href={latest_version.compatibility.web && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/simulator.zip") : "#"} className="download__list__item">
                            <span className="download__list__item__icon"><i className="material-icons">web</i></span>
                            <span className="download__list__item__text"><FormattedMessage defaultMessage="Web simulator" id="home.install.dl.web"/> <span className="download__list__item__text__extension">.zip</span></span>
                        </a>
                        <a href={latest_version.compatibility["3ds"] && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/simulator.3dsx") : "#"} className="download__list__item">
                            <span className="download__list__item__icon"><i className="material-icons">gamepad</i></span>
                            <span className="download__list__item__text"><FormattedMessage defaultMessage="3DS simulator" id="home.install.dl.3ds"/> <span className="download__list__item__text__extension">.3dsx</span></span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
