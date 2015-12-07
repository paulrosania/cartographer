import layers from './layers';
import { ADD_LAYER, REMOVE_LAYER } from '../actions/layers';
import { NEW_MAP, OPEN_MAP, RESIZE_MAP } from '../actions/map';

const initialState = {
  orientation: 'staggered',
  renderOrder: 'right-down',
  width: 10,
  height: 10,
  tileWidth: 100,
  tileHeight: 100,
  staggerAxis: 'x',    // [x|y]
  staggerIndex: 'odd', // [odd|even]
  tileset: null,
  layers: [],
  properties: {}
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case NEW_MAP:
    case OPEN_MAP:
      return {
        guid: action.guid,
        path: action.path
      };
    case RESIZE_MAP:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height
      });
    case ADD_LAYER:
    case REMOVE_LAYER:
      return Object.assign({}, state, {
        layers: layers(state.layers, action)
      });
    default:
      return state;
  }
}
