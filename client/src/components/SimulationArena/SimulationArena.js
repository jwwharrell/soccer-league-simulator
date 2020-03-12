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
        season: {
            year: 2019
        },
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
            this.createSeasonSchedule(previousState)
        } else if (previousState.seasonValue === 1) {
            previousState.seasonValue += 1
            this.simulateMatches(previousState)
        } else {
            previousState.season.year += 1
            previousState.seasonValue = 0
            this.agePlayers(previousState)
        }
    }

    getName = async (previousState) => {
        let res = await axios.get('https://randomuser.me/api/?results=100&nat=dk,fr,gb&gender=male&inc=name&noinfo')
        previousState.randomNames = res.data.results
        this.checkAndAddMissingPositions(previousState)
    }

    createSeasonSchedule = (previousState) => {
        for (let i = 0; i < previousState.continents.length; i++) {
            if (previousState.continents[i].countries.length) {
                for (let j = 0; j < previousState.continents[i].countries.length; j++) {
                    if (previousState.continents[i].countries[j].leagues.length) {
                        for (let k = 0; k < previousState.continents[i].countries[j].leagues.length; k++) {
                            let league = previousState.continents[i].countries[j].leagues[k]
                            previousState.continents[i].countries[j].leagues[k].schedule = []
                            let schedule = previousState.continents[i].countries[j].leagues[k].schedule
                            let allClubs = league.clubs
                            let match = 1
                            let leagueTable = allClubs
                            for (let i = 0; i < allClubs.length; i++) {
                                for (let j = 0; j < allClubs.length; j++) {
                                    if (allClubs[i].name !== allClubs[j].name) {
                                        schedule.push({ home: allClubs[i], away: allClubs[j], match: match, score: { home: '', away: '' } })
                                        match++
                                    }
                                }
                            }
                            for (let k = 0; k < leagueTable.length; k++) {
                                leagueTable[k].points = 0
                                leagueTable[k].wins = 0
                                leagueTable[k].draws = 0
                                leagueTable[k].losses = 0
                                leagueTable[k].goalsFor = 0
                                leagueTable[k].goalsAgainst = 0
                            }
                        }
                    }
                }
            }
        }
        this.getName(previousState)
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

                                    let ovrSquadSkill = 0
                                    let squadAttackingSkill = 0
                                    let squadDefendingSkill = 0
                                    let centerMidSkill = 0
                                    for (let o = 0; o < previousState.continents[i].countries[j].leagues[k].clubs[l].players.length; o++) {
                                        if (previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'CM') {
                                            centerMidSkill += previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].skill
                                        }
                                    }
                                    centerMidSkill = Math.floor(centerMidSkill / 2)
                                    for (let o = 0; o < previousState.continents[i].countries[j].leagues[k].clubs[l].players.length; o++) {
                                        if (previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'ST' ||
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'LM' ||
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'RM') {
                                            squadAttackingSkill += previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].skill
                                        }
                                    }
                                    squadAttackingSkill = Math.floor((squadAttackingSkill + centerMidSkill) / 5)
                                    for (let o = 0; o < previousState.continents[i].countries[j].leagues[k].clubs[l].players.length; o++) {
                                        if (previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'CB' ||
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'LB' ||
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'RB' ||
                                            previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].posAbr === 'GK') {
                                            squadDefendingSkill += previousState.continents[i].countries[j].leagues[k].clubs[l].players[o].skill
                                        }
                                    }
                                    squadDefendingSkill = Math.floor((squadDefendingSkill + centerMidSkill) / 6)
                                    ovrSquadSkill = Math.floor((squadAttackingSkill + squadDefendingSkill) / 2)
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].squadOverallSkill = ovrSquadSkill
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].squadAttackingSkill = squadAttackingSkill
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].squadDefendingSkill = squadDefendingSkill
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

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    calculateGoals = (teamOffRating, oppTeamDefRating) => {
        let ratingGap = teamOffRating - oppTeamDefRating
        let possibleGoals = []
        if (ratingGap > 50) {
            possibleGoals = [0, 1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10]
        }
        if (ratingGap >= 40 && ratingGap < 50) {
            possibleGoals = [0, 0, 1, 1, 2, 2, 3, 4, 5, 6]
        }
        if (ratingGap >= 30 && ratingGap < 40) {
            possibleGoals = [0, 0, 1, 1, 2, 2, 3, 3, 4, 5]
        }
        if (ratingGap >= 20 && ratingGap < 30) {
            possibleGoals = [0, 0, 0, 1, 1, 2, 2, 3, 4, 5]
        }
        if (ratingGap >= 10 && ratingGap < 20) {
            possibleGoals = [0, 0, 0, 0, 1, 1, 2, 2, 3, 4]
        }
        if (ratingGap > -10 && ratingGap < 10) {
            possibleGoals = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3]
        }
        if (ratingGap > -20 && ratingGap <= -10) {
            possibleGoals = [0, 0, 0, 0, 0, 0, 1, 1, 2, 3]
        }
        if (ratingGap > -30 && ratingGap <= -20) {
            possibleGoals = [0, 0, 0, 0, 0, 0, 0, 1, 2, 3]
        }
        if (ratingGap > -40 && ratingGap <= -30) {
            possibleGoals = [0, 0, 0, 0, 0, 0, 0, 0, 1, 2]
        }
        if (ratingGap > -50 && ratingGap <= -40) {
            possibleGoals = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
        }
        if (ratingGap < -50) {
            possibleGoals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        }

        return possibleGoals[this.getRandomInt(possibleGoals.length - 1)]
    }

    simulateMatches = (previousState) => {
        for (let i = 0; i < previousState.continents.length; i++) {
            if (previousState.continents[i].countries.length) {
                for (let j = 0; j < previousState.continents[i].countries.length; j++) {
                    if (previousState.continents[i].countries[j].leagues.length) {
                        for (let k = 0; k < previousState.continents[i].countries[j].leagues.length; k++) {
                            if (previousState.continents[i].countries[j].leagues[k].schedule.length) {
                                for (let l = 0; l < previousState.continents[i].countries[j].leagues[k].schedule.length; l++) {
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].score.away = this.calculateGoals(previousState.continents[i].countries[j].leagues[k].schedule[l].away.squadAttackingSkill, previousState.continents[i].countries[j].leagues[k].schedule[l].home.squadDefendingSkill)
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].score.home = this.calculateGoals(previousState.continents[i].countries[j].leagues[k].schedule[l].home.squadAttackingSkill, previousState.continents[i].countries[j].leagues[k].schedule[l].away.squadDefendingSkill)
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].home.goalsFor += previousState.continents[i].countries[j].leagues[k].schedule[l].score.home
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].home.goalsAgainst += previousState.continents[i].countries[j].leagues[k].schedule[l].score.away
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalsFor += previousState.continents[i].countries[j].leagues[k].schedule[l].score.away
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalsAgainst += previousState.continents[i].countries[j].leagues[k].schedule[l].score.home
                                    if (previousState.continents[i].countries[j].leagues[k].schedule[l].score.home === previousState.continents[i].countries[j].leagues[k].schedule[l].score.away) {
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].home.draws++
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].home.points++
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].away.draws++
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].away.points++
                                    } else if (previousState.continents[i].countries[j].leagues[k].schedule[l].score.home > previousState.continents[i].countries[j].leagues[k].schedule[l].score.away) {
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].home.wins++
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].home.points += 3
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].away.losses++
                                    } else {
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].away.wins++
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].away.points += 3
                                        previousState.continents[i].countries[j].leagues[k].schedule[l].home.losses++
                                    }
                                }
                            }
                            let promotionPoints = 0
                            let relegationPoints = 200
                            let promotedClub
                            let promotedClubGoalDiff = 0
                            let relegatedClub
                            let relegatedClubGoalDiff = 0
                            for (let l = 0; l < previousState.continents[i].countries[j].leagues[k].clubs.length; l++) {
                                if (previousState.continents[i].countries[j].leagues[k].clubs[l].points > promotionPoints) {
                                    promotedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    promotionPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    promotedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                } else if (previousState.continents[i].countries[j].leagues[k].clubs[l].points === promotionPoints &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor > promotedClubGoalDiff) {
                                    promotedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    promotionPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    promotedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                }
                                if (previousState.continents[i].countries[j].leagues[k].clubs[l].points < relegationPoints) {
                                    relegatedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    relegationPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    relegatedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                } else if (previousState.continents[i].countries[j].leagues[k].clubs[l].points === relegationPoints &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor < relegatedClubGoalDiff) {
                                    relegatedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    relegationPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    relegatedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                }
                            }
                            console.log(promotedClub)
                            console.log(relegatedClub)
                        }
                    }
                }
            }
        }

        this.setState(previousState)
    }

    findAndSetLeagueFirstAndLastPlace = (previousState) => {

    }

    promoteAndRelegateClubs = (previousState) => {
        console.log(previousState)
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
                <h1>{this.state.season.year} {this.state.partOfSeason[seasonValue]} | <span className='advance' onClick={this.handleAdvanceSeason}>>>></span></h1>
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
