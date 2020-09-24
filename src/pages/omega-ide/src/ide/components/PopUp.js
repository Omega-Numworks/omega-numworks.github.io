
import React, { Component } from 'react';

class PopUp extends Component {
    render() {
    return (
            <div className="editor__popup">
                <div className="editor__popup__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class PopUpContent extends Component {
    render() {
        return (
            <div className="editor__popup__content__mid">
                {this.props.children}
            </div>
        );
    }
}

class PopUpButtons extends Component {
    render() {
        return (
            <div className="editor__popup__content__buttons">
                {this.props.children}
            </div>
        );
    }
}

class PopUpButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick)
            this.props.onClick(this.props.userdata);
    }

    render() {
        return (
            <button onClick={this.handleClick} ref={(ref) => {if (this.props.autofocus && ref !== null){ref.focus()}}} className="editor__popup__content__buttons__button">
                {this.props.children}
            </button>
        );
    }
}

class PopUpBar extends Component {
    render() {
        return (
            <div className="editor__popup__content__bar">
                {this.props.children}
            </div>
        );
    }
}

class PopUpTitle extends Component {
    render() {
        return (
            <span className="editor__popup__content__bar__title">
                {this.props.children}
            </span>
        );
    }
}

class PopUpClose extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick)
            this.props.onClick(this.props.userdata);
    }

    render() {
        return (
            <i onClick={this.handleClick} className="editor__popup__content__bar__close material-icons">
                close
            </i>
        );
    }
}

export {PopUp, PopUpContent, PopUpButtons, PopUpButton, PopUpBar, PopUpTitle, PopUpClose};

