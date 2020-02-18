import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleClub extends Component {
    state = {
        club: '',
        currentPlayers: [],
        allPlayers: [],
        filteredPlayers: [],
        selectedPlayer: '',
        filterButtonClicked: true
    }


    componentDidMount() {
        this.getClub()
    }

    getClub = async () => {
        let clubId = this.props.match.params.clubId
        let res = await axios.get(`/api/club/${clubId}`)
        let secondRes = await axios.get('/api/player/')
        this.setState({ club: res.data.singleClub, currentPlayers: res.data.allPlayers, allPlayers: secondRes.data, filteredPlayers: secondRes.data })
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

    onFilterPlayerClick = () => {
        const previousState = { ...this.state }
        previousState.filterButtonClicked = !this.state.filterButtonClicked
        this.setState(previousState)
        if (this.state.filterButtonClicked) {
            this.filterPlayers()
        } else {
            this.showAllPlayers()
        }
    }

    filterPlayers = () => {
        let filteredPlayers = this.state.allPlayers.filter((player) => {
            return player.clubId !== this.state.club._id
        })
        this.setState({ filteredPlayers })
    }

    showAllPlayers = () => {
        let filteredPlayers = this.state.allPlayers
        this.setState({ filteredPlayers })
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
                        <option
                            value={null}
                        >{this.state.filteredPlayers.length ? '---Select A Player---' : '---No Players Available---'}</option>
                        {this.state.filteredPlayers.map((player) => {
                            return (
                                <option value={player._id} key={'dropdown-key-' + player._id}>{player.firstName} {player.lastName}</option>
                            )
                        })}
                    </select>
                    <input
                        type='submit'
                        disabled={!this.state.selectedPlayer}
                    />
                </form>
                <button
                        onClick={this.onFilterPlayerClick}
                >
                    {this.state.filterButtonClicked ? `Hide ${this.state.club.name} Players` : 'Show All Players'}
                </button>
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
