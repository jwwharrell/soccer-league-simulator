import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CreateClub from './CreateClub.js'

export default class AllClubs extends Component {
    state = {
        listOfClubs: [],
        createFormShow: false
    }


    componentDidMount() {
        this.getClubs()
    }

    getClubs = async () => {
        let res = await axios.get('/api/club/')
        this.setState({ listOfClubs: res.data })
    }

    onCreateClick = () => {
        const previousState = { ...this.state }
        previousState.createFormShow = !this.state.createFormShow
        this.setState(previousState)
    }

    onCreateSubmit = (newClub) => {
        axios.post('/api/club/', newClub)
        this.getClubs()
    }

    render() {
        return (
            <div>
                <button onClick={this.onCreateClick}>Create Club</button>
                {this.state.createFormShow ?
                    <CreateClub
                        onCreateSubmit={this.onCreateSubmit}
                    />
                    : null
                }
                {this.state.listOfClubs.map((club) => {
                    let clubLink = `/club/${club._id}`
                    return (
                        <Link to={clubLink} key={club._id}><h2>{club.name}</h2></Link>
                    )
                })}
            </div>
        )
    }
}
