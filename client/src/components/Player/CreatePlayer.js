import React, { Component } from 'react'

export default class CreateLeague extends Component {
    state = {
        newFirstName: '',
        newLastName: '',
        newPosition: ''
    }

    onNewFirstNameChange = (e) => {
        const newFirstName = e.target.value
        this.setState({ newFirstName })
    }

    onNewLastNameChange = (e) => {
        const newLastName = e.target.value
        this.setState({ newLastName })
    }

    onNewPosition = (e) => {
        const newPosition = e.target.value
        this.setState({ newPosition })
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const newPlayer = {
            firstName: this.state.newFirstName,
            lastName: this.state.newLastName,
            position: this.state.newPosition
        }
        this.props.onCreateSubmit(newPlayer)
        this.clearFormFields()
    }

    clearFormFields = () => {
        this.setState({
            newFirstName: '',
            newLastName: '',
            newPosition: ''
        })
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.onFormSubmit}
                >
                    <input
                        type='text'
                        placeholder='First Name'
                        onChange={this.onNewFirstNameChange}
                        value={this.state.newFirstName}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        onChange={this.onNewLastNameChange}
                        value={this.state.newLastName}
                    />
                    <input
                        type='text'
                        placeholder='Position'
                        onChange={this.onNewPosition}
                        value={this.state.newPosition}
                    />
                    <input
                        type='submit'
                    />
                </form>
            </div>
        )
    }
}
