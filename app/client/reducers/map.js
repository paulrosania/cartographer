import layers from './layers';
import { LAYER_ADD, LAYER_REMOVE, LAYER_CLICK } from '../actions/layers';
import { NEW_MAP, OPEN_MAP, RESIZE_MAP,
         HIGHLIGHT_TILE, SELECT_TILE } from '../actions/map';

const initialState = {
  orientation: 'staggered',
  renderOrder: 'right-down',
  width: 10,
  height: 10,
  tileWidth: 100,
  tileHeight: 50,
  staggerAxis: 'x',    // [x|y]
  staggerIndex: 'odd', // [odd|even]
  selectedTile: null,
  highlightedTile: null,
  tileset: null,
  layers: [],
  selectedLayer: 0,
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
    case LAYER_ADD:
    case LAYER_REMOVE:
      return Object.assign({}, state, {
        layers: layers(state.layers, action)
      });
    case HIGHLIGHT_TILE:
      return Object.assign({}, state, {
        highlightedTile: action.tile
      });
    case SELECT_TILE:
      return Object.assign({}, state, {
        selectedTile: action.tile
      });
    default:
      return state;
  }
}
