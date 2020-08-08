
import React, { Component } from 'react';

export default class File extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "name": props.name,
            "oldName": "",
            
            "isRenaming": props.renaming === true,
            "validName": true
        };

        this.handleChange       = this.handleChange.bind(this);
        this.handleRename       = this.handleRename.bind(this);
        this.handleRemove       = this.handleRemove.bind(this);
        this.handleClick        = this.handleClick.bind(this);
        this.handleValidate     = this.handleValidate.bind(this);
        this.handleCancel       = this.handleCancel.bind(this);
        this.handleKeyDown      = this.handleKeyDown.bind(this);
        this.stopBubble         = this.stopBubble.bind(this);
        this.handleContextMenu  = this.handleContextMenu.bind(this);
    }

    handleChange(event) {
        if (this.props.locked === true)
            return;

        if (this.state.isRenaming) {
            this.setState({
                name: event.target.value,
                validName: event.target.value.match(/^([a-z0-9_]+\.[a-z0-9_]+)$/)
            });
        }
    }

    handleRename(event) {
        this.stopBubble(event);

        if (this.props.locked === true)
            return;

        this.setState({isRenaming: true, oldName: this.props.name, name: this.props.name, validName: this.props.name.match(/^([a-z0-9_]+\.[a-z0-9_]+)$/)});
    }

    handleRemove(event) {
        this.stopBubble(event);

        if (this.props.locked === true)
            return;

        if (this.props.onRemove)
            this.props.onRemove(this.props.userdata);
    }

    handleClick(event) {
        this.stopBubble(event);
        if (this.props.onClick && !this.state.isRenaming)
            this.props.onClick(this.props.userdata);
    }

    handleValidate(event) {
        this.stopBubble(event);

        if (this.props.locked === true)
            return;

        if (!this.state.validName)
            return;

        if (this.state.isRenaming) {
            let ret = true;
            if (this.props.onRename)
                ret = this.props.onRename(this.props.userdata, this.state.oldName, this.state.name);
            this.setState({
                isRenaming: false,
                name: (ret ? this.state.name : this.state.oldName)
            });
        }
    }

    handleCancel(event) {
        this.stopBubble(event);
        if (this.state.isRenaming) {
            this.setState({isRenaming: false, name: this.state.oldName});
            if (this.props.onCancel)
                this.props.onCancel(this.props.userdata);
        }
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.handleValidate(event);
        }
        if (event.key === 'Escape') {
            this.handleCancel(event);
        }
    }

    stopBubble(event) {
        event.stopPropagation();
    }
    
    handleContextMenu(event) {
        this.stopBubble(event);
        event.preventDefault();
    }

    render() {
        return (
            <li onContextMenu={this.handleContextMenu} onClick={this.handleClick} className={"editor__leftmenu__dropdown__content__element" + (this.state.isRenaming ? " editor__leftmenu__dropdown__content__element-rename" : "")}>
                <i className="editor__leftmenu__dropdown__content__element__icon material-icons">insert_drive_file</i>
                <span className="editor__leftmenu__dropdown__content__element__name">{this.props.name}</span>
                <input ref={(ref) => {if (this.state.isRenaming && ref !== null){ref.focus()}}} onClick={this.stopBubble} onKeyDown={this.handleKeyDown} value={this.state.name} onChange={this.handleChange} type="text" className={"editor__leftmenu__dropdown__content__element__input" + (!this.state.validName ? " editor__leftmenu__dropdown__content__element__input-invalid" : "")}/>
                <div className="editor__leftmenu__dropdown__content__element__actions editor__leftmenu__dropdown__content__element__actions__normal">
                    <i onClick={this.handleRename} className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">create</i>
                    <i onClick={this.handleRemove} className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">delete</i>
                </div>
                <div className="editor__leftmenu__dropdown__content__element__actions editor__leftmenu__dropdown__content__element__actions__rename">
                    <i onClick={this.handleValidate} className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">done</i>
                    <i onClick={this.handleCancel} className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">clear</i>
                </div>
                <div onClick={this.handleCancel} className="editor__leftmenu__dropdown__content__element__renamediv"></div>
            </li>
        );
    }
}

