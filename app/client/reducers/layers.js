import { LAYER_ADD, LAYER_REMOVE, LAYER_CLICK } from '../actions/layers';

const initialState = {
  layers: [],
  selectedIndex: 0,
  nextId: 0
};

export default function layers(state = initialState, action) {
  switch (action.type) {
    case LAYER_ADD:
      return Object.assign({}, state, {
        layers: state.layers.concat({
          name: 'Layer ' + state.nextId
        }),
        nextId: state.nextId + 1,
        selectedIndex: state.layers.length
      });
    case LAYER_REMOVE:
      const { layers, selectedIndex } = state;

      return Object.assign({}, state, {
        layers: layers.slice(0, selectedIndex).concat(layers.slice(selectedIndex + 1)),
        selectedIndex: state.selectedIndex - 1
      });
    case LAYER_CLICK:
      return Object.assign({}, state, {
        selectedIndex: action.index
      });
    default:
      return state;
  }
}
