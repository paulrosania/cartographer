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

export const TILE_REMOVE_PROPERTY = 'TILE_REMOVE_PROPERTY';
export function tileRemoveProperty(x, y, index) {
  return {
    type: TILE_REMOVE_PROPERTY,
    x, y, index
  }
}

export default {
  tileSetTexture,
  tileSetProperties,
  tileRemoveProperty
};
