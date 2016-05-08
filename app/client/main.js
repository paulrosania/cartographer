import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import ipc from 'ipc-renderer';
import fs from 'fs';
import path from 'path';

function parseQueryString(qs) {
  if (qs.length <= 1) {
    return {};
  }

  qs = qs.substring(1);
  return qs.split('&')
           .map(kv => kv.split('=').map(decodeURIComponent))
           .reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});
}

const jsmap = {
  encode: (state) => {
    const map = state.map.present;
    const data = {
      map: {
        height: map.height,
        width: map.width,
        tileHeight: map.tileHeight,
        tileWidth: map.tileWidth,
        properties: map.properties,
        tileset: map.tileset.tiles,
        layers: map.layers.layers
      }
    }
    return JSON.stringify(data);
  },
  decode: (raw, filePath) => {
    const data = JSON.parse(raw);
    const map = data.map;

    const root = 'file://' + path.dirname(filePath);
    map.tileset.forEach(t => {
      if (t.path.startsWith(root)) {
        t.path = t.path.substring(root.length + 1);
      }
    });

    const initialState = {
      map: {
        path: filePath,
        height: map.height,
        width: map.width,
        tileHeight: map.tileHeight,
        tileWidth: map.tileWidth,
        properties: map.properties,
        tileset: {
          nextId: map.tileset.reduce((max, t) => { return Math.max(max, t.id); }, 0) + 1,
          selectedIndex: 0,
          tiles: Immutable.List(map.tileset)
        },
        layers: {
          layers: Immutable.List(map.layers),
          selectedIndex: 0,
          nextId: map.layers.length
        }
      }
    };
    initialState.map.layers.layers.forEach(l => {
      l.tiles = Immutable.fromJS(l.tiles);
    });
    return initialState;
  }
};

const params = parseQueryString(window.location.search);
if (params.path !== undefined) {
  let json = fs.readFileSync(params.path, {
    encoding: 'utf-8',
    flag: 'r'
  });
  initialState = jsmap.decode(json, params.path);
} else {
  initialState = undefined;
}

ipc.on('save', (e, path) => {
  console.log('SAVE!', path);
  const state = store.getState();
  const data = jsmap.encode(state);
  fs.writeFile(path, data, {
    encoding: 'utf-8',
    flag: 'w',
    mode: 0o664,
  }, (err) => {
    if (err) throw err;
    e.sender.send('saved');
  });
});

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

const middleware = [thunkMiddleware];
const store = configureStore(middleware, initialState);

ReactDOM.render(
  <Root store={store} />,
  rootElement
);
