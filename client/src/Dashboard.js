import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {

    render() {
        return (
            <div>
                <h1>League Simulator</h1>
                <Link to='/league'><h2>All Leagues</h2></Link>
                <Link to='/club'><h2>All Clubs</h2></Link>
                <Link to='/player'><h2>All Players</h2></Link>
                <hr />
                <Link to='/sim'><h2>Simulation Arena</h2></Link>
            </div>
        )
    }
}
