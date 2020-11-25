import { resolve } from 'path'
import fs from 'fs'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../common/app'

export default () => (req, reply) => {
  const context = {}

  const app = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )

  const indexFile = resolve(__dirname, '../../dist/index.html')

  fs.readFile(indexFile, 'utf8', (error, data) => {
    if (error) {
      console.error({ error })
      return reply.status(500).send(error)
    }

    const html = data
      .replace('<div id="root"></div>', `<div id="root">${app}</div>`)

    return reply.type('text/html').send(html)
  })
}
