import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Schedule from './Schedule/Schedule.js'

export default class SingleLeague extends Component {
    state = {
        league: '',
        currentClubs: [],
        allClubs: [],
        filteredClubs: [],
        selectedClub: '',
        filterButtonClicked: true,
        timesClubsPlayEachOther: 2,
    }


    componentDidMount() {
        this.getLeague()
    }

    getLeague = async () => {
        let leagueId = this.props.match.params.leagueId
        let res = await axios.get(`/api/league/${leagueId}`)
        let secondRes = await axios.get('/api/club/')
        this.setState({ league: res.data.singleLeague, currentClubs: res.data.allClubs, allClubs: secondRes.data, filteredClubs: secondRes.data })
    }

    onSelectChange = (e) => {
        let clubId = e.target.value
        let selectedClub = this.state.allClubs.filter((club) => {
            return club._id === clubId
        })[0]
        this.setState({selectedClub})
    }

    onSelectSubmit = (e) => {
        e.preventDefault()
        let club = this.state.selectedClub
        club.leagueId = this.state.league._id
        axios.put(`/api/club/${club._id}`, club)
        this.getLeague()
    }

    onFilterClubClick = () => {
        const previousState = { ...this.state }
        previousState.filterButtonClicked = !this.state.filterButtonClicked
        this.setState(previousState)
        if (this.state.filterButtonClicked) {
            this.filterClubs()
        } else {
            this.showAllClubs()
        }
    }

    filterClubs = () => {
        let filteredClubs = this.state.allClubs.filter((club) => {
            return club.leagueId !== this.state.league._id
        })
        this.setState({ filteredClubs })
    }

    showAllClubs = () => {
        let filteredClubs = this.state.allClubs
        this.setState({ filteredClubs })
    }

    render() {
        return (
            <div>
                <h1>{this.state.league.name}</h1>
                <form
                    onSubmit={this.onSelectSubmit}
                >
                    <select
                        onChange={this.onSelectChange}
                    >
                        <option
                            value={null}
                        >{this.state.filteredClubs.length ? '---Select A Club---' : '---No Clubs Available---'}</option>
                        {this.state.filteredClubs.map((club) => {
                            return (
                                <option value={club._id} key={'dropdown-key-' + club._id}>{club.name}</option>
                            )
                        })}
                    </select>
                    <input
                        type='submit'
                        disabled={!this.state.selectedClub}
                    />
                </form>
                <button
                    onClick={this.onFilterClubClick}
                >
                    {this.state.filterButtonClicked ? `Hide ${this.state.league.name} Clubs` : 'Show All Clubs'}
                </button>
                <h2>Clubs</h2>
                <ol>
                    {this.state.currentClubs.map((club) => {
                        let clubLink = `/club/${club._id}`
                        return (
                            <Link to={clubLink} key={club._id}><li>{club.name}</li></Link>
                        )
                    })}
                </ol>
                <Schedule allClubs={this.state.currentClubs}/>
            </div>
        )
    }
}
