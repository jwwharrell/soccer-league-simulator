import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CreatePlayer from './CreatePlayer.js'

export default class AllPlayers extends Component {
    state = {
        listOfPlayers: [],
        createFormShow: false
    }

    componentDidMount() {
        this.getEveryPlayer()
    }

    getEveryPlayer = async () => {
        let res = await axios.get('/api/player/')
        this.setState({ listOfPlayers: res.data })
    }

    onCreateClick = () => {
        const previousState = { ...this.state }
        previousState.createFormShow = !this.state.createFormShow
        this.setState(previousState)
    }

    onCreateSubmit = (newPlayer) => {
        axios.post('/api/player/', newPlayer)
        this.getEveryPlayer()
    }


    render() {
        return (
            <div>
                <button onClick={this.onCreateClick}>Create Player</button>
                {this.state.createFormShow ?
                    <CreatePlayer
                        onCreateSubmit={this.onCreateSubmit}
                    />
                    : null
                }
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
