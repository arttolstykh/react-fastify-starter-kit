import * as React from 'react'
import ReactDOM from 'react-dom'
// import { createBrowserHistory } from 'history'
import App from '../common/app'

// let reduxState = {}
//
// if (window.__REDUX_STATE__) {
//   try {
//     reduxState = JSON.parse(decodeURIComponent(window.__REDUX_STATE__))
//     window.__REDUX_STATE__ = undefined
//   } catch (e) {}
// }

const $root = document.getElementById('root')
// const history = window.history || createBrowserHistory()
// const store = configureStore({ history }, reduxState);

const render = Component => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(<Component />, $root)
}

render(App)

if (module.hot) {
  module.hot.accept('../common/app', () => {
    const NewApp = require('../common/app').default
    render(NewApp)
  })
}
