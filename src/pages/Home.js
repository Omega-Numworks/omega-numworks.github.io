import React, { Component } from 'react'
import ImgSymbolicCalculation from '../img/symbolic-calculation.png'
import ImgAtom from '../img/atom.png'
import ImgRpn from '../img/rpn.png'
import { releases } from '../firmware/firmwares'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.getReleaseVersion = this.getReleaseVersion.bind(this);
    }

    getReleaseVersion(tag) {
        return tag.substring(
            tag.lastIndexOf("O") + 1, 
            tag.lastIndexOf("-")
        );
    }

    render() {
        return (
            <div className="content">
                {/* Parallax */}
                {/*<div className="parallax"></div>*/}

                {/* Project description */}
                <div className="project-description">
                    <h1 className="project-description__title">Omega</h1>
                    <h2 className="project-description__subtitle">The next evolution of Epsilon.</h2>
                    <p className="project-description__description">
                        Omega is a fork of Numworks' Epsilon, the OS that runs on their calculator, which brings many features to it. Omega is for the people who want to add features to the calculator, but cannot because they have been rejected by Numworks (for reasons that are 100% understandable!).
                    </p>
                    {/* <h2 className="mb-3">A whole new set of features</h2> */}
                </div>

                {/* Symbolic computation */}
                <div className="feature feature-white">
                    <div className="feature__content">
                        <h3 className="feature__content__title">Symbolic computation</h3>
                        <p className="feature__content__description">
                            Symbolic computation was removed from Epsilon in version 11.2. Omega reintroduces that feature.
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
                        <h3 className="feature__content__title">Periodic table</h3>
                        <p className="feature__content__description">
                            Inspired by the TI83PCE's periodic table app, Omega's periodic table is clean and simple to use.
                        </p>
                    </div>
                </div>

                {/* Periodic table */}
                <div className="feature feature-gray feature-mobile">
                    <div className="feature__content">
                        <h3 className="feature__content__title">Periodic table</h3>
                        <p className="feature__content__description">
                            Inspired by the TI83PCE's periodic table app, Omega's periodic table is clean and simple to use.
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
                        <h3 className="feature__content__title">RPN</h3>
                        <p className="feature__content__description">
                            Omega supports using Reverse Polish Notation to do calculations.
                        </p>
                    </div>
                    <div className="feature__images">
                        <img className="feature__images__image" alt="RPN" src={ImgRpn} />
                    </div>
                </div>
                
                {/* And more */}
                <div className="feature feature-gray">
                    <div className="feature__content feature__content-full">
                        <h3 className="feature__content__title">And more!</h3>
                        <p className="feature__content__description">
                            A theming engine, accessibility settings, support for KhiCAS, loadable applications, different multiplication signs, more brightness steps, physics & chemistry constants, usernames, a 32KB Python heap instead of 16KB one...
                        </p>
                        <div style={ {height: "24"} }></div>
                    </div>
                </div>

                {/* Download */}
                <div className="download">
                    <div className="download__title">Download</div>
                    <div className="download__version">Omega {this.getReleaseVersion(releases.firmwares[0].name)}</div>
                    <div className="releases__cards__card__actions">
                        <a className="releases__cards__card__actions__subbutton" href={"https://github.com/Omega-Numworks/Omega/releases/tag/" + releases.firmwares[0].name}>
                            <i className="releases__cards__card__actions__subbutton__icon material-icons md-16">code</i>
                            <div className="releases__cards__card__actions__subbutton__text">GITHUB</div>
                        </a>
                        <Link className={"releases__cards__card__actions__subbutton releases__cards__card__actions__subbutton-hide-on-mobile" + (releases.firmwares[0].available && (releases.firmwares[0].compatibility.N0110 || releases.firmwares[0].compatibility.N0100) ? "" : " releases__cards__card__actions__subbutton-disabled")} to={"/install/" + releases.firmwares[0].name}>
                            <i className={"releases__cards__card__actions__subbutton__icon material-icons md-16" + (releases.firmwares[0].available && (releases.firmwares[0].compatibility.N0110 || releases.firmwares[0].compatibility.N0100) ? "" : " releases__cards__card__actions__subbutton__icon-disabled")}>system_update_alt</i>
                            <div className={"releases__cards__card__actions__subbutton__text" + (releases.firmwares[0].available && (releases.firmwares[0].compatibility.N0110 || releases.firmwares[0].compatibility.N0100) ? "" : " releases__cards__card__actions__subbutton__text-disabled")}>INSTALL</div>
                        </Link>
                        <a className={"releases__cards__card__actions__subbutton" + (releases.firmwares[0].compatibility.android && releases.firmwares[0].available ? "" : " releases__cards__card__actions__subbutton-disabled")} href={releases.firmwares[0].compatibility.android && releases.firmwares[0].available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + releases.firmwares[0].name + "/simulator.apk") : "#"}>
                            <i className={"releases__cards__card__actions__subbutton__icon material-icons md-16" + (releases.firmwares[0].compatibility.android && releases.firmwares[0].available ? "" : " releases__cards__card__actions__subbutton__icon-disabled")}>android</i>
                            <div className={"releases__cards__card__actions__subbutton__text" + (releases.firmwares[0].compatibility.android && releases.firmwares[0].available ? "" : " releases__cards__card__actions__subbutton__text-disabled")}>ANDROID</div>
                        </a>
                        <a className={"releases__cards__card__actions__subbutton releases__cards__card__actions__subbutton-hide-on-mobile" + (releases.firmwares[0].compatibility.web && releases.firmwares[0].available ? "" : " releases__cards__card__actions__subbutton-disabled")} href={releases.firmwares[0].compatibility.web && releases.firmwares[0].available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + releases.firmwares[0].name + "/simulator.zip") : "#"}>
                            <i className={"releases__cards__card__actions__subbutton__icon material-icons md-16" + (releases.firmwares[0].compatibility.web && releases.firmwares[0].available ? "" : " releases__cards__card__actions__subbutton__icon-disabled")}>web</i>
                            <div className={"releases__cards__card__actions__subbutton__text" + (releases.firmwares[0].compatibility.web && releases.firmwares[0].available ? "" : " releases__cards__card__actions__subbutton__text-disabled")}>WEB</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
