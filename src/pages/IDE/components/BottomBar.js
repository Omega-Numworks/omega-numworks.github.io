
import React, { Component } from 'react';

class BottomBar extends Component {
    render() {
        return (
            <div className="editor__bottombar">
                {this.props.children}
            </div>
        );
    }
}

class BottomBarElement extends Component {
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
        
        let icon = this.props.icon ? (<i className="editor__bottombar__content__icon material-icons">{this.props.icon}</i>) : "";
        
        return (
            <div onClick={this.handleClick} className={"editor__bottombar__content" + (this.props.hoverable ? " editor__bottombar__content-hoverable" : "") + (this.props.locked ? " editor__bottombar__content-locked" : "") + (this.props.right ? " editor__bottombar__content-right" : "")}>
                {icon}
                <div className="editor__bottombar__content__text">{this.props.children}</div>
            </div>
        );
    }
}

export {BottomBar, BottomBarElement};

