import React, { Component } from 'react';
import ImgSadCalculator from '../img/sad-calculator.png'

export default class NotFound extends Component {
    render() {
        return (
            <div className="content">
                <div className="notfound">
                    <div className="notfound__images">
                        <img className="notfound__images__image" alt="Sad numworks" src={ImgSadCalculator} />
                    </div>
                    <div className="notfound__title">Oi, not found.</div>
                    <div className="notfound__subtitle">Smh, the page you're looking for doesn't exist.</div>
                </div>
            </div>
        )
    }
}
