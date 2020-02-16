import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AllClubs extends Component {
    state = {
        listOfClubs: []
    }


    componentDidMount() {
        this.getClubs()
    } 

    getClubs = async () => {
        let res = await axios.get('/api/club/')
        this.setState({ listOfClubs: res.data })
    }


    render() {
        return (
            <div>
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
