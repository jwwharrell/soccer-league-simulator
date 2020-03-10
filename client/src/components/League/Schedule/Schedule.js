import React, { Component } from 'react'
import DataTable from 'react-data-table-component'



export default class Schedule extends Component {
    state = {
        schedule: [],
        leagueTable: [],
        
    }

    createSchedule = () => {
        let allClubs = this.props.allClubs
        let schedule = []
        let week = 1
        let leagueTable = allClubs
        for (let i = 0; i < allClubs.length; i++) {
            for (let j = 0; j < allClubs.length; j++) {
                if (allClubs[i]._id !== allClubs[j]._id) {
                    schedule.push({ home: allClubs[i], away: allClubs[j], week: week, score: {home: '', away: ''} })
                    week++
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
        this.setState({ schedule, leagueTable })
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    handleNewSeason = () => {
        const previousState = {...this.state}
        for (let i = 0; i < previousState.schedule.length; i++) {
            previousState.schedule[i].score.away = this.getRandomInt(5)
            previousState.schedule[i].score.home = this.getRandomInt(6)
            previousState.schedule[i].home.goalsFor += previousState.schedule[i].score.home
            previousState.schedule[i].home.goalsAgainst += previousState.schedule[i].score.away
            previousState.schedule[i].away.goalsFor += previousState.schedule[i].score.away
            previousState.schedule[i].away.goalsAgainst += previousState.schedule[i].score.home
            if (previousState.schedule[i].score.home === previousState.schedule[i].score.away) {
                previousState.schedule[i].home.draws ++
                previousState.schedule[i].home.points ++
                previousState.schedule[i].away.draws ++
                previousState.schedule[i].away.points ++
            } else if (previousState.schedule[i].score.home > previousState.schedule[i].score.away) {
                previousState.schedule[i].home.wins ++
                previousState.schedule[i].home.points += 3
                previousState.schedule[i].away.losses ++
            } else {
                previousState.schedule[i].away.wins ++
                previousState.schedule[i].away.points += 3
                previousState.schedule[i].home.losses ++
            }
        }
        this.setState(previousState)
    }

    render() {
        let schedule = this.state.schedule
        const data = this.state.leagueTable
        const columns = [
            {
                name: 'Club',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Points',
                selector: 'points',
                sortable: true
            },
            {
                name: 'Wins',
                selector: 'wins',
                sortable: true
            },
            {
                name: 'Draws',
                selector: 'draws',
                sortable: true
            },
            {
                name: 'Losses',
                selector: 'losses',
                sortable: true
            },
            {
                name: 'GF',
                selector: 'goalsFor',
                sortable: true
            },
            {
                name: 'GA',
                selector: 'goalsAgainst',
                sortable: true
            },
        ]
        return (
            <div>
                <h2>Schedule</h2>
                {!schedule.length ?
                    <button
                        onClick={this.createSchedule}
                    >
                        Create Schedule
                </button>
                    : <button
                        onClick={this.handleNewSeason}
                    >Simulate Season</button>
                }

                {/* {schedule.length ?
                    <div className='schedule'>
                        {schedule.map((week) => {
                            return(
                                <p>{week}</p>
                            )
                        })}
                    </div>
                : null
                } */}
                <br />
                <br />
                {schedule.length ?
                    <DataTable
                        className='table'
                        title="League Table"
                        columns={columns}
                        data={data}
                        theme='dark'
                        
                    />
                    : null
                }

            </div>
        )
    }
}
