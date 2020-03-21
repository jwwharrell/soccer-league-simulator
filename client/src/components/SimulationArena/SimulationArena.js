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
        try {
            let res = await axios.get('https://randomuser.me/api/?results=500&nat=dk,fr,gb&gender=male&inc=name&noinfo')
            previousState.randomNames = res.data.results
        } catch (e) {
            let randomName = []
            for (let i = 0; i < 500; i++) {
                let nameItem = {
                    name: {
                        first: 'John',
                        last: `Doe ${this.state.season.year} ${i + 1}`
                    }
                }
                randomName.push(nameItem)
            }
            previousState.randomNames = randomName
        } finally {
            this.checkAndAddMissingPositions(previousState)
        }
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
                                leagueTable[k].goalDifferential = 0
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
                                    const club = previousState.continents[i].countries[j].leagues[k].clubs[l]
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
                                    for (let m = 0; m < club.players.length; m++) {
                                        requiredPos[club.players[m].posAbr] -= 1
                                    }
                                    const posNeedingToBeFilled = Object.entries(requiredPos)
                                    for (let n = 0; n < posNeedingToBeFilled.length; n++) {
                                        if (posNeedingToBeFilled[n][1] === 2) {
                                            club.players.push(this.createFillerPlayer(posNeedingToBeFilled[n][0], previousState.randomNames.pop()))
                                            club.players.push(this.createFillerPlayer(posNeedingToBeFilled[n][0], previousState.randomNames.pop()))
                                        }
                                        if (posNeedingToBeFilled[n][1] === 1) {
                                            club.players.push(this.createFillerPlayer(posNeedingToBeFilled[n][0], previousState.randomNames.pop()))
                                        }
                                    }


                                    //Divide lineup players and bench
                                    let lineup = []
                                    let bench = []

                                    //Divide Strikers
                                    let strikers = club.players.filter(player => {
                                        return player.posAbr === 'ST'
                                    })
                                    if (strikers.length > 2) {
                                        let striker1
                                        let striker2
                                        if (strikers[0].skill >= strikers[1].skill) {
                                            striker1 = strikers[0]
                                            striker2 = strikers[1] 
                                        } else {
                                            striker1 = strikers[1]
                                            striker2 = strikers[0]
                                        }
                                        for (let stIndex = 0; stIndex < strikers.length; stIndex++) {
                                            if (strikers[stIndex].skill > striker1.skill) {
                                                striker2 = striker1
                                                striker1 = strikers[stIndex]
                                            } else if (strikers[stIndex].skill > striker2.skill) {
                                                striker2 = strikers[stIndex]
                                            }
                                        }
                                        lineup.push(striker1)
                                        lineup.push(striker2)
                                        for (let stIndex = 0; stIndex < strikers.length; stIndex++) {
                                            if (strikers[stIndex] !== striker1 && strikers[stIndex] !== striker2) {
                                                bench.push(strikers[stIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(strikers[0])
                                        lineup.push(strikers[1])
                                    }

                                    //Divide Left Midfielders
                                    let leftMidfielders = club.players.filter(player => {
                                        return player.posAbr === 'LM'
                                    })
                                    if (leftMidfielders.length > 1) {
                                        let leftMidfielder1
                                        if (leftMidfielders[0].skill >= leftMidfielders[1].skill) {
                                            leftMidfielder1 = leftMidfielders[0]
                                        } else {
                                            leftMidfielder1 = leftMidfielders[1]
                                        }
                                        for (let lmIndex = 0; lmIndex < leftMidfielders.length; lmIndex++) {
                                            if (leftMidfielders[lmIndex].skill > leftMidfielder1.skill) {
                                                leftMidfielder1 = leftMidfielders[lmIndex]
                                            }
                                        }
                                        lineup.push(leftMidfielder1)
                                        for (let lmIndex = 0; lmIndex < leftMidfielders.length; lmIndex++) {
                                            if (leftMidfielders[lmIndex] !== leftMidfielder1) {
                                                bench.push(leftMidfielders[lmIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(leftMidfielders[0])
                                    }

                                    //Divide Center Midfielders
                                    let centerMidfielders = club.players.filter(player => {
                                        return player.posAbr === 'CM'
                                    })
                                    if (centerMidfielders.length > 2) {
                                        let centerMid1
                                        let centerMid2
                                        if (centerMidfielders[0].skill >= centerMidfielders[1].skill) {
                                            centerMid1 = centerMidfielders[0]
                                            centerMid2 = centerMidfielders[1] 
                                        } else {
                                            centerMid1 = centerMidfielders[1]
                                            centerMid2 = centerMidfielders[0]
                                        }
                                        for (let cmIndex = 0; cmIndex < centerMidfielders.length; cmIndex++) {
                                            if (centerMidfielders[cmIndex].skill > centerMid1.skill) {
                                                centerMid2 = centerMid1
                                                centerMid1 = centerMidfielders[cmIndex]
                                            } else if (centerMidfielders[cmIndex].skill > centerMid2.skill) {
                                                centerMid2 = centerMidfielders[cmIndex]
                                            }
                                        }
                                        lineup.push(centerMid1)
                                        lineup.push(centerMid2)
                                        for (let cmIndex = 0; cmIndex < centerMidfielders.length; cmIndex++) {
                                            if (centerMidfielders[cmIndex] !== centerMid1 && centerMidfielders[cmIndex] !== centerMid2) {
                                                bench.push(centerMidfielders[cmIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(centerMidfielders[0])
                                        lineup.push(centerMidfielders[1])
                                    }

                                    //Divide Right Midfielders
                                    let rightMidfielders = club.players.filter(player => {
                                        return player.posAbr === 'RM'
                                    })
                                    if (rightMidfielders.length > 1) {
                                        let rightMidfielder1
                                        if (rightMidfielders[0].skill >= rightMidfielders[1].skill) {
                                            rightMidfielder1 = rightMidfielders[0]
                                        } else {
                                            rightMidfielder1 = rightMidfielders[1]
                                        }
                                        for (let rmIndex = 0; rmIndex < rightMidfielders.length; rmIndex++) {
                                            if (rightMidfielders[rmIndex].skill > rightMidfielder1.skill) {
                                                rightMidfielder1 = rightMidfielders[rmIndex]
                                            }
                                        }
                                        lineup.push(rightMidfielder1)
                                        for (let rmIndex = 0; rmIndex < rightMidfielders.length; rmIndex++) {
                                            if (rightMidfielders[rmIndex] !== rightMidfielder1) {
                                                bench.push(rightMidfielders[rmIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(rightMidfielders[0])
                                    }

                                    //Divide Left Backs
                                    let leftBacks = club.players.filter(player => {
                                        return player.posAbr === 'LB'
                                    })
                                    if (leftBacks.length > 1) {
                                        let leftBack1
                                        if (leftBacks[0].skill >= leftBacks[1].skill) {
                                            leftBack1 = leftBacks[0]
                                        } else {
                                            leftBack1 = leftBacks[1]
                                        }
                                        for (let lbIndex = 0; lbIndex < leftBacks.length; lbIndex++) {
                                            if (leftBacks[lbIndex].skill > leftBack1.skill) {
                                                leftBack1 = leftBacks[lbIndex]
                                            }
                                        }
                                        lineup.push(leftBack1)
                                        for (let lbIndex = 0; lbIndex < leftBacks.length; lbIndex++) {
                                            if (leftBacks[lbIndex] !== leftBack1) {
                                                bench.push(leftBacks[lbIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(leftBacks[0])
                                    }

                                    //Divide Center Backs
                                    let centerBacks = club.players.filter(player => {
                                        return player.posAbr === 'CB'
                                    })
                                    if (centerBacks.length > 2) {
                                        let centerBack1
                                        let centerBack2
                                        if (centerBacks[0].skill >= centerBacks[1].skill) {
                                            centerBack1 = centerBacks[0]
                                            centerBack2 = centerBacks[1] 
                                        } else {
                                            centerBack1 = centerBacks[1]
                                            centerBack2 = centerBacks[0]
                                        }
                                        for (let cbIndex = 0; cbIndex < centerBacks.length; cbIndex++) {
                                            if (centerBacks[cbIndex].skill > centerBack1.skill) {
                                                centerBack2 = centerBack1
                                                centerBack1 = centerBacks[cbIndex]
                                            } else if (centerBacks[cbIndex].skill > centerBack2.skill) {
                                                centerBack2 = centerBacks[cbIndex]
                                            }
                                        }
                                        lineup.push(centerBack1)
                                        lineup.push(centerBack2)
                                        for (let cbIndex = 0; cbIndex < centerBacks.length; cbIndex++) {
                                            if (centerBacks[cbIndex] !== centerBack1 && centerBacks[cbIndex] !== centerBack2) {
                                                bench.push(centerBacks[cbIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(centerBacks[0])
                                        lineup.push(centerBacks[1])
                                    }

                                    //Divide Right Backs
                                    let rightBacks = club.players.filter(player => {
                                        return player.posAbr === 'RB'
                                    })
                                    if (rightBacks.length > 1) {
                                        let rightBack1
                                        if (rightBacks[0].skill >= rightBacks[1].skill) {
                                            rightBack1 = rightBacks[0]
                                        } else {
                                            rightBack1 = rightBacks[1]
                                        }
                                        for (let rbIndex = 0; rbIndex < rightBacks.length; rbIndex++) {
                                            if (rightBacks[rbIndex].skill > rightBack1.skill) {
                                                rightBack1 = rightBacks[rbIndex]
                                            }
                                        }
                                        lineup.push(rightBack1)
                                        for (let rbIndex = 0; rbIndex < rightBacks.length; rbIndex++) {
                                            if (rightBacks[rbIndex] !== rightBack1) {
                                                bench.push(rightBacks[rbIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(rightBacks[0])
                                    }

                                    //Divide Goalkeepers
                                    let goalkeepers = club.players.filter(player => {
                                        return player.posAbr === 'GK'
                                    })
                                    if (goalkeepers.length > 1) {
                                        let goalkeeper1
                                        if (goalkeepers[0].skill >= goalkeepers[1].skill) {
                                            goalkeeper1 = goalkeepers[0]
                                        } else {
                                            goalkeeper1 = goalkeepers[1]
                                        }
                                        for (let gkIndex = 0; gkIndex < goalkeepers.length; gkIndex++) {
                                            if (goalkeepers[gkIndex].skill > goalkeeper1.skill) {
                                                goalkeeper1 = goalkeepers[gkIndex]
                                            }
                                        }
                                        lineup.push(goalkeeper1)
                                        for (let gkIndex = 0; gkIndex < goalkeepers.length; gkIndex++) {
                                            if (goalkeepers[gkIndex] !== goalkeeper1) {
                                                bench.push(goalkeepers[gkIndex])
                                            }
                                        }
                                    } else {
                                        lineup.push(goalkeepers[0])
                                    }

                                    club.lineup = lineup
                                    club.bench = bench


                                    if (club.bench.length > 12) {
                                        let count = club.bench.length - 12
                                        for (let p = 0; p < count; p++) {
                                            let lowestSkilledPlayer = club.bench[0]
                                            let lowestSkilledPlayerIndex = 0
                                            for (let o = 0; o < club.bench.length; o++) {
                                                if (club.bench[o].skill < lowestSkilledPlayer.skill) {
                                                    lowestSkilledPlayer = club.bench[o]
                                                    lowestSkilledPlayerIndex = o
                                                }
                                            }
                                            let removedPlayer = club.bench.splice(lowestSkilledPlayerIndex, 1)
                                            console.log(removedPlayer)
                                        }
                                    }


                                    let ovrSquadSkill = 0
                                    let squadAttackingSkill = 0
                                    let squadDefendingSkill = 0
                                    let centerMidSkill = 0
                                    for (let o = 0; o < club.lineup.length; o++) {
                                        if (club.lineup[o].posAbr === 'CM') {
                                            centerMidSkill += club.lineup[o].skill
                                        }
                                    }
                                    centerMidSkill = Math.floor(centerMidSkill / 2)
                                    for (let o = 0; o < club.lineup.length; o++) {
                                        if (club.lineup[o].posAbr === 'ST' ||
                                            club.lineup[o].posAbr === 'LM' ||
                                            club.lineup[o].posAbr === 'RM') {
                                            squadAttackingSkill += club.lineup[o].skill
                                        }
                                    }
                                    squadAttackingSkill = Math.floor((squadAttackingSkill + centerMidSkill) / 5)
                                    for (let o = 0; o < club.lineup.length; o++) {
                                        if (club.lineup[o].posAbr === 'CB' ||
                                            club.lineup[o].posAbr === 'LB' ||
                                            club.lineup[o].posAbr === 'RB' ||
                                            club.lineup[o].posAbr === 'GK') {
                                            squadDefendingSkill += club.lineup[o].skill
                                        }
                                    }
                                    squadDefendingSkill = Math.floor((squadDefendingSkill + centerMidSkill) / 6)
                                    ovrSquadSkill = Math.floor((squadAttackingSkill + squadDefendingSkill) / 2)
                                    club.squadOverallSkill = ovrSquadSkill
                                    club.squadAttackingSkill = squadAttackingSkill
                                    club.squadDefendingSkill = squadDefendingSkill
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
            age: 20,
            skill: 12
        }
        return newPlayer
    }

    createYouthPlayer = (pos, name, clubYouthRating) => {
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
            skill: clubYouthRating
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
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].home.goalDifferential = (previousState.continents[i].countries[j].leagues[k].schedule[l].home.goalsFor - previousState.continents[i].countries[j].leagues[k].schedule[l].home.goalsAgainst)
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalsFor += previousState.continents[i].countries[j].leagues[k].schedule[l].score.away
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalsAgainst += previousState.continents[i].countries[j].leagues[k].schedule[l].score.home
                                    previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalDifferential = (previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalsFor - previousState.continents[i].countries[j].leagues[k].schedule[l].away.goalsAgainst)
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
                            let promotedClubGoalsFor = 0
                            let relegatedClub
                            let relegatedClubGoalDiff = 0
                            let relegatedClubGoalsFor = 0
                            for (let l = 0; l < previousState.continents[i].countries[j].leagues[k].clubs.length; l++) {
                                if (previousState.continents[i].countries[j].leagues[k].clubs[l].points > promotionPoints) {
                                    promotedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    promotionPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    promotedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential
                                    promotedClubGoalsFor = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                } else if (previousState.continents[i].countries[j].leagues[k].clubs[l].points === promotionPoints &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential > promotedClubGoalDiff) {
                                    promotedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    promotionPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    promotedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential
                                    promotedClubGoalsFor = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                } else if (previousState.continents[i].countries[j].leagues[k].clubs[l].points === promotionPoints &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential === promotedClubGoalDiff &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor > promotedClubGoalsFor) {
                                    promotedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    promotionPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    promotedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential
                                    promotedClubGoalsFor = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                }
                                if (previousState.continents[i].countries[j].leagues[k].clubs[l].points < relegationPoints) {
                                    relegatedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    relegationPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    relegatedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential
                                    relegatedClubGoalsFor = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                } else if (previousState.continents[i].countries[j].leagues[k].clubs[l].points === relegationPoints &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential < relegatedClubGoalDiff) {
                                    relegatedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    relegationPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    relegatedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential
                                    relegatedClubGoalsFor = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                } else if (previousState.continents[i].countries[j].leagues[k].clubs[l].points === relegationPoints &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential === relegatedClubGoalDiff &&
                                    previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor < relegatedClubGoalsFor) {
                                    relegatedClub = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    relegationPoints = previousState.continents[i].countries[j].leagues[k].clubs[l].points
                                    relegatedClubGoalDiff = previousState.continents[i].countries[j].leagues[k].clubs[l].goalDifferential
                                    relegatedClubGoalsFor = previousState.continents[i].countries[j].leagues[k].clubs[l].goalsFor
                                }
                            }

                            previousState.continents[i].countries[j].leagues[k].promotedClub = promotedClub
                            previousState.continents[i].countries[j].leagues[k].relegatedClub = relegatedClub
                        }
                    }
                }
            }
        }

        this.setState(previousState)
    }

    promoteAndRelegateClubs = (previousState) => {
        for (let i = 0; i < previousState.continents.length; i++) {
            if (previousState.continents[i].countries.length) {
                for (let j = 0; j < previousState.continents[i].countries.length; j++) {
                    if (previousState.continents[i].countries[j].leagues.length) {
                        for (let k = 0; k < previousState.continents[i].countries[j].leagues.length; k++) {
                            let league = previousState.continents[i].countries[j].leagues[k]
                            // console.log(league.name)
                            if (league.proPos) {
                                for (let l = 0; l < league.clubs.length; l++) {
                                    if (league.clubs[l] === league.promotedClub) {
                                        league.clubs.splice(l, 1)
                                        let promotedClub = league.promotedClub
                                        previousState.continents[i].countries[j].leagues[k - 1].clubs.push(promotedClub)
                                        // console.log(promotedClub.name + ' has been promoted from ' + league.name)
                                    }
                                }
                            }
                            if (league.relPos) {
                                for (let l = 0; l < league.clubs.length; l++) {
                                    if (league.clubs[l] === league.relegatedClub) {
                                        league.clubs.splice(l, 1)
                                        let relegatedClub = league.relegatedClub
                                        previousState.continents[i].countries[j].leagues[k + 1].clubs.push(relegatedClub)
                                        // console.log(relegatedClub.name + ' has been relegated from ' + league.name)
                                    }
                                }
                            }
                            
                        }
                        for (let l = 0; l < previousState.continents[i].countries[j].leagues.length; l++) {
                            let league = previousState.continents[i].countries[j].leagues[l]
                            for (let m = 0; m < league.clubs.length; m++) {
                                let club = league.clubs[m]
                                if (club.trainingRating > league.trainingCeiling) {
                                    club.trainingRating -= 5
                                    if (club.trainingRating < league.trainingCeiling) {
                                        club.trainingRating = league.trainingCeiling
                                    }
                                } else if (club.trainingRating < league.trainingFloor) {
                                    club.trainingRating += 5
                                    if (club.trainingRating > league.trainingFloor) {
                                        club.trainingRating = league.trainingFloor
                                    }
                                } else if (club.trainingRating >= league.trainingFloor && club.trainingRating < league.trainingCeiling) {
                                    club.trainingRating += 1
                                }
                            }
                        }
                    }
                }
            }
        }
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
                                            let club = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                            let player = club.players[m]
                                            if (player.age === 40) {
                                                console.log(`${player.name} of ${club.name} is retiring.`)
                                                club.players.splice(m, 1)
                                            }
                                            if (player.age < 30) {
                                                player.skill += this.skillGainsThroughClubTraining(club.trainingRating)
                                                if (player.skill > 99) {
                                                    player.skill = 99
                                                }
                                            }
                                            if (player.age >= 30) {
                                                player.skill -= this.skillGainsThroughClubTraining(100 - club.trainingRating)
                                                if (player.skill < 1) {
                                                    player.skill = 1
                                                }
                                            }
                                            player.age += 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.youthIntake(previousState)
        this.promoteAndRelegateClubs(previousState)
        this.setState(previousState)
    }

    positionSelector = () => {
        const possiblePositions = {
            0: 'GK',
            1: 'LB',
            2: 'CB',
            3: 'RB',
            4: 'LM',
            5: 'CM',
            6: 'RM',
            7: 'ST'
        }
        return possiblePositions[this.getRandomInt(7)]
    }

    youthIntake = (previousState) => {
        for (let i = 0; i < previousState.continents.length; i++) {
            if (previousState.continents[i].countries.length) {
                for (let j = 0; j < previousState.continents[i].countries.length; j++) {
                    if (previousState.continents[i].countries[j].leagues.length) {
                        for (let k = 0; k < previousState.continents[i].countries[j].leagues.length; k++) {
                            if (previousState.continents[i].countries[j].leagues[k].clubs.length) {
                                for (let l = 0; l < previousState.continents[i].countries[j].leagues[k].clubs.length; l++) {
                                    const club = previousState.continents[i].countries[j].leagues[k].clubs[l]
                                    let newPlayer1 = this.createYouthPlayer(this.positionSelector(), previousState.randomNames.pop(), club.youthRating)
                                    let newPlayer2 = this.createYouthPlayer(this.positionSelector(), previousState.randomNames.pop(), club.youthRating)
                                    club.players.push(newPlayer1)
                                    club.players.push(newPlayer2)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    skillGainsThroughClubTraining = (clubTrainingRating) => {
        if (clubTrainingRating < 27) {
            clubTrainingRating = 27
        }
        let skillGain = Math.floor(Math.random() * Math.floor(clubTrainingRating / 9))
        skillGain += (clubTrainingRating / 30)
        if (skillGain > Math.floor(clubTrainingRating / 9)) {
            skillGain = Math.floor(clubTrainingRating / 9)
        }
        return Math.floor(skillGain)
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
                <h1><span className='advance' onClick={this.handleAdvanceSeason}>>>></span> | {this.state.season.year} {this.state.partOfSeason[seasonValue]}</h1>
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
