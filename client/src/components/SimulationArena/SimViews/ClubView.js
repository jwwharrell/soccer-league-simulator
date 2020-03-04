import React, { Component } from 'react'

export default class ClubView extends Component {

    handlePlayerClick = (e) => {
        this.props.handlePlayerClick(e.target.value)
    }

    render() {
        let attack = this.props.club.players.filter(player => {
            return player.posAbr === 'ST'
        })
        let midfield = this.props.club.players.filter(player => {
            return player.posAbr === 'LM' || player.posAbr === 'CM' || player.posAbr === 'RM'
        })
        let defense = this.props.club.players.filter(player => {
            return player.posAbr === 'LB' || player.posAbr === 'CB' || player.posAbr === 'RB'
        })
        let goalkeeper = this.props.club.players.filter(player => {
            return player.posAbr === 'GK'
        })
        return (
            <div>
                <h1>{this.props.club.name} Players</h1>
                <h2>Lineup</h2>
                <div className='lineup'>
                    <div className='attack'>
                        {attack.map((player, index) => {
                            return (
                                <button
                                    key={`player-${index + 1}`}
                                    onClick={this.handlePlayerClick}
                                    value={index}
                                >
                                    {player.name}
                                </button>
                            )
                        })}
                    </div>
                    <div className='midfield'>
                        {midfield.map((player, index) => {
                            return (
                                <button
                                    key={`player-${index + 1}`}
                                    onClick={this.handlePlayerClick}
                                    value={index}
                                >
                                    {player.name}
                                </button>
                            )
                        })}
                    </div>
                    <div className='defense'>
                        {defense.map((player, index) => {
                            return (
                                <button
                                    key={`player-${index + 1}`}
                                    onClick={this.handlePlayerClick}
                                    value={index}
                                >
                                    {player.name}
                                </button>
                            )
                        })}
                    </div>
                    <div className='goalkeeper'>
                        {goalkeeper.map((player, index) => {
                            return (
                                <button
                                    key={`player-${index + 1}`}
                                    onClick={this.handlePlayerClick}
                                    value={index}
                                >
                                    {player.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className='buttonList'>
                    {/* {this.props.club.players.map((player, index) => {
                        return (
                            <button
                                key={`player-${index + 1}`}
                                onClick={this.handlePlayerClick}
                                value={index}
                            >
                                {player.name}
                            </button>
                        )
                    })} */}
                </div>
            </div>
        )
    }
}
