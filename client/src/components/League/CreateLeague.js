import React, { Component } from 'react'

export default class CreateLeague extends Component {
    state = {
        newName: '',
        newPyramidPosition: '',
        newProPossible: false,
        newRelPossible: false,
        newNumberOfClubs: ''
    }

    onNewNameChange = (e) => {
        const newName = e.target.value
        this.setState({ newName })
    }

    onNewPyramidPosition = (e) => {
        const newPyramidPosition = e.target.value
        this.setState({ newPyramidPosition })
    }

    onNewProPossible = (e) => {
        const newProPossible = e.target.checked
        this.setState({ newProPossible })
    }

    onNewRelPossible = (e) => {
        const newRelPossible = e.target.checked
        this.setState({ newRelPossible })
    }

    onNewNumberOfClubs = (e) => {
        const newNumberOfClubs = e.target.value
        this.setState({ newNumberOfClubs })
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        const newLeague = {
            name: this.state.newName,
            pyramidPosition: Number(this.state.newPyramidPosition),
            proPossible: this.state.newProPossible,
            relPossible: this.state.newRelPossible,
            numberOfClubs: Number(this.state.newNumberOfClubs)
        }
        this.props.onCreateSubmit(newLeague)
        this.clearFormFields()
    }

    clearFormFields = () => {
        this.setState({
            newName: '',
            newPyramidPosition: '',
            newProPossible: false,
            newRelPossible: false,
            newNumberOfClubs: ''
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
                        placeholder='League Name'
                        onChange={this.onNewNameChange}
                        value={this.state.newName}
                    />
                    <input
                        type='number'
                        placeholder='Position on Pyramid'
                        onChange={this.onNewPyramidPosition}
                        value={this.state.newPyramidPosition}
                    />
                    <input
                        type='checkbox'
                        onChange={this.onNewProPossible}
                        value={!this.state.newProPossible}
                    /><span> Promotion</span>
                    <input
                        type='checkbox'
                        onChange={this.onNewRelPossible}
                        value={this.state.newRelPossible}
                    /><span> Relegation</span>
                    <input
                        type='number'
                        placeholder='Number of Clubs'
                        onChange={this.onNewNumberOfClubs}
                        value={this.state.newNumberOfClubs}
                    />
                    <input
                        type='submit'
                    />
                </form>
            </div>
        )
    }
}
