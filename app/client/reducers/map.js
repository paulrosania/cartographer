import { NEW_MAP, OPEN_MAP } from '../actions/map';
const initialState = {};

export default function map(state = initialState, action) {
  switch (action.type) {
    case NEW_MAP:
    case OPEN_MAP:
      return {
        guid: action.guid,
        path: action.path
      };
    default:
      return state;
  }
}
