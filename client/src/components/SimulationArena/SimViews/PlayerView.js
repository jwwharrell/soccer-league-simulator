import React, { Component } from 'react'

export default class PlayerView extends Component {
    state = {
        showPositionForm: false,
        positionSelection: ''
    }

    handleChangePositionClick = () => {
        const previousState = { ...this.state }
        previousState.showPositionForm = !this.state.showPositionForm
        this.setState(previousState)
    }

    handlePositionSelection = (e) => {
        const previousState = { ...this.state }
        previousState.positionSelection = e.target.value
        this.setState(previousState)
    }

    handleChangePositionSubmit = (e) => {
        e.preventDefault()
        const pos = this.state.positionSelection
        const positionHash = {
            'ST': 'Striker',
            'LM': 'Left Midfielder',
            'CM': 'Central Midfielder',
            'RM': 'Right Midfielder',
            'LB': 'Left Back',
            'CB': 'Center Back',
            'RB': 'Right Back'
        }
        console.log(this.state.positionSelection)
        this.props.changePlayerPosition(this.props.player, [positionHash[pos], pos])
    }

    render() {
        return (
            <div>
                <h1>{this.props.player.name}</h1>
                <h2>{this.props.player.position}</h2>
                <button onClick={this.handleChangePositionClick}>Change Position</button>
                {this.state.showPositionForm ?
                    <form onSubmit={this.handleChangePositionSubmit}>
                        <select onChange={this.handlePositionSelection}>
                            <option value="ST">Striker</option>
                            <option value="LM">Left Midfielder</option>
                            <option value="CM">Central Midfielder</option>
                            <option value="RM">Right Midfielder</option>
                            <option value="LB">Left Back</option>
                            <option value="CB">Center Back</option>
                            <option value="RB">Right Back</option>
                        </select>
                        <input type="submit" value="Change Position"></input>
                    </form>
                    : null}
                <h3>Age: {this.props.player.age}</h3>
                <h3>Skill: {this.props.player.skill}</h3>
            </div>
        )
    }
}
