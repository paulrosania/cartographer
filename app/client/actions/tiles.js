export const TILE_SET_TEXTURE = 'TILE_SET_TEXTURE';
export function tileSetTexture(x, y, tex) {
  return {
    type: TILE_SET_TEXTURE,
    x, y, tex
  };
}

export const TILE_SET_PROPERTY = 'TILE_SET_PROPERTY';
export function tileSetProperty(x, y, key, value) {
  return {
    type: TILE_SET_PROPERTY,
    x, y, key, value
  };
}

export default {
  tileSetTexture,
  tileSetProperty
};
