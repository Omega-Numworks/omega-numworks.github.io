import React, { Component } from 'react'
import styles from './sass/header.module.sass'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

export default class HeaderLogo extends Component {
  render() {
    return (
      <NavLink to='/' className={classNames(styles.logo, this.props.className)}>
        {this.props.children}
      </NavLink>
    )
  }
}
