import React from 'react';
import './sass/omega.library.sass'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Releases from './pages/Releases';
import Policy from './pages/Policy';
import Install from './pages/Install';

function App() {
  return (
    <Router>
      <div className="body">
        <Toolbar />

        <Switch>
          <Route path="/releases" component={Releases} exact />
          <Route path="/install" component={Install} exact />
          <Route path="/policy" component={Policy} exact />
          <Route path="/" component={Home} exact />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
