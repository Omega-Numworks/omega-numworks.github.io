
import React, { Component } from 'react';

const funny_phrases = [
    "Loading swagg NumWorks...",
    "Everything is a violin...",
    "Cello = Big Violin",
    "If only we had more devs '-'",
    "Guess who's back!",
    "Quentin will guide you...",
    "Can you english?",
    "Trolleybus",
    "Rip slack",
    "Checkout r/numworksmeme",
    "Want some icecream?",
    "I like trains",
    "Dab on them, haters!",
    "CC-BY-SA-NC is a preftect license for code...",
    "Courant janvier...",
    "Comming soon™",
    "<INSERT TEXT>",
    "Ever wrote code drunk on a first on january?",
    "Tester c'est douter...",
    "Corriger c'est abdiquer...",
    "Did you clean?"
];

export default class Loader extends Component {
    constructor(props) {
        super(props);
        
        let index = Math.floor(Math.random() * Math.floor(funny_phrases.length));
        
        this.state = {
            funny: funny_phrases[index]
        };
    }

    render() {
        return (
            <div className={"editor__loading" + (this.props.hidden ? " editor__loading__hidden" : "")}>
                <div className="editor__loading__content">
                    <p className="editor__loading__content__title">
                        Omega IDE
                    </p>
                    <i class="editor__loading__content__spinner material-icons md-16">hourglass_empty</i>
                    <p className="editor__loading__content__funny">
                        {this.state.funny}
                    </p>
                </div>
            </div>
        );
    }
}

