import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard.js'
import AllLeagues from './components/League/AllLeagues.js'
import SingleLeague from './components/League/SingleLeague.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/league" component={AllLeagues}/>
          <Route exact path="/league/:leagueId" component={SingleLeague}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
