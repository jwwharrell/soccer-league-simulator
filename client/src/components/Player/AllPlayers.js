import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllPlayers extends Component {
    state = {
        listOfPlayers: []
    }

    componentDidMount() {
        this.getEveryPlayer()
    }

    getEveryPlayer = async () => {
        let res = await axios.get('/api/player/')
        this.setState({ listOfPlayers: res.data })
    }
    render() {
        return (
            <div>
                {this.state.listOfPlayers.map((player) => {
                    let playerLink = `/player/${player._id}`
                    return (
                        <Link to={playerLink} key={player._id}><h2>{player.firstName} {player.lastName}</h2></Link>
                    )
                })}
            </div>
        )
    }
}
