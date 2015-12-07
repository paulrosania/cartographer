import { createAction } from 'redux-actions';

export default {
  add: createAction('ADD_LAYER'),
  remove: createAction('REMOVE_LAYER'),
};
