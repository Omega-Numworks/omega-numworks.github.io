import React, { Component } from 'react'
import './sass/wiki.sass'
import Markdown from 'markdown-to-jsx'
import WikiPages from '../wiki/wiki'

export default class Wiki extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            markdown: ""
        };
        
        document.title = "Omega - Wiki"
    }
    
    componentWillMount() {
        fetch(WikiPages).then((response) => response.text()).then((text) => {
            this.setState({ markdown: text });
        })
    }

    render() {
        var content = "";
    
        if (this.state.markdown === null) {
            content = "loading...";
        } else {
            content = (
                <Markdown options={{
                    overrides: {
                        h1: {
                            component: ({ children, ...props }) => (<h1 {...props}>{children}</h1>),
                            props: {className: 'wiki__content__h1'}
                        },
                        h2: {
                            component: ({ children, ...props }) => (<h2 {...props}>{children}</h2>),
                            props: {className: 'wiki__content__h2'}
                        },
                        h3: {
                            component: ({ children, ...props }) => (<h3 {...props}>{children}</h3>),
                            props: {className: 'wiki__content__h3'}
                        },
                        h4: {
                            component: ({ children, ...props }) => (<h4 {...props}>{children}</h4>),
                            props: {className: 'wiki__content__h4'}
                        },
                        h5: {
                            component: ({ children, ...props }) => (<h5 {...props}>{children}</h5>),
                            props: {className: 'wiki__content__h5'}
                        },
                        h6: {
                            component: ({ children, ...props }) => (<h6 {...props}>{children}</h6>),
                            props: {className: 'wiki__content__h6'}
                        },
                        ul: {
                            component: ({ children, ...props }) => (<ul {...props}>{children}</ul>),
                            props: {className: 'wiki__content__ul'}
                        },
                        ol: {
                            component: ({ children, ...props }) => (<ol {...props}>{children}</ol>),
                            props: {className: 'wiki__content__ol'}
                        },
                        li: {
                            component: ({ children, ...props }) => (<li {...props}>{children}</li>),
                            props: {className: 'wiki__content__li'}
                        },
                        p: {
                            component: ({ children, ...props }) => (<p {...props}>{children}</p>),
                            props: {className: 'wiki__content__p'}
                        },
                        em: {
                            component: ({ children, ...props }) => (<i {...props}>{children}</i>),
                            props: {className: 'wiki__content__i'}
                        },
                        strong: {
                            component: ({ children, ...props }) => (<b {...props}>{children}</b>),
                            props: {className: 'wiki__content__b'}
                        },
                        hr: {
                            component: ({ children, ...props }) => (<hr {...props}>{children}</hr>),
                            props: {className: 'wiki__content__hr'}
                        },
                        a: {
                            component: ({ children, ...props }) => (<a {...props}>{children}</a>),
                            props: {className: 'wiki__content__a'}
                        },
                        img: {
                            component: ({ children, ...props }) => (<img {...props}>{children}</img>),
                            props: {className: 'wiki__content__img'}
                        },
                    },
                }} >
                    {this.state.markdown}
                </Markdown>
            );
        }
    
        return (
            <div className="content wiki">
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
                <div className="wiki__content">
                    {content}
                </div>
            </div>
        )
    }
}
