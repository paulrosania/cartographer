import { SELECT_PROPERTY } from '../actions/properties';

const initialState = -1;

export default function tilePropertiesSelectedIndex(state = initialState, action) {
  switch (action.type) {
    case SELECT_PROPERTY:
      return action.index;
    default:
      return state;
  }
}
