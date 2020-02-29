import React, { Component } from 'react'

export default class ClubView extends Component {

    handlePlayerClick = (e) => {
        this.props.handlePlayerClick(e.target.value)
    }

    render() {
        return (
            <div>
                <h1>Players in {this.props.club.name}</h1>
                <div className='buttonList'>
                   {this.props.club.players.map((player, index) => {
                        return(
                            <button 
                                key={`player-${index + 1}`}
                                onClick={this.handlePlayerClick}
                                value={index}
                            >
                                {player.name}
                            </button>    
                        )
                   })}
               </div>
            </div>
        )
    }
}
