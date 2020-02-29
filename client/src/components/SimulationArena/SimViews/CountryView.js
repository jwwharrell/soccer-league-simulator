import React, { Component } from 'react'

export default class CountryView extends Component {

    handleLeagueClick = (e) => {
        this.props.handleLeagueClick(e.target.value)
    }

    render() {
        return (
            <div>
                <h1>Leagues in {this.props.country.name}</h1>
                <div className='buttonList'>
                   {this.props.country.leagues.map((league, index) => {
                        return(
                            <button 
                                key={`league-${index + 1}`}
                                onClick={this.handleLeagueClick}
                                value={index}
                            >
                                {league.name}
                            </button>    
                        )
                   })}
               </div>
            </div>
        )
    }
}
