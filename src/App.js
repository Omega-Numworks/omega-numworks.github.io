import React, { Component } from 'react';
import './sass/omega.library.sass'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Releases from './pages/Releases';
import Policy from './pages/Policy';
import Install from './pages/Install';
import Projects from './pages/Projects';
import Editor from './pages/Editor';
import EditorRun from './pages/EditorRun';
import EditorRunPython from './pages/EditorRunPython'
import NotFound from './pages/NotFound';

import { IntlProvider } from "react-intl";
import translations from './i18n/locales'
import Wiki from './pages/Wiki';

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
          <div className="body" style={window.location.pathname.includes("/editor") ? { overflow: "hidden", height: "100vh" } : {}}>
            {!window.location.pathname.includes("/editor") && <Toolbar />}
            <Switch>
              <Route path="/simulator" component={Simulator} exact />
              <Route path="/releases" component={Releases} exact />
              <Route path="/install" component={Install} exact />
              <Route path="/install/:version" component={Install} />
              <Route path="/policy" component={Policy} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/editor/run/python/:id" component={EditorRunPython} exact />
              <Route path="/editor/run/python" component={EditorRunPython} exact />
              <Route path="/editor/run" component={EditorRun} exact />
              <Route path="/editor/:id" component={Editor} exact />
              <Route path="/wiki" component={Wiki} exact />
              <Route path="/" component={Home} exact />
              <Route component={NotFound} />
            </Switch>
            {!window.location.pathname.includes("/editor") && <Footer onChangeLanguage={this.onChangeLanguage} locale={this.state.locale} />}
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
