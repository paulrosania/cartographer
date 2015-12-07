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

export default {
  newMap,
  openMap
};
