import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <div className={
                "button "
                 + this.props.className + " "
                 + (this.props.color !== undefined ? "button-" + this.props.color + " " : "")
                 + (this.props.variant !== undefined ? "button-" + this.props.variant + " " : "")
                 + (this.props.disabled ? "button-disabled " : "")
                 + (this.props.loading ? "button-loading " : "")
                 + (this.props.big ? "button-big " : "")
                } onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}
