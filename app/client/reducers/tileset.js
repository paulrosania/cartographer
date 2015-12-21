import Immutable from 'immutable';
import { TILESET_LOAD, TILESET_SAVE, TILESET_TILE_LOADED,
         TILESET_TILE_ADD, TILESET_TILE_REMOVE_SELECTED } from '../actions/tileset';

const initialState = {
  selectedIndex: 0,
  tileWidth: 100,
  tileHeight: 50,
  tiles: Immutable.List()
};

export default function tileset(state = initialState, action) {
  switch (action.type) {
    case TILESET_LOAD:
    case TILESET_SAVE:
    case TILESET_TILE_LOADED:
      return Object.assign({}, state, {
        tiles: state.tiles.push(action.tile)
      });
    case TILESET_TILE_REMOVE_SELECTED:
      return Object.assign({}, state, {
        tiles: state.tiles.delete(state.selectedIndex)
      });
    default:
      return state;
  }
}
