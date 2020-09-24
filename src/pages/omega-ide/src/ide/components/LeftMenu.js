
import React, { Component } from 'react';

class LeftMenu extends Component {
    render() {
        return (
            <div className={"editor__leftmenu" + (this.props.shown ? " editor__leftmenu__shown" : "")}>
                {this.props.children}
            </div>
        );
    }
}

class LeftMenuTitle extends Component {
    render() {
        return (
            <div className="editor__leftmenu__title">
                <span className="editor__leftmenu__title__content">
                    {this.props.children}
                </span>
            </div>
        );
    }
}

class LeftMenuContent extends Component {
    render() {
        return (
            <div className="editor__leftmenu__content">
                {this.props.children}
            </div>
        );
    }
}

class LeftMenuActions extends Component {
    render() {
        return (
            <div className="editor__leftmenu__actions">
                {this.props.children}
            </div>
        );
    }
}

class LeftMenuAction extends Component {
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
            <i onClick={this.handleClick} className="editor__leftmenu__actions__icon material-icons">{this.props.icon}</i>
        )
    }
}

export {LeftMenu, LeftMenuTitle, LeftMenuContent, LeftMenuActions, LeftMenuAction};

