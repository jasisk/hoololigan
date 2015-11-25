import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/dev-tools';
import { persistState } from 'redux-devtools';
import reducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

let createStoreWithMiddleware;

if (process.env.NODE_ENV !== 'production' && process.env.BROWSER) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createLogger({ collapsed: true })),
    DevTools.instrument(),
    persistState( window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk)
  )(createStore);
}


export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(reducer, initialState);

  if (process.env.NODE_ENV !== 'production' && process.env.BROWSER && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

	return store;
}
