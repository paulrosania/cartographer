import { combineReducers } from 'redux';
import map from './map';

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

export default combineReducers({
  map
});
