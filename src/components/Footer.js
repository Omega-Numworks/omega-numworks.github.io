import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__links">
                    <h3 className="footer__title">
                        <FormattedMessage id="footer.projects" defaultMessage="Projects" />
                    </h3>
                    <div className="footer__list">
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega">
                            <FormattedMessage id="footer.projects.omega" defaultMessage="Omega" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Themes">
                            <FormattedMessage id="footer.projects.omega-themes" defaultMessage="Omega Themes" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Website">
                            <FormattedMessage id="footer.projects.omega-website" defaultMessage="Omega Website" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-CLI-Installer">
                            <FormattedMessage id="footer.projects.omega-cli" defaultMessage="Omega CLI Installer" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-RPN">
                            <FormattedMessage id="footer.projects.omega-rpn" defaultMessage="Omega RPN" />
                            <span className="footer__list__item__tag">
                                <FormattedMessage id="app" defaultMessage="APP" />
                            </span>
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Atom">
                            <FormattedMessage id="footer.projects.omega-atom" defaultMessage="Omega Atom" />
                            <span className="footer__list__item__tag">
                                <FormattedMessage id="app" defaultMessage="APP" />
                            </span>
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Design">
                            <FormattedMessage id="footer.projects.omega-design" defaultMessage="Omega Design" />
                        </a>
                    </div>
                </div>
                <div className="footer__discord">
                    <iframe title="Discord" src="https://discordapp.com/widget?id=663420259851567114&theme=dark" width="300" height="300" allowtransparency="true" frameborder="0"></iframe>
                </div>
                <div className="footer__separator" />
                <div className="footer__about-nw">
                    <FormattedMessage id="footer.trademark" defaultMessage="NumWorks is a registered trademark. Omega is not affiliated with Numworks." /> 
                    <a className="footer__about-nw__contact" href="mailto:getomega.pro@gmail.com">
                        <FormattedMessage id="footer.contact" defaultMessage="Contact" />
                    </a></div>
                <div className="footer__logo">
                    <FormattedMessage id="footer.omega-logo" defaultMessage="Omega" />
                </div>
            </footer>
        )
    }
}
