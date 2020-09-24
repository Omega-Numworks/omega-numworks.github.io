
import React, { Component } from 'react';

class SimulatorScreen extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleScreen = this.handleScreen.bind(this);
        
        this.state = {
            selected: true
        }
    }
    
    handleClick(event) {
        event.stopPropagation();
        
        this.setState({
            selected: !this.state.selected
        });
    }
    
    handleScreen(event) {
        event.stopPropagation();
        
        this.props.onScreen();
    }
    
    render() {
        return (
            <div onClick={this.handleClick} className={"editor__leftmenu__dropdown" + (this.state.selected ? " editor__leftmenu__dropdown-selected" : "")}>
                <div className="editor__leftmenu__dropdown__title">
                    <i className="editor__leftmenu__dropdown__title__chevron material-icons">keyboard_arrow_right</i>
                    <span className="editor__leftmenu__dropdown__title__content">SCREEN</span>
                    <div className="editor__leftmenu__dropdown__title__actions editor__leftmenu__dropdown__title__actions__normal">
                        <i className="editor__leftmenu__dropdown__title__actions__icon material-icons" onClick={this.handleScreen}>photo_camera</i>
                    </div>
                </div>
                <div className="editor__leftmenu__dropdown__content editor__simulator__screen">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class SimulatorKey extends Component {
    render() {
        return (
            <span onClick={(event) => {event.stopPropagation()}} onMouseDown={(event) => {event.stopPropagation();this.props.onMouseDown(this.props.keynum)}} onMouseUp={(event) => {event.stopPropagation();this.props.onMouseUp(this.props.keynum)}} className={"editor__simulator__keyboard__key editor__simulator__keyboard__key__" + this.props.keyname}></span>
        );
    }
}

class SimulatorKeyboard extends Component {
    constructor(props) {
        super(props);
        
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp   = this.handleMouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            selected: true
        }
    }
    
    handleClick(event) {
        event.stopPropagation();
        
        this.setState({
            selected: !this.state.selected
        });
    }
    
    handleMouseDown(num) {
        this.props.onKeyDown(num);
    }
    
    handleMouseUp(num) {
        this.props.onKeyUp(num);
    }

    render() {
        return (
            <div onClick={this.handleClick} className={"editor__leftmenu__dropdown" + (this.state.selected ? " editor__leftmenu__dropdown-selected" : "")}>
                <div className="editor__leftmenu__dropdown__title">
                    <i className="editor__leftmenu__dropdown__title__chevron material-icons">keyboard_arrow_right</i>
                    <span className="editor__leftmenu__dropdown__title__content">KEYBOARD</span>
                </div>
                <div className="editor__leftmenu__dropdown__content editor__simulator__keyboard">
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={0} keyname="left"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={1} keyname="up"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={2} keyname="down"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={3} keyname="right"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={4} keyname="ok"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={5} keyname="back"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={6} keyname="home"/>
                    <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={7} keyname="power"/>

                    <div className="editor__simulator__keyboard__function__l1">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={12} keyname="f1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={13} keyname="f2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={14} keyname="f3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={15} keyname="f4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={16} keyname="f5"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={17} keyname="f6"/>
                    </div>
                    <div className="editor__simulator__keyboard__function__l2">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={18} keyname="f1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={19} keyname="f2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={20} keyname="f3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={21} keyname="f4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={22} keyname="f5"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={23} keyname="f6"/>
                    </div>
                    <div className="editor__simulator__keyboard__function__l3">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={14} keyname="f1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={15} keyname="f2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={26} keyname="f3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={27} keyname="f4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={28} keyname="f5"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={29} keyname="f6"/>
                    </div>
                    <div className="editor__simulator__keyboard__numpad__l1">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={30} keyname="n1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={31} keyname="n2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={32} keyname="n3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={33} keyname="n4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={34} keyname="n5"/>
                    </div>
                    <div className="editor__simulator__keyboard__numpad__l2">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={36} keyname="n1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={37} keyname="n2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={38} keyname="n3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={39} keyname="n4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={40} keyname="n5"/>
                    </div>
                    <div className="editor__simulator__keyboard__numpad__l3">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={42} keyname="n1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={43} keyname="n2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={44} keyname="n3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={45} keyname="n4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={46} keyname="n5"/>
                    </div>
                    <div className="editor__simulator__keyboard__numpad__l4">
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={48} keyname="n1"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={49} keyname="n2"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={50} keyname="n3"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={51} keyname="n4"/>
                        <SimulatorKey onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} keynum={52} keyname="n5"/>
                    </div>
                </div>
            </div>
        );
    }
}

export {SimulatorScreen, SimulatorKeyboard}

