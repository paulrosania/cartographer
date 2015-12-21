import Immutable from 'immutable';
import layers from './layers';
import tileset from './tileset';
import { LAYER_ADD, LAYER_REMOVE, LAYER_CLICK } from '../actions/layers';
import { TILE_SET_TEXTURE, TILE_SET_PROPERTY } from '../actions/tiles';
import { TILESET_LOAD, TILESET_SAVE,
         TILESET_TILE_ADD, TILESET_TILE_REMOVE_SELECTED } from '../actions/tileset';
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
  tileset: {
    selectedIndex: 0,
    tiles: Immutable.List()
  },
  layers: {
    layers: Immutable.List([
      {name: 'Layer 0', tiles: Immutable.List()}
    ]),
    selectedIndex: 0,
    nextId: 1
  },
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
    case LAYER_CLICK:
    case TILE_SET_TEXTURE:
    case TILE_SET_PROPERTY:
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
    case TILESET_LOAD:
    case TILESET_SAVE:
    case TILESET_TILE_ADD:
    case TILESET_TILE_REMOVE_SELECTED:
      return Object.assign({}, state, {
        tileset: tileset(state.tileset, action)
      });
    default:
      return state;
  }
}
