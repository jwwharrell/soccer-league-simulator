import React, { Component } from 'react'
import axios from 'axios'

export default class SinglePlayer extends Component {
    state = {
        player: ''
    }

    componentDidMount() {
        this.getPlayer()
    }

    getPlayer = async () => {
        let playerId = this.props.match.params.playerId
        let res = await axios.get(`/api/player/${playerId}`)
        this.setState({ player: res.data.singlePlayer })
    }
    render() {
        return (
            <div>
                <h1>{this.state.player.firstName} {this.state.player.lastName}</h1>
            </div>
        )
    }
}
