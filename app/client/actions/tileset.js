import { remote } from 'electron';

export const TILESET_LOAD = 'TILESET_LOAD';
export function tilesetLoad() {
  return {
    type: TILESET_LOAD
  };
}

export const TILESET_SAVE = 'TILESET_SAVE';
export function tilesetSave() {
  return {
    type: TILESET_SAVE
  };
}

export const TILESET_TILE_ADD = 'TILESET_TILE_ADD';
export function tilesetTileAdd() {
  return dispatch => {
    const win = remote.getCurrentWindow();
    const { dialog } = remote;
    dialog.showOpenDialog(win, {
      filters: [
        { name: 'Images', extensions: ['png'] }
      ],
      properties: ['openFile', 'multiSelections']
    }, (filenames) => {
      if (filenames === undefined) {
        return;
      }

      filenames.forEach(path => {
        const img = new Image();
        img.src = path;
        img.addEventListener('load', e => dispatch({
          type: TILESET_TILE_ADD,
          image: img,
          path: path
        }));
      });
    });
  }
}

export const TILESET_TILE_LOADED = 'TILESET_TILE_ADD';
export function tilesetTileLoaded() {
  return {
    type: TILESET_TILE_LOADED
  };
}

export const TILESET_TILE_REMOVE = 'TILESET_TILE_REMOVE';
export function tilesetTileRemove(id) {
  return {
    type: TILESET_TILE_REMOVE,
    id
  };
}

export default {
  tilesetLoad,
  tilesetSave,
  tilesetTileAdd,
  tilesetTileRemove
};
