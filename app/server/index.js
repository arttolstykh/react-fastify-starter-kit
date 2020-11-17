import path from 'path';
import fastify from "fastify";
import serverRenderer from './server-renderer'

module.exports = () => {
  const app = fastify({
    logger: true
  });
  
  app.register(require('fastify-static'), {
    root: path.join(process.cwd(), 'build/public')
  });
  
  app.get('/', serverRenderer())
  
  app.listen(3000, () => {
    console.log(`[app] - ${new Date()}`, `🌍 http://localhost:3000`);
  })
}
