import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <div className={
                "button "
                 + this.props.className + " "
                 + (this.props.color !== undefined ? "button-" + this.props.color + " " : "")
                 + (this.props.disabled ? "button-disabled " : "")
                 + (this.props.loading ? "button-loading " : "")
                } onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}
