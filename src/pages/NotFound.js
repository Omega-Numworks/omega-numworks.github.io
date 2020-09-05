import React, { Component } from 'react';
import ImgSadCalculator from '../img/sad-calculator.png'
import { FormattedMessage } from 'react-intl'
import './sass/notfound.sass'

export default class NotFound extends Component {
    constructor(props) {
        super(props);
        document.title = "Omega - 404"
    }

    render() {
        return (
            <div className="content">
                <div className="notfound">
                    <div className="notfound__title"><FormattedMessage id="notfound.title" defaultMessage="Oi, not found." /></div>
                    <div className="notfound__subtitle"><FormattedMessage id="notfound.description" defaultMessage="Smh, the page you're looking for doesn't exist." /></div>
                    <div className="notfound__images">
                        <img className="notfound__images__image" alt="Sad numworks" src={ImgSadCalculator} />
                    </div>
                </div>
            </div>
        )
    }
}
