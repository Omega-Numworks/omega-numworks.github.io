import React, { Component } from 'react'
import ReactDOM from "react-dom";
import PythonSimulator from '../simulator'
import ImgSimulatorBackground from '../img/simulator-background.jpg'

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            keyboard: this.props.keyboard === undefined ? true : this.props.keyboard,
            scripts: this.props.scripts === undefined ? null : this.props.scripts,
            python: this.props.python === undefined ? false : this.props.scripts,
            simulator: null
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    
    componentDidMount() {
        var simulator = new PythonSimulator();
        simulator.load(function() {
            simulator.run(ReactDOM.findDOMNode(this), this.state.keyboard, this.state.scripts, this.state.python);
        }.bind(this));
        
        this.setState({
            simulator: simulator
        });
    }
    
    componentWillUnmount() {
        this.state.simulator.stop();
        this.state.simulator.unload();
        
        this.setState({
            simulator: null
        });
    }
    
    render() {
        return (
            <div className={"calculator" + (this.state.keyboard ? "" : " calculator__nokeyboard")}>
                <img className={"calculator__background" + (this.state.keyboard ? "" : " calculator__background__disabled")} src={ImgSimulatorBackground} alt="Red Ultra Swagg NumWorks Calculator"></img>
                <canvas className={"calculator__screen" + (this.state.keyboard ? "" : " calculator__screen__nokeyboard")} oncontextmenu="event.preventDefault()"></canvas>
                <div className={"calculator__keyboard" + (this.state.keyboard ? "" : " calculator__keyboard__disabled")}>
                    <div className="calculator__keyboard__nav">
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__left" data-key="0"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__top" data-key="1"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__bottom" data-key="2"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__right" data-key="3"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__ok" data-key="4"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__back" data-key="5"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__home" data-key="6"></span>
                        <span className="calculator__keyboard__nav__key calculator__keyboard__nav__power" data-key="7"></span>
                    </div>
                    <div className="calculator__keyboard__functions">
                        <span className="calculator__keyboard__functions__key" data-key="12"></span>
                        <span className="calculator__keyboard__functions__key" data-key="13"></span>
                        <span className="calculator__keyboard__functions__key" data-key="14"></span>
                        <span className="calculator__keyboard__functions__key" data-key="15"></span>
                        <span className="calculator__keyboard__functions__key" data-key="16"></span>
                        <span className="calculator__keyboard__functions__key" data-key="17"></span>
                        <span className="calculator__keyboard__functions__key" data-key="18"></span>
                        <span className="calculator__keyboard__functions__key" data-key="19"></span>
                        <span className="calculator__keyboard__functions__key" data-key="20"></span>
                        <span className="calculator__keyboard__functions__key" data-key="21"></span>
                        <span className="calculator__keyboard__functions__key" data-key="22"></span>
                        <span className="calculator__keyboard__functions__key" data-key="23"></span>
                        <span className="calculator__keyboard__functions__key" data-key="24"></span>
                        <span className="calculator__keyboard__functions__key" data-key="25"></span>
                        <span className="calculator__keyboard__functions__key" data-key="26"></span>
                        <span className="calculator__keyboard__functions__key" data-key="27"></span>
                        <span className="calculator__keyboard__functions__key" data-key="28"></span>
                        <span className="calculator__keyboard__functions__key" data-key="29"></span>
                    </div>
                    <div className="calculator__keyboard__digits">
                        <span className="calculator__keyboard__digits__key" data-key="30"></span>
                        <span className="calculator__keyboard__digits__key" data-key="31"></span>
                        <span className="calculator__keyboard__digits__key" data-key="32"></span>
                        <span className="calculator__keyboard__digits__key" data-key="33"></span>
                        <span className="calculator__keyboard__digits__key" data-key="34"></span>
                        <span className="calculator__keyboard__digits__key" data-key="36"></span>
                        <span className="calculator__keyboard__digits__key" data-key="37"></span>
                        <span className="calculator__keyboard__digits__key" data-key="38"></span>
                        <span className="calculator__keyboard__digits__key" data-key="39"></span>
                        <span className="calculator__keyboard__digits__key" data-key="40"></span>
                        <span className="calculator__keyboard__digits__key" data-key="42"></span>
                        <span className="calculator__keyboard__digits__key" data-key="43"></span>
                        <span className="calculator__keyboard__digits__key" data-key="44"></span>
                        <span className="calculator__keyboard__digits__key" data-key="45"></span>
                        <span className="calculator__keyboard__digits__key" data-key="46"></span>
                        <span className="calculator__keyboard__digits__key" data-key="48"></span>
                        <span className="calculator__keyboard__digits__key" data-key="49"></span>
                        <span className="calculator__keyboard__digits__key" data-key="50"></span>
                        <span className="calculator__keyboard__digits__key" data-key="51"></span>
                        <span className="calculator__keyboard__digits__key" data-key="52"></span>
                    </div>
                </div>
            </div>
        );
    }
}
