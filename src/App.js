import React, { Component } from 'react';
import '@quentinguidee/react-jade-ui/dist/index.css'
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
import IDEMain from './pages/IDE.js';
import IDEEditor from './pages/omega-ide/src/ide/Editor';
import IDESimulator from './pages/omega-ide/src/ide/Simulator';
import NotFound from './pages/NotFound';
import GithubConnector from './GithubConnector';
import TiPlanetConnector from './TiPlanetConnector';
import { CookiesConsent } from '@quentinguidee/react-jade-ui'

import { IntlProvider } from "react-intl";
import translations from './i18n/locales'
import Wiki from './pages/Wiki';
import Beta from './pages/Beta';

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
      messages: translations[initLang]
    };
    
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
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

  render() {
    return (
      <IntlProvider locale={this.state.locale} messages={this.state.messages}>
        <Router>
          <div className="body">
            {!window.location.pathname.includes("/simulator/run") && <React.Fragment>
              <CookiesConsent toPolicy="/policy" />
              {/* <CookiesConsent toPolicy="/policy" text="Oui" learnMore="Test" gotIt="GotIt" /> */}
              <Header />
            </React.Fragment>}
            <Switch>
              <Route path="/simulator" component={Simulator} exact />
              <Route path="/simulator/run/full" component={FullSimulator} exact />
              <Route path="/releases" component={Releases} exact />
              <Route path="/beta" component={Beta} exact />
              <Route path="/install" component={Install} exact />
              <Route path="/install/:version" component={Install} />
              <Route path="/policy" component={Policy} exact />
              <Route path="/ide/" component={IDEMain} exact />
              <Route path="/ide/editor" component={() => <IDEEditor base="/ide/" connector={GithubConnector} />} exact />
              <Route path="/ide/tiplanet" component={() => <IDEEditor base="/ide/" connector={TiPlanetConnector} />} exact />
              <Route path="/ide/simulator" component={IDESimulator} exact />
              {/* <Route path="/wiki" component={Wiki} exact /> */}
              <Route path="/" component={Home} exact />
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
