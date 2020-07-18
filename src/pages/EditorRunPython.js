import React, { Component } from 'react'
import Calculator from '../components/Calculator'

export default class Simulator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            simulator: null,
            error: false,
            message: "",
            loaded: false,
            scripts: null
        };

        this.state["loaded"] = true;
    }

    render() {
        document.getElementsByClassName("cc-bottom")[0].style.display = "none";
        document.getElementsByClassName("cc-grower")[0].style.display = "none";

        if (this.state.loaded) {
            if (this.state.error) {
                return (
                    <p>ERROR: {this.state.message}</p>
                );
            } else {
                return (
                    <Calculator height={"80vh"} python={true} scripts={this.state.scripts} keyboard={true}/>
                );
            }
        } else {
            return null;
        }
    }
}
