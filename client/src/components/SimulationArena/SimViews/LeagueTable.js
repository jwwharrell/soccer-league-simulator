import React, { Component } from 'react'
import DataTable from 'react-data-table-component'

export default class LeagueTable extends Component {
    
    render() {
        const data = this.props.league.clubs
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
                name: 'GD',
                selector: 'goalDifferential',
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
