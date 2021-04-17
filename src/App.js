import React, { Component } from 'react';
import './sass/omega.library.sass'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import FullSimulator from './pages/simulator/FullSimulator';
import Releases from './pages/Releases';
import Policy from './pages/Policy';
import Install from './pages/Install';
import IDEMain from './pages/IDE';
import IDEEditor from './pages/omega-ide/src/ide/Editor';
import IDESimulator from './pages/omega-ide/src/ide/Simulator';
import NotFound from './pages/NotFound';
import GithubConnector from './GithubConnector';
import CookiesConsent from "./components/cookiesconsent/CookiesConsent"

import { IntlProvider } from "react-intl";
import translations from './i18n/locales'
import classNames from 'classnames';
// import Beta from './pages/Beta';

class App extends Component {
  constructor(props) {
    super(props);
    
    var initLang = localStorage.getItem("locale");
    
    if (initLang == null)
      initLang = this.getLang();
    if (!(initLang in translations)) {
      initLang = "en";
    }
    
    this.state = {
      locale: initLang,
      messages: translations[initLang],
      theme: 'light'
    };
    
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  
  getLang() {
    if (navigator.languages !== undefined) 
      return navigator.languages[0]; 
    else 
      return navigator.language;
  }

  onChangeLanguage(lang) {
    localStorage.setItem("locale", lang);
    this.setState({locale: lang, messages: translations[lang]});
  }

  toggleTheme() {
    if (this.state.theme === "dark") {
      this.setState({ theme: "light" })
    } else {
      this.setState({ theme: "dark" })
    }
  }

  render() {
    return (
      <IntlProvider locale={this.state.locale} messages={this.state.messages}>
        <Router>
          <div className={classNames("body", this.state.theme)}>
            {!window.location.pathname.includes("/simulator/run") && <React.Fragment>
              <CookiesConsent linkToPolicy="/policy" />
              <Header theme={this.state.theme} toggleTheme={this.toggleTheme} />
            </React.Fragment>}
            <Switch>
              <Route path="/simulator" component={Simulator} exact />
              <Route path="/simulator/run/full" component={FullSimulator} exact />
              <Route path="/releases" component={Releases} exact />
              {/* <Route path="/beta" component={Beta} exact /> */}
              <Route path="/install" component={Install} exact />
              <Route path="/install/:version" component={Install} />
              <Route path="/policy" component={Policy} exact />
              <Route path="/ide/" component={IDEMain} exact />
              <Route path="/ide/editor" component={() => <IDEEditor base="/ide/" connector={GithubConnector} vercel={true} />} exact />
              <Route path="/ide/simulator" component={IDESimulator} exact />
              {/* <Route path="/wiki" component={Wiki} exact /> */}
              <Route path="/" component={() => <Home theme={this.state.theme} />} exact />
              <Route component={NotFound} />
            </Switch>
            {!window.location.pathname.includes("/simulator/run") && <Footer onChangeLanguage={this.onChangeLanguage} locale={this.state.locale} />}
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
