import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers/index';
import app from 'app';
import crashReporter from 'crash-reporter';
import menu from './menu';
import { createWindow } from './actions/windows';

const middleware = [thunkMiddleware];

//const isDevelopment = process.env.NODE_ENV === 'development';
const appCreateStore = applyMiddleware(...middleware)(createStore);
const store = appCreateStore(reducer);

function randomString() {
  const x = 2147483648;
  const now = +new Date();
  return Math.floor(Math.random() * x).toString(36) +
    Math.abs(Math.floor(Math.random() * x) ^ now).toString(36);
}

crashReporter.start();

let mainWindow = null;

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function readFile(path, callback) {
  fs.readFile(path, 'utf-8', callback);
}

app.on('ready', () => {
  menu.init(store.dispatch);

  store.dispatch(createWindow());
});
