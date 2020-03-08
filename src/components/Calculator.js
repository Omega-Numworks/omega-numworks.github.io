import React, { Component } from 'react'
import PythonSimulator from '../simulator'

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            keyboard: this.props.keyboard,
            scripts: this.props.scripts,
            python: this.props.python,
            simulator: null
        };
        
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    
    componentDidMount() {
        var simulator = new PythonSimulator();
        simulator.load(function() {
            var scripts_list = null;
            var python_only = false;
            
            if (this.state.scripts !== undefined) {
                scripts_list = this.state.scripts;
            }
            if (this.state.python !== undefined) {
                python_only = this.state.python;
            }
            
            simulator.run(scripts_list, python_only);
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
            <div className="content">
                <canvas id="screen" class="screen" oncontextmenu="event.preventDefault()"></canvas>
            </div>
        );
    }
}
