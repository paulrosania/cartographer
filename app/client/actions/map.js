export const NEW_MAP = 'NEW_MAP';
export function newMap() {
  return {
    type: NEW_MAP
  };
}

export const OPEN_MAP = 'OPEN_MAP';
export function openMap(path) {
  return {
    type: OPEN_MAP,
    path
  };
}

export const RESIZE_MAP = 'RESIZE_MAP';
export function resizeMap(width, height) {
  return {
    type: RESIZE_MAP,
    width,
    height
  }
}

export const HIGHLIGHT_TILE = 'HIGHLIGHT_TILE';
export function highlightTile(tile) {
  return {
    type: HIGHLIGHT_TILE,
    tile
  }
}

export const SELECT_TILE = 'SELECT_TILE';
export function selectTile(tile) {
  return {
    type: SELECT_TILE,
    tile
  }
}

export default {
  newMap,
  openMap
};
