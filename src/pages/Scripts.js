import React, { Component } from 'react'
import GitHub from '../img/github.png'

export default class Scripts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            createNew: false
        }

        this.onCreateNewScriptClick = this.onCreateNewScriptClick.bind(this);
    }

    onCreateNewScriptClick() {
        this.setState({ createNew: !this.state.createNew })
    }

    render() {
        return (
            <div className="content">
                <div className="scripts">
                    {/* <div className="scripts__noscripts">
                        Looks like you don't have scripts yet.
                    </div> */}
                    <div className={"scripts__button" + (this.state.createNew ? " scripts__button-hide" : "")} onClick={this.onCreateNewScriptClick}>NEW SCRIPT</div>
                    <div className={"scripts__script scripts__script-new" + (this.state.createNew ? "" : " scripts__script-new-hide")}>
                        <input className="scripts__script__input scripts__script__input-new" type="text" placeholder="script" />
                        <span className="scripts__script__name scripts__script__name-new">.py</span>
                        <div className="scripts__script__action scripts__script__action-new scripts__script__action-new-blue">CREATE</div>
                        <div onClick={this.onCreateNewScriptClick} className="scripts__script__action scripts__script__action-new">CANCEL</div>
                    </div>
                    <div className="scripts__script">
                        <span className="scripts__script__name">test.py</span>
                        <img className="scripts__script__github" alt="GitHub" src={GitHub} />
                        <div className="scripts__script__action">DUPLICATE</div>
                        <div className="scripts__script__action">OPEN</div>
                    </div>
                    <div className="scripts__script">
                        <span className="scripts__script__name">nouveau.py</span>
                        <img className="scripts__script__github" alt="GitHub" src={GitHub} />
                        <div className="scripts__script__action">DUPLICATE</div>
                        <div className="scripts__script__action">OPEN</div>
                    </div>
                </div>
            </div>
        )
    }
}
