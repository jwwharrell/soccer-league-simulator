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
        allClubs.map((club) => {
            allClubs.forEach((clubTwo) => {
                if (club._id !== clubTwo._id) {
                    schedule.push({ home: club, away: clubTwo, week: week, score: {home: '', away: ''} })
                    week++
                }
            })
        })
        leagueTable.map((club) => {
            club.points = 0
            club.wins = 0
            club.draws = 0
            club.losses = 0
        })
        this.setState({ schedule, leagueTable })

    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    handleNewSeason = () => {
        let simulatedSeason = this.state.schedule
        const previousState = {...this.state}
        simulatedSeason.map((week) => {
            week.score.away = this.getRandomInt(5)
            week.score.home = this.getRandomInt(6)
        })
        previousState.schedule = simulatedSeason
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
