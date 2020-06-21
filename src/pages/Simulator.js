import React, { Component } from 'react'
import Calculator from '../components/Calculator'

export default class Simulator extends Component {
    constructor(props) {
        super(props);

        document.title = "Omega - Simulator"
        
        this.state = {
            simulator: null
        };
    }

    render() {
        return (
            <div className="content" style={{ textAlign: "center" }}>
                <div className="simulator">
                    <Calculator />
                </div>
            </div>
        );
    }
}
