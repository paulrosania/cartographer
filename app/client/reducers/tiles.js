import Immutable from 'immutable';
import { TILE_SET_TEXTURE, TILE_SET_PROPERTY } from '../actions/tiles';

const initialState = Immutable.List();

function set(mat, x, y, k, v) {
  var xs = mat;
  var ys = xs.get(x) || Immutable.List();
  var cell = ys.get(y) || Immutable.Map();
  cell.set(k, v);

  ys = ys.set(y, cell);
  xs = xs.set(x, ys);

  return xs;
}

export default function tiles(state = initialState, action) {
  const { x, y } = action;
  switch (action.type) {
    case TILE_SET_TEXTURE:
      let { tex } = action;
      return set(state, x, y, 'tex', tex);
    case TILE_SET_PROPERTY:
      const { key, value } = action;
      return set(state, x, y, key, value);
    default:
      return state;
  }
}
