import { resolve } from 'path'
import fs from 'fs'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../common/app'

export default () => (req, reply) => {
  const title = 'React Starter Kit'
  const app = renderToString(<App />)
  const indexFile = resolve(__dirname, '../client/template.html')
  fs.readFile(indexFile, 'utf8', (error, data) => {
    if (error) {
      console.error({ error })
      return reply.status(500).send(error)
    }
    const html = data
      .replace('<title><%= htmlWebpackPlugin.options.title %></title>', `<title>${title}</title>`)
      .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    return reply.type('text/html').send(html)
  })
}
