import React, { Component } from 'react'
import ImgSymbolicCalculation from '../img/symbolic-calculation.png'
import ImgAtom from '../img/atom.png'
import ImgRpn from '../img/rpn.png'
import Img3ds from '../img/3ds.png'
import { releases } from '../firmware/firmwares'
import { Button, ButtonsGroup } from '@quentinguidee/react-jade-ui'
import { FormattedMessage } from 'react-intl'

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
            <div className="content">
                {/* Parallax */}
                {/*<div className="parallax"></div>*/}

                {/* Project description */}
                <div className="project-description">
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

                {/* Symbolic computation */}
                <div className="feature feature-white">
                    <div className="feature__content">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.symbolic.name" defaultMessage="Symbolic computation" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.symbolic.description" defaultMessage="Symbolic computation was removed from Epsilon in version 11.2. Omega reintroduces that feature." />
                        </p>
                    </div>
                    <div className="feature__images">
                        <img className="feature__images__image" alt="Symbolic Calculation" src={ImgSymbolicCalculation} />
                    </div>
                </div>

                {/* Periodic table */}
                <div className="feature feature-gray feature-desktop">
                    <div className="feature__images">
                        <img className="feature__images__image" alt="Atom" src={ImgAtom} />
                    </div>
                    <div className="feature__content">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.atom.name" defaultMessage="Periodic table" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.atom.description" defaultMessage="Inspired by the TI83PCE's periodic table app, Omega's periodic table is clean and simple to use." />
                        </p>
                    </div>
                </div>

                {/* Periodic table */}
                <div className="feature feature-gray feature-mobile">
                    <div className="feature__content">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.atom.name" defaultMessage="Periodic table" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.atom.description" defaultMessage="Inspired by the TI83PCE's periodic table app, Omega's periodic table is clean and simple to use." />
                        </p>
                    </div>
                    <div className="feature__images">
                        <img className="feature__images__image" alt="Atom" src={ImgAtom} />
                    </div>
                </div>

                {/* KhiCAS */}
                {/* <div className="feature feature-white">
                    <div className="feature__content">
                        <h3 className="feature__content__title">Support of KhiCAS and external apps</h3>
                        <p className="feature__content__description">
                            Delta, another forked firmware which supports external apps, is fully integrated into Omega. This mean you can run KhiCAS or Nofrendo on your Numworks calculator.
                        </p>
                        <p className="feature__content__small">Due to hardware limitations, this is only possible on n0110.</p>
                    </div>
                    <div className="feature__images">
                        <img className="feature__images__image" src="img/giac.png"/>
                    </div>
                </div> */}
                
                {/* RPN */}
                <div className="feature feature-white">
                    <div className="feature__content">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.rpn.name" defaultMessage="RPN" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.rpn.description" defaultMessage="Omega supports using Reverse Polish Notation to do calculations." />
                        </p>
                    </div>
                    <div className="feature__images">
                        <img className="feature__images__image" alt="RPN" src={ImgRpn} />
                    </div>
                </div>

                {/* 3DS */}
                <div className="feature feature-gray feature-desktop">
                    <div className="feature__images">
                        <img className="feature__images__image" alt="Atom" src={Img3ds} />
                    </div>
                    <div className="feature__content">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.3ds.name" defaultMessage="Now available on the Nintendo 3DS" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.3ds.description" defaultMessage="Omega is avaliable and fully usable on the Nintendo 3DS." />
                        </p>
                    </div>
                </div>

                {/* 3DS */}
                <div className="feature feature-gray feature-mobile">
                    <div className="feature__content">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.3ds.name" defaultMessage="Now available on the Nintendo 3DS" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.3ds.description" defaultMessage="Omega is avaliable and fully usable on the Nintendo 3DS." />
                        </p>
                    </div>
                    <div className="feature__images">
                        <img className="feature__images__image" alt="Atom" src={Img3ds} />
                    </div>
                </div>
                
                {/* And more */}
                <div className="feature feature-darkgray">
                    <div className="feature__content feature__content-full">
                        <h3 className="feature__content__title">
                            <FormattedMessage id="home.features.more.name" defaultMessage="And more!" />
                        </h3>
                        <p className="feature__content__description">
                            <FormattedMessage id="home.features.more.description" defaultMessage="A theming engine, accessibility settings, support for KhiCAS, loadable applications, different multiplication signs, more brightness steps, physics & chemistry constants, usernames..." />
                        </p>
                        <div style={ {height: "24"} }></div>
                    </div>
                </div>

                {/* Download */}
                
                <div className="download">
                    <div className="download__title"><FormattedMessage id="home.download.title" defaultMessage="Download" /></div>
                    <div className="download__version"><FormattedMessage id="home.download.subtitle" defaultMessage="Omega {version}" values={{version: this.getReleaseVersion(latest_version.name)}}/></div>
                    
                    <ButtonsGroup className="releases__cards__card__actions">
                        <Button
                            className="releases__cards__card__actions__subbutton"
                            href={"https://github.com/Omega-Numworks/Omega/releases/tag/" + latest_version.name}
                            leftIcon="code"
                            isExternalLink>
                            <FormattedMessage id="releases.github" defaultMessage="GITHUB" /></Button>
                        <Button
                            className="releases__cards__card__actions__subbutton"
                            to={"/install/" + latest_version.name}
                            leftIcon="system_update_alt"
                            disabled={!(latest_version.available && (latest_version.compatibility.N0110 || latest_version.compatibility.N0100))}>
                            <FormattedMessage id="releases.install" defaultMessage="INSTALL" />
                        </Button>
                        <Button
                            className="releases__cards__card__actions__subbutton"
                            href={latest_version.compatibility.android && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/simulator.apk") : "#"}
                            leftIcon="android"
                            disabled={!(latest_version.compatibility.android && latest_version.available)}>
                            <FormattedMessage id="releases.android" defaultMessage="ANDROID" />
                        </Button>
                        <Button
                            className="releases__cards__card__actions__subbutton"
                            href={latest_version.compatibility.web && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/simulator.zip") : "#"}
                            leftIcon="web"
                            disabled={!(latest_version.compatibility.web && latest_version.available)}>
                            <FormattedMessage id="releases.web" defaultMessage="WEB" />
                        </Button>
                        <Button
                            className="releases__cards__card__actions__subbutton"
                            href={latest_version.compatibility["3ds"] && latest_version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + latest_version.name + "/simulator.3dsx") : "#"}
                            leftIcon="gamepad"
                            disabled={!(latest_version.compatibility["3ds"] && latest_version.available)}>
                            <FormattedMessage id="releases.3ds" defaultMessage="3DS" />
                        </Button>
                    </ButtonsGroup>
                </div>
            </div>
        )
    }
}
