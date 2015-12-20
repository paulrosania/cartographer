export const LAYER_ADD = 'LAYER_ADD';
export function layerAdd() {
  return {
    type: LAYER_ADD
  };
}

export const LAYER_REMOVE = 'LAYER_REMOVE';
export function layerRemove() {
  return {
    type: LAYER_REMOVE
  };
}

export const LAYER_CLICK = 'LAYER_CLICK';
export function layerClick(layer, index) {
  return {
    type: LAYER_CLICK,
    layer,
    index
  };
}

export default {
  layerAdd,
  layerRemove,
  layerClick
};
