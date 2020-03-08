import React, { Component } from 'react'
import Calculator from '../components/Calculator'

export default class Simulator extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            simulator: null
        };
        

    }

    render() {
        return (
            <div className="content">
                <div className="simulator">
                    <Calculator></Calculator>
                </div>
            </div>
        )
    }
}
