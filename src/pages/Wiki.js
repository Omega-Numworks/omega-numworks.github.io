import React, { Component } from 'react'
import './sass/wiki.sass'
import Markdown from 'markdown-to-jsx'

export default class Wiki extends Component {
    render() {
        return (
            <div className="content wiki">
                <div className="wiki__sidebar">
                    <div className="wiki__sidebar__supercategories">
                        <div className="wiki__sidebar__supercategories__supercategory">
                            <div className="wiki__sidebar__supercategories__supercategory__title">Software</div>
                            <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">code</i>
                        </div>
                        <div className="wiki__sidebar__supercategories__supercategory wiki__sidebar__supercategories__supercategory-active">
                            <div className="wiki__sidebar__supercategories__supercategory__title">Hardware</div>
                            <i className="wiki__sidebar__supercategories__supercategory__icon material-icons-round">memory</i>
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
{`
# H1 Titre
## H2 Sous-titre
### H3 Sous-sous-titre
#### H4 Sous-sous-sous-titre
##### H5 Sous-sous-sous-sous-titre
###### H6 Sous-sous-sous-sous-sous-titre

---

 - Suus
 - AAAAA
 - OYHTG


 1. KJHGF
 2. KJHGFD
 3. JHGFD

## Sous-titre

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis _nostrud exercitation ullamco laboris_ nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Un autre sous-titre

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
ab illo inventore veritatis et quasi architecto beatae vitae **dicta sunt explicabo**. Nemo enim ipsam voluptatem quia voluptas sit
aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

![An old rock in the desert](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/800px-NGC_4414_%28NASA-med%29.jpg "Shiprock, New Mexico by Beau Rogers")
`}
                    </Markdown>
                </div>
            </div>
        )
    }
}
