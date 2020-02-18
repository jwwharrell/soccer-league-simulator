import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class SingleLeague extends Component {
    state = {
        league: '',
        allClubs: []
    }


    componentDidMount() {
        this.getLeague()
    }

    getLeague = async () => {
        let leagueId = this.props.match.params.leagueId
        let res = await axios.get(`/api/league/${leagueId}`)
        this.setState({ league: res.data.singleLeague, allClubs: res.data.allClubs })
    }



    render() {
        return (
            <div>
                <h1>{this.state.league.name}</h1>
                <h2>Clubs</h2>
                <ol>
                    {this.state.allClubs.map((club) => {
                        let clubLink = `/club/${club._id}`
                        return (
                            <Link to={clubLink} key={club._id}><li>{club.name}</li></Link>
                        )
                    })}
                </ol>
            </div>
        )
    }
}
