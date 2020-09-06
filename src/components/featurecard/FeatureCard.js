import React, { Component } from "react";
import "./sass/featurecard.sass";

class FeatureCardTitle extends Component {
    render() {
        return <h2 className="featurecard__title">{this.props.children}</h2>;
    }
}

class FeatureCardDescription extends Component {
    render() {
        return (
            <h2 className="featurecard__description">{this.props.children}</h2>
        );
    }
}

class FeatureCardImage extends Component {
    render() {
        return (
            <div className="featurecard__imagewrapper">
                <img
                    className="featurecard__imagewrapper__image"
                    src={this.props.src}
                    alt={this.props.alt}
                />
            </div>
        );
    }
}

class FeatureCard extends Component {
    render() {
        return <div className="featurecard">{this.props.children}</div>;
    }
}

class FeatureCardRow extends Component {
    render() {
        return <div className="featurecard-row">{this.props.children}</div>;
    }
}

class FeatureCardColumn extends Component {
    render() {
        return <div className="featurecard-column">{this.props.children}</div>;
    }
}

export {
    FeatureCard,
    FeatureCardTitle,
    FeatureCardDescription,
    FeatureCardImage,
    FeatureCardRow,
    FeatureCardColumn,
};
