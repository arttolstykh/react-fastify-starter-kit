import * as React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore from '../common/store'
import App from '../common/app'

let reduxState = {}

if (window.__REDUX_STATE__) {
  try {
    reduxState = JSON.parse(decodeURIComponent(window.__REDUX_STATE__))
    window.__REDUX_STATE__ = undefined
  } catch (e) {}
}

const history = createBrowserHistory()
const store = configureStore(history, reduxState)
const $root = document.getElementById('root')

const render = Component => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    ),
    $root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('../common/app', () => {
    const NewApp = require('../common/app').default
    render(NewApp)
  })
}
