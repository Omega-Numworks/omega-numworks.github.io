import React, { Component } from 'react'
import './sass/wiki.sass'
import Markdown from 'markdown-to-jsx'
import WikiPages from '../wiki/wiki'
import WikiOptions from '../wiki/options'

export default class Wiki extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            markdown: null,
            isLoading: true
        };
        
        document.title = "Omega - Wiki"
    }
    
    componentWillMount() {
        fetch(WikiPages).then((response) => response.text()).then((text) => {
            this.setState({ markdown: text, isLoading: false });
        })
    }

    render() {
        var content = "";
    
        if (this.state.markdown === null) {
            content = "";
        } else {
            content = (
                <Markdown options={WikiOptions} >
                    {this.state.markdown}
                </Markdown>
            );
        }
    
        return (
            <div className="content wiki">
                <div className="wiki__content">
                    <div className="wiki__sidebar">
                        <div className="wiki__sidebar__supercategories">
                            <div className="wiki__sidebar__supercategories__supercategory">
                                <div className="wiki__sidebar__supercategories__supercategory__title">Software</div>
                                <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">text_snippet</i>
                            </div>
                            <div className="wiki__sidebar__supercategories__supercategory wiki__sidebar__supercategories__supercategory">
                                <div className="wiki__sidebar__supercategories__supercategory__title">Hardware</div>
                                <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">memory</i>
                            </div>
                            <div className="wiki__sidebar__supercategories__supercategory wiki__sidebar__supercategories__supercategory-active">
                                <div className="wiki__sidebar__supercategories__supercategory__title">Python</div>
                                <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">code</i>
                            </div>
                        </div>
                        <div className="wiki__sidebar__category">
                            <div className="wiki__sidebar__category__title">
                                Introduction
                                <i className="wiki__sidebar__category__title__arrow material-icons-round">arrow_drop_up</i>
                            </div>
                            <div className="wiki__sidebar__category__content">
                                <div className="wiki__sidebar__category__content__item">Première page</div>
                                <div className="wiki__sidebar__category__content__item">Deuxième page</div>
                            </div>
                        </div>
                        <div className="wiki__sidebar__category">
                            <div className="wiki__sidebar__category__title">
                                Build system
                                <i className="wiki__sidebar__category__title__arrow material-icons-round">arrow_drop_down</i>
                            </div>
                        </div>
                    </div>
                    <div className={"wiki__content__loading " + (this.state.isLoading ? "wiki__content__loading-active" : "")}></div>
                    {content}
                </div>
            </div>
        )
    }
}
