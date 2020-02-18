import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleClub extends Component {
    state = {
        club: '',
        currentPlayers: [],
        availablePlayers: [],
        selectedPlayer: ''
    }


    componentDidMount() {
        this.getClub()
    }

    getClub = async () => {
        let clubId = this.props.match.params.clubId
        let res = await axios.get(`/api/club/${clubId}`)
        let secondRes = await axios.get('/api/player/')
        //
        let available = secondRes.data.filter((player) => {
            return player.clubId !== res.data.singleClub._id
        })
        //Address this^^
        this.setState({ club: res.data.singleClub, currentPlayers: res.data.allPlayers, allPlayers: available })
    }

    onSelectChange = (e) => {
        let playerId = e.target.value
        let selectedPlayer = this.state.allPlayers.filter((player) => {
            return player._id === playerId
        })[0]
        this.setState({selectedPlayer})
    }

    onSelectSubmit = (e) => {
        e.preventDefault()
        let player = this.state.selectedPlayer
        player.clubId = this.state.club._id
        axios.put(`/api/player/${player._id}`, player)
        this.getClub()
    }


    render() {
        return (
            <div>
                <h1>{this.state.club.name}</h1>
                <form
                    onSubmit={this.onSelectSubmit}
                >
                    <select
                        onChange={this.onSelectChange}
                    >
                        {this.state.availablePlayers.map((player) => {
                            return (
                                <option value={player._id} key={'dropdown-key-' + player._id}>{player.firstName} {player.lastName}</option>
                            )
                        })}
                    </select>
                    <input
                        type='submit'
                    />
                </form>
                <h2>Players</h2>
                <ul>
                    {this.state.currentPlayers.map((player) => {
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
