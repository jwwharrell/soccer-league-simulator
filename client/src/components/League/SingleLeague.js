import React, { Component } from 'react'
import axios from 'axios'

export default class SingleLeague extends Component {
    state = {
        league: '',
        allClubs: []
    }


    componentDidMount() {
        this.getLeague()
    }

    getLeague = async () => {
        let leagueId = (this.props.match.params.leagueId)
        let res = await axios.get(`/api/league/${leagueId}`)
        this.setState({ league: res.data.singleLeague, allClubs: res.data.allClubs })
    }



    render() {
        return (
            <div>
                Hello!
            </div>
        )
    }
}
