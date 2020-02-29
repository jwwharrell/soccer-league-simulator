import React, { Component } from 'react'
import SimData from '../../test_data.js'
import ContintentView from './SimViews/ContinentView.js'
import CountryView from './SimViews/CountryView.js'
import LeagueView from './SimViews/LeagueView.js'
import ClubView from './SimViews/ClubView.js'
import PlayerView from './SimViews/PlayerView.js'


export default class SimulationArena extends Component {
    state = {
        continents: SimData.continents,
        currentContinent: '',
        currentCountry: '',
        currentLeague: '',
        currentClub: '',
        currentPlayer: '',
        countries: [],
        leagues: [],
        clubs: [],
        players: []
    }

    handleContinentClick = (e) => {
        const previousState = { ...this.state }
        previousState.currentContinent = this.state.continents[e.target.value]
        previousState.countries = this.state.continents[e.target.value].countries
        this.setState(previousState)
    }

    handleCountryClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentCountry = this.state.currentContinent.countries[index]
        previousState.leagues = previousState.currentCountry.leagues
        this.setState(previousState)
    }

    handleLeagueClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentLeague = this.state.currentCountry.leagues[index]
        previousState.clubs = previousState.currentLeague.clubs
        this.setState(previousState)
    }

    handleClubClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentClub = this.state.currentLeague.clubs[index]
        previousState.players = previousState.currentClub.players
        this.setState(previousState)
    }

    handlePlayerClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentPlayer = this.state.currentClub.players[index]
    }

    render() {
        return (
            <div className='simArena'>
                <h1>World</h1>
                <div className='buttonList'>
                    {this.state.continents.map((continent, index) => {
                        return (
                            <button
                                key={`continent-${index + 1}`}
                                onClick={this.handleContinentClick}
                                value={index}
                            >
                                {continent.name}
                            </button>
                        )
                    })}
                </div>
                <br />
                {this.state.countries.length ?
                    <div>
                        <hr />
                        <ContintentView
                            continent={this.state.currentContinent}
                            handleCountryClick={this.handleCountryClick}
                        />
                        <br />
                    </div>
                    : null
                }
                {this.state.leagues.length ?
                    <div>
                        <hr />
                        <CountryView
                            country={this.state.currentCountry}
                            handleLeagueClick={this.handleLeagueClick}
                        />
                        <br />
                    </div>
                    : null
                }
                {this.state.clubs.length ?
                    <div>
                        <hr />
                        <LeagueView
                            league={this.state.currentLeague}
                            handleClubClick={this.handleClubClick}
                        />
                        <br />
                    </div>
                    : null
                }
                {this.state.players.length ?
                    <div>
                        <hr />
                        <ClubView
                            club={this.state.currentClub}
                            handlePlayerClick={this.handlePlayerClick}
                        />
                        <br />
                    </div>
                    : null
                }
                {this.state.currentPlayer ?
                    <div>
                        <hr />
                        <PlayerView
                            player={this.state.currentPlayer}
                        />
                        <br />
                    </div>
                    : null
                }
            </div>
        )
    }
}
