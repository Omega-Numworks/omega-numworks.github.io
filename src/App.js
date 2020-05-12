import React, { Component } from 'react';
import './sass/omega.library.sass'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
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
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
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
            <Route path="/editor/run/:id" component={EditorRun} exact />
            <Route path="/editor/run" component={EditorRun} exact />
            <Route path="/editor/:id" component={Editor} exact />
            <Route path="/" component={Home} exact />
            <Route component={NotFound} />
          </Switch>
          {!window.location.pathname.includes("/editor") && <Footer />}
        </div>
      </Router>
    );
  }
}

export default App;
