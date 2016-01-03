import Immutable from 'immutable';
import { TILE_SET_TEXTURE, TILE_SET_PROPERTIES,
         TILE_REMOVE_PROPERTY } from '../actions/tiles';
import { TILESET_TILE_REMOVE } from '../actions/tileset';

const initialState = Immutable.List();

function set(mat, x, y, k, v) {
  var xs = mat;
  var ys = xs.get(x) || Immutable.List();
  var cell = ys.get(y) || Immutable.Map();
  cell = cell.set(k, v);

  ys = ys.set(y, cell);
  xs = xs.set(x, ys);

  return xs;
}

function setAll(mat, x, y, props) {
  var xs = mat;
  var ys = xs.get(x) || Immutable.List();

  ys = ys.set(y, Immutable.Map(props));
  xs = xs.set(x, ys);

  return xs;
}

export default function tiles(state = initialState, action) {
  const { x, y } = action;
  switch (action.type) {
    case TILE_SET_TEXTURE:
      let { tex } = action;
      return set(state, x, y, 'tex', tex);
    case TILE_SET_PROPERTIES:
      return setAll(state, x, y, action.properties);
    case TILE_REMOVE_PROPERTY:
      const cell = state.getIn([x, y]);
      const keys = cell.keySeq().sort();
      const key = keys.get(action.index);
      const newProps = cell.delete(key);
      return setAll(state, x, y, newProps);
    case TILESET_TILE_REMOVE:
      return state.map(ys => ys.map(cell => {
        if (!cell) {
          return cell;
        }

        const tex = cell.get('tex');
        if (tex === action.id) {
          return null; // delete matching tiles
        } else if (tex > action.id) {
          return cell.set('tex', tex - 1);
        } else {
          return cell;
        }
      }));
    default:
      return state;
  }
}
