import Immutable from 'immutable';
import { TILESET_LOAD, TILESET_SAVE,
         TILESET_TILE_ADD, TILESET_TILE_REMOVE_SELECTED } from '../actions/tileset';

const initialState = {
  nextId: 1,
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
        nextId: state.nextId + 1,
        tiles: state.tiles.set(state.nextId, {
          id: state.nextId,
          path: action.image.src,
          width: action.image.width,
          height: action.image.height
        })
      });
    case TILESET_TILE_REMOVE_SELECTED:
      return Object.assign({}, state, {
        tiles: state.tiles.delete(state.selectedIndex)
      });
    default:
      return state;
  }
}
