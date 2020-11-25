import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router as HashRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import configureStore from '../common/store'
import App from '../common/app'

let reduxState = {}

if (window.__REDUX_STATE__) {
  try {
    reduxState = JSON.parse(decodeURIComponent(window.__REDUX_STATE__))
    window.__REDUX_STATE__ = undefined
  } catch (e) {}
}

const $root = document.getElementById('root')
const store = configureStore(reduxState)
const history = createBrowserHistory()

const render = Component => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    (
      <Provider store={store}>
        <HashRouter history={history}>
          <Component />
        </HashRouter>
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
