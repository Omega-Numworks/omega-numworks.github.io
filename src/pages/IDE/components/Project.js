
import React, { Component } from 'react';

export default class File extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            "name": props.name,
            "oldName": "",
            
            "isRenaming": false,
            "isSelected": false
        };
        
        this.handleChange   = this.handleChange.bind(this);
        this.handleRename   = this.handleRename.bind(this);
        this.handleRemove   = this.handleRemove.bind(this);
        this.handleNewFile  = this.handleNewFile.bind(this);
        this.handleClick    = this.handleClick.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleCancel   = this.handleCancel.bind(this);
        this.handleKeyDown  = this.handleKeyDown.bind(this);
        this.stopBubble     = this.stopBubble.bind(this);
    }
    
    handleChange(event) {
        if (this.state.isRenaming) {
            this.setState({name: event.target.value});
        }
    }
    
    handleRename(event) {
        this.stopBubble(event);
        this.setState({isRenaming: true, oldName: this.state.name});
    }
    
    handleRemove(event) {
        this.stopBubble(event);
        if (this.props.onRemove)
            this.props.onRemove(this.props.userdata);
    }
    
    handleClick(event) {
        this.stopBubble(event);
        this.setState({isSelected: !this.state.isSelected});
        if (this.props.onSelect)
            this.props.onSelect(this.props.userdata, this.state.isSelected);
    }
    
    handleValidate(event) {
        this.stopBubble(event);
        if (this.state.isRenaming) {
            if (this.props.onRename)
                this.props.onRename(this.props.userdata, this.state.name);
            this.setState({isRenaming: false});
        }
    }

    handleCancel(event) {
        this.stopBubble(event);
        if (this.state.isRenaming) {
            this.setState({isRenaming: false, name: this.state.oldName});
        }
    }
    
    handleNewFile(event) {
        this.stopBubble(event);
        if (this.props.onNewFile)
            this.props.onNewFile(this.props.userdata);
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
    
    render() {
        return (
            <div onClick={this.handleClick} class={"editor__leftmenu__dropdown" + (this.state.isSelected ? " editor__leftmenu__dropdown-selected" : "")}>
                <div class={"editor__leftmenu__dropdown__title" + (this.state.isRenaming ? " editor__leftmenu__dropdown__title-rename" : "")}>
                    <i className="editor__leftmenu__dropdown__title__chevron material-icons">keyboard_arrow_right</i>
                    <span className="editor__leftmenu__dropdown__title__content">{this.state.name}</span>
                    <input onClick={this.stopBubble} onKeyDown={this.handleKeyDown} value={this.state.name} onChange={this.handleChange} type="text" className="editor__leftmenu__dropdown__title__input"/>
                    <div className="editor__leftmenu__dropdown__title__actions editor__leftmenu__dropdown__title__actions__normal">
                        <i onClick={this.handleNewFile} className="editor__leftmenu__dropdown__title__actions__icon material-icons">note_add</i>
                        <i onClick={this.handleRename} className="editor__leftmenu__dropdown__title__actions__icon material-icons">create</i>
                        <i onClick={this.handleRemove} className="editor__leftmenu__dropdown__title__actions__icon material-icons">delete</i>
                    </div>
                    <div className="editor__leftmenu__dropdown__title__actions editor__leftmenu__dropdown__title__actions__rename">
                        <i onClick={this.handleValidate} className="editor__leftmenu__dropdown__title__actions__icon material-icons">done</i>
                        <i onClick={this.handleCancel} className="editor__leftmenu__dropdown__title__actions__icon material-icons">clear</i>
                    </div>
                    <div onClick={this.handleCancel} className="editor__leftmenu__dropdown__title__renamediv"></div>
                </div>
                <ul className="editor__leftmenu__dropdown__content">
                    {this.props.children}
                </ul>
            </div>
        )
    }
}
