import React, { Component } from 'react'
import SimData from '../../test_data.js'


export default class SimulationArena extends Component {
    state = {
        continents: SimData.continents,
        continentButton: {
            clicked: false,
            id: ''
        },
        countries: [],
        leagues: [],
        clubs: [],
        players: []
    }

    render() {
        return (
            <div className='simArena'>
               <h1>Contintents</h1>
               <div className='buttonList'>
                   {this.state.continents.map((continent, index) => {
                        return(
                            <button key={`continent-${index + 1}`}>{continent.name}</button>    
                        )
                   })}
               </div>
            </div>
        )
    }
}
