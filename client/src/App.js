import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard.js'
import AllLeagues from './components/League/AllLeagues.js'
import SingleLeague from './components/League/SingleLeague.js'
import AllClubs from './components/Club/AllClubs.js'
import SingleClub from './components/Club/SingleClub.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/league" component={AllLeagues}/>
          <Route exact path="/league/:leagueId" component={SingleLeague}/>
          <Route exact path="/club" component={AllClubs}/>
          <Route exact path="/club/:clubId" component={SingleClub}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
