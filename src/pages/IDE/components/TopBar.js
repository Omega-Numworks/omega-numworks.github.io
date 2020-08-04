
import React, { Component } from 'react';

class TopBarTabs extends Component {
    render() {
        return (
            <div className="editor__panel__topbar__tabs">
                <div className="editor__panel__topbar__tabs__container">
                    {this.props.children}  
                </div>
            </div>
        )
    }
}

class TopBarMore extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        if (this.props.onClick)
            this.props.onClick();
    }

    render() {
        return (
            <div onClick={this.handleClick} className="editor__panel__topbar__more">
                <i className="editor__panel__topbar__more__icon material-icons">save</i>
            </div>
        )
    }
}

class TopBarFileName extends Component {
    render() {
        return (
            <div className="editor__panel__topbar__filename">
                <span className="editor__panel__topbar__filename__content">
                    {this.props.children}
                </span>
            </div>
        )
    }
}

class TopBarTab extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleClick(event) {
        event.stopPropagation();
        
        if (this.props.onClick)
            this.props.onClick(this.props.userdata);
    }
    
    handleClose(event) {
        event.stopPropagation();
        if (this.props.onClose)
            this.props.onClose(this.props.userdata);
    }
    
    render() {
        return (
            <div onClick={this.handleClick} className={"editor__panel__topbar__tab" + (this.props.selected ? " editor__panel__topbar__tab-selected" : "")}>
                <span className="editor__panel__topbar__tab__name">
                    {this.props.children}
                </span>
                <i onClick={this.handleClose} className={"material-icons editor__panel__topbar__tab__close" + (this.props.unsaved ? " editor__panel__topbar__tab__close-unsaved" : "")}>close</i>
            </div>
        )
    }
}

class TopBar extends Component {
    render() {
        return (
            <div className="editor__panel__topbar">
                {this.props.children}
            </div>
        );
    }
}

export {TopBarTabs, TopBarMore, TopBarFileName, TopBarTab, TopBar};

