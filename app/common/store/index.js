import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore (history, initialState = {}) {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const middlewares = applyMiddleware(...[
    routerMiddleware(history),
    logger
  ])

  const store = createStore(rootReducer(history), initialState, composeEnhancers(middlewares))

  if (module.hot) {
    module.hot.accept('../../common/reducers', () => {
      store.replaceReducer(require('../../common/reducers').default) // eslint-disable-line
    })
  }

  return store
}
