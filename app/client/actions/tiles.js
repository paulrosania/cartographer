export const TILE_SET_TEXTURE = 'TILE_SET_TEXTURE';
export function tileSetTexture(x, y, tex) {
  return {
    type: TILE_SET_TEXTURE,
    x, y, tex
  };
}

export const TILE_SET_PROPERTIES = 'TILE_SET_PROPERTIES';
export function tileSetProperties(x, y, properties) {
  return {
    type: TILE_SET_PROPERTIES,
    x, y, properties
  };
}

export default {
  tileSetTexture,
  tileSetProperties
};
