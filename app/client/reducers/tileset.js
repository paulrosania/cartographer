import Immutable from 'immutable';
import { TILESET_LOAD, TILESET_SAVE,
         TILESET_TILE_ADD, TILESET_TILE_REMOVE } from '../actions/tileset';

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
    case TILESET_TILE_ADD:
      return Object.assign({}, state, {
        tiles: state.tiles.push({
          path: action.path,
          width: action.image.width,
          height: action.image.height
        })
      });
    case TILESET_TILE_REMOVE:
      return Object.assign({}, state, {
        tiles: state.tiles.delete(action.id)
      });
    default:
      return state;
  }
}
