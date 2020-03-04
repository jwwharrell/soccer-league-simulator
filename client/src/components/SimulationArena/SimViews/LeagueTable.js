import React, { Component } from 'react'
import DataTable from 'react-data-table-component'

export default class LeagueTable extends Component {
    state = {
        schedule: [],
        leagueTable: [],

    }

    componentDidMount() {
        let allClubs = this.props.league.clubs
        let schedule = []
        let leagueTable = allClubs
        allClubs.map((club) => {
            allClubs.forEach((clubTwo) => {
                if (club.name !== clubTwo.name) {
                    schedule.push({ home: club, away: clubTwo, score: { home: '', away: '' } })
                }
            })
        })
        leagueTable.map((club) => {
            club.points = 0
            club.wins = 0
            club.draws = 0
            club.losses = 0
            club.goalsFor = 0
            club.goalsAgainst = 0
        })
        this.setState({ schedule, leagueTable })

    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    handleNewSeason = () => {
        const previousState = { ...this.state }
        previousState.schedule.map((week) => {
            week.score.away = this.getRandomInt(5)
            week.score.home = this.getRandomInt(6)
            week.home.goalsFor += week.score.home
            week.home.goalsAgainst += week.score.away
            week.away.goalsFor += week.score.away
            week.away.goalsAgainst += week.score.home
            if (week.score.home === week.score.away) {
                week.home.draws++
                week.home.points++
                week.away.draws++
                week.away.points++
            } else if (week.score.home > week.score.away) {
                week.home.wins++
                week.home.points += 3
                week.away.losses++
            } else {
                week.away.wins++
                week.away.points += 3
                week.home.losses++
            }
        })

        this.setState(previousState)
    }

    render() {
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
                <DataTable
                    className='table'
                    title="League Table"
                    columns={columns}
                    data={data}
                    theme='dark'
                />
            </div>
        )
    }
}
