import { combineReducers } from 'redux'
import { defaultReducer } from './default'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  defaultReducer
})
