import React, { Component } from 'react'
import ReactDOM from "react-dom";
import PythonSimulator from './Simulator'

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            keyboard: this.props.keyboard === undefined ? true : this.props.keyboard,
            scripts: this.props.scripts === undefined ? null : this.props.scripts,
            python: this.props.python === undefined ? false : this.props.python,
            width: this.props.width,
            height: (this.props.height === undefined && this.props.width === undefined) ? "100vh" : this.props.height,
            simulator: null
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        
        this.reloadScripts = this.reloadScripts.bind(this);
        
        document.addEventListener("reload-simu", function(e) {
            this.reloadScripts(e.detail.scripts);
        }.bind(this), false);
        
        document.addEventListener("key-down", function(e) {
            this.keyDown(e.detail.keynum);
        }.bind(this), false);
        
        document.addEventListener("key-up", function(e) {
            this.keyUp(e.detail.keynum);
        }.bind(this), false);
        
        document.addEventListener("screenshot", function(e) {
            this.screenshot();
        }.bind(this), false);
    }
    
    componentDidMount() {
        var simulator = new PythonSimulator();
        simulator.load(this.state.python, function() {
            simulator.run(ReactDOM.findDOMNode(this), this.state.keyboard, this.state.scripts, this.state.python);
        }.bind(this));
        
        this.setState({
            simulator: simulator
        });
    }
    
    reloadScripts(scripts = null) {
        if (this.state.simulator.isLoaded) {
            this.setState({
                scripts: scripts === undefined ? null : scripts,
            });
            
            this.componentWillUnmount();
            this.componentDidMount();
            
            // this.state.simulator.run(ReactDOM.findDOMNode(this), this.state.keyboard, scripts, this.state.python);
        }
    }
    
    screenshot() {
        var canvas = document.getElementById("canvas");
        if (canvas && this.state.simulator.isLoaded) {
            this.state.simulator.module._IonDisplayForceRefresh();

            var link = document.createElement('a');

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
            var dateTime = date + '--' + time;
            
            link.download = 'screenshot-' + dateTime + '.png';

            link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            link.click();
        }
    }
    
    keyDown(num) {
        if (this.state.simulator.isLoaded) {
            this.state.simulator.module._IonSimulatorKeyboardKeyDown(num);
        }
    }
    
    keyUp(num) {
        if (this.state.simulator.isLoaded) {
            this.state.simulator.module._IonSimulatorKeyboardKeyUp(num);
        }
    }
    
    componentWillUnmount() {
        this.state.simulator.stop();
        this.state.simulator.unload();
        
        this.setState({
            simulator: null
        });
    }
    
    render() {
        
        let style = {};
        
        if (this.state.height !== undefined) {
            if (this.state.width !== undefined) {
                style = {"maxWidth": this.state.width, "maxHeight": this.state.height};
            } else {
                style = {"maxHeight": this.state.height};
            }
        } else {
            if (this.state.width !== undefined) {
                style = {"maxWidth": this.state.width};
            }
        }
        
        return (
            <div style={style} className="calculator calculator__nokeyboard" onClick={(e) => e.target.focus()} >
                <canvas style={style} tabIndex="1" id="canvas" onContextMenu={function(e){e.preventDefault()}}></canvas>
            </div>
        );
    }
}
