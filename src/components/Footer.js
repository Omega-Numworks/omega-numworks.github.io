import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__links">
                    <h3 className="footer__title">Projects</h3>
                    <div className="footer__list">
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega">Omega</a></li>
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Themes">Omega Themes</a></li>
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Website">Omega Website</a></li>
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-CLI-Installer">Omega CLI Installer</a></li>
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-RPN">Omega RPN <span className="footer__list__item__tag">APP</span></a></li>
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Atom">Omega Atom <span className="footer__list__item__tag">APP</span></a></li>
                        <li className="footer__list__item"><a className="footer__list__item__link" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Design">Omega Design</a></li>
                    </div>
                </div>
                <div className="footer__discord">
                    <iframe title="Discord" src="https://discordapp.com/widget?id=663420259851567114&theme=dark" width="300" height="300" allowtransparency="true" frameborder="0"></iframe>
                </div>
                <div className="footer__separator" />
                <div className="footer__about-nw">NumWorks is a registered trademark. Omega is not affiliated with Numworks. <a className="footer__about-nw__contact" href="mailto:getomega.pro@gmail.com">Contact</a></div>
                <div className="footer__logo">Omega</div>
            </footer>
        )
    }
}
