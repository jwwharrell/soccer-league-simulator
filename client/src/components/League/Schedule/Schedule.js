import React, { Component } from 'react'



export default class Schedule extends Component {
    state = {
        schedule: []
    }

    createSchedule = () => {
        let allClubs = this.props.allClubs
        let schedule = []
        let week = 1
        allClubs.map((club) => {
            allClubs.forEach((clubTwo) => {
                if (club._id !== clubTwo._id) {
                    schedule.push(`Week ${week} ${clubTwo.name} @ ${club.name}`)
                    week++
                }
            })
        })
        this.setState({ schedule })
    }

    render() {
        let schedule = this.state.schedule
        return (
            <div>
                <h2>Schedule</h2>
                <button
                    onClick={this.createSchedule}
                >Create Schedule</button>
                {schedule.length ?
                    <div className='schedule'>
                        {schedule.map((week) => {
                            return(
                                <p>{week}</p>
                            )
                        })}
                    </div>
                : null
                }
            </div>
        )
    }
}
