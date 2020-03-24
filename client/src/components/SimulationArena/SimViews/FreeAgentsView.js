import React, { Component } from 'react'

export default class FreeAgentsView extends Component {
    render() {
        return (
            <div>
                <h1>Free Agents List</h1>
                {this.props.freeAgents.length ?
                    <div className='freeAgentWindow'>
                        {this.props.freeAgents.map((player, index) => {
                            return (
                                <button
                                    key={`fa-${player.name}-${index}`}    
                                >
                                {player.name} | {player.posAbr} | {player.skill}
                                </button>
                            )
                    })}
                    </div>
                    : <div>There are NO free agents to show</div>
                }
            </div>
        )
    }
}
