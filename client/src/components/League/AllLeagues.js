import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CreateLeague from './CreateLeague.js'

export default class AllLeagues extends Component {
    state = {
        listOfLeagues: [],
        createFormShow: false
    }


    componentDidMount() {
        this.getLeagues()
    } 

    getLeagues = async () => {
        let res = await axios.get('/api/league/')
        this.setState({ listOfLeagues: res.data })
    }

    onCreateClick = () => {
        const previousState = { ...this.state }
        previousState.createFormShow = !this.state.createFormShow
        this.setState(previousState)
    }

    onCreateSubmit = (newLeague) => {
        axios.post('/api/league/', newLeague) 
        this.getLeagues()
    }


    render() {
        return (
            <div>
                <button onClick={this.onCreateClick}>Create League</button>
                {this.state.createFormShow ?
                <CreateLeague
                    onCreateSubmit={this.onCreateSubmit}
                />
                : null
                }
                {this.state.listOfLeagues.map((league) => {
                    let leagueLink = `/league/${league._id}`
                    return (
                        <Link to={leagueLink} key={league._id}><h2>{league.name}</h2></Link>
                    )
                })}
            </div>
        )
    }
}
