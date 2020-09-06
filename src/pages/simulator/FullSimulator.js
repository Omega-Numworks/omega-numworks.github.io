import React, { Component } from 'react'
import Calculator from '../../components/calculator/Calculator'

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
        if (document.getElementsByClassName("cookiesconsent").length > 0)   document.getElementsByClassName("cookiesconsent")[0].style.display = "none";

        if (this.state.loaded) {
            if (this.state.error) {
                return (
                    <p>ERROR: {this.state.message}</p>
                );
            } else {
                return (
                    <Calculator height={"100vh"} python={false} scripts={this.state.scripts} keyboard={true}/>
                );
            }
        } else {
            return null;
        }
    }
}
