import React, { Component } from 'react'
import { releases } from '../firmware/firmwares'
import { Link } from 'react-router-dom'


export default class Releases extends Component {
    constructor(props) {
        super(props);
        
        this.getReleaseVersion = this.getReleaseVersion.bind(this);
        this.getEpsilonVersion = this.getEpsilonVersion.bind(this);

        document.title = "Omega — Releases"
    }

    getReleaseVersion(tag) {
        return tag.substring(
            tag.lastIndexOf("O") + 1, 
            tag.lastIndexOf("-")
        );
    }

    getEpsilonVersion(tag) {
        return tag.substring(
            tag.lastIndexOf("E") + 1
        );
    }

    render() {
        return (
            <div className="content">
        
                <div style={ { height: "16px" } }></div>

                {
                    releases.firmwares.map(element => {
                        return (
                            <div className="releases__cards">
                                <div className="releases__cards__card">
                                    <div className="releases__cards__card__title">{"Omega " + this.getReleaseVersion(element.name)}</div>
                                    <div className="releases__cards__card__subtitle">{"Epsilon " + this.getEpsilonVersion(element.name)}</div>
                                    <div className="releases__cards__card__actions">
                                        {/* <div className="releases__cards__card__actions__subbutton">
                                            <div className="releases__cards__card__actions__subbutton__text">ACTIONS</div>
                                            <i className="releases__cards__card__actions__subbutton__icon material-icons md-18">more_vert</i>
                                        </div> */}

                                        <a className="releases__cards__card__actions__subbutton" href={"https://github.com/Omega-Numworks/Omega/releases/tag/" + element.name} target="_blank" rel="noopener noreferrer">
                                            <i className="releases__cards__card__actions__subbutton__icon material-icons md-16">launch</i>
                                            <div className="releases__cards__card__actions__subbutton__text">GITHUB</div>
                                        </a>
                                        <Link className={"releases__cards__card__actions__subbutton releases__cards__card__actions__subbutton-hide-on-mobile" + (element.available && (element.compatibility.N0110 || element.compatibility.N0100) ? "" : " releases__cards__card__actions__subbutton-disabled")} to={"/install/" + element.name}>
                                            <i className={"releases__cards__card__actions__subbutton__icon material-icons md-16" + (element.available && (element.compatibility.N0110 || element.compatibility.N0100) ? "" : " releases__cards__card__actions__subbutton__icon-disabled")}>system_update_alt</i>
                                            <div className={"releases__cards__card__actions__subbutton__text" + (element.available && (element.compatibility.N0110 || element.compatibility.N0100) ? "" : " releases__cards__card__actions__subbutton__text-disabled")}>INSTALL</div>
                                        </Link>
                                        <a className={"releases__cards__card__actions__subbutton" + (element.compatibility.android && element.available ? "" : " releases__cards__card__actions__subbutton-disabled")} href={element.compatibility.android && element.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + element.name + "/simulator.apk") : "#"}>
                                            <i className={"releases__cards__card__actions__subbutton__icon material-icons md-16" + (element.compatibility.android && element.available ? "" : " releases__cards__card__actions__subbutton__icon-disabled")}>android</i>
                                            <div className={"releases__cards__card__actions__subbutton__text" + (element.compatibility.android && element.available ? "" : " releases__cards__card__actions__subbutton__text-disabled")}>ANDROID</div>
                                        </a>
                                        <a className={"releases__cards__card__actions__subbutton releases__cards__card__actions__subbutton-hide-on-mobile" + (element.compatibility.web && element.available ? "" : " releases__cards__card__actions__subbutton-disabled")} href={element.compatibility.web && element.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + element.name + "/simulator.zip") : "#"}>
                                            <i className={"releases__cards__card__actions__subbutton__icon material-icons md-16" + (element.compatibility.web && element.available ? "" : " releases__cards__card__actions__subbutton__icon-disabled")}>web</i>
                                            <div className={"releases__cards__card__actions__subbutton__text" + (element.compatibility.web && element.available ? "" : " releases__cards__card__actions__subbutton__text-disabled")}>WEB</div>
                                        </a>
                                        {/* <div className="releases__cards__card__actions__subbutton">
                                            <i className="releases__cards__card__actions__subbutton__icon material-icons md-16">arrow_drop_down_circle</i>
                                        </div> */}
                                    </div>

                                    <div className="releases__cards__card__changelog">
                                        <ul className="releases__cards__card__changelog__ul">
                                        {
                                            element.changelog.map((change) => {
                                                return (
                                                    <li className="releases__cards__card__changelog__ul__li">{"• " + change}</li>
                                                );
                                            })
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>);
                        }
                    )
                }

                <div style={ { height: "16px" } }></div>
            </div>
        )
    }
}
