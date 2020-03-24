import React, { Component } from 'react'

export default class ClubView extends Component {

    handleTakeControlClick = () => {
        console.log(`You are controlling ${this.props.club.name}`)
        this.props.handleControlClick(this.props.club)
    }

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
        const attack = this.props.club.lineup.filter(player => {
            return player.posAbr === 'ST'
        })
        const midfield = this.props.club.lineup.filter(player => {
            return player.posAbr === 'LM' || player.posAbr === 'CM' || player.posAbr === 'RM'
        })
        const defense = this.props.club.lineup.filter(player => {
            return player.posAbr === 'LB' || player.posAbr === 'CB' || player.posAbr === 'RB'
        })
        const goalkeeper = this.props.club.lineup.filter(player => {
            return player.posAbr === 'GK'
        })
        return (
            <div>
                <h1>{this.props.club.name}</h1>
                <button onClick={this.handleTakeControlClick}>Take Control</button>
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
                <h2>Bench</h2>
                <div className='bench'>
                        {this.props.club.bench.map((player, index) => {
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
        )
    }
}
