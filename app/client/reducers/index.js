import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import map from './map';
import selectedTile from './selectedTile';
import tilePropertiesSelectedIndex from './tilePropertiesSelectedIndex';

/**
 * {
 *   map: { // maybe the file format can just be this structure written out?
 *     orientation: [staggered|],
 *     renderOrder: [right-down|],
 *     width: int,
 *     height: int,
 *     tileWidth: int,
 *     tileHeight: int,
 *     staggerAxis: [x|y],
 *     staggerIndex: [odd|even],
 *     tileset: {
 *       name: string,
 *       properties: {
 *         tileWidth: int,
 *         tileHeight: int,
 *       },
 *       tiles: [
 *         {
 *           type: "image",
 *           width: int,
 *           height: int,
 *           source: path
 *         }
 *       ]
 *     },
 *     layers: [
 *       {
 *         name: string,
 *         width: int,
 *         height: int,
 *         cells: [
 *           {
 *             tileId: int,
 *             properties: Object
 *           }
 *         ]
 *       }
 *     ],
 *     properties: Object
 *   }
 * }
 */

export default function createReducer(presentState) {
  const undoConfig = {
    initialState: initialState ? initialState.map : undefined,
    filter: (action, currentState, previousState) => {
      return currentState !== previousState;
    }
  };

  return combineReducers({
    map: undoable(map, undoConfig),
    selectedTile,
    tilePropertiesSelectedIndex
  });
}
