import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { devTools } from 'redux-devtools';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import App from './containers/App';
import ipc from 'ipc-renderer';
import fs from 'fs';

function parseQueryString(qs) {
  if (qs.length <= 1) {
    return {};
  }

  qs = qs.substring(1);
  return qs.split('&')
           .map(kv => kv.split('=').map(decodeURIComponent))
           .reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});
}

const params = parseQueryString(window.location.search);
if (params.path !== undefined) {
  let json = fs.readFileSync(params.path, {
    encoding: 'utf-8',
    flag: 'r'
  });
  initialState = JSON.parse(json);
} else {
  initialState = undefined;
}

ipc.on('save', (e, path) => {
  console.log('SAVE!', path);
  const data = JSON.stringify(store.getState());
  fs.writeFile(path, data, {
    encoding: 'utf-8',
    flag: 'w',
    mode: 0o664,
  }, (err) => {
    if (err) throw err;
    e.sender.send('saved');
  });
});

const isDevelopment = process.env.NODE_ENV === 'development';
const middleware = [thunkMiddleware];
const appCreateStore = (isDevelopment
                        ? compose(applyMiddleware(...middleware), devTools())(createStore)
                        : applyMiddleware(...middleware)(createStore));
const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

const store = appCreateStore(reducer, initialState);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    { isDevelopment && do {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>;
    } }
  </div>,
  rootElement
);
