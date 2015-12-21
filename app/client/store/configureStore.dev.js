import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(middleware, initialState) {
  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
