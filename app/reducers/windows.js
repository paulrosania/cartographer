import { ADD_WINDOW, REMOVE_WINDOW, SAVE_WINDOW } from '../actions/windows';

const initialState = {};

export default function windows(state = initialState, action) {
  switch (action.type) {
    case ADD_WINDOW:
    case SAVE_WINDOW:
      return Object.assign({}, state, {
        [action.id]: action.path
      });
    case REMOVE_WINDOW:
      var windows = Object.assign({}, state);
      delete windows[action.id];
      return windows;
    default:
      return state;
  }
}
