import React, { Component } from 'react'
import SimData from '../../test_data.js'
import ContintentView from './SimViews/ContinentView.js'
import CountryView from './SimViews/CountryView.js'
import LeagueView from './SimViews/LeagueView.js'
import ClubView from './SimViews/ClubView.js'
import PlayerView from './SimViews/PlayerView.js'
import axios from 'axios'



export default class SimulationArena extends Component {
    state = {
        season: 2019,
        partOfSeason: ['Pre-Season', 'Season', 'Post-Season'],
        seasonValue: 0,
        continents: SimData.continents,
        currentContinent: '',
        currentCountry: '',
        currentLeague: '',
        currentClub: '',
        currentPlayer: '',
        countries: [],
        leagues: [],
        clubs: [],
        players: [],
        randomNames: []
    }

    handleAdvanceSeason = () => {
        const previousState = { ...this.state }
        if (previousState.seasonValue === 0) {
            previousState.seasonValue += 1
            this.getName(previousState)
        } else if (previousState.seasonValue === 1) {
            previousState.seasonValue += 1
            this.setState(previousState)
        } else {
            previousState.season += 1
            previousState.seasonValue = 0
            this.agePlayers(previousState)
        }
    }

    getName = async (previousState) => {
        let res = await axios.get('https://randomuser.me/api/?results=100&nat=dk,fr,gb&gender=male&inc=name&noinfo')
        previousState.randomNames = res.data.results
        this.checkAndAddMissingPositions(previousState)
    }

    checkAndAddMissingPositions = (previousState) => {
        for (let i = 0; i < previousState.continents.length; i++) {
            if (previousState.continents[i].countries.length) {
                for (let j = 0; j < previousState.continents[i].countries.length; j++) {
                    if (previousState.continents[i].countries[j].leagues.length) {
                        for (let k = 0; k < previousState.continents[i].countries[j].leagues.length; k++) {
                            if (previousState.continents[i].countries[j].leagues[k].clubs.length) {
                                for (let l = 0; l < previousState.continents[i].countries[j].leagues[k].clubs.length; l++) {
                                    const requiredPos = {
                                        'GK': 1,
                                        'LB': 1,
                                        'CB': 2,
                                        'RB': 1,
                                        'LM': 1,
                                        'CM': 2,
                                        'RM': 1,
                                        'ST': 2
                                    }
                                    for (let m = 0; m < previousState.continents[i].countries[j].leagues[k].clubs[l].players.length; m++) {
                                        requiredPos[previousState.continents[i].countries[j].leagues[k].clubs[l].players[m].posAbr] -= 1
                                    }
                                    const posNeedingToBeFilled = Object.entries(requiredPos)
                                    for (let n = 0; n < posNeedingToBeFilled.length; n++) {
                                        if (posNeedingToBeFilled[n][1] === 2) {
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players.push(this.createFillerPlayer(posNeedingToBeFilled[n][0], previousState.randomNames.pop()))
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players.push(this.createFillerPlayer(posNeedingToBeFilled[n][0], previousState.randomNames.pop()))
                                        }
                                        if (posNeedingToBeFilled[n][1] === 1) {
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players.push(this.createFillerPlayer(posNeedingToBeFilled[n][0], previousState.randomNames.pop()))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setState(previousState)
    }

    createFillerPlayer = (pos, name) => {
        const fullName = name.name.first + ' ' + name.name.last
        const fullPos = {
            'GK': 'Goalkeeper',
            'LB': 'Left Back',
            'CB': 'Center Back',
            'RB': 'Right Back',
            'LM': 'Left Midfielder',
            'CM': 'Central Midfielder',
            'RM': 'Right Midfielder',
            'ST': 'Striker'
        }
        const newPlayer = {
            name: fullName,
            position: fullPos[pos],
            posAbr: pos,
            age: 18,
            skill: 12
        }
        return newPlayer
    }

    agePlayers = (previousState) => {
        for (let i = 0; i < previousState.continents.length; i++) {
            if (previousState.continents[i].countries.length) {
                for (let j = 0; j < previousState.continents[i].countries.length; j++) {
                    if (previousState.continents[i].countries[j].leagues.length) {
                        for (let k = 0; k < previousState.continents[i].countries[j].leagues.length; k++) {
                            if (previousState.continents[i].countries[j].leagues[k].clubs.length) {
                                for (let l = 0; l < previousState.continents[i].countries[j].leagues[k].clubs.length; l++) {
                                    if (previousState.continents[i].countries[j].leagues[k].clubs[l].players.length) {
                                        for (let m = 0; m < previousState.continents[i].countries[j].leagues[k].clubs[l].players.length; m++) {
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players[m].age += 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setState(previousState)
    }

    handleContinentClick = (e) => {
        const previousState = { ...this.state }
        previousState.currentContinent = this.state.continents[e.target.value]
        previousState.currentCountry = ''
        previousState.currentLeague = ''
        previousState.currentClub = ''
        previousState.currentPlayer = ''
        previousState.countries = this.state.continents[e.target.value].countries
        previousState.leagues = []
        previousState.clubs = []
        previousState.players = []
        this.setState(previousState)
    }

    handleCountryClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentCountry = this.state.currentContinent.countries[index]
        previousState.currentLeague = ''
        previousState.currentClub = ''
        previousState.currentPlayer = ''
        previousState.leagues = previousState.currentCountry.leagues
        previousState.clubs = []
        previousState.players = []
        this.setState(previousState)
    }

    handleLeagueClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentLeague = this.state.currentCountry.leagues[index]
        previousState.currentClub = ''
        previousState.currentPlayer = ''
        previousState.clubs = previousState.currentLeague.clubs
        previousState.players = []
        this.setState(previousState)
    }

    handleClubClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentClub = this.state.currentLeague.clubs[index]
        previousState.currentPlayer = ''
        previousState.players = previousState.currentClub.players
        this.setState(previousState)
    }

    handlePlayerClick = (index) => {
        const previousState = { ...this.state }
        previousState.currentPlayer = this.state.currentClub.players[index]
        this.setState(previousState)
    }

    render() {
        let seasonValue = this.state.seasonValue
        return (
            <div className='simArena'>
                <h1>{this.state.season} {this.state.partOfSeason[seasonValue]} | <span className='advance' onClick={this.handleAdvanceSeason}>>>></span></h1>
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
