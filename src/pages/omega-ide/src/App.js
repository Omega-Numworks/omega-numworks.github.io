import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from './ide/Editor.js';
import Simulator from './ide/Simulator.js';
import LocalStorageConnector from './LocalStorageConnector.js';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="body">
          <Switch>
            <Route path="/" component={() => <Editor base="/" connector={LocalStorageConnector} />} exact />
            <Route path="/simulator" component={Simulator} exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
