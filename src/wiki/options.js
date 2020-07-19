import React from 'react'

export default {
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
        blockquote: {
            component: ({ children, ...props }) => (<blockquote {...props}>{children}</blockquote>),
            props: {className: 'wiki__content__blockquote'}
        },
        pre: {
            component: ({ children, ...props }) => (<pre {...props}>{children}</pre>),
            props: {className: 'wiki__content__pre'}
        },
        code: {
            component: ({ children, ...props }) => (<code {...props}>{children}</code>),
            props: {className: 'wiki__content__code'}
        },
        img: {
            component: ({ children, ...props }) => (
                <div className="wiki__content__image">
                    <img {...props}>{children}</img>
                    <span className="wiki__content__image__caption">{props.alt}</span>
                </div>
            ),
            props: {className: 'wiki__content__image__img'}
        },
    },
};

