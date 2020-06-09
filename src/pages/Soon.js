import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class Soon extends Component {
    render() {
        return (
            <div style={{ fontFamily: 'Fira Sans', fontSize: '16px', margin: '20px' }}>
                <FormattedMessage id="soon" defaultMessage="Will be avaliable soon! 😄" />
            </div>
        )
    }
}
