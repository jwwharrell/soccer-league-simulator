import React, { Component } from 'react'

export default class PlayerView extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.player.name}</h1>
                <h2>{this.props.player.position}</h2>
                <h3>Skill: {this.props.player.skill}</h3>
            </div>
        )
    }
}
