import React, { Component } from 'react'

export default class ClubView extends Component {

    handlePlayerClick = (e) => {
        const playerName = e.target.value
        const indexFinder = () => {
            for (let i = 0; i < this.props.club.players.length; i++) {
                if (this.props.club.players[i].name === playerName) {
                    return i
                }
            }
        }
        const newIndex = indexFinder()
        this.props.handlePlayerClick(newIndex)
    }

    render() {
        const attack = this.props.club.players.filter(player => {
            return player.posAbr === 'ST'
        })
        const midfield = this.props.club.players.filter(player => {
            return player.posAbr === 'LM' || player.posAbr === 'CM' || player.posAbr === 'RM'
        })
        const defense = this.props.club.players.filter(player => {
            return player.posAbr === 'LB' || player.posAbr === 'CB' || player.posAbr === 'RB'
        })
        const goalkeeper = this.props.club.players.filter(player => {
            return player.posAbr === 'GK'
        })
        return (
            <div>
                <h1>{this.props.club.name}</h1>
                <h3>{this.props.club.name} Training Rating: {this.props.club.trainingRating}</h3>
                <h3>Overall Squad Skill: {this.props.club.squadOverallSkill}</h3>
                <p>Squad Attack: {this.props.club.squadAttackingSkill}</p>
                <p>Squad Defense: {this.props.club.squadDefendingSkill}</p>
                <h2>Lineup</h2>
                <div className='lineup'>
                    <div className='attack'>
                        {attack.map((player, index) => {
                            return (
                                <button
                                    key={`player-${index + 1}`}
                                    onClick={this.handlePlayerClick}
                                    value={player.name}
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
                                    value={player.name}
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
                                    value={player.name}
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
                                    value={player.name}
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
