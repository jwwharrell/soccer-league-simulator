import { combineReducers } from 'redux'
import randomNameReducer from './randomNameReducer.js'

export default combineReducers({
    randomNames: randomNameReducer
})