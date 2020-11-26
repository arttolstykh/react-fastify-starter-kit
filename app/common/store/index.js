import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers'

const dev = process.env.NODE_ENV === 'development'

export default function configureStore (initialState = {}) {
  let composeEnhancers
  
  if (dev) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
  else composeEnhancers = compose
  
  const enhancer = composeEnhancers(applyMiddleware(logger))
  
  return createStore(rootReducer, initialState, enhancer)
}
