import { RESIZE_MAP, SELECT_TILE } from '../actions/map';

const initialState = null;

export default function selectedTile(state = initialState, action) {
  switch (action.type) {
    case RESIZE_MAP:
      return null;
    case SELECT_TILE:
      return Object.assign({}, action.tile);
    default:
      return state;
  }
}
