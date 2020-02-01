import React, { Component } from 'react'
import ImgCalculatorBody from '../img/calculator-body.png'
import ImgCalculatorBodyOmega from '../img/calculator-body-omega.png'
import ImgCalculatorBodyEpsilon from '../img/calculator-body-epsilon.png'
import ImgCalculatorCable from '../img/calculator-cable.png'

export default class Install extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calculatorDetected: false,
            showTags: false,
            installerNotCompatibleWithThisBrowser: false,
            model: "nXXXX",
            omegaVersion: "N/A",
            epsilonVersion: "N/A",
            install: false,
            progressPercentage: 0,
            installationFinished: false
        }

        // Detection
        this.calculatorDetected = this.calculatorDetected.bind(this);
        this.calculatorConnectionLost = this.calculatorConnectionLost.bind(this);

        // Install
        this.install = this.install.bind(this);
        this.setProgressPercentage = this.setProgressPercentage.bind(this);
        this.installationFinished = this.installationFinished.bind(this);
        
        // Tags
        this.showTags = this.showTags.bind(this);
        this.hideTags = this.hideTags.bind(this);
        this.toggleTags = this.toggleTags.bind(this);
        
        // Set tags
        this.setModel = this.setModel.bind(this);
        this.setOmegaVersion = this.setOmegaVersion.bind(this);
        this.setEpsilonVersion = this.setEpsilonVersion.bind(this);

        // Browser compatibility
        this.installerNotCompatibleWithThisBrowser = this.installerNotCompatibleWithThisBrowser.bind(this);
    }

    // Detection
    calculatorDetected(osDetected) {
        this.setState({
            calculatorDetected: true,
            osDetected: osDetected,
            install: false
        })
        this.showTags();
    }

    calculatorConnectionLost() {
        this.setState({
            calculatorDetected: false,
            osDetected: "",
            install: false
        })
        this.hideTags();
    }

    // Install
    install() {
        this.setState({
            install: true,
            osDetected: "",
            progressPercentage: 0,
            installationFinished: false
        });
    }

    setProgressPercentage(percentage) {
        this.setState({ progressPercentage: percentage });
    }

    installationFinished() {
        this.setState({
            install: false,
            osDetected: "omega",
            installationFinished: true
        });
    }

    // Tags
    showTags() { this.setState({ showTags: true }) }
    hideTags() { this.setState({ showTags: false }) }
    toggleTags() { this.setState({ showTags: !this.state.showTags }) }

    // Set tags
    setModel(model) { this.setState({ model: model }) }
    setOmegaVersion(version) { this.setState({ omegaVersion: version }) }
    setEpsilonVersion(version) { this.setState({ epsilonVersion: version }) }

    // Browser not compatible
    installerNotCompatibleWithThisBrowser() { this.setState({ installerNotCompatibleWithThisBrowser: true }) }

    render() {
        return (
            <div className="content">
                <div className={"installer " + (this.state.installerNotCompatibleWithThisBrowser ? "" : "installer-active")}>
                    <div className="installer__calculator">
                        <img className={"installer__calculator__cable " + (this.state.calculatorDetected ? "installer__calculator__cable-active" : "")} src={ImgCalculatorCable} alt="Calculator Cable"></img>
                        <img className="installer__calculator__body installer__calculator__body-active" src={ImgCalculatorBody} alt="Calculator Body"></img>
                        <img className={"installer__calculator__body " + (this.state.osDetected === "omega" ? "installer__calculator__body-active" : "")} src={ImgCalculatorBodyOmega} alt="Calculator Body"></img>
                        <img className={"installer__calculator__body " + (this.state.osDetected === "epsilon" ? "installer__calculator__body-active" : "")} src={ImgCalculatorBodyEpsilon} alt="Calculator Body"></img>
                    </div>
                    <div className="installer__content">
                        <div className="installer__content__name">Quentin's Numworks</div>
                        <div className={"installer__content__tag installer__content__tag-gray " + (this.state.showTags ? "installer__content__tag-active" : "")}>{this.state.model}</div>
                        <div className={"installer__content__tag installer__content__tag-red " + (this.state.showTags && !this.state.install ? "installer__content__tag-active" : "")}>‎Ω {this.state.omegaVersion}</div>
                        <div className={"installer__content__tag installer__content__tag-yellow " + (this.state.showTags && !this.state.install ? "installer__content__tag-active" : "")}>‎E {this.state.epsilonVersion}</div>
                        <div className={"installer__content__progress " + (this.state.install ? "installer__content__progress-active" : "")}>
                            <div className="installer__content__progress__bar" style={{ width: this.state.progressPercentage + "%" }}></div>
                        </div>
                        <div className={"installer__content__progress__message " +  (this.state.install ? "installer__content__progress__message-active" : "")}>Installation d'Omega 1.18.5. Veuillez ne pas débrancher la calculatrice.</div>
                    </div>
                </div>

                <div className={"installer-thanks " + (this.state.installationFinished ? "installer-thanks-active" : "")}>
                    Thank you for installing Omega! Your calculator is now running Omega {this.state.omegaVersion}.
                </div>

                <div className={"installer-notcompatible " + (this.state.installerNotCompatibleWithThisBrowser ? "installer-notcompatible-active" : "")}>
                    Our installer is not compatible with your browser. Please use a browser like Chromium/Google Chrome or Edge.
                </div>

                <button onClick={() => this.calculatorDetected("epsilon")}>Calculator detected (Epsilon)</button>
                <button onClick={() => this.calculatorDetected("omega")}>Calculator detected (Omega)</button>
                <button onClick={this.calculatorConnectionLost}>Calculator connection lost</button>
                <button onClick={this.installerNotCompatibleWithThisBrowser}>Installer not compatible with this browser</button>
                <button onClick={this.install}>Install</button>
                <button onClick={() => this.setProgressPercentage(0)}>0%</button>
                <button onClick={() => this.setProgressPercentage(24)}>24%</button>
                <button onClick={() => this.setProgressPercentage(73)}>73%</button>
                <button onClick={() => this.setProgressPercentage(100)}>100%</button>
                <button onClick={this.installationFinished}>Installation finished</button>
            </div>
        )
    }
}
