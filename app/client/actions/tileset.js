export const TILESET_LOAD = 'TILESET_LOAD';
function tilesetLoad() {
  return {
    type: TILESET_LOAD
  };
}

export const TILESET_SAVE = 'TILESET_SAVE';
function tilesetSave() {
  return {
    type: TILESET_SAVE
  };
}

export const TILESET_TILE_ADD = 'TILESET_TILE_ADD';
function tilesetTileAdd() {
  return {
    type: TILESET_TILE_ADD
  };
}

export const TILESET_TILE_REMOVE = 'TILESET_TILE_REMOVE';
function tilesetTileRemove() {
  return {
    type: TILESET_TILE_REMOVE
  };
}

export default {
  tilesetLoad,
  tilesetSave,
  tilesetTileAdd,
  tilesetTileRemove
};
