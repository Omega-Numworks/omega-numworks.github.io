import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import translations from '../../i18n/locales'
import Vercel from '../../img/powered-by-vercel.svg'

import './sass/footer.sass'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        
        this.changeLang = props.onChangeLanguage;
        
        this.state = {
            locale: props.locale,
            localeDropdown: false
        };
        
        this.setLanguage = this.setLanguage.bind(this);
        this.onClickOverlay = this.onClickOverlay.bind(this);
    }
    
    setLanguage(lang) {
        this.setState({
            locale: lang,
            localeDropdown: false
        });
        this.changeLang(lang);
    }

    onClickOverlay() {
        this.setState({ localeDropdown: false });
    }

    render() {
        var langs_list = [];
        for (let lang in translations) {
            langs_list.push(<div onClick={() => this.setLanguage(lang)} className="footer__locale__dropdown__item">{translations[lang]["footer.language"]} {translations[lang]["footer.flag"]}</div>);
        }
    
        return (
            <footer className="footer">
                <div className={"footer__overlay" + (this.state.localeDropdown ? " footer__overlay-show" : "")} onClick={this.onClickOverlay}></div>
                <div className="footer__links">
                    <h3 className="footer__title">
                        <FormattedMessage id="footer.projects" defaultMessage="Projects" />
                    </h3>
                    <div className="footer__list">
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega">
                            <i className="material-icons material-icons-round">alt_route</i>
                            <FormattedMessage id="footer.projects.omega" defaultMessage="Omega" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Themes">
                            <i className="material-icons material-icons-round">dns</i>
                            <FormattedMessage id="footer.projects.omega-themes" defaultMessage="Omega Themes" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Website">
                            <i className="material-icons material-icons-round">dns</i>
                            <FormattedMessage id="footer.projects.omega-website" defaultMessage="Omega Website" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-RPN">
                            <i className="material-icons material-icons-round">apps</i>
                            <FormattedMessage id="footer.projects.omega-rpn" defaultMessage="Omega RPN" />
                            {/* <span className="footer__list__item__tag">
                                <FormattedMessage id="app" defaultMessage="APP" />
                            </span> */}
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Atom">
                            <i className="material-icons material-icons-round">apps</i>
                            <FormattedMessage id="footer.projects.omega-atom" defaultMessage="Omega Atom" />
                            {/* <span className="footer__list__item__tag">
                                <FormattedMessage id="app" defaultMessage="APP" />
                            </span> */}
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://github.com/Omega-Numworks/Omega-Design">
                            <i className="material-icons material-icons-round">dns</i>
                            <FormattedMessage id="footer.projects.omega-design" defaultMessage="Omega Design" />
                        </a>
                        <a className="footer__list__item" target="_blank" rel="noopener noreferrer" href="https://omega-numworks.github.io/Omega-External/">
                            <i className="material-icons material-icons-round">alt_route</i>
                            <FormattedMessage id="footer.projects.external-apps" defaultMessage="External Apps" />
                        </a>
                    </div>
                </div>
                <div className="footer__discord">
                    <iframe title="Discord" src="https://discordapp.com/widget?id=663420259851567114&theme=dark" width="300" height="300" allowtransparency="true" frameborder="0"></iframe>
                </div>
                <div className="footer__separator" style={{borderColor: "transparent", marginBottom: "0"}} />
                <a href="https://vercel.com/?utm_source=getomega&utm_campaign=oss" target="_blank" rel="noopener noreferrer">
                    <img style={{display: "block", borderRadius: "8px", border: "1px solid #333333"}} src={Vercel} alt="Vercel" />
                </a>
                <div className="footer__separator" />
                <div className="footer__about-nw">
                    <FormattedMessage id="footer.trademark" defaultMessage="NumWorks is a registered trademark. Omega is not affiliated with Numworks. " values={{ br: <br />  }}/>
                    
                    <a className="footer__about-nw__contact" href="mailto:getomega.pro@gmail.com">
                        <FormattedMessage id="footer.contact" defaultMessage="Contact" />
                    </a>
                </div>
                <div className={"footer__locale " + (this.state.localeDropdown ? "footer__locale-active" : "")} onClick={() => this.setState({localeDropdown: !this.state.localeDropdown})}>
                    {translations[this.state.locale]["footer.language"]} {translations[this.state.locale]["footer.flag"]}
                    <div className={"footer__locale__dropdown " + (this.state.localeDropdown ? "footer__locale__dropdown-show" : "")}>
                        {langs_list}
                    </div>
                </div>
            </footer>
        )
    }
}
