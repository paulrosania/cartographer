import { LAYER_ADD, LAYER_REMOVE } from '../actions/layers';

const initialState = [];

export default function layers(state = initialState, action) {
  switch (action.type) {
    case LAYER_ADD:
      return state.concat({
        name: 'Layer ' + state.length
      });
    case LAYER_REMOVE:
    default:
      return state;
  }
}
