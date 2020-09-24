
import React, { Component } from 'react';

class CalculatorSearch extends Component {
    render() {
        return (
            <div className="editor__calculator__indicator">
                <i className="editor__calculator__indicator__icon material-icons">search</i>
                <p className="editor__calculator__indicator__text">
                    Looking for device...<br/>
                    Click <span onClick={this.props.onClick} className="editor__calculator__indicator__text__link">here</span> to trigger a manual detection.
                </p>
            </div>
        );
    }
}

class CalculatorInfo extends Component {
    render() {
        return (
            <tr className="editor__calculator__infos__line">
                <td className="editor__calculator__infos__name">{this.props.name}</td>
                <td className="editor__calculator__infos__value">{this.props.value}</td>
            </tr>
        );
    }
}

class CalculatorInfoList extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            selected: true
        }
    }

    handleClick(event) {
        event.stopPropagation();
        
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        return (
            <div onClick={this.handleClick} className={"editor__leftmenu__dropdown" + (this.state.selected ? " editor__leftmenu__dropdown-selected" : "")}>
                <div className="editor__leftmenu__dropdown__title">
                    <i className="editor__leftmenu__dropdown__title__chevron material-icons">keyboard_arrow_right</i>
                    <span className="editor__leftmenu__dropdown__title__content">INFORMATIONS</span>
                </div>
                <div className="editor__leftmenu__dropdown__content" onClick={(e) => e.stopPropagation()}>
                    <table className="editor__calculator__infos">
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class CalculatorStorage extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            selected: true
        }
    }

    handleClick(event) {
        event.stopPropagation();
        
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        return (
            <div onClick={this.handleClick} className={"editor__leftmenu__dropdown" + (this.state.selected ? " editor__leftmenu__dropdown-selected" : "")}>
                <div className="editor__leftmenu__dropdown__title">
                    <i className="editor__leftmenu__dropdown__title__chevron material-icons">keyboard_arrow_right</i>
                    <span className="editor__leftmenu__dropdown__title__content">STORAGE</span>
                    <div className="editor__leftmenu__dropdown__title__actions editor__leftmenu__dropdown__title__actions__normal">
                        <i onClick={(event) => {event.stopPropagation(); this.props.onZipDownload()}} title="Download as zip" className="editor__leftmenu__dropdown__title__actions__icon material-icons">get_app</i>
                    </div>
                </div>
                <ul className="editor__leftmenu__dropdown__content">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

class CalculatorFile extends Component {
    render() {
        return (
            <li onContextMenu={(event) => {event.stopPropagation(); event.preventDefault()}} onClick={(event) => event.stopPropagation()} className="editor__leftmenu__dropdown__content__element">
                <i className="editor__leftmenu__dropdown__content__element__icon material-icons">insert_drive_file</i>
                <span className="editor__leftmenu__dropdown__content__element__name">{this.props.name}</span>
                <div className="editor__leftmenu__dropdown__content__element__actions editor__leftmenu__dropdown__content__element__actions__normal">
                    <i onClick={(e) => {e.stopPropagation(); this.props.onDelete(this.props.userdata)}} title="Delete" className="editor__leftmenu__dropdown__content__element__actions__icon material-icons">delete</i>
                </div>
            </li>
        );
    }
}

class CalculatorConnected extends Component {
    render() {
        return (
            <div className="editor__calculator__indicator">
                <i className="editor__calculator__indicator__icon material-icons">done</i>
                <p className="editor__calculator__indicator__text">
                    Device connected.
                </p>
            </div>
        );
    }
}

class CalculatorError extends Component {
    render() {
        return (
            <div className="editor__calculator__indicator">
                <i className="editor__calculator__indicator__icon material-icons">clear</i>
                <p className="editor__calculator__indicator__text">
                    You calculator was detected but something is wrong with it.<br/>
                    Try the <a className="editor__calculator__indicator__text__link" rel="noopener noreferrer" href="https://workshop.numworks.com/devices/rescue" target="_blank">recovery updater</a>.
                </p>
            </div>
        );
    }
}

export {CalculatorSearch, CalculatorConnected, CalculatorError, CalculatorInfoList, CalculatorInfo, CalculatorStorage, CalculatorFile};

