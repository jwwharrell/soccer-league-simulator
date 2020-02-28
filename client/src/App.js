import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard.js'
import AllLeagues from './components/League/AllLeagues.js'
import SingleLeague from './components/League/SingleLeague.js'
import AllClubs from './components/Club/AllClubs.js'
import SingleClub from './components/Club/SingleClub.js'
import AllPlayers from './components/Player/AllPlayers.js'
import SinglePlayer from './components/Player/SinglePlayer.js'
import SimulationArena from './components/SimulationArena//SimulationArena.js'

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
          <Route exact path="/player" component={AllPlayers}/>
          <Route exact path="/player/:playerId" component={SinglePlayer}/>
          <Route exact path="/sim" component={SimulationArena}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
