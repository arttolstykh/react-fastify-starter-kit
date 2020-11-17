import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../common/App';

const renderHead = () => {
  return `
    <head>
      <title>Hello PGW!</title>
      <script type="module" src="bundle.js"></script>
    </head>
  `
}

const serverRenderer = () => (req, reply) => {
  const head = renderHead();
  const content = renderToString(<App />);
  const html = `
      <!DOCTYPE html>
      <html>
        ${head}
        <body>
          <div id="app-root">${content}</div>
        </body>
      </html>
    `;
  
  reply.type('text/html').send(html);
};

export default serverRenderer;
