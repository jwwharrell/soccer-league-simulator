import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleClub extends Component {
    state = {
        club: '',
        players: []
    }


    componentDidMount() {
        this.getClub()
        console.log('Mounted!')
    }

    getClub = async () => {
        let clubId = this.props.match.params.clubId
        let res = await axios.get(`/api/club/${clubId}`)
        console.log("This should be the response data: " + res)
        this.setState({ club: res.data.singleClub, players: res.data.allPlayers })
    }


    render() {
        return (
            <div>
            <h1>{this.state.club.name}</h1>
                <h2>Players</h2>
                <ul>
                    {this.state.players.map((player) => {
                        let playerLink = `/player/${player._id}`
                        return (
                            <Link to={playerLink} key={player._id}><li>{player.firstName} {player.lastName}</li></Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
