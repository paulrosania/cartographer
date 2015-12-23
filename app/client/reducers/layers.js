import Immutable from 'immutable';
import layer from './layer';
import { LAYER_ADD, LAYER_REMOVE, LAYER_CLICK } from '../actions/layers';
import { TILE_SET_TEXTURE, TILE_SET_PROPERTY } from '../actions/tiles';
import { TILESET_TILE_REMOVE } from '../actions/tileset';

const initialState = {
  layers: Immutable.List(),
  selectedIndex: 0,
  nextId: 0
};

export default function layers(state = initialState, action) {
  const { layers, selectedIndex } = state;

  switch (action.type) {
    case LAYER_ADD:
      return Object.assign({}, state, {
        layers: layers.push({
          name: 'Layer ' + state.nextId,
          tiles: Immutable.List()
        }),
        nextId: state.nextId + 1,
        selectedIndex: layers.size
      });
    case LAYER_REMOVE:
      return Object.assign({}, state, {
        layers: layers.delete(selectedIndex),
        selectedIndex: selectedIndex - 1
      });
    case LAYER_CLICK:
      return Object.assign({}, state, {
        selectedIndex: action.index
      });
    case TILE_SET_TEXTURE:
    case TILE_SET_PROPERTY:
      const l = layers.set(selectedIndex, layer(layers.get(selectedIndex), action));
      return Object.assign({}, state, {
        layers: l
      });
    case TILESET_TILE_REMOVE:
      return Object.assign({}, state, {
        layers: layers.map(l => layer(l, action))
      });
    default:
      return state;
  }
}
