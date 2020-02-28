import React, { Component } from 'react'

export default class ContinentView extends Component {
    render() {
        return (
            <div>
                <h1>Countries in {this.props.continent.name}</h1>
                <div className='buttonList'>
                   {this.props.continent.countries.map((country, index) => {
                        return(
                            <button 
                                key={`country-${index + 1}`}
                            >
                                {country.name}
                            </button>    
                        )
                   })}
               </div>
            </div>
        )
    }
}
