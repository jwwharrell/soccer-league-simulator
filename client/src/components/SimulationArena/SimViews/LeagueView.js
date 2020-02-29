import React, { Component } from 'react'

export default class LeagueView extends Component {

    handleClubClick = (e) => {
        this.props.handleClubClick(e.target.value)
    }

    render() {
        return (
            <div>
                <h1>Clubs in {this.props.league.name}</h1>
                <div className='buttonList'>
                   {this.props.league.clubs.map((club, index) => {
                        return(
                            <button 
                                key={`club-${index + 1}`}
                                onClick={this.handleClubClick}
                                value={index}
                            >
                                {club.name}
                            </button>    
                        )
                   })}
               </div>
            </div>
        )
    }
}
