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
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      filters: ['*.png'],
      properties: ['openFile', 'multiSelections']
    }, (filenames) => {
      if (filenames === undefined) {
        return;
      }

      filenames.forEach(path => dispatch({
        type: TILESET_TILE_ADD,
        path: path
      }));
    });
  }
}

export const TILESET_TILE_LOADED = 'TILESET_TILE_ADD';
export function tilesetTileLoaded() {
  return {
    type: TILESET_TILE_LOADED
  };
}

export const TILESET_TILE_REMOVE_SELECTED = 'TILESET_TILE_REMOVE_SELECTED';
export function tilesetTileRemoveSelected() {
  return {
    type: TILESET_TILE_REMOVE_SELECTED
  };
}

export default {
  tilesetLoad,
  tilesetSave,
  tilesetTileAdd,
  tilesetTileRemoveSelected
};
