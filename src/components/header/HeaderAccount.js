import React, { Component } from 'react'
import styles from './sass/header.module.sass'
import classNames from 'classnames'

export default class HeaderAccount extends Component {
  render() {
    return (
      <div
        className={classNames({
          [styles.account]: true,
          [styles.accountHidden]: this.props.hide
        })}
      >
        <div className={styles.account__username}>{this.props.username}</div>
        <img
          className={styles.account__image}
          alt='profile'
          src={this.props.image}
        />
      </div>
    )
  }
}
