import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllLeagues extends Component {
    state = {
        listOfLeagues: []
    }


    componentDidMount() {
        this.getLeagues()
    } 

    getLeagues = async () => {
        let res = await axios.get('/api/league/')
        this.setState({ listOfLeagues: res.data })
    }


    render() {
        return (
            <div>
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
