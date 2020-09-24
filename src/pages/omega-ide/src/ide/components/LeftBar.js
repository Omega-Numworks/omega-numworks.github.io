
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
        if (this.props.locked)
            return;

        if (this.props.onClick) {
            this.props.onClick(this.props.userdata);
        }
    }

    render() {
        
        let content = <i className="editor__leftbar__icon__icon material-icons">{this.props.icon}</i>;
        
        if (this.props.img) {
            content = <img className="editor__leftbar__icon__image" src={this.props.img} alt="Profile" />
        }
        
        return (
            <div onClick={this.handleClick} className={"editor__leftbar__icon" + (this.props.selected ? " editor__leftbar__icon-selected" : "") + (this.props.locked ? " editor__leftbar__icon-locked" : "")}>
                {content}
            </div>
        );
    }
}

export {LeftBar, LeftBarTop, LeftBarBottom, LeftBarAction};

