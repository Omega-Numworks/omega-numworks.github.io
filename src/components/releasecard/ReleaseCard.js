import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import ButtonsGroup from "./../button/ButtonsGroup"
import Button from './../button/Button';
import './sass/releasecard.sass'

export default class ReleaseCard extends Component {
    constructor(props) {
        super(props);

        this.getReleaseVersion = this.getReleaseVersion.bind(this);
        this.getEpsilonVersion = this.getEpsilonVersion.bind(this);
        this.getVersionName = this.getVersionName.bind(this);

        this.renderDownloadButtons = this.renderDownloadButtons.bind(this);
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

    getVersionName() {
        if (this.props.name) {
            return this.props.name;
        } else {
            return "Omega " + this.getReleaseVersion(this.props.version.name);
        }
    }
    
    renderDownloadButtons(version) {
        return (
            <ButtonsGroup className="card__actions">
                <Button
                    href={"https://github.com/Omega-Numworks/Omega/releases/tag/" + version.name}
                    leftIcon="code"
                    isExternalLink>
                    <FormattedMessage id="releases.github" defaultMessage="GITHUB" /></Button>
                <Button
                    to={"/install/" + version.name}
                    leftIcon="system_update_alt"
                    disabled={!(version.available && (version.compatibility.N0110 || version.compatibility.N0100))}>
                    <FormattedMessage id="releases.install" defaultMessage="INSTALL" />
                </Button>
                <Button
                    href={version.compatibility.android && version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + version.name + "/simulator.apk") : "#"}
                    leftIcon="android"
                    disabled={!(version.compatibility.android && version.available)}>
                    <FormattedMessage id="releases.android" defaultMessage="ANDROID" />
                </Button>
                <Button
                    href={version.compatibility.web && version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + version.name + "/simulator.zip") : "#"}
                    leftIcon="web"
                    disabled={!(version.compatibility.web && version.available)}>
                    <FormattedMessage id="releases.web" defaultMessage="WEB" />
                </Button>
                <Button
                    href={version.compatibility["3ds"] && version.available ? ("https://github.com/Omega-Numworks/Omega/releases/download/" + version.name + "/simulator.3dsx") : "#"}
                    leftIcon="gamepad"
                    disabled={!(version.compatibility["3ds"] && version.available)}>
                    <FormattedMessage id="releases.3ds" defaultMessage="3DS" />
                </Button>
            </ButtonsGroup>
        );
    }

    render() {
        const version = this.props.version;

        return (
            <div className="card" style={{ display: (this.props.hidden ? "none" : "block") }}>
                <div className="card__title">{this.getVersionName()}</div>
                <div className="card__subtitle">Epsilon {this.getEpsilonVersion(version.name)}</div>
                
                {this.renderDownloadButtons(version)}

                <div className="card__changelog">
                    <ul className="card__changelog__ul">
                    {
                        version.changelog.map((change) => {
                            var tag;
                            var text;

                            if (change.startsWith("New")) {
                                tag = <div className="card__changelog__ul__li__tag card__changelog__ul__li__tag-new">NEW</div>;
                                text = <div className="card__changelog__ul__li__text">{change.replace("New: ", "")}</div>;
                            } else if (change.startsWith("Change")) {
                                tag = <div className="card__changelog__ul__li__tag card__changelog__ul__li__tag-change">CHG</div>;
                                text = <div className="card__changelog__ul__li__text">{change.replace("Change: ", "")}</div>;
                            } else if (change.startsWith("Fix")) {
                                tag = <div className="card__changelog__ul__li__tag card__changelog__ul__li__tag-fix">FIX</div>;
                                text = <div className="card__changelog__ul__li__text">{change.replace("Fix: ", "")}</div>;
                            } else if (change.startsWith("Update")) {
                                tag = <div className="card__changelog__ul__li__tag card__changelog__ul__li__tag-update">UPD</div>;
                                text = <div className="card__changelog__ul__li__text">{change.replace("Update: ", "")}</div>;
                            } else {
                                tag = <div className="card__changelog__ul__li__tag">ERR</div>;
                                text = <div className="card__changelog__ul__li__text">{change}</div>;
                            }

                            return (
                                <li className="card__changelog__ul__li">{tag}{text}</li>
                            );
                        })
                    }
                    </ul>
                </div>
            </div>
        );
    }
}
