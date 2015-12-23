import Immutable from 'immutable';
import tiles from './tiles';
import { TILE_SET_TEXTURE, TILE_SET_PROPERTY } from '../actions/tiles';
import { TILESET_TILE_REMOVE } from '../actions/tileset';

const initialState = {
  name: null,
  tiles: Immutable.List()
};

export default function layer(state = initialState, action) {
  switch (action.type) {
    case TILE_SET_TEXTURE:
    case TILE_SET_PROPERTY:
    case TILESET_TILE_REMOVE:
      return Object.assign({}, state, {
        tiles: tiles(state.tiles, action)
      });
    default:
      return state;
  }
}
