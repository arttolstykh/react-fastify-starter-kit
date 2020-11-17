import * as React from 'react';
import { hydrate } from 'react-dom';

import { createBrowserHistory } from 'history';

import App from '../common/App';

const browserHistory = window.browserHistory || createBrowserHistory();

const store = window.store;

hydrate(<App />, document.getElementById('app'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
  
  if (!window.store || !window.browserHistory) {
    window.browserHistory = browserHistory;
    window.store = store;
  }
}
