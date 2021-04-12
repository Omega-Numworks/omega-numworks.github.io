import React, { Component } from 'react'
import styles from './sass/header.module.sass'

export default class HeaderHamburger extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={styles.hamburger}>
        <i className={`${styles.hamburger__icon} material-icons-round`}>menu</i>
      </div>
    )
  }
}
