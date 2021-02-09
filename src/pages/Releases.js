import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ReleaseCard from '../components/releasecard/ReleaseCard';
import './sass/releases.sass'
import { releases } from '../firmware/firmwares'

export default class Releases extends Component {
    constructor(props) {
        super(props);
        
        document.title = "Omega — Releases"
    }

    render() {
        return (
            <div className="content">
                <div className="releases__banner">
                    <div className="releases__banner__title">
                        <FormattedMessage id="releases.title" defaultMessage="Omega version history" />
                    </div>
                </div>
                <div style={ { height: "16px" } }></div>
                <div className="releases__cards">
                {
                    releases.firmwares.map(version => {
                        return <ReleaseCard version={version} />
                    })
                }
                </div>
                <div style={ { height: "16px" } }></div>
            </div>
        )
    }
}
