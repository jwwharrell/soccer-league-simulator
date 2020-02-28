import React, { Component } from 'react'
import SimData from '../../test_data.js'
import ContintentView from './SimViews/ContinentView.js'


export default class SimulationArena extends Component {
    state = {
        continents: SimData.continents,
        currentContinent: '',
        countries: [],
        leagues: [],
        clubs: [],
        players: []
    }

    handleContinentClick = (e) => {
        const previousState = {...this.state}
        previousState.currentContinent = this.state.continents[e.target.value]
        previousState.countries = this.state.continents[e.target.value].countries
        this.setState(previousState)
    }

    render() {
        return (
            <div className='simArena'>
               <h1>World</h1>
               <div className='buttonList'>
                   {this.state.continents.map((continent, index) => {
                        return(
                            <button 
                                key={`continent-${index + 1}`}
                                onClick={this.handleContinentClick}
                                value={index}
                            >
                                {continent.name}
                            </button>    
                        )
                   })}
               </div>
               {this.state.countries.length ?
                <div>
                    <hr />
                    <ContintentView
                        continent={this.state.currentContinent}
                    />
                </div>
                : null
               }
            </div>
        )
    }
}
