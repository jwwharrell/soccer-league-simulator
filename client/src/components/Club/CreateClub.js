import React, { Component } from 'react'

export default class CreateClub extends Component {
    state = {
        newName: ''
    }

    onNewNameChange = (e) => {
        const newName = e.target.value
        this.setState({ newName })
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const newClub = {
            name: this.state.newName
        }
        this.props.onCreateSubmit(newClub)
        this.clearFormFields()
    }

    clearFormFields = () => {
        this.setState({
            newName: ''
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
                        placeholder='Club Name'
                        onChange={this.onNewNameChange}
                        value={this.state.newName}
                    />
                    <input
                        type='submit'
                    />
                </form>
            </div>
        )
    }
}
