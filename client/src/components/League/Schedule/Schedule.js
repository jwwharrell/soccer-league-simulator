import React, { Component } from 'react'



export default class Schedule extends Component {

    createSchedule = () => {
        let allClubs = this.props.allClubs
        let games = []
        let week = 1
        allClubs.map((club) => {
            allClubs.forEach((clubTwo) => {
                if (club._id !== clubTwo._id) {
                    games.push(`Week ${week} ${clubTwo.name} @ ${club.name}`)
                    week++
                }
            })
        })
        console.log(games)
    }

    render() {
        return (
            <div>
                <h2>Schedule</h2>
                <button
                    onClick={this.createSchedule}
                >Create Schedule</button>
            </div>
        )
    }
}
