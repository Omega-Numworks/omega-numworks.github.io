import React, { Component } from 'react'
import Calculator from '../etc/Calculator'

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
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
        if (document.getElementsByClassName("cookiesconsent").length > 0)   document.getElementsByClassName("cookiesconsent")[0].style.display = "none";
        if (document.getElementsByClassName("header").length > 0)      document.getElementsByClassName("header")[0].style.display = "none";
        if (document.getElementsByClassName("footer").length > 0)      document.getElementsByClassName("footer")[0].style.display = "none";
    }

    render() {

        if (this.state.loaded) {
            if (this.state.error) {
                return (
                    <p>ERROR: {this.state.message}</p>
                );
            } else {
                return (
                    <Calculator width={"256px"} height={"192px"} python={true} scripts={this.state.scripts} keyboard={false}/>
                );
            }
        } else {
            return null;
        }
    }
}

