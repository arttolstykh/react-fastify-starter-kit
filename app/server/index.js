import { join } from 'path'
import fastify from 'fastify'
import renderer from './renderer'

const dev = process.env.NODE_ENV === 'development'

const server = fastify({ logger: dev })

server
  .register(require('fastify-cors'))
  .register(require('fastify-static'), {
    root: join(process.cwd(), dev ? '.build' : 'dist'),
    prefix: dev ? '/.build/' : '/dist/'
  })

server.get('/', renderer())

server.listen(3000).catch(error => {
  console.log('Error starting server:', { error })
  process.exit(1)
})
