import { resolve } from 'path'
import fs from 'fs'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import configureStore from '../common/store'
import App from '../common/app'

export default () => (req, reply) => {
  const history = createMemoryHistory()
  const store = configureStore(history)
  const reduxState = encodeURIComponent(JSON.stringify(store.getState()))
  const context = {}

  const app = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const indexFile = resolve(__dirname, '../../dist/index.html')

  fs.readFile(indexFile, 'utf8', (error, data) => {
    if (error) {
      console.error({ error })
      return reply.status(500).send(error)
    }

    const html = data
      .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      .replace('<script></script>', `<script type="text/javascript">window.__REDUX_STATE__ = '${reduxState}';</script>`)

    return reply.type('text/html').send(html)
  })
}
