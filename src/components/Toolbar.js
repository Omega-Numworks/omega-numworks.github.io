import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Toolbar extends Component {
    render() {
        return (
            <header className="header">
                <NavLink className="header__logo" to="/">Omega</NavLink>
                <div className="header__links">
                    <NavLink className="header__links__link" activeClassName="header__links__link-active" to="/install" exact>Install</NavLink>
                    <NavLink className="header__links__link" activeClassName="header__links__link-active" to="/releases" exact>Releases</NavLink>
                    <a className="header__links__link" href="https://github.com/Omega-Numworks/Omega" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </header>
        )
    }
}
