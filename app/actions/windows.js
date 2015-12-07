import BrowserWindow from 'browser-window';
import dialog from 'dialog';
import pathutils from 'path';

export function createWindow(path) {
  return dispatch => {
    const baseUrl = `file://${__dirname}/../client/index.html`;
    let url = baseUrl;
    if (path !== undefined) {
      url = `${baseUrl}?path=${encodedPath}`;
    }
    const encodedPath = encodeURIComponent(path);

    let win = new BrowserWindow({ width: 1200, height: 1000 });

    dispatch(addWindow(win.id, path));
    win.on('closed', () => {
      dispatch(removeWindow(win.id));
    });

    win.loadURL(url);

    if (process.env.NODE_ENV === 'development') {
      win.openDevTools();
    }
  };
}

export const SAVE_WINDOW = 'SAVE_WINDOW';
export function saveWindow(browserWindow) {
  return (dispatch, getState) => {
    const id = browserWindow.id;
    const { windows } = getState();
    const path = windows[browserWindow.id];
    if (path) {
        browserWindow.webContents.send('save', path);
        filename = pathutils.basename(path);
        browserWindow.setTitle(filename);

        dispatch({
          type: SAVE_WINDOW,
          id: browserWindow.id,
          path
        });
    } else {
      dialog.showSaveDialog(browserWindow, {
        filters: [] // TODO: set filters
      }, (path) => {
        if (path === undefined) {
          return;
        }

        browserWindow.webContents.send('save', path);
        filename = pathutils.basename(path);
        browserWindow.setTitle(filename);

        dispatch({
          type: SAVE_WINDOW,
          id: browserWindow.id,
          path
        });
      });
    }
  }
}

// export const SAVED_WINDOW = 'SAVED_WINDOW';
// export function savedWindow(id) {
// }
//
// export const DIRTIED_WINDOW = 'DIRTIED_WINDOW';
// export function dirtiedWindow(id) {
// }

export const ADD_WINDOW = 'ADD_WINDOW';
export function addWindow(id, path) {
  return {
    type: ADD_WINDOW,
    id,
    path
  };
}

export const REMOVE_WINDOW = 'REMOVE_WINDOW';
export function removeWindow(id) {
  return {
    type: REMOVE_WINDOW,
    id
  };
}

export default {
  createWindow,
  addWindow,
  removeWindow
};
