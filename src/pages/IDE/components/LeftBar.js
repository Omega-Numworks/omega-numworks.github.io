
import React, { Component } from 'react';

class LeftBar extends Component {
    render() {
        return (
            <div className="editor__leftbar">
                {this.props.children}
            </div>
        );
    }
}

class LeftBarTop extends Component {
    render() {
        return (
            <div className="editor__leftbar__container editor__leftbar__container-top">
                {this.props.children}
            </div>
        );
    }
}

class LeftBarBottom extends Component {
    render() {
        return (
            <div className="editor__leftbar__container editor__leftbar__container-bottom">
                {this.props.children}
            </div>
        );
    }
}

class LeftBarAction extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.userdata);
        }
    }

    render() {
        return (
            <div onClick={this.handleClick} className={"editor__leftbar__icon" + (this.props.selected ? " editor__leftbar__icon-selected" : "")}>
                <i className="editor__leftbar__icon__icon material-icons">{this.props.icon}</i>
            </div>
        );
    }
}

export {LeftBar, LeftBarTop, LeftBarBottom, LeftBarAction};

