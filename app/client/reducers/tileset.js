import { TILESET_LOAD, TILESET_SAVE,
         TILESET_TILE_ADD, TILESET_TILE_REMOVE } from '../actions/tileset';

const initialState = {
};

export default function tileset(state = initialState, action) {
  switch (action.type) {
    case TILESET_LOAD:
    case TILESET_SAVE:
    case TILESET_TILE_ADD:
    case TILESET_TILE_REMOVE:
    default:
      return state;
  }
}
