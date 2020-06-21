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
                    <iframe src="/editor/run" width="600" height="800" scrolling="no" id="simu_frame_2" style={{"min-width": "100%", "min-height": "100%"}} title="Simulator"/>
                </div>
            </div>
        );
    }
}
