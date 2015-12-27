import { applyMiddleware, createStore } from 'redux';
import createReducer from '../reducers';

export default function configureStore(middleware, initialState) {
  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  return finalCreateStore(rootReducer, createReducer(initialState));
}
