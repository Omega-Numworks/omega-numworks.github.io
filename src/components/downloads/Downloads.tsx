import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { releases } from "../../firmware/firmwares";

export class Downloads extends Component {
    constructor(props: {}) {
        super(props);

        this.getReleaseVersion = this.getReleaseVersion.bind(this);
    }

    getReleaseVersion(tag: string) {
        return tag.substring(tag.lastIndexOf("O") + 1, tag.lastIndexOf("-"));
    }

    render() {
        var latest_id = 0;
        for (var i = 0; i < releases.firmwares.length; i++) {
            if (releases.firmwares[i].name === releases.latest) {
                latest_id = i;
                break;
            }
        }

        const latest_version = releases.firmwares[latest_id];

        return (
            <div
                className="download"
                style={{
                    backgroundImage: `url(https://unsplash.com/photos/bMkRxaVMvj4/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDYwNzYyMjg&force=true&w=1920)`,
                }}
            >
                <h2 className="download__title">
                    <FormattedMessage
                        defaultMessage="Installation d'Omega"
                        description=""
                        id="home.install"
                    />{" "}
                    {this.getReleaseVersion(latest_version.name)}
                </h2>
                <div className="download__cards">
                    <Link to="/install" className="download__cards__card">
                        <span className="download__cards__card__icon">
                            <i className="material-icons">system_update_alt</i>
                        </span>
                        <div className="download__cards__card__content">
                            <span className="download__cards__card__content__text">
                                <FormattedMessage
                                    defaultMessage="Installation automatique"
                                    id="home.install.auto"
                                />
                            </span>
                            <span className="download__cards__card__content__description">
                                <FormattedMessage
                                    defaultMessage="For Numworks, via USB"
                                    id="home.install.auto.fornumworks"
                                />
                            </span>
                        </div>
                    </Link>
                    <a
                        href="https://play.google.com/store/apps/details?id=io.github.omega.simulator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download__cards__card"
                    >
                        <span className="download__cards__card__icon">
                            <i className="material-icons">android</i>
                        </span>
                        <div className="download__cards__card__content">
                            <span className="download__cards__card__content__text">
                                <FormattedMessage
                                    defaultMessage="Android simulator"
                                    id="home.install.android"
                                />
                            </span>
                            <span className="download__cards__card__content__description">
                                <FormattedMessage
                                    defaultMessage="From Google Play"
                                    id="home.install.android.from-google-play"
                                />
                            </span>
                        </div>
                    </a>
                </div>
                <div className="download__title">
                    <FormattedMessage
                        defaultMessage="Other downloads"
                        description=""
                        id="home.install.dl.others"
                    />
                </div>
                <div className="download__list">
                    <a
                        href={
                            latest_version.compatibility.android &&
                            latest_version.available
                                ? "https://github.com/Omega-Numworks/Omega/releases/download/" +
                                  latest_version.name +
                                  "/binpack-n0100.tgz"
                                : "#"
                        }
                        className="download__list__item"
                    >
                        <span className="download__list__item__icon">
                            <i className="material-icons">get_app</i>
                        </span>
                        <span className="download__list__item__text">
                            <FormattedMessage
                                defaultMessage="Binpack n0100"
                                id="home.install.dl.binpack-n0100"
                            />{" "}
                            <span className="download__list__item__text__extension">
                                .tgz
                            </span>
                        </span>
                    </a>
                    <a
                        href={
                            latest_version.compatibility.android &&
                            latest_version.available
                                ? "https://github.com/Omega-Numworks/Omega/releases/download/" +
                                  latest_version.name +
                                  "/binpack-n0110.tgz"
                                : "#"
                        }
                        className="download__list__item"
                    >
                        <span className="download__list__item__icon">
                            <i className="material-icons">get_app</i>
                        </span>
                        <span className="download__list__item__text">
                            <FormattedMessage
                                defaultMessage="Binpack n0110"
                                id="home.install.dl.binpack-n0110"
                            />{" "}
                            <span className="download__list__item__text__extension">
                                .tgz
                            </span>
                        </span>
                    </a>
                    <a
                        href={
                            latest_version.compatibility.android &&
                            latest_version.available
                                ? "https://github.com/Omega-Numworks/Omega/releases/download/" +
                                  latest_version.name +
                                  "/simulator.apk"
                                : "#"
                        }
                        className="download__list__item"
                    >
                        <span className="download__list__item__icon">
                            <i className="material-icons">android</i>
                        </span>
                        <span className="download__list__item__text">
                            <FormattedMessage
                                defaultMessage="Android simulator"
                                id="home.install.dl.android"
                            />{" "}
                            <span className="download__list__item__text__extension">
                                .apk
                            </span>
                        </span>
                    </a>
                    <a
                        href={
                            latest_version.compatibility.web &&
                            latest_version.available
                                ? "https://github.com/Omega-Numworks/Omega/releases/download/" +
                                  latest_version.name +
                                  "/simulator.zip"
                                : "#"
                        }
                        className="download__list__item"
                    >
                        <span className="download__list__item__icon">
                            <i className="material-icons">web</i>
                        </span>
                        <span className="download__list__item__text">
                            <FormattedMessage
                                defaultMessage="Web simulator"
                                id="home.install.dl.web"
                            />{" "}
                            <span className="download__list__item__text__extension">
                                .zip
                            </span>
                        </span>
                    </a>
                    <a
                        href={
                            latest_version.compatibility["3ds"] &&
                            latest_version.available
                                ? "https://github.com/Omega-Numworks/Omega/releases/download/" +
                                  latest_version.name +
                                  "/simulator.3dsx"
                                : "#"
                        }
                        className="download__list__item"
                    >
                        <span className="download__list__item__icon">
                            <i className="material-icons">gamepad</i>
                        </span>
                        <span className="download__list__item__text">
                            <FormattedMessage
                                defaultMessage="3DS simulator"
                                id="home.install.dl.3ds"
                            />{" "}
                            <span className="download__list__item__text__extension">
                                .3dsx
                            </span>
                        </span>
                    </a>
                </div>
            </div>
        );
    }
}
